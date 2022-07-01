import { useEffect, useState } from "react"
import Header from "./conmponents/Header"
import Modal from "./conmponents/Modal"
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import { generarId } from "./helpers"
import ListadoGastos from "./conmponents/ListadoGastos"
import Filtros from "./conmponents/Filtros"

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? [])

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [modal, setModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
    console.log(gastos);
  }, [gastos])


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  }, [filtro])


  //========================================================================================

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const guardarGasto = gasto => {

    if (gasto.id) {
      //ACTUALIZAR 
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)

    } else {
      //INSERTAR
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
      setGastoEditar({})
    }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        setIsValidPresupuesto={setIsValidPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setPresupuesto={setPresupuesto}
        presupuesto={presupuesto}
        setGastos={setGastos}
        gastos={gastos} />

      <Filtros
        filtro={filtro}
        setFiltro={setFiltro}
      />

      {
        isValidPresupuesto &&
        <>
          <main>
            <ListadoGastos
              gastosFiltrados={gastosFiltrados}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastos={gastos} />
          </main>
          <div className="nuevo-gasto">
            <img
              onClick={handleNuevoGasto}
              src={IconoNuevoGasto}
              alt='Nuevo Gasto' />
          </div>
        </>
      }

      {
        modal &&
        <Modal
          setGastoEditar={setGastoEditar}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          animarModal={animarModal}
          setModal={setModal} />
      }

    </div>
  )
}

export default App
