import { useDispatch, useSelector } from 'react-redux';
import { Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import ProductsContainer from "./containers/ProductsContainers";
import { EcommerceProvider } from "./context/EcommerceContext";
import { addElementToCart } from './redux/actions/cart';
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const STATE = useSelector(state => state.combineReducer);
  const dispatch = useDispatch();

  console.log(STATE);

  return (
    <div className="App">
      <button onClick={() => { dispatch(addElementToCart({ id: 1, name: 'shirt', price: 3000 })) }}>
        Agregar al carrito
      </button>
      <Router>
        <EcommerceProvider>
          
          <Routes>

            <Route exact path="/" element={<HomeContainer/>} />


            <Route exact path="/productos" element={<ProductsContainer/>} />
              

            <Route path="/productos/:busqueda" element={<ProductsContainer/>} />

          </Routes>

                        
        </EcommerceProvider>
      </Router>
    </div>
  );
}

export default App;