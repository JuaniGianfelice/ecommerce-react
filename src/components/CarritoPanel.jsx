import { formatearPrecio, imagenSegura } from "../helpers/formato";

const CarritoPanel = ({
  abierto,
  cerrar,
  carrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
  totalPrecio,
}) => {
  if (!abierto) return null;

  return (
    <>
      {/* El fondo oscuro tambien cierra el panel al hacerle click */}
      <div className="panel-fondo" onClick={cerrar} />

      <aside className="panel">
        <div className="panel__cabecera">
          <h2>Tu carrito</h2>
          <button className="panel__cerrar" onClick={cerrar} aria-label="Cerrar carrito">
            ×
          </button>
        </div>

        {carrito.length === 0 ? (
          <div className="panel__vacio">
            <p>Todavia no agregaste nada.</p>
            <button className="boton boton--secundario" onClick={cerrar}>
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <ul className="panel__lista">
              {/* La key es el id del producto, no el indice del array.
                  Con el indice, si borras un item del medio React reusa mal
                  los componentes y se te mezclan las cantidades en pantalla. */}
              {carrito.map((item) => (
                <li key={item.producto.id} className="panel__item">
                  <img
                    src={imagenSegura(item.producto.thumbnail)}
                    alt={item.producto.title}
                  />

                  <div className="panel__item-datos">
                    <p className="panel__item-titulo">{item.producto.title}</p>
                    <p className="panel__item-precio">
                      {formatearPrecio(item.producto.price * item.cantidad)}
                    </p>

                    <div className="panel__cantidad">
                      <button
                        onClick={() => cambiarCantidad(item.producto.id, -1)}
                        aria-label="Restar uno"
                      >
                        −
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        onClick={() => cambiarCantidad(item.producto.id, 1)}
                        aria-label="Sumar uno"
                      >
                        +
                      </button>
                      <button
                        className="panel__quitar"
                        onClick={() => quitarDelCarrito(item.producto.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="panel__pie">
              <div className="panel__total">
                <span>Total</span>
                <strong>{formatearPrecio(totalPrecio)}</strong>
              </div>
              <button className="boton boton--primario boton--ancho">Finalizar compra</button>
              <button className="boton boton--texto" onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CarritoPanel;
