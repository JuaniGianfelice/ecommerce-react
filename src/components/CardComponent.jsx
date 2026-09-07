import { formatearPrecio, imagenSegura } from "../helpers/formato";

const CardComponent = ({ product, agregarAlCarrito, enElCarrito }) => {
  const envioGratis = product.shipping && product.shipping.free_shipping;
  const sinStock = product.available_quantity === 0;

  return (
    <article className="producto-card">
      <div className="producto-card__imagen">
        <img src={imagenSegura(product.thumbnail)} alt={product.title} loading="lazy" />
        {envioGratis && <span className="etiqueta etiqueta--envio">Envio gratis</span>}
      </div>

      <div className="producto-card__cuerpo">
        <p className="producto-card__precio">{formatearPrecio(product.price)}</p>

        <h3 className="producto-card__titulo" title={product.title}>
          {product.title}
        </h3>

        <p className="producto-card__meta">
          {product.condition === "new" ? "Nuevo" : "Usado"}
          {product.available_quantity > 0 && ` · ${product.available_quantity} disponibles`}
        </p>

        <button
          className="boton boton--primario"
          onClick={() => agregarAlCarrito(product)}
          disabled={sinStock}
        >
          {enElCarrito > 0 ? `En el carrito (${enElCarrito})` : "Agregar al carrito"}
        </button>
      </div>
    </article>
  );
};

export default CardComponent;
