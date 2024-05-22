import React, { useState } from 'react'

export const SuggestionReportApp = () => {
    const status = ['En espera', 'En proceso', 'Terminado'];

    const [suggestions, setSuggestions] = useState([
        {
            createdAt: '61126847',
            dni: '61126847',
            name: 'Juan',
            lname: 'Perez Tello',
            type: 'Usabilidad',
            description: 'El botón para guardar mis datos no está funcionando muy bien.',
            status: '0',
        },
        {
            createdAt: '52213789',
            dni: '52213789',
            name: 'Maria',
            lname: 'Gomez Flores',
            type: 'Accesibilidad',
            description: 'La fuente de la página es muy pequeña y difícil de leer.',
            status: '1',
        },
        {
            createdAt: '41326890',
            dni: '41326890',
            name: 'Carlos',
            lname: 'Martinez Lopez',
            type: 'Rendimiento',
            description: 'La aplicación se vuelve lenta cuando se cargan muchos datos.',
            status: '2',
        },
        {
            createdAt: '78451234',
            dni: '78451234',
            name: 'Luisa',
            lname: 'Sanchez Rios',
            type: 'Funcionalidad',
            description: 'La búsqueda no arroja resultados precisos.',
            status: '0',
        },
        {
            createdAt: '65987321',
            dni: '65987321',
            name: 'Jose',
            lname: 'Diaz Morales',
            type: 'Interfaz',
            description: 'Los colores de la interfaz no son agradables a la vista.',
            status: '1',
        },
        {
            createdAt: '78412356',
            dni: '78412356',
            name: 'Ana',
            lname: 'Ramirez Cruz',
            type: 'Usabilidad',
            description: 'Es difícil encontrar la opción de configuración.',
            status: '2',
        },
        {
            createdAt: '32145678',
            dni: '32145678',
            name: 'Pedro',
            lname: 'Nuñez Vega',
            type: 'Accesibilidad',
            description: 'No hay soporte para lectores de pantalla.',
            status: '0',
        },
        {
            createdAt: '98765432',
            dni: '98765432',
            name: 'Carmen',
            lname: 'Castro Fernandez',
            type: 'Rendimiento',
            description: 'La aplicación se congela al subir archivos grandes.',
            status: '1',
        },
        {
            createdAt: '54321678',
            dni: '54321678',
            name: 'Jorge',
            lname: 'Alvarez Castillo',
            type: 'Funcionalidad',
            description: 'El sistema no permite editar los datos una vez guardados.',
            status: '2',
        },
        {
            createdAt: '87654321',
            dni: '87654321',
            name: 'Elena',
            lname: 'Rodriguez Romero',
            type: 'Interfaz',
            description: 'El diseño no es intuitivo y es difícil de navegar.',
            status: '0',
        },
    ]);
    const [filter, setfilter] = useState(suggestions);
    const [type, settype] = useState('usabilidad')
    const findSuggestions = () => {
        console.log(suggestions)
        const val = suggestions.filter(x => x.type.toLowerCase().includes(type));
        setfilter(val);
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
                    <button onClick={() => findSuggestions()} className='btn-main ms-2'>Buscar</button>
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
                                <td>{x.createdAt}</td>
                                <td>{x.dni}</td>
                                <td>{x.name}</td>
                                <td>{x.lname}</td>
                                <td>{x.type}</td>
                                <td>{x.description}</td>
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
