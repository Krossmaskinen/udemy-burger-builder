import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1
        },
        price: null
    };

    getIngredientsFromQueryParams(query) {
        let queryParams = {};

        query.split('?')[1]
            .split('&')
            .forEach(param => {
                let pair = param.split('=');

                if (pair[0] !== 'price') {
                    queryParams[pair[0]] = +pair[1];
                } else {
                    this.setState({totalPrice: pair[1]});
                }
            });

        return queryParams;
    }

    componentWillMount = () => {
        this.loadIngredients();
    }

    loadIngredients = () => {
        let ingredients = this.getIngredientsFromQueryParams(this.props.location.search);
        console.log(ingredients);
        console.log(this.props);

        this.setState({ingredients});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let contactDataUrl = `${this.props.match.path}/contact-data`;

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={contactDataUrl}
                    render={(props) => (<ContactData
                                    ingredients={this.state.ingredients}
                                    price={this.state.totalPrice}
                                    {...props} />)}
                />
            </div>
        );
    }
}

export default Checkout;
