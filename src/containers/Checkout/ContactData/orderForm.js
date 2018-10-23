const orderForm = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Bill',
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false,
    },
    street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Street',
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false,
    },
    zipCode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Zipcode',
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 5
        },
        valid: false,
        touched: false,
    },
    country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Sweden',
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false,
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'example@mail.com',
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false,
    },
    devileryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                {
                    value: 'fastest',
                    displayValue: 'Fastest',
                },
                {
                    value: 'cheapest',
                    displayValue: 'Cheapest',
                },
            ],
        },
        value: 'fastest',
        valid: true,
    },
};


export default orderForm;
