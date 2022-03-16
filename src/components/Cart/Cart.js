import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import {useContext} from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { useState } from 'react';





const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const [isCheckout, setIsCheckout] = useState(false)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id =>{
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = item =>{
        const cartItem = { ...item, amount: 1 };
        cartCtx.addItem(cartItem)
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }


    const cartItems = 
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item)=>{
                return <li>
                    <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>
                </li>})}
        </ul>;

    const modalActions = 
        
            <div className={classes.actions}>
                {hasItems && <button className={classes['button--alt']} onClick={props.onClose}>Close</button>}
                <button className={classes['button']} onClick={orderHandler}>Order</button>
            </div>


    
    return(
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>
                    Total Amount
                </span>
                <span>
                    {totalAmount}
                </span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
            

        </Modal>
    )
}

export default Cart;