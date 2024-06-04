import moment from 'moment';
import React, { useState } from 'react'

export const SuggestionReportApp = () => {
    const status = ['En espera', 'En proceso', 'Terminado'];
    const colors = ['primary', 'secondary', 'success']
    const [suggestions, setSuggestions] = useState([
        {
            _id: 1,
            createdAt: new Date('2023-08-22'),
            dni: '61126847',
            name: 'Juan',
            lname: 'Perez Tello',
            type: 'Usabilidad',
            description: 'El botón para guardar mis datos no está funcionando muy bien.',
            status: 0,
        },
        {
            _id: 2,
            createdAt: new Date('2023-08-22'),
            dni: '52213789',
            name: 'Maria',
            lname: 'Gomez Flores',
            type: 'Accesibilidad',
            description: 'La fuente de la página es muy pequeña y difícil de leer.',
            status: 1,
        },
        {
            _id: 3,
            createdAt: new Date('2023-08-22'),
            dni: '41326890',
            name: 'Carlos',
            lname: 'Martinez Lopez',
            type: 'Rendimiento',
            description: 'La aplicación se vuelve lenta cuando se cargan muchos datos.',
            status: 2,
        }
    ]);
    const [filter, setfilter] = useState(suggestions);
    const [type, settype] = useState('usabilidad')
    const findSuggestions = () => {
        console.log(suggestions)
        const val = suggestions.filter(x => x.type.toLowerCase().includes(type));
        setfilter(val);
    }
    const updateState = (id, status) => {
        if (status == 2) return;
        const _incidences = filter.map(x =>
            x._id == id ? { ...x, status: status + 1 } : x
        );
        setfilter(_incidences);
    }
    return (
        <div>
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
                        <th>Fecha</th>
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
                        filter.map((x, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{moment(x.createdAt).format('DD/MM/YYYY')}</td>
                                <td>{x.dni}</td>
                                <td>{x.name}</td>
                                <td>{x.lname}</td>
                                <td>{x.type}</td>
                                <td>{x.description}</td>
                                <td>
                                    <button
                                        onClick={() => updateState(x._id, x.status)}
                                        className={`btn btn-${colors[x.status]}`} style={{ fontSize: '0.8rem' }}>
                                        {status[x.status]}
                                    </button>
                                </td>
                                <td >
                                    <button style={{ fontSize: '0.8rem' }} className='btn btn-danger ms-1'><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
