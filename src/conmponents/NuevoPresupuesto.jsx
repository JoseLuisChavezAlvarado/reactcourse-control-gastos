import { useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto, isValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault()

        //VALIDAR ENTRADA DE PRESUPUESTO
        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto válido')
            return
        }

        setMensaje('')
        setIsValidPresupuesto(true)
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">

                <div className="campo">
                    <label>Definir Presupuesto</label>
                    <input
                        onChange={e => setPresupuesto(Number(e.target.value))}
                        className="nuevo-presupuesto"
                        placeholder="Añade tu presupuesto"
                        type='number' />
                </div>

                <input
                    value='Añadir'
                    type='submit' />

                {
                    mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>
                }

            </form>
        </div>
    )
}

export default NuevoPresupuesto