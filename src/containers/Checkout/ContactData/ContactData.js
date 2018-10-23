import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import orderForm from './orderForm';

class ContactData extends Component {
    state = {
        orderForm,
        formIsValid: false,
        loading: false,
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        let formIsValid = true;

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        for (let inputIdentifier of Object.keys(updatedOrderForm)) {
            console.log(inputIdentifier, updatedOrderForm[inputIdentifier].valid, formIsValid);

            formIsValid =
                updatedOrderForm[inputIdentifier].valid && formIsValid;

            if (!formIsValid) {
                console.warn('form is not valid');
            }
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid });
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = event => {
        let order;
        const formData = {};

        event.preventDefault();
        this.setState({ loading: true });

        for (let formElementIdentifier of Object.keys(this.state.orderForm)) {
            formData[formElementIdentifier] = this.state.orderForm[
                formElementIdentifier
            ].value;
        }

        order = {
            ingredients: this.props.ingredients,
            price: +this.props.price,
            orderData: formData,
        };

        axios
            .post('orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
                console.error(error);
            });
    };

    render() {
        const formElements = [];

        for (let key of Object.keys(this.state.orderForm)) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map((formElement, index) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valid={formElement.config.valid}
                        shouldValidate={!!formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={event =>
                            this.inputChangedHandler(event, formElement.id)
                        }
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    ORDER
                </Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
