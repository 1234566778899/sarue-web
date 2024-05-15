import React from 'react'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
export const LoginApp = () => {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form>
                        <h1>Iniciar sesión</h1>
                        <div className='item-form'>
                            <label>Número de celular</label>
                            <input type="text" />
                        </div>
                        <div className='item-form'>
                            <label>Contraseña</label>
                            <input type="text" />
                        </div>
                        <button>Entrar</button>
                    </form>
                    <div className='icons'>
                        <button><i className="fa-brands fa-facebook"></i></button>
                        <button><i class="fa-brands fa-google"></i></button>
                        <button><i class="fa-brands fa-instagram"></i></button>
                    </div>
                    <p className='text-center mt-5'>¿No tienes una cuenta? <a href="#" onClick={() => navigate('/register')}>Registrate</a></p>
                    <p className='text-center mt-2'><a href="#">¿Olvidaste tu contraseña?</a></p>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}
