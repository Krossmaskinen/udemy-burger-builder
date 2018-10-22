import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders'

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (e) => {
        e.preventDefault();

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Bill Kurtson',
                address: {
                    street: 'street 1',
                    zipCode: '12435',
                    country: 'Sweden'
                },
                email: 'test@test.com'
            },
            devileryMethod: 'fastest'
        };

        this.setState({loading: true});

        axios.post('orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
                console.error(error);
            });
        }

    render() {
        let form = (
            <form>
                <input className={classes.input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.input} type="text" name="street" placeholder="Street" />
                <input className={classes.input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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
