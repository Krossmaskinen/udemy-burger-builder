import React from 'react';
import classes from './Order.css';

const order = (props) => {
    let ingredients = [];
    let ingredientOutput;

    console.log(props);

    for (let ingredientName of Object.keys(props.ingredients)) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    ingredientOutput = ingredients.map((ingredient, index) => {
        return <span
            key={`ing-${index}`}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
        >{ingredient.name} ({ingredient.amount})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;