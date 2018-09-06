import React, { Component } from 'react';
import ReactAux from '../../hoc/ReactAux';
import Burger from '../Burger/Burger';
import BuildControls from '../Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    };

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
        }
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key of Object.keys(disabledInfo)) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        return (
            <ReactAux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                />
            </ReactAux>
        );
    }
}

export default BurgerBuilder;