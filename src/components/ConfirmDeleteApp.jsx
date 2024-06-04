import React from 'react'
import '../styles/ConfirmDelete.css'
import axios from 'axios'
import { CONFIG } from '../config'
export const ConfirmDeleteApp = ({ setClose, close, userId, update, type }) => {

    const deleteUser = () => {
        axios.delete(`${CONFIG.uri}/${type}/delete/${userId}`)
            .then(res => {
                update();
                setClose(true);
            }).catch(error => {
                console.log(error);
            })
    }
    return !close && (
        <div className='confirm-delete'>
            <div>
                <h2 className='text-center'>¿Estas seguro de eliminar?</h2>
                <div className='mt-5 d-flex justify-content-between px-5'>
                    <button onClick={() => setClose(true)} className='btn btn-danger'>Cancelar</button>
                    <button onClick={() => deleteUser()} className='btn btn-primary'>Aceptar</button>
                </div>
            </div>
        </div>
    )
}
