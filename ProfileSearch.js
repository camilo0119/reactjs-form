import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import { makeStyles } from '@material-ui/core/styles';
import NameBar from '../nameBar/NameBar';
import ProfileForm from "./ProfileForm";
import ProfileTable from "./ProfileTable";
import { getProfiles } from "../../actions/profile-actions";


const style = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,

}));
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    namebar: {
        width: "100%",
        paddingTop: "10px",
        paddingLeft: "16px",
        backgroundColor: "#F2F2F2",
        borderBottom: "solid 1px #cccccc",
        height: "56px"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
        backgroundColor: '#12B3F9',
        width: '170px',
    },
    clear: {
        float: 'right',
        width: '170px',
        marginRight: '25px'
    },
    clearParent: {
        display: 'flex',
        alignItems: 'center',
        float: 'right',
        marginRight: '16px',
    },
    titleTwo: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '20px',
        /* identical to box height, or 125% */
        letterSpacing: '-0.05px',
        color: '#3A3B3F',
        textAlign: 'left',
        paddingTop: '15px'
    },
    disabledButton: {
        backgroundColor: '#F2F2F2!important',
        opacity: '0.3',
        color:'#12B3F9!important',
        border: "solid 1px #12B3F9",
    },
    textContainer: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

const ProfileSearch = () => {

    const [dataTable, setDataTable] = useState([])

    const getAllProfiles = async () => {
        await getProfiles().then(response => {
            if (response) {
                setDataTable(response.data)
            }
        })
    }

    useEffect(() => {
        getAllProfiles()
    }, [])

    return (
        <React.Fragment>
            <div className={style.appBarSpacer} />
            <NameBar nameDomain="Consultar Perfil" showSearch="0" lineWidth="110px"/>
            <Grid container spacing={3}>

                <Grid item xs={3} spacing={0} style={{ height: "100%", margin: 0}}>
                    <Grid container>
                        <Grid item xs style={{ textAlign: 'center', padding: '12px', paddingTop: '0px' }}>
                            <ProfileForm onDataTable={(data)=> setDataTable(data)}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={9}>
                      <ProfileTable dataTable={dataTable}/>
                </Grid>

            </Grid>
            <Footer />
        </React.Fragment >
    );
};

export default ProfileSearch;
