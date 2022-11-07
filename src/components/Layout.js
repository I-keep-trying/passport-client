import React from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'

export const Layout = ({ children }) => {
  return (
    <div className="page">
      {' '}
      <Outlet />
    </div>
  )
}
