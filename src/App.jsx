import { useSelector } from 'react-redux';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import ProductsContainer from "./containers/ProductsContainers";
import { EcommerceProvider } from "./context/EcommerceContext";
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const STATE = useSelector(state => state.combineReducer);
  //const dispatch = useDispatch();

  console.log(STATE);

  return (
    <div className="App">
      <BrowserRouter>

        <EcommerceProvider>

          <Routes>

            <Route exact path="/" element={<HomeContainer />} />


            <Route exact path="/productos" element={<ProductsContainer />} />


            <Route path="/productos/:busqueda" element={<ProductsContainer />} />

          </Routes>


        </EcommerceProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;