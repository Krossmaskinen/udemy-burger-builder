import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];

    if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.HasError);
    }

    switch (props.elementType) {
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case 'input':
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
