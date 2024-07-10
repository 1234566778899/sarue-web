import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/Components';
import moment from 'moment';
import { ConfirmDeleteApp } from './ConfirmDeleteApp';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

export const IncidenceReportApp = () => {
    const status = ['En espera', 'En proceso', 'Terminado'];
    const colors = ['primary', 'secondary', 'success'];
    const [incidences, setIncidences] = useState(null);
    const [filter, setFilter] = useState([]);
    const [incidence, setIncidence] = useState('');
    const [typeIncidence, setTypeIncidence] = useState('');
    const [modalConfirm, setModalConfirm] = useState(true);
    const [userId, setUserId] = useState('');
    const [ascendingDate, setAscendingDate] = useState(false);
    const [dateFilter, setDateFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statusCount, setStatusCount] = useState(0)
    const [paginate, setPaginate] = useState(1)
    const navigate = useNavigate();
    useEffect(() => {
        getIncidences();
    }, []);

    const getIncidences = () => {
        axios.get(`${CONFIG.uri}/alerts/retrieve`)
            .then(response => {
                setIncidences(response.data);
                setFilter(response.data);
            })
            .catch(error => {
                showInfoToast('Error en el servidor');
            });
    };
    const exportToExcel = () => {
        const dataToExport = filter.map(x => ({
            DNI: x.dni,
            Nombre: x.name,
            Apellido: x.lname,
            'Tipo de incidencia': x.typeIncidence,
            Incidencia: x.incidence,
            Ubicación: `(${x.latitude}, ${x.longitude})`,
            Fecha: moment(x.createdAt).format('DD/MM/YYYY hh:mm:ss'),
            Estado: status[x.status]
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Incidencias');

        XLSX.writeFile(workbook, 'Reporte_de_Incidencias.xlsx');
    };
    const findIncidences = () => {
        let filtered = [...incidences]
        if (incidence) {
            filtered = filtered.filter(x => x.typeIncidence.includes(incidence));
        }

        if (typeIncidence) {
            filtered = filtered.filter(x => x.incidence.includes(typeIncidence));
        }
        setFilter(filtered);
    };

    const updateState = (id, status) => {
        if (status === 2) return;
        axios.put(`${CONFIG.uri}/alerts/update/${id}`, { status: status + 1 })
            .then(() => {
                showInfoToast('Estado actualizado');
                const updatedIncidences = filter.map(x =>
                    x._id === id ? { ...x, status: status + 1 } : x
                );
                setFilter(updatedIncidences);
            }).catch(error => {
                console.log(error);
            });
    };

    const sortByDate = () => {
        if (ascendingDate) {
            const sorted = [...filter].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setFilter(sorted);
        } else {
            const sorted = [...filter].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setFilter(sorted);
        }
        setAscendingDate(prev => !prev);
    };

    const applyDateFilter = () => {
        let filtered = [...incidences];
        const today = moment().startOf('day');
        const oneWeekAgo = moment().subtract(7, 'days').startOf('day');
        const oneMonthAgo = moment().subtract(1, 'month').startOf('day');

        switch (dateFilter) {
            case 'today':
                filtered = filtered.filter(x => moment(x.createdAt).isSame(today, 'day'));
                break;
            case 'week':
                filtered = filtered.filter(x => moment(x.createdAt).isAfter(oneWeekAgo));
                break;
            case 'month':
                filtered = filtered.filter(x => moment(x.createdAt).isAfter(oneMonthAgo));
                break;
            case 'range':
                if (startDate && endDate) {
                    const start = moment(startDate).startOf('day');
                    const end = moment(endDate).endOf('day');
                    filtered = filtered.filter(x => moment(x.createdAt).isBetween(start, end));
                }
                break;
            default:
                filtered = incidences;
        }

        setFilter(filtered);
    };
    const filterStatus = () => {
        let filtered = incidences.filter(x => x.status == statusCount);
        if (statusCount <= 2) {
            setFilter(filtered);
        } else {
            setFilter(incidences);
        }
        setStatusCount(prev => prev + 1 > 3 ? 0 : prev + 1);
    }
    const types = {
        'ambulancia': ['Emergencias médicas', 'Translado urgente a unidades especializadas', 'Atención en situaciones de emergencia en eventos públicos'],
        'policia': ['Delito de robo', 'Incidente de armas', 'Disturbios y desordenes públicos', 'Control de tráfico/Seguridad en eventos'],
        'bomberos': ['Incendios', 'Rescate y salvamento', 'Incidentes por electricidad']
    };

    return (
        <div>
            <ConfirmDeleteApp
                close={modalConfirm} userId={userId} setClose={setModalConfirm} update={getIncidences} type={'alerts'} />
            <h1>Reporte de incidencias</h1>
            <div className='search mt-5'>
                <div className='find-dni'>
                    <div>
                        <label>Incidencia:</label>
                        <select
                            onChange={(e) => {
                                setIncidence(e.target.value);
                                setTypeIncidence('')
                            }}
                            style={{ padding: '5px', marginLeft: '10px', outline: 'none' }}>
                            <option value="">Todos</option>
                            <option value="ambulancia">Ambulancia</option>
                            <option value="policia">Policia</option>
                            <option value="bomberos">Bomberos</option>
                        </select>
                        <select
                            value={typeIncidence}
                            onChange={(e) => setTypeIncidence(e.target.value)}
                            style={{ padding: '5px', marginLeft: '10px', outline: 'none' }}>
                            <option value=''>Todos</option>
                            {
                                incidence && types[incidence].map(x => (
                                    <option key={x} value={x}>{x}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button onClick={findIncidences} className='btn-main ms-2'>Buscar</button>
                </div>
                <div className='mt-3'>
                    <label>Filtrar por fecha:</label>
                    <select
                        onChange={(e) => setDateFilter(e.target.value)}
                        style={{ padding: '5px', marginLeft: '10px', outline: 'none' }}>
                        <option value=""></option>
                        <option value="today">Hoy</option>
                        <option value="week">Hace una semana</option>
                        <option value="month">Hace un mes</option>
                        <option value="range">Rango</option>
                    </select>
                    {
                        dateFilter === 'range' && (
                            <>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    style={{ padding: '5px', marginLeft: '10px', outline: 'none' }} />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    style={{ padding: '5px', marginLeft: '10px', outline: 'none' }} />
                            </>
                        )
                    }
                    <button onClick={applyDateFilter} className='btn-main ms-2'>Aplicar</button>
                </div>
            </div>
            <div className="text-end mt-3">
                <button onClick={exportToExcel} className='btn-main mt-3'>Exportar a Excel</button>
            </div>
            <table className='table mt-5 text-center' style={{ fontSize: '0.9rem' }}>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Tipo de incidencia</th>
                        <th>Incidencia</th>
                        <th>Ubicación</th>
                        <th
                            onClick={() => sortByDate()}
                            className='head-date'>Fecha<i className="fa-solid fa-sort ms-2"></i></th>
                        <th
                            onClick={() => filterStatus()}
                            className='head-status'>

                            Estado <i className="ms-2 fa-solid fa-repeat"></i>
                        </th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filter && filter.slice((paginate - 1) * 10, paginate * 10).map((x, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{x.dni}</td>
                                <td>{x.name}</td>
                                <td>{x.lname}</td>
                                <td>{x.typeIncidence}</td>
                                <td>{x.incidence}</td>
                                <td
                                    className='coords'
                                    onClick={() => navigate(`/admin/map/${x.latitude}/${x.longitude}`)}>({x.latitude},{x.longitude})</td>
                                <td>{moment(x.createdAt).format('DD/MM/YYYY hh:mm:ss')}</td>
                                <td>
                                    <button
                                        onClick={() => updateState(x._id, x.status)}
                                        className={`btn btn-${colors[x.status]}`} style={{ fontSize: '0.8rem' }}>
                                        {status[x.status]}
                                    </button>
                                </td>
                                <td className='action'>
                                    {
                                        x.status === 0 && (
                                            <button
                                                onClick={() => { setModalConfirm(false); setUserId(x._id); }}
                                                style={{ fontSize: '0.8rem' }} className='btn btn-danger'>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" onClick={() => setPaginate(prev => prev - 1 >= 1 ? prev - 1 : prev)}>
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {
                            Array.from({ length: Math.ceil(filter.length / 10) }, (_, idx) => (
                                <li
                                    onClick={() => setPaginate(idx + 1)}
                                    className={`page-item ${paginate == idx + 1 ? 'active' : ''}`}><a className="page-link" href="#">{idx + 1}</a></li>
                            ))
                        }
                        <li className="page-item" onClick={() => setPaginate(prev => prev + 1 <= Math.ceil(filter.length / 10) ? prev + 1 : prev)}>
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
