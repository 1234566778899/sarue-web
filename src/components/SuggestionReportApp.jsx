import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { CONFIG } from '../config';
import { ConfirmDeleteApp } from './ConfirmDeleteApp';

export const SuggestionReportApp = () => {
    const status = ['En espera', 'En proceso', 'Terminado'];
    const colors = ['primary', 'secondary', 'success']
    const [suggestions, setSuggestions] = useState(null);
    const [filter, setfilter] = useState(suggestions);
    const [modalConfirm, setModalConfirm] = useState(true);
    const [userId, setuserId] = useState('')
    const [type, settype] = useState('usabilidad')
    const [ascendingDate, setAscendingDate] = useState(false)
    const getSugg = () => {
        axios.get(`${CONFIG.uri}/suggestions/retrieve`)
            .then(res => {
                setSuggestions(res.data);
                setfilter(res.data);
            }).catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        getSugg()
    }, [])
    const update = (id, status) => {
        if (status >= 2) return;
        axios.put(`${CONFIG.uri}/suggestions/update/${id}`, { status: status + 1 })
            .then(res => {
                getSugg();
            }).catch(error => {
                console.log(error);
            })
    }
    const findSuggestions = () => {
        const val = suggestions.filter(x => x.type.toLowerCase().includes(type));
        setfilter(val);
    }
    const sortByDate = () => {
        if (ascendingDate) {
            const sorted = [...filter].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setfilter(sorted);
        } else {
            const sorted = [...filter].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
            setfilter(sorted);
        }
        setAscendingDate(prev => !prev)
    };
    return (
        <div>
            <ConfirmDeleteApp
                close={modalConfirm} userId={userId} setClose={setModalConfirm} update={getSugg} type={'suggestions'} />
            <h1>Reporte de Sugerencias</h1>
            <div className='search mt-5'>
                <div className='find-dni'>
                    <div>
                        <label>Tipo de sugerencia:</label>
                        <select
                            onChange={(e) => settype(e.target.value)}
                            style={{ padding: '5px', marginLeft: '10px', outline: 'none' }}>
                            <option value=""></option>
                            <option value="usabilidad">Usabilidad</option>
                            <option value="accesibilidad">Accesibilidad</option>
                            <option value="rendimiento">Rendimiento</option>
                            <option value="funcionalidad">Funcionalidad</option>
                            <option value="interfaz">Interfaz</option>

                        </select>
                    </div>
                    <button onClick={() => findSuggestions()} className='btn btn-success ms-2'>Buscar</button>
                </div>
            </div>
            <table className='table mt-5' style={{ fontSize: '0.9rem' }}>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th
                            onClick={() => sortByDate()}
                            className='head-date'
                        >Fecha<i className="fa-solid fa-sort ms-2"></i></th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filter && filter.length > 0 && filter.map((x, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{moment(x.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</td>
                                <td>{x.dni}</td>
                                <td>{x.name}</td>
                                <td>{x.lname}</td>
                                <td>{x.category}</td>
                                <td>{x.description}</td>
                                <td>
                                    <button
                                        onClick={() => update(x._id, x.status)}
                                        className={`btn btn-${colors[x.status]}`} style={{ fontSize: '0.8rem' }}>
                                        {status[x.status]}
                                    </button>
                                </td>
                                <td >
                                    <button
                                        onClick={() => { setModalConfirm(false); setuserId(x._id) }}
                                        style={{ fontSize: '0.8rem' }} className='btn btn-danger ms-1'><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            {
                filter && filter.length == 0 && <div className='text-center mt-3'>No se ha encontrado ninguna sugerencia</div>
            }
        </div>
    )
}
