import classes from './Checkout.module.css'
import {useRef, useState} from 'react';


const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;

const Checkout = props => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

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

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isSixChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;



        if(!formIsValid){
            return;
        }

        props.onConfirm({ 
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        })
    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? "":classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? "":classes.invalid}`
    const postalControlClasses = `${classes.control} ${formInputsValidity.postalCode ? "":classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? "":classes.invalid}`

    return <form onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Name</label>
            <input ref={nameInputRef} type='text' id='name'/>
            {!formInputsValidity.name && <p>Please enter a valid Name</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input ref={streetInputRef} type='text' id='street'/>
            {!formInputsValidity.street && <p>Please enter a valid Street</p>}
        </div>
        <div className={postalControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input ref={postalInputRef} type='text' id='postal'/>
            {formInputsValidity.postal && <p>Please enter a valid Postal code</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input ref={cityInputRef} type='text' id='city'/>
            {!formInputsValidity.city && <p>Please enter a valid City</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button>Submit</button>
        </div>
    </form>
}

export default Checkout;