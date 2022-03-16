import classes from './Checkout.module.css'
import {useRef} from 'react';

const Checkout = props => {

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
    }

    return <form onSubmit={confirmHandler}>
        <div className={classes.control}>
            <label htmlFor='name'>Name</label>
            <input ref={nameInputRef} type='text' id='name'/>
        </div>
        <div className={classes.control}>
            <label htmlFor='street'>Street</label>
            <input ref={streetInputRef} type='text' id='street'/>
        </div>
        <div className={classes.control}>
            <label htmlFor='postal'>Postal Code</label>
            <input ref={postalInputRef} type='text' id='postal'/>
        </div>
        <div className={classes.control}>
            <label htmlFor='city'>City</label>
            <input ref={cityInputRef} type='text' id='city'/>
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button>Submit</button>
        </div>
    </form>
}

export default Checkout;