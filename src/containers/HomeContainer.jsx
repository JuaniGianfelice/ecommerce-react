import { useContext } from "react";
import { Link } from "react-router-dom";
import { EcommerceContext } from "../context/EcommerceContext";

const CATEGORIAS = ["notebook", "auriculares", "teclado", "monitor", "zapatillas", "mate"];

const HomeContainer = () => {
  const { totalUnidades } = useContext(EcommerceContext);

  return (
    <div className="home">
      <section className="home__hero">
        <p className="home__kicker">Proyecto de aprendizaje · React + Context</p>
        <h1>
          Un ecommerce hecho con la API de <span>Mercado Libre</span>
        </h1>
        <p className="home__bajada">
          Buscas un producto, se traen los resultados y los vas sumando al carrito.
          Simple, pero con todas las piezas de una tienda de verdad.
        </p>

        <div className="home__acciones">
          <Link to="/productos" className="boton boton--primario boton--grande">
            Ver los productos
          </Link>
          {totalUnidades > 0 && (
            <span className="home__estado">
              Tenes {totalUnidades} {totalUnidades === 1 ? "producto" : "productos"} en el carrito
            </span>
          )}
        </div>
      </section>

      <section className="home__categorias">
        <h2>Empeza por aca</h2>
        <div className="home__chips">
          {CATEGORIAS.map((categoria) => (
            <Link key={categoria} to={`/productos/${categoria}`} className="chip">
              {categoria}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeContainer;
