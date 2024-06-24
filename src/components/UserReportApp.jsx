import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CONFIG } from '../config';
import '../styles/Home.css'
import { showInfoToast } from '../utils/Components';
import { useNavigate } from 'react-router-dom';
import { ConfirmDeleteApp } from './ConfirmDeleteApp';
import moment from 'moment'
export const UserReportApp = () => {
    const [dni, setdni] = useState('');
    const [users, setUsers] = useState([]);
    const [filter, setfilter] = useState(users);
    const [modalConfirm, setModalConfirm] = useState(true);
    const [userId, setuserId] = useState('')
    const [statusUser, setStatusUser] = useState(0);
    const findUser = () => {
        const val = users.filter(x => x.dni.includes(dni));
        setfilter(val);
    }
    const navigate = useNavigate();
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
    const filterStatus = () => {
        setfilter(users);
        const status = statusUser + 1 <= 2 ? statusUser + 1 : 0;
        if (status == 1 || status == 2) {
            const filtered = users.filter(x => x.active == (status == 1 ? true : false));
            setfilter(filtered);
        }
        setStatusUser(status)
    }
    return (
        <div>
            <ConfirmDeleteApp
                close={modalConfirm} userId={userId} setClose={setModalConfirm} update={getUsers} type={'users'} />
            <h1>Lista de usuarios</h1>
            <div className='search mt-5'>
                <div className='find-dni'>
                    <div>
                        <label>N° de Documento:</label>
                        <input type="text" onChange={(e) => setdni(e.target.value)} />
                    </div>
                    <button onClick={() => findUser()} className='btn btn-success ms-2'>Buscar</button>
                </div>
                <button className='btn btn-success' onClick={() => navigate('/admin/users/register')}>Registrar</button>
            </div>
            <table className='table mt-5' style={{ fontSize: '0.9rem' }}>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Fecha de registro</th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Telefono</th>
                        <th
                            onClick={() => filterStatus()}
                            className='status-user'>Estado
                            <i className="ms-2 fa-solid fa-repeat"></i>
                        </th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filter && filter.map((x, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{moment(x.createdAt).format('DD/MM/YYYY hh:mm:ss')}</td>
                                <td>{x.dni}</td>
                                <td>{x.name}</td>
                                <td>{x.lname}</td>
                                <td>{x.cellphone}</td>

                                <td>{x.active ? 'Activo' : 'No activo'}</td>
                                <td >
                                    <button style={{ fontSize: '0.8rem' }}
                                        onClick={() => navigate(`/admin/users/${x._id}`)} className='btn btn-primary'>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button style={{ fontSize: '0.8rem' }}
                                        onClick={() => { setModalConfirm(false); setuserId(x._id) }}
                                        className='btn btn-danger ms-1'><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
