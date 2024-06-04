import axios from 'axios'
import React, { useState } from 'react'
import { CONFIG } from '../config'
import { showInfoToast } from '../utils/Components'
import { useNavigate } from 'react-router-dom'

export const UserRegisterApp = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState({
        name: '',
        lname: '',
        dni: '',
        cellphone: '',
        password: '',
        active: false
    })
    const updateUser = () => {
        axios.post(`${CONFIG.uri}/users/register`, user)
            .then(res => {
                showInfoToast('Usuario registrado');
                navigate('/admin/users')
            }).catch(error => {
                showInfoToast(error.response.data.error);
            })
    }
    return (
        <div className='container'>
            <h1 className='mt-3'>Registrar usuario</h1>
            <div className="row">
                <div className="col-md-6">
                    <table className='w-100 mt-4'>
                        <tbody>
                            <tr>
                                <td>Nombre</td>
                                <td>
                                    <input type="text" className='form-control' value={user.name}
                                        onChange={(e) => setuser(x => ({ ...x, name: e.target.value }))} />
                                </td>
                            </tr>
                            <tr>
                                <td>Apellido</td>
                                <td>
                                    <input type="text" className='form-control' value={user.lname}
                                        onChange={(e) => setuser(x => ({ ...x, lname: e.target.value }))} />
                                </td>
                            </tr>
                            <tr>
                                <td>DNI</td>
                                <td>
                                    <input type="text" className='form-control' value={user.dni}
                                        onChange={(e) => setuser(x => ({ ...x, dni: e.target.value }))} />
                                </td>
                            </tr>
                            <tr>
                                <td>N° Celular</td>
                                <td>
                                    <input type="text" className='form-control' value={user.cellphone}
                                        onChange={(e) => setuser(x => ({ ...x, cellphone: e.target.value }))} />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type="password" className='form-control' value={user.password}
                                        onChange={(e) => setuser(x => ({ ...x, password: e.target.value }))} />
                                </td>
                            </tr>
                            <tr>
                                <td>Activo</td>
                                <td>
                                    <select onChange={(e) => setuser(user => ({ ...user, active: e.target.value == 'si' ? true : false }))}
                                        value={user.active ? 'si' : 'no'} className='form-select'>
                                        <option value="si">SI</option>
                                        <option value="no">NO</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-end mt-3">
                        <button className='btn-main' onClick={() => updateUser()}>Registrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
