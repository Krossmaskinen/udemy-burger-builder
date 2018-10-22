import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        // fetch orders
        axios.get('orders.json')
            .then(response => {
                let parsedOrders = [];

                console.log(response);
                console.log(response.data);

                for (let id of Object.keys(response.data)) {
                    parsedOrders.push({
                        id,
                        ...response.data[id]
                    });
                }

                this.setState({orders: parsedOrders});
            })
            .catch(e => {
                console.log(e);
            })
            .then(() => {
                this.setState({loading: false});
            });
    }

    getOrders() {
        let orders = <Spinner />

        if (!this.state.loading) {
            orders = this.state.orders.map(order => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />;
            });
        }

        return orders;
    }

    render() {
        let orders = this.getOrders();

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
