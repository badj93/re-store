import React from 'react'
import { Route, Switch } from "react-router-dom";
import HomePage from '../pages/Home'
import CartPage from '../pages/Carts'
import ShopHeader from '../shop-header/shop-header'
import './app.css'

const App = ()  => {
  return (
    <main className='container' role='main'>
      <ShopHeader numItems={5} total={210}/>
      <Switch>
        <Route path='/' exact component={ HomePage }/>
        <Route path='/cart' component={ CartPage }/>
      </Switch>
    </main>
  );
};

export default App;
