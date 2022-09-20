import logo from './logo.svg';

import axios from "axios"
import {useEffect, useState} from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Home/Home'
import Customers from './Customers/Customers';
import WashingPrograms from './WashingPrograms/WashingPrograms';
import Program from './Program/Program';

import Orders from './Orders/Orders';
import Customer from './Customer/Customer';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/customers' element={<Customers/>}/>
        <Route path='/programs' element={<WashingPrograms/>}/>
        <Route path='/program/:id' element={<Program/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/customer/:id" element={<Customer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
