import React from 'react'
import Home from '../Profile/Home'
import SideBar from '../Profile/SideBar'
import { Outlet } from 'react-router-dom'
import classes from './Root.module.css'

const Root = () => {
  return (
    <div>
        <Home />
        <div className={classes.body}>
            <div className={classes.sidebar}>
                <SideBar />
            </div>
            <div className={classes.content}>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Root