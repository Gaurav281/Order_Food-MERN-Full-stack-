/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          Quantity: action.Quantity,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      return state.filter((item, index) => index !== action.index);
    case "UPDATE":
      return state.map((item, index) => {
        if (index === action.index) {
          return {
            ...item,
            Quantity: action.Quantity,
            price: action.price,
          };
        }
        return item;
      });
    case "DROP":
      return [];
    default:
      console.log("Error in Reducer");
      return state;
  }
};
// state.filter((item, index) => index !== action.index);
// case "REMOVE":
//   let newState = [...state];
//   newState.splice(action.index, 1);
//   return newState;

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;

export const UseCart = () => useContext(CartStateContext);
export const UseDispatchCart = () => useContext(CartDispatchContext);
