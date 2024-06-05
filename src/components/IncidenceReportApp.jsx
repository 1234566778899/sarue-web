import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/Components';
import moment from 'moment';
import { ConfirmDeleteApp } from './ConfirmDeleteApp';

export const IncidenceReportApp = () => {
    const status = ['En espera', 'En proceso', 'Terminado'];
    const colors = ['primary', 'secondary', 'success'];
    const [incidences, setIncidences] = useState(null);
    const [filter, setFilter] = useState([]);
    const [incidence, setIncidence] = useState('');
    const [typeIncidence, setTypeIncidence] = useState('');
    const [modalConfirm, setModalConfirm] = useState(true);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        getIncidences();
    }, []);

    const getIncidences = () => {
        axios.get(`${CONFIG.uri}/alerts/retrieve`)
            .then(response => {
                setIncidences(response.data);
                setFilter(response.data);
            })
            .catch(error => {
                showInfoToast('Error en el servidor');
            });
    };

    const findSuggestions = () => {
        const filtered = incidences.filter(x => x.incidence.includes(typeIncidence));
        setFilter(filtered);
    };

    const updateState = (id, status) => {
        if (status === 2) return;
        axios.put(`${CONFIG.uri}/alerts/update/${id}`, { status: status + 1 })
            .then(() => {
                showInfoToast('Estado actualizado');
                const updatedIncidences = filter.map(x =>
                    x._id === id ? { ...x, status: status + 1 } : x
                );
                setFilter(updatedIncidences);
            }).catch(error => {
                console.log(error);
            });
    };

    const types = {
        'ambulancia': ['Emergencias médicas', 'Translado urgente a unidades especializadas', 'Atención en situaciones de emergencia en eventos públicos'],
        'policia': ['Delito de robo', 'Incidente de armas', 'Disturbios y desordenes públicos', 'Control de tráfico/Seguridad en eventos'],
        'bomberos': ['Incendios', 'Rescate y salvamento', 'Incidentes por electricidad']
    };

    return (
        <div>
            <ConfirmDeleteApp
                close={modalConfirm} userId={userId} setClose={setModalConfirm} update={getIncidences} type={'alerts'} />
            <h1>Reporte de incidencias</h1>
            <div className='search mt-5'>
                <div className='find-dni'>
                    <div>
                        <label>Incidencia:</label>
                        <select
                            onChange={(e) => {
                                if (e.target.value == "") {
                                    setIncidence(e.target.value);
                                    setTypeIncidence("");
                                } else {
                                    const selectedIncidence = e.target.value;
                                    setIncidence(selectedIncidence);
                                    setTypeIncidence(types[selectedIncidence]);
                                }
                            }}
                            style={{ padding: '5px', marginLeft: '10px', outline: 'none' }}>
                            <option value=""></option>
                            <option value="ambulancia">Ambulancia</option>
                            <option value="policia">Policia</option>
                            <option value="bomberos">Bomberos</option>
                        </select>
                        <select
                            value={typeIncidence}
                            onChange={(e) => setTypeIncidence(e.target.value)}
                            style={{ padding: '5px', marginLeft: '10px', outline: 'none' }}>
                            {
                                incidence && types[incidence].map(x => (
                                    <option key={x} value={x}>{x}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button onClick={findSuggestions} className='btn-main ms-2'>Buscar</button>
                </div>
            </div>
            <table className='table mt-5 text-center' style={{ fontSize: '0.9rem' }}>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Tipo de incidencia</th>
                        <th>Incidencia</th>
                        <th>Ubicación</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filter && filter.map((x, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{x.dni}</td>
                                <td>{x.name}</td>
                                <td>{x.lname}</td>
                                <td>{x.typeIncidence}</td>
                                <td>{x.incidence}</td>
                                <td>({x.latitude},{x.longitude})</td>
                                <td>{moment(x.createdAt).format('DD/MM/YYYY')}</td>
                                <td>
                                    <button
                                        onClick={() => updateState(x._id, x.status)}
                                        className={`btn btn-${colors[x.status]}`} style={{ fontSize: '0.8rem' }}>
                                        {status[x.status]}
                                    </button>
                                </td>
                                <td className='action'>
                                    <button
                                        onClick={() => { setModalConfirm(false); setUserId(x._id); }}
                                        style={{ fontSize: '0.8rem' }} className='btn btn-danger'>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
