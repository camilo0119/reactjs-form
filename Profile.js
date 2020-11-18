import { Grid } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Footer from "../footer/Footer";
import { makeStyles } from '@material-ui/core/styles';
import NameBar from '../nameBar/NameBar';
import ProfileForm from "./ProfileForm";
import ProfileTable from "./ProfileTable";
import { saveProfile } from "../../actions/profile-actions"
import { useStateValue } from "../../context/store";

const style = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar
}));

const Profile = () => {
    const [dataTable, setDataTable] = useState([])
    const [keyComponent, setKeyComponent] = useState(1)
    const [{}, dispatch] = useStateValue();

    const saveNewProfile = (dataForm) => {
        saveProfile(dataForm, dispatch).then(response => {
            setDataTable([response.data])
            setKeyComponent(key => key + 1)
        }).catch(err => {
            dispatch()
        })
    }


    return (
        <React.Fragment>
            <div className={style.appBarSpacer} />
            <NameBar nameDomain="Registro Perfil" showSearch="0" lineWidth="100px"/>
            <Grid container style={{ height: "100%", margin: 0 }} className="form-container">
                <Grid item xs={12} sm={3} md={3} style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <ProfileForm 
                        onData={ data => {
                            if (data.type === 'save') {
                                saveNewProfile(data)
                            }
                        }}
                    />
                    <br/>
                </Grid>
                <Grid item xs={12} sm={9} md={9} style={{ textAlign: 'center', paddingLeft: "10px" }}>
                   {
                       dataTable.length > 0 &&
                       <ProfileTable 
                        key={keyComponent}
                        dataTable={dataTable}
                       />
                   }
                </Grid>
            </Grid>
            <Footer className="mt20" />
        </React.Fragment >
    );
};

export default Profile;
