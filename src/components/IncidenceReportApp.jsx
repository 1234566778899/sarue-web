import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/Components';
import moment from 'moment';
import { ConfirmDeleteApp } from './ConfirmDeleteApp';

export const IncidenceReportApp = () => {
    const status = ['En espera', 'En proceso', 'Terminado'];
    const colors = ['primary', 'secondary', 'success'];
    const [incidences, setIncidences] = useState(null)
    const [filter, setfilter] = useState([]);
    const [incidence, setincidence] = useState('')
    const [modalConfirm, setModalConfirm] = useState(true);
    const [userId, setuserId] = useState('')
    useEffect(() => {
        getIncidences()
    }, [])
    const getIncidences = () => {
        axios.get(`${CONFIG.uri}/alerts/retrieve`)
            .then(x => {
                setIncidences(x.data);
                setfilter(x.data);
            })
            .catch(error => {
                showInfoToast('Error en el servidor');
            })
    }
    const findSuggestions = () => {
        const val = incidences.filter(x => x.incidence.includes(incidence));
        setfilter(val);
    }
    const updateState = (id, status) => {
        if (status == 2) return;
        axios.put(`${CONFIG.uri}/alerts/update/${id}`, { status: status + 1 })
            .then(res => {
                showInfoToast('Estado actualizado');
                const _incidences = filter.map(x =>
                    x._id == id ? { ...x, status: status + 1 } : x
                );
                setfilter(_incidences)
            }).catch(error => {
                console.log(error);
            })
    }
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
                            onChange={(e) => setincidence(e.target.value)}
                            style={{ padding: '5px', marginLeft: '10px', outline: 'none' }}>
                            <option value=""></option>
                            <option value="ambulancia">Ambulancia</option>
                            <option value="policia">Policia</option>
                            <option value="bomberos">Bomberos</option>
                        </select>
                    </div>
                    <button onClick={() => findSuggestions()} className='btn-main ms-2'>Buscar</button>
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
                                        onClick={() => { setModalConfirm(false); setuserId(x._id) }}
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
    )
}
