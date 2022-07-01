import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"

const Header = ({ presupuesto, setPresupuesto, setIsValidPresupuesto, isValidPresupuesto, gastos, setGastos }) => {

    return (

        <header>

            <h1>Planificador de Gastos</h1>

            {
                isValidPresupuesto
                    ? <ControlPresupuesto
                        setIsValidPresupuesto={setIsValidPresupuesto}
                        setPresupuesto={setPresupuesto}
                        presupuesto={presupuesto}
                        setGastos={setGastos}
                        gastos={gastos} />
                    : <NuevoPresupuesto
                        setIsValidPresupuesto={setIsValidPresupuesto}
                        isValidPresupuesto={isValidPresupuesto}
                        setPresupuesto={setPresupuesto}
                        presupuesto={presupuesto} />
            }

        </header>
    )
}

export default Header