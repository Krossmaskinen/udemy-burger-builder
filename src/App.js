import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
        <Checkout />
      </div>
    );
  }
}

export default App;
