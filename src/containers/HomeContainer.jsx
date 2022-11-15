import { useContext } from "react";
import { EcommerceContext } from "../context/EcommerceContext";

const HomeContainer = ()=> {
    const {carrito } = useContext(EcommerceContext);
    return <h1>Hola!! Tenees tantos productos en tu carrito: {carrito.length}</h1>
}

export default HomeContainer;