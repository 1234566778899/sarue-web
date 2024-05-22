import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/Components';
import moment from 'moment';

export const IncidenceReportApp = () => {
    const status = ['En espera', 'En proceso', 'Terminado'];
    const [incidences, setIncidences] = useState(null)
    const [filter, setfilter] = useState([]);
    const [incidence, setincidence] = useState('')
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
    return (
        <div>
            <h1>Reporte de incidencias</h1>
            <div className='search mt-5'>
                <div className='find-dni'>
                    <div>
                        <label>Tipo de incidencia:</label>
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
                                <td>{x.latitude},{x.longitude}</td>
                                <td>{moment(x.createdAt).format('DD-MM-YYYY')}</td>
                                <td>{status[x.status]}</td>
                                <td className='action'>
                                    <button><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className='ms-1'><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
