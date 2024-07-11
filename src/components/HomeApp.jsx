import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const HomeApp = () => {
    const navigate = useNavigate();
    const [activeOption, seTactiveOption] = useState('incidences')
    const [token, settoken] = useState('')
    useEffect(() => {
        const _token = localStorage.getItem('token');
        settoken(_token);
        if (!_token) {
            navigate('/login')
        }
    }, [])

    return token && (
        <div className="content-home">
            <div className='menu-home'>
                <img src={require('../assets/logo.png')} alt="logo" />
                <h3 className='mt-3'>SARUE</h3>
                <div className='items-menu mt-5 text-center'>
                    <p
                        className={`${activeOption == 'incidences' ? 'option-active' : ''}`}
                        onClick={() => { navigate('/admin/incidences'); seTactiveOption('incidences') }}>Incidencias</p>
                    <p
                        className={`${activeOption == 'suggestions' ? 'option-active' : ''}`}
                        onClick={() => { navigate('/admin/suggestions'); seTactiveOption('suggestions') }}>Sugerencias</p>
                    <p
                        className={`${activeOption == 'users' ? 'option-active' : ''}`}
                        onClick={() => { navigate('/admin/users'); seTactiveOption('users') }}>Usuarios</p>
                    <div>
                        <button className='btn-out' onClick={() => navigate('/login')}>Salir</button>
                    </div>
                </div>
            </div>
            <div className='body-home'>
                <Outlet />
            </div>
        </div>
    )
}
