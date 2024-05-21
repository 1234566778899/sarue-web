import React, { useState } from 'react'

export const UserReportApp = () => {
    const [dni, setdni] = useState('');
    const [users, setUsers] = useState([
        {
            dni: '58912347',
            name: 'Jose',
            lname: 'Gomez Sanchez',
            cellphone: '957463742',
            isActive: true
        },
        {
            dni: '47891235',
            name: 'Luisa',
            lname: 'Torres Mendez',
            cellphone: '934567890',
            isActive: false
        },
        {
            dni: '36547892',
            name: 'Carlos',
            lname: 'Fernandez Ruiz',
            cellphone: '912345678',
            isActive: true
        },
        {
            dni: '25789461',
            name: 'Maria',
            lname: 'Lopez Garcia',
            cellphone: '976543210',
            isActive: true
        },
        {
            dni: '15867564',
            name: 'Juan',
            lname: 'Martinez Perez',
            cellphone: '945678123',
            isActive: false
        },
        {
            dni: '69874512',
            name: 'Ana',
            lname: 'Diaz Flores',
            cellphone: '987654321',
            isActive: true
        },
        {
            dni: '78912354',
            name: 'Pedro',
            lname: 'Morales Vega',
            cellphone: '923456789',
            isActive: true
        },
        {
            dni: '89123456',
            name: 'Carmen',
            lname: 'Hernandez Rios',
            cellphone: '965432198',
            isActive: false
        },
        {
            dni: '91234567',
            name: 'Jorge',
            lname: 'Vargas Castillo',
            cellphone: '956789012',
            isActive: true
        },
        {
            dni: '12345678',
            name: 'Laura',
            lname: 'Cruz Ramirez',
            cellphone: '934567812',
            isActive: true
        },
    ]);
    const [filter, setfilter] = useState(users);
    const findUser = () => {
        const val = users.filter(x => x.dni.includes(dni));
        setfilter(val);
    }
    return (
        <div>
            <h1>Lista de usuarios</h1>
            <div className='search mt-5'>
                <div className='find-dni'>
                    <div>
                        <label>N° de Documento:</label>
                        <input type="text" onChange={(e) => setdni(e.target.value)} />
                    </div>
                    <button onClick={() => findUser()} className='btn-main ms-2'>Buscar</button>
                </div>
                <button className='btn-main'>Registrar</button>
            </div>
            <table className='table mt-5'>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Telefono</th>
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
                                <td>{x.cellphone}</td>

                                <td>{x.isActive ? 'Activo' : '-'}</td>
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
