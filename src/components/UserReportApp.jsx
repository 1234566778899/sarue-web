import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/Components';

export const UserReportApp = () => {
    const [dni, setdni] = useState('');
    const [users, setUsers] = useState([]);
    const [filter, setfilter] = useState(users);
    const findUser = () => {
        const val = users.filter(x => x.dni.includes(dni));
        setfilter(val);
    }
    useEffect(() => {
        getUsers()
    }, [])
    const getUsers = () => {
        axios.get(`${CONFIG.uri}/users/retrieve`)
            .then(x => {
                setUsers(x.data);
                setfilter(x.data);
            })
            .catch(error => {
                console.log(error);
                showInfoToast('Error on server');
            })
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
