
import { createContext } from "react/cjs/react.production.min";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
});


export default CartContext;