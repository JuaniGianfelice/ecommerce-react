import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const InfoBarComponent = ({ totalUnidades, filtro, setFiltro, abrirCarrito }) => {
  const [busquedaML, setBusquedaML] = useState("");
  const navigate = useNavigate();

  // Hay dos busquedas distintas y conviene no confundirlas:
  //
  // 1) Esta de aca abajo le PIDE PRODUCTOS NUEVOS al servidor. Navega a
  //    /productos/:busqueda, cambia el parametro de la URL, y el useEffect
  //    del container dispara un fetch nuevo.
  const buscarEnMercadoLibre = (evento) => {
    evento.preventDefault(); // sin esto el form recarga la pagina entera
    const texto = busquedaML.trim();
    navigate(texto ? `/productos/${encodeURIComponent(texto)}` : "/productos");
  };

  // 2) La otra (el input "filtro") no pide nada: solo esconde y muestra
  //    productos que YA estan descargados. Es instantanea y funciona offline.

  return (
    <header className="barra">
      <div className="barra__contenido">
        <Link to="/" className="barra__logo">
          Mercado<span>Compras</span>
        </Link>

        <form className="barra__busqueda" onSubmit={buscarEnMercadoLibre} role="search">
          <input
            type="search"
            value={busquedaML}
            onChange={(e) => setBusquedaML(e.target.value)}
            placeholder="Buscar en Mercado Libre..."
            aria-label="Buscar en Mercado Libre"
          />
          <button type="submit" aria-label="Buscar">
            Buscar
          </button>
        </form>

        <button className="barra__carrito" onClick={abrirCarrito} aria-label="Abrir carrito">
          Carrito
          {totalUnidades > 0 && <span className="barra__contador">{totalUnidades}</span>}
        </button>
      </div>

      <div className="barra__filtro">
        <input
          type="search"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar los resultados de esta pagina"
          aria-label="Filtrar resultados"
        />
        {filtro && (
          <button className="barra__limpiar" onClick={() => setFiltro("")}>
            Limpiar
          </button>
        )}
      </div>
    </header>
  );
};

export default InfoBarComponent;
