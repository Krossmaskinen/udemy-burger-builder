import React, { Component } from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import Burger from '../Burger/Burger';
import BuildControls from '../Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosInstance from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://react-my-burger-d7777.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                console.error(error);
                this.setState({error: true})
            });
    }

    updatePurchaseState(updatedIngrendients) {
        const ingredients = {
            ...updatedIngrendients
        };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        this.setState({purchasable: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
            })
            .catch(error => {
                console.error(error);
            })
            .then(() => {
                this.setState({loading: false, purchasing: false});
            });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngrendients = {
            ...this.state.ingredients
        };
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        updatedIngrendients[type] = updatedCount;

        this.setState({totalPrice: newPrice, ingredients: updatedIngrendients});
        this.updatePurchaseState(updatedIngrendients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngrendients = {
                ...this.state.ingredients
            };
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            updatedIngrendients[type] = updatedCount;

            this.setState({totalPrice: newPrice, ingredients: updatedIngrendients});
            this.updatePurchaseState(updatedIngrendients);
        }
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        
        if (this.state.ingredients) {
            burger = (
                <ReactAux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                    />
                </ReactAux>
            );
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />);
        }

        for (let key of Object.keys(disabledInfo)) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <ReactAux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}                    
                </Modal>
                {burger}
            </ReactAux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);