import { useState } from 'react'
import { Articulo } from './Articulo.jsx'

function App() {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [id, setId] = useState(1)
  const [articulos, setArticulos] = useState([])

  const [comprado, setComprado] = useState(false)

  const manejarCambioNombre = (e) => {
    setNombre(e.target.value)
  }

  const manejarCambioCantidad = (e) => {
    setCantidad(e.target.value)
  }

  const agregarItem = (e) => {
    // Previene que se recargue la página al enviar el <form>
    e.preventDefault();

    // Si el texto está vacío no agrega nada
    if (nombre.trim() === '' || cantidad.trim() === '') return;

    const item = new Articulo(nombre, cantidad, id, comprado)
    setArticulos([...articulos, item])

    // Esto se ejecuta al final para no perder el estado del texto
    setId(id + 1)
    setNombre('')
    setCantidad('')
  }

  const eliminarItem = () => {
    setArticulos((articulos) =>
      articulos.filter((articulo) =>
        articulo.comprado === false
      )
    )
  }

  const marcarComprado = (id, comprado) => {
    setArticulos((articulos) =>
      articulos.map((articulo) =>
        articulo.id === id
          ? new Articulo(articulo.nombre, articulo.cantidad, articulo.id, comprado)
          : articulo
      )
    )
  }

  return (
    <>
      <div className="flex flex-col m-4 gap-2 md:flex-row">
        <form
          onSubmit={agregarItem}
          className="flex min-w-0 flex-col gap-2 sm:flex-1 sm:flex-row"
        >
          <input
            value={nombre}
            onChange={manejarCambioNombre}
            className="p-2 border rounded-md min-w-100 w-full"
            placeholder="Ingresa el alimento que deseas agregar a la lista"
            />
          <input
            value={cantidad}
            onChange={manejarCambioCantidad}
            className="p-2 border rounded-md min-w-50"
            placeholder="Ingresa la cantidad"
            />
          <button
            type="submit"
            className="rounded-md px-4 bg-black text-white"
          >
            Agregar
          </button>
        </form>

        { articulos.length > 0 &&
          <button
            className="rounded-md px-4 bg-red-500/80 text-white"
            onClick={eliminarItem}
          >
            Eliminar
          </button>
        }

        <button
          className="whitespace-nowrap rounded-md px-4 bg-red-500 text-white"
          onClick={() => setArticulos([])}
        >
          Borrar lista
        </button>
      </div>

      <div className="m-4">
        <ul>
          {articulos.map((articulo, indice) => (
            <li
              key={indice}
              className="text-black/50"
            >
              <label
                className="flex w-fit cursor-pointer items-center gap-2"
                key={articulo.id}
              >
                <input
                  type="checkbox"
                  checked={articulo.comprado}
                  onChange={(e) => marcarComprado(articulo.id, e.target.checked)}
                />
                <span>{articulo.describir()}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
