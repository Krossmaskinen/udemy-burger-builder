import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders'
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text"
        },
        value: "Bill"
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text"
        },
        value: "Street"
      },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text'
            },
            value: 'Zipcode'
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text'
            },
            value: 'Sweden'
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email'
            },
            value: 'example@mail.com'
        },
        devileryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {
                        value: 'fastest',
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                    }
                ]
            },
            value: 'fastest'
        }
    },
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();

    const order = {
      ingredients: this.props.ingredients,
      price: +this.props.price
    };

    this.setState({ loading: true });

    axios
      .post("orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
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
            config: this.state.orderForm[key]
        });
    }

    let form = (
      <form>
        {formElements.map((formElement, index) => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
            />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
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
