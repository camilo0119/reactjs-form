import React, { memo, useEffect } from 'react';
import MaterialTable from 'material-table';
import active_circle from "../../images/icons/circle_active.svg"
import inactive_circle from "../../images/icons/circle_inactive.svg"
import "./tableProfileStyle.css"

const ProfileTable = memo(({dataTable}) => {
    const [state, setState] = React.useState({
        columns: [
            { title: 'ID', field: 'id' },
            { title: 'Nombre Perfil', field: 'name' },
            { title: 'Descripción', field: 'description' },
            { title: 'Estado Perfil', field: 'status', render: rowData => (
                rowData.status === "A" ?
                <p><img src={active_circle} width="10px"/> Activo</p>
                :
                <p><img src={inactive_circle} width="10px"/> Inactivo</p>
            ) },
            { title: 'Vigencia Inicial', field: 'initialDate' },
            { title: 'Vigencia Final', field: 'finalDate' },
            { title: 'Fecha registro', field: 'createdDate' },
            { title: 'Dominio', field: 'domain', render: rowData => (
                getDomainName(rowData.domain)
            ) },
            { title: 'Usuario', field: 'createdBy' },
        ]
    });

    useEffect(() => {
        console.log('Se renderizo table')
    }, [])

    const getDomainName = (name) => {
        switch (name) {
            case 'PRIVATE':
                return 'Privado'
                break
            case 'EXTERNAL':
                return 'Externo'
                break
            case 'EXTENDED':
                return 'Extendido'
                break
        }
    }

    return (
        <MaterialTable
            columns={state.columns}
            data={dataTable}
            style={{ marginBottom: "95px", marginTop: "16px", marginRight: "5px", width: "100%" }}
            options={{ actionsColumnIndex: -1, search:false, toolbar: false }}
            localization={{
                header: {
                    actions: 'Acciones'
                },
                toolbar: {
                    searchTooltip: 'Buscar',
                    searchPlaceholder: 'Buscar'
                },
                body: {
                    emptyDataSourceMessage: <div><p className="not-found-text">No se encontraron resultados</p></div>
                }
            }}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
})

export default ProfileTable;