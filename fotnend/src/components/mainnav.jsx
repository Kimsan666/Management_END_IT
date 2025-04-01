import React from 'react'
import { Link } from 'react-router-dom'

const mainnav = () => {
  return (
    <nav>
        <div className='flex h-16 bg-violet-300 items-center gap-4 mx-auto px-4'>
            <Link to="/" className='text-2xl font-bold'>LOGO</Link>
            <Link to="/user">Home</Link>
            <Link to="/user">Shop</Link>
            <Link to="/user/cart">Cart</Link>
        </div>
    </nav>
  )
}

export default mainnav