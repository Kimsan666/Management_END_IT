import React from 'react'
import { Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <div>
        <h1>Main Nav</h1>
        <hr />
        <Outlet />
    </div>
  )
}

export default layout