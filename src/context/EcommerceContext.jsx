import { createContext, useEffect, useState } from "react";

export const EcommerceContext = createContext();

export const EcommerceProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("https://api.mercadolibre.com/sites/MLA/search?q=zapas");
      const response = await data.json();
      setProducts(response.results);
    }
    fetchData(); 
  }, []);  //si no pongo [] cada vez que se cambie el estado se vuelve a actualizar y me hace un bucle infinito

  return  <EcommerceContext.Provider value={{ products, carrito, setCarrito }}>
      {children}
    </EcommerceContext.Provider>
};
