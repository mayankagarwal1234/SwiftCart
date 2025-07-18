import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Verify from './pages/Verify'
import Placeorder from './pages/Placeorder'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Toaster/>
      <Navbar/>
      <Searchbar/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/collection'element={<Collection/>}/>
        <Route path='/about'element={<About/>}/>
        <Route path='/contact'element={<Contact/>}/>
        <Route path='/product/:productId'element={<Product/>}/>
        <Route path='/cart'element={<Cart/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/place-order'element={<Placeorder/>}/>
        <Route path='/orders'element={<Orders/>}/>
        <Route path='/profile'element={<Profile/>}/>
        <Route path='/verify'element={<Verify/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
