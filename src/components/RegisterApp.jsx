import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { showInfoToast } from '../utils/Components';
export const RegisterApp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const registerUser = (data) => {
        if (!loading) {
            setLoading(true);
            axios.post('sarue.azurewebsites.net/users/register', data)
                .then(res => {
                    showInfoToast('Usuario registrado');
                    navigate('/login');
                })
                .catch(error => {
                    setLoading(false);
                    showInfoToast('Error: ' + error.response.data.error)
                    console.log(error)
                })
        }
    }
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={handleSubmit(registerUser)}>
                        <h1>Registrarse</h1>
                        <div className='item-form'>
                            <label>DNI</label>
                            <input type="text" {...register('dni', { required: true, minLength: 8, maxLength: 8 })} />
                            {errors && errors.dni && <span className='text-danger' style={{ fontSize: 13 }}>Debe ingresar 8 Dígitos</span>}
                        </div>
                        <div className='item-form'>
                            <label>Nombre(s)</label>
                            <input type="text" {...register('name', { required: true, maxLength: 20 })} />
                            {errors && errors.name && <span className='text-danger' style={{ fontSize: 13 }}>Campo obligatorio </span>}
                        </div>
                        <div className='item-form'>
                            <label>Apellidos</label>
                            <input type="text" {...register('lname', { required: true, maxLength: 20 })} />
                            {errors && errors.lname && <span className='text-danger' style={{ fontSize: 13 }}>Campo obligatorio</span>}
                        </div>
                        <div className='item-form'>
                            <label>Número de celular</label>
                            <input type="text" {...register('cellphone', { required: true, minLength: 9, maxLength: 9 })} />
                            {errors && errors.cellphone && <span className='text-danger' style={{ fontSize: 13 }}>Debe ingresar 9 Dígitos</span>}
                        </div>
                        <div className='item-form'>
                            <label>Contraseña</label>
                            <input type="text" {...register('password', { required: true, minLength: 6, maxLength: 20 })} />
                            {errors && errors.password && <span className='text-danger' style={{ fontSize: 13 }}>Minimo 6 caracteres y maximo 20</span>}
                        </div>
                        <button>{loading ? 'Cargando...' : 'Registrarse'}</button>
                    </form>

                    <p className='text-center mt-5'>¿Ya tienes una cuenta? <a href="#" onClick={() => navigate('/login')}>Iniciar sesión</a></p>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}
