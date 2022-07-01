import { useEffect, useState } from 'react'
import ImgCerrar from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('')

    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
        }
    }, [])


    const handleClose = () => {
        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
            setGastoEditar({})
        }, 500)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000)

            return
        }

        guardarGasto({ fecha, id, nombre, cantidad: Number(cantidad), categoria })
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    onClick={handleClose}
                    src={ImgCerrar}
                    alt='cerrar' />
            </div>

            <form
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}>

                <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>

                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor='nombre'>Nombre Gasto</label>
                    <input
                        onChange={e => setNombre(e.target.value)}
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        id='nombre'
                        type='text'
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>
                    <input
                        onChange={e => setCantidad(e.target.value)}
                        placeholder='Cantidad'
                        id='cantidad'
                        value={cantidad}
                        type='number'
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='categoria'>Categoría</label>
                    <select
                        onChange={e => setCategoria(e.target.value)}
                        value={categoria}
                        id='categoria'>
                        <option value=''>-- Seleccione --</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='casa'>Casa</option>
                        <option value='gastos'>Gastos Varios</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>

                    <input
                        value={gastoEditar.nombre ? 'Editar gasto' : 'Añadir gasto'}
                        type='submit' />

                </div>

            </form>
        </div>
    )
}

export default Modal