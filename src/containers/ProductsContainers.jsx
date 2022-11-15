import { useContext, useEffect } from "react";
import CardComponent from "../component/CardComponent";
import { EcommerceContext } from "../context/EcommerceContext";
import InfoBarComponent from "../component/InfoBar";
import { useParams } from "react-router-dom";

const ProductsContainer = () => {
  const {products, carrito, setCarrito} = useContext(EcommerceContext);


  const {busqueda} = useParams();
  useEffect(() => {    
    return () => {
    }
  }, [busqueda]);

  const AgregarAlCarrito = (event, product) => {
    carrito.push (product);
    setCarrito([...carrito]);
    console.log(carrito);
  }

    return (
      <div className="container bg-warning">
        <InfoBarComponent carrito={carrito}/>
        <div className="row px-2 py-2">
          {products.map((element, index) => {
            return(
              <div key={index} className= "col-4">
                <CardComponent product={element} agregarAlCarrito = {AgregarAlCarrito} />
              </div>
            )
          })}          
        </div>
      </div>
    );
  };
  
  export default ProductsContainer; 