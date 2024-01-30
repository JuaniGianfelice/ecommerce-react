import { useContext } from "react";
import { Link } from "react-router-dom";
import { EcommerceContext } from "../context/EcommerceContext";

const HomeContainer = () => {
    const { carrito } = useContext(EcommerceContext);
    return (
        <>
            <button><Link to={'/productos'}>Ver los productos</Link></button>
            <h2>Hola, Tenes {carrito.length} productos en tu carrito</h2>
        </>
    )
}

export default HomeContainer;