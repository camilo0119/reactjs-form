import React, { memo, useEffect, useState } from "react";
import { Typography, Button, FormControl, InputLabel, Select, InputAdornment, IconButton, OutlinedInput, Tooltip, MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import { useForm } from "../../utils/customHooks/useForm";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";
import { saveProfile } from "../../actions/profile-actions";
import Snackbars from "../snackbars/SnackBars";
import  "./formStyle.css";
import moment from "moment";

const style = {

    paper: {
        display: "flex",
        flexDirection: "column",
        width: "286px",
        height: "100%",
        background: "#FFFFFF",
        boxShadow: "0px 0px 20px rgba(63, 63, 68, 0.2), 0px 1px 3px rgba(63, 63, 68, 0.15)",
        borderRadius: "4px",
        marginLeft: "12px",
        marginTop: "16px",
        marginButton: "20px"
    },
    form: {
        width: "100%",
        marginTop: 15,
    },
    field: {
        width: "243px",
    },
    submit: {
        marginTop: "10px",
        textTransform: "none",
        width: "243px",
        heigth: "38px"
    },
    titleOne: {
        marginTop: "20px",
        marginButton: "10px",
        marginLeft: "20px",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "20px",
        textAlign: "left",
        verticalAlign: "top",
        letterSpacing: "-0.06px",
        color: "#212529"
    }
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: 243,
        minWidth: 120,
        textAlign: "initial"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    disabledButton: {
      backgroundColor: '#12B3F9!important',
      opacity: '0.3',
      color:'#fff!important'
    }
}));

const ProfileForm = ({onData}) => {
    const classes = useStyles();
    const [formData, handleInputChange, setForm] = useForm({
        name: '',
        description: '',
        status: '',
        initialVigence: '',
        finalVigence: '',
        domain: ''
    })
    const [isSearch, setIsSearch] = useState(false)
    const [message, setMessage] = useState({
        open: false,
        text: '',
        type: '',
        fontColor:''
    });

    useEffect(()=> {

        const namePath = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length)
        setIsSearch(namePath === "search" ? true : false)

    }, [])

    const invalidName = () => {
        if (formData.name.trim().length > 25) {
            return true
        } else {
            return false
        }
    }

    const validationForm = () => {
        if (formData.name && formData.status && formData.initialVigence && formData.finalVigence && formData.domain) {
            return false
        } else {
            return true
        }
    }

    const saveProfileBtn = (e) => {
        e.preventDefault();
        let dataForm = formData
        delete dataForm.initialVigence
        delete dataForm.finalVigence
        onData({
            ...dataForm,
            initialDate: moment(formData.initialVigence).format('YYYY-MM-DD'),
            finalDate: moment(formData.finalVigence).format('YYYY-MM-DD'),
            type: 'save'
        })
    }

    const getProfiles = (e) => {
        e.preventDefault();
        console.log('se llama consulta')
        // props.getProfiles()
    }

    const useStylesBootstrap = makeStyles((theme) => ({
        arrow: {
          color: theme.palette.secondary.main,
        },
        tooltip: {
          backgroundColor: theme.palette.secondary.main,
        },
    }))

    const BootstrapTooltip = (props) => {
        const classes = useStylesBootstrap();
        return <Tooltip placement="top" arrow classes={classes} {...props} />;
    }

    return (
        <div style={style.paper}>
            <Typography
                style={style.titleOne}
            >
                <b>Completa los campos</b>
            </Typography>
            <form style={style.form}>
                <FormControl variant="outlined" size="small" className={classes.formControl}>
                <InputLabel htmlFor="outlined-adornment-amount" error={invalidName()}>Nombre de perfil</InputLabel>
                    <OutlinedInput error={invalidName()}
                        style={style.field}
                        value={formData.name}
                        onChange={handleInputChange}
                        label="Nombre de perfil"
                        name="name"
                        size="small"
                        autoComplete="off"
                        inputProps={{ maxLength: 25 }}
                        endAdornment={
                            invalidName() &&
                            <BootstrapTooltip
                                title="Máximo 25 caracteres"
                            >
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                color={invalidName() ? "secondary" : ""}
                                style={{marginRight: "3px"}}
                              >
                                <InfoIcon fontSize="small"/>
                              </IconButton>
                            </InputAdornment>
                            </BootstrapTooltip>
                          }
                    />
                </FormControl>
                {
                    !isSearch && 
                    <FormControl variant="outlined" size="small" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-adornment-amount">Descripción del perfil</InputLabel>
                            <OutlinedInput
                                style={style.field}
                                value={formData.description}
                                onChange={handleInputChange}
                                label="Descripción del perfil"
                                name="description"
                                size="small"
                                inputProps={{ maxLength: 60 }}
                        />
                    </FormControl>
                }
                <FormControl required variant="outlined" size="small" className={classes.formControl}>
                    <InputLabel htmlFor="demo-simple-select-outlined-label">Estado del perfil</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        label="Estado del perfil"
                        name="status"
                        >
                        <MenuItem value="A">Activo</MenuItem>
                        <MenuItem value="I">Inactivo</MenuItem>
                </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" className={classes.formControl} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                        <KeyboardDatePicker
                            autoOk
                            size="small"
                            variant="inline"
                            inputVariant="outlined"
                            label={!formData.initialVigence && "Vigencia inicial"}
                            name="initialVigence"
                            minDate={new Date()}
                            format="dd-MM-yyyy"
                            minDateMessage="Fecha inferior a la actual"
                            invalidDateMessage=""
                            emptyLabel="Campo requerido"
                            value={formData.initialVigence}
                            InputAdornmentProps={{ position: "end" }}
                            onChange={(e)=> setForm("initialVigence", moment(e).format())}
                            autoComplete="off"
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>

                <FormControl variant="outlined" size="small" className={classes.formControl} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                        <KeyboardDatePicker
                            autoOk
                            size="small"
                            variant="inline"
                            inputVariant="outlined"
                            label={!formData.finalVigence && "Vigencia final"}
                            name="initialVigence"
                            format="dd-MM-yyyy"
                            minDate={new Date(formData.initialVigence)}
                            minDateMessage="La fecha no puede ser inferior a la fecha inicial"
                            invalidDateMessage=""
                            emptyLabel="Campo requerido"
                            value={formData.finalVigence}
                            InputAdornmentProps={{ position: "end" }}
                            onChange={(e)=> setForm("finalVigence",  moment(e).format())}
                            autoComplete="off"
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>

                <FormControl required variant="outlined" size="small" className={classes.formControl}>
                    <InputLabel htmlFor="demo-simple-select-outlined-label">Dominio</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="domain"
                        value={formData.domain}
                        onChange={handleInputChange}
                        label="Dominio"
                        name="domain"
                        >
                        <MenuItem value="PRIVATE">Privado</MenuItem>
                        <MenuItem value="EXTERNAL">Externo</MenuItem>
                        <MenuItem value="EXTENDED">Extendido</MenuItem>
                </Select>
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={style.submit}
                    classes={{ disabled: classes.disabledButton }}
                    onClick={isSearch ? getProfiles : saveProfileBtn}
                    // disabled={validationForm()}
                    disableElevation
                >
                    {isSearch ? 'CONSULTAR' : 'GUARDAR'}
              </Button>
              { message.open && <Snackbars severity={message.type} fontColor={message.fontColor} message={message.text}/>}
            </form>
        </div>
    );
};

export default ProfileForm;
