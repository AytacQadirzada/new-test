import React from 'react'
import Layout from './Components/Layout'
import Home from './Components/Home'
import Basket from './Components/Basket'
import Product from './Components/Product'
import {Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>
      <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="basket" element={<Basket />} />
    <Route path="product" element={<Product />} />
  </Route>
</Routes>

    </>
  )
}

export default App
