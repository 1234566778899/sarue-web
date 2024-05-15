import React from 'react'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
export const RegisterApp = () => {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form>
                        <h1>Registrarse</h1>
                        <div className='item-form'>
                            <label>DNI</label>
                            <input type="text" />
                        </div>
                        <div className='item-form'>
                            <label>Nombre(s)</label>
                            <input type="text" />
                        </div>
                        <div className='item-form'>
                            <label>Apellidos</label>
                            <input type="text" />
                        </div>
                        <div className='item-form'>
                            <label>Número de celular</label>
                            <input type="text" />
                        </div>
                        <div className='item-form'>
                            <label>Contraseña</label>
                            <input type="text" />
                        </div>
                        <button>Continuar</button>
                    </form>

                    <p className='text-center mt-5'>¿Ya tienes una cuenta? <a href="#" onClick={() => navigate('/login')}>Iniciar sesión</a></p>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}
