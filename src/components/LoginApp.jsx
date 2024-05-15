import React, { useState } from 'react'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { showInfoToast } from '../utils/Components';

export const LoginApp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const login = (data) => {
        if (!loading) {
            setLoading(true)
            axios.post('sarue.azurewebsites.net/users/login', data)
                .then(res => {
                    navigate('/home');
                })
                .catch(error => {
                    showInfoToast('Error: ')
                    setLoading(false)
                    console.log(error)
                })
        }
    }
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={handleSubmit(login)}>
                        <h1>Iniciar sesión</h1>
                        <div className='item-form'>
                            <label>Número de celular</label>
                            <input type="text" {...register('cellphone', { required: true })} />
                            {errors && errors.cellphone && <span className='text-danger' style={{ fontSize: 13 }}>Campo obligatorio</span>}
                        </div>
                        <div className='item-form'>
                            <label>Contraseña</label>
                            <input type="text" {...register('password', { required: true })} />
                            {errors && errors.password && <span className='text-danger' style={{ fontSize: 13 }}>Campo obligatorio</span>}
                        </div>
                        <button>{loading ? 'Cargando...' : 'Continuar'}</button>
                    </form>
                    <div className='icons'>
                        <button><i className="fa-brands fa-facebook"></i></button>
                        <button><i className="fa-brands fa-google"></i></button>
                        <button><i className="fa-brands fa-instagram"></i></button>
                    </div>
                    <p className='text-center mt-5'>¿No tienes una cuenta? <a href="#" onClick={() => navigate('/register')}>Registrarse</a></p>
                    <p className='text-center mt-2'><a href="#">¿Olvidaste tu contraseña?</a></p>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}
