import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import ProductsContainer from "./containers/ProductsContainers";
import { EcommerceProvider } from "./context/EcommerceContext";

// Nota: el useSelector que estaba aca leia state.combineReducer, una key que
// nunca existio (el reducer se llama cartReducer), asi que devolvia undefined.
// El estado de la app lo maneja el Context; la carpeta redux/ queda como
// referencia de lo que vimos en clase, pero no esta conectada a nada.

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <EcommerceProvider>
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/productos" element={<ProductsContainer />} />
            <Route path="/productos/:busqueda" element={<ProductsContainer />} />
          </Routes>
        </EcommerceProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
