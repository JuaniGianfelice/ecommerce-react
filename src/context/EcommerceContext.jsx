import { createContext, useState } from "react";

export const EcommerceContext = createContext();

// Endpoint de Mercado Libre. Hoy devuelve 403 porque ML cerro el acceso
// publico y pide un token OAuth, pero lo dejamos porque es la fuente "real"
// del proyecto. Si algun dia vuelve a abrirse, esto funciona solo.
const API_MERCADOLIBRE = "https://api.mercadolibre.com/sites/MLA/search";

// Catalogo de respaldo. Vive en public/, asi que React lo sirve desde la raiz.
// Tiene exactamente la misma forma que la respuesta de ML ({ results: [...] })
// para que el resto de la app no se entere de cual de los dos esta usando.
const CATALOGO_LOCAL = process.env.PUBLIC_URL + "/productos.json";

export const EcommerceProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Una peticion tiene tres estados, no uno: cargando, salio bien, fallo.
  // Si no los modelas, el usuario ve una pantalla en blanco y no sabe
  // si esta esperando o si se rompio todo.
  const [cargando, setCargando] = useState(false);
  const [aviso, setAviso] = useState(null);

  async function fetchData(searchQuery) {
    // Sin este valor por defecto, entrar a /productos (sin :busqueda) armaba
    // la URL "?q=undefined" y buscaba literalmente la palabra "undefined".
    const query = searchQuery || "tecnologia";

    setCargando(true);
    setAviso(null); // limpiar el aviso viejo, si no queda pegado de la busqueda anterior

    try {
      const respuesta = await fetch(`${API_MERCADOLIBRE}?q=${encodeURIComponent(query)}`);

      // OJO, esto es lo importante: fetch NO tira error cuando el servidor
      // responde 403 o 404. Solo rechaza si no pudo llegar al servidor.
      // Un "403 forbidden" para fetch es una respuesta exitosa, porque la
      // comunicacion funciono. Hay que mirar respuesta.ok a mano.
      if (!respuesta.ok) {
        throw new Error(`Mercado Libre respondio ${respuesta.status}`);
      }

      const datos = await respuesta.json();

      // Ultima red de seguridad: si el 200 viniera sin "results",
      // setProducts(undefined) reventaria el .map() del render.
      if (!Array.isArray(datos.results)) {
        throw new Error("La respuesta no trae la lista de productos");
      }

      setProducts(datos.results);
    } catch (fallaDeLaApi) {
      console.warn("No se pudo usar la API de ML:", fallaDeLaApi.message);

      // Plan B: el catalogo guardado en el proyecto.
      try {
        const respaldo = await fetch(CATALOGO_LOCAL);
        if (!respaldo.ok) {
          throw new Error("Tampoco se pudo leer el catalogo local");
        }
        const datos = await respaldo.json();

        // El respaldo es un archivo fijo, asi que el filtrado por la busqueda
        // lo hacemos aca a mano para imitar lo que haria el servidor.
        const encontrados = datos.results.filter((producto) =>
          producto.title.toLowerCase().includes(query.toLowerCase())
        );

        // Si la busqueda no matchea nada del catalogo chico, mostramos todo
        // en vez de dejar la pantalla vacia.
        setProducts(encontrados.length > 0 ? encontrados : datos.results);
        setAviso(
          "La API de Mercado Libre no esta respondiendo (pide autenticacion). " +
          "Estas viendo el catalogo de ejemplo guardado en el proyecto."
        );
      } catch (fallaDelRespaldo) {
        console.error(fallaDelRespaldo);
        setProducts([]);
        setAviso("No se pudieron cargar los productos. Revisa tu conexion e intenta de nuevo.");
      }
    } finally {
      // finally corre pase lo que pase. Si el setCargando(false) estuviera solo
      // dentro del try, al fallar te quedaba el spinner girando para siempre.
      setCargando(false);
    }
  }

  // --- Carrito -------------------------------------------------------------
  // Cada item es { producto, cantidad }. Antes el carrito guardaba el producto
  // suelto y repetido, por eso no habia forma de mostrar "x3" ni un total.

  const agregarAlCarrito = (producto) => {
    const yaEstaEnElCarrito = carrito.find((item) => item.producto.id === producto.id);

    if (yaEstaEnElCarrito) {
      // map devuelve un array nuevo. Nunca hay que hacer carrito.push(...):
      // eso muta el estado y React no se entera de que algo cambio, porque
      // compara si la referencia del array es la misma (y lo es).
      setCarrito(
        carrito.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { producto, cantidad: 1 }]);
    }
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(
      carrito
        .map((item) =>
          item.producto.id === id ? { ...item, cantidad: item.cantidad + delta } : item
        )
        // si la cantidad llego a 0, el producto se va del carrito solo
        .filter((item) => item.cantidad > 0)
    );
  };

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.producto.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  // reduce recorre el array acumulando un solo valor. El 0 del final es el
  // valor inicial del acumulador (y evita que reduce reviente con array vacio).
  const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const totalPrecio = carrito.reduce(
    (suma, item) => suma + item.producto.price * item.cantidad,
    0
  );

  return (
    <EcommerceContext.Provider
      value={{
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
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
