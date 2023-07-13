export const INIT_STATE = {
  cart: [],
};

export const cartReducer = (state = INIT_STATE, action) => {
  //switch: estructura de control que permite tomar decisiones basadas en el valor de una expresión.
  //usamos "switch" para no poner tantos condicionales dependiendo el caso.
  switch (action.type) {
    case "PUSH NEW PRODUCT":
      if (action.payload) {
        // validar stock
        console.log("existe");
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};
