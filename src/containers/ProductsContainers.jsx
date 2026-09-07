import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import InfoBarComponent from "../components/InfoBar";
import CarritoPanel from "../components/CarritoPanel";
import { EcommerceContext } from "../context/EcommerceContext";

const ProductsContainer = () => {
  const {
    products,
    carrito,
    cargando,
    aviso,
    fetchData,
    agregarAlCarrito,
    cambiarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
    totalUnidades,
    totalPrecio,
  } = useContext(EcommerceContext);

  const { busqueda } = useParams();

  // El texto del filtro vive aca, en su propio estado.
  const [filtro, setFiltro] = useState("");
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  useEffect(() => {
    fetchData(busqueda);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  // Cuando cambia la busqueda del servidor, el filtro local ya no tiene sentido.
  useEffect(() => {
    setFiltro("");
  }, [busqueda]);

  // ESTE ERA EL BUG GRANDE DEL BUSCADOR:
  // antes hacias setProducts(productsFilter), o sea pisabas la lista original
  // con la filtrada. Al borrar una letra los productos escondidos ya no existian
  // en ningun lado y no volvian nunca mas.
  //
  // La regla es: guarda el DATO (el texto tipeado) y CALCULA la vista en cada
  // render. La lista completa queda intacta.
  //
  // Ademas usamos includes() en vez de match(): match interpreta lo que escribis
  // como una expresion regular, asi que tipear un simple "(" te rompia la app.
  const productosFiltrados = products.filter((producto) =>
    (producto.title || "").toLowerCase().includes(filtro.toLowerCase())
  );

  // Cuantas unidades hay de cada producto, para mostrarlo en la tarjeta.
  const cantidadEnCarrito = (id) => {
    const item = carrito.find((elemento) => elemento.producto.id === id);
    return item ? item.cantidad : 0;
  };

  return (
    <div className="pagina">
      <InfoBarComponent
        totalUnidades={totalUnidades}
        filtro={filtro}
        setFiltro={setFiltro}
        abrirCarrito={() => setCarritoAbierto(true)}
      />

      <main className="contenido">
        {aviso && <p className="aviso">{aviso}</p>}

        {cargando ? (
          // Estado 1: cargando. Unos rectangulos grises con el tamaño real de
          // las tarjetas, asi el layout no salta cuando llegan los datos.
          <div className="grilla">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="producto-card producto-card--esqueleto" />
            ))}
          </div>
        ) : productosFiltrados.length === 0 ? (
          // Estado 2: no hay nada que mostrar. Antes esto era una pagina en
          // blanco y no sabias si estaba cargando o si se habia roto.
          <div className="vacio">
            <h2>No encontramos productos</h2>
            <p>
              {filtro
                ? `Ningun resultado de esta pagina contiene "${filtro}".`
                : "Proba con otra busqueda."}
            </p>
          </div>
        ) : (
          // Estado 3: hay datos.
          <>
            <p className="contenido__resumen">
              {productosFiltrados.length}{" "}
              {productosFiltrados.length === 1 ? "producto" : "productos"}
              {/* react-router ya decodifica el parametro de la URL.
                  Si le hicieramos decodeURIComponent() de nuevo, buscar algo
                  con un "%" (ej: "100%") tiraba URIError y pantalla en blanco. */}
              {busqueda && <> para <strong>{busqueda}</strong></>}
            </p>

            <div className="grilla">
              {productosFiltrados.map((producto) => (
                // key = id del producto, no el indice del map
                <CardComponent
                  key={producto.id}
                  product={producto}
                  agregarAlCarrito={agregarAlCarrito}
                  enElCarrito={cantidadEnCarrito(producto.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <CarritoPanel
        abierto={carritoAbierto}
        cerrar={() => setCarritoAbierto(false)}
        carrito={carrito}
        cambiarCantidad={cambiarCantidad}
        quitarDelCarrito={quitarDelCarrito}
        vaciarCarrito={vaciarCarrito}
        totalPrecio={totalPrecio}
      />
    </div>
  );
};

export default ProductsContainer;
