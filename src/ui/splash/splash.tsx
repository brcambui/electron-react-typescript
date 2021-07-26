import React from 'react'
import { ipcRenderer } from 'electron'

import './splash.scss'
import logo from '../../assets/logo.svg'

export const Splash: React.FC = () => {
  return (
    <div className="Splash">
      <header className="Splash-header">
        <img src={logo} className="Splash-logo" alt="logo" />
        <h1 className="Splash-title">Loading...</h1>
        <p className="Splash-intro">
          <small>
          </small>
        </p>
      </header>
    </div>
  )
}