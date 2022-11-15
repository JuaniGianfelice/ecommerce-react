import { Link } from "react-router-dom"

const InfoBarComponent = ({carrito, children}) => {
    return(
        <div className="bg-white py-4">
            <Link to={'/'}>Ir a la home</Link>
            <br />
            Elementos en el carrito: {carrito.length}
            {children}
        </div>  
    )
}

export default InfoBarComponent;