import React, { useState } from 'react'

export const IncidenceReportApp = () => {
    const status = ['En espera', 'En proceso', 'Terminado'];
    const [incidences, setIncidences] = useState([
        {
            dni: '58912347',
            name: 'Jose',
            lname: 'Gomez Sanchez',
            incidence: 'Robo',
            direction: 'Av. Arequipa 2345 Lince, Lima, Perú',
            createdAt: '16-05-2024',
            status: '2',
        },
        {
            dni: '69874512',
            name: 'Ana',
            lname: 'Diaz Flores',
            incidence: 'Incendio',
            direction: 'Jr. Puno 321 Breña, Lima, Perú',
            createdAt: '15-05-2024',
            status: '2',
        },
        {
            dni: '78912354',
            name: 'Pedro',
            lname: 'Morales Vega',
            incidence: 'Accidente de tráfico',
            direction: 'Av. Universitaria 876 San Miguel, Lima, Perú',
            createdAt: '14-05-2024',
            status: '1',
        },
        {
            dni: '89123456',
            name: 'Carmen',
            lname: 'Hernandez Rios',
            incidence: 'Robo',
            direction: 'Calle Los Olivos 456 San Borja, Lima, Perú',
            createdAt: '13-05-2024',
            status: '2',
        },
        {
            dni: '91234567',
            name: 'Jorge',
            lname: 'Vargas Castillo',
            incidence: 'Ambulancia',
            direction: 'Av. Salaverry 789 Jesús María, Lima, Perú',
            createdAt: '12-05-2024',
            status: '2',
        },
        {
            dni: '12345678',
            name: 'Laura',
            lname: 'Cruz Ramirez',
            incidence: 'Incendio',
            direction: 'Jr. Ayacucho 123 Pueblo Libre, Lima, Perú',
            createdAt: '11-05-2024',
            status: '1',
        },
        {
            dni: '23456789',
            name: 'Ricardo',
            lname: 'Mendoza Soto',
            incidence: 'Accidente de tráfico',
            direction: 'Av. Angamos 234 Surquillo, Lima, Perú',
            createdAt: '10-05-2024',
            status: '2',
        },
        {
            dni: '34567890',
            name: 'Patricia',
            lname: 'Reyes Figueroa',
            incidence: 'Robo',
            direction: 'Calle Los Cedros 345 La Molina, Lima, Perú',
            createdAt: '09-05-2024',
            status: '2',
        },
        {
            dni: '45678901',
            name: 'Roberto',
            lname: 'Campos Nuñez',
            incidence: 'Ambulancia',
            direction: 'Av. Benavides 456 Surco, Lima, Perú',
            createdAt: '08-05-2024',
            status: '1',
        }
    ])
    const [filter, setfilter] = useState(incidences);
    const [dni, setdni] = useState('')
    const findSuggestions = () => {
        const val = incidences.filter(x => x.dni.includes(dni));
        setfilter(val);
    }
    return (
        <div>
            <h1>Reporte de incidencias</h1>
            <div className='search mt-5'>
                <div className='find-dni'>
                    <div>
                        <label>N° de Documento:</label>
                        <input type="text" onChange={(e) => setdni(e.target.value)} />
                    </div>
                    <button onClick={() => findSuggestions()} className='btn-main ms-2'>Buscar</button>
                </div>
            </div>
            <table className='table mt-5'>
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
                        filter.map((x, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{x.dni}</td>
                                <td>{x.name}</td>
                                <td>{x.lname}</td>
                                <td>{x.incidence}</td>
                                <td>{x.direction}</td>
                                <td>{x.createdAt}</td>
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
