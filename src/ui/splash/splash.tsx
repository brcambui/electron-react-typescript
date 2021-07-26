import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'

import './splash.scss'
import logo from '../../assets/logo.svg'
import AppInfo from '../../models/app-info'

const Splash: React.FC = () => {

  const [appInfo, setAppInfo] = useState<AppInfo>(new AppInfo(false, ``))

  useEffect(() => {
    // Requesting build info.
    ipcRenderer.send(`app-info`)
  }, [])

  // Getting build info.
  ipcRenderer.on(`app-info`, (evt, _appInfo: AppInfo) => {
    setAppInfo(_appInfo)
  })

  return (
    <div className="Splash">
      <header className="Splash-header">
        <img src={logo} className="Splash-logo" alt="logo" />
        <h1 className="Splash-title">Loading...</h1>
        <p className="Splash-intro">
          <small>
            {appInfo.isDev ? `Development` : `Production`} build {appInfo.version}
          </small>
        </p>
      </header>
    </div>
  )
}

export default Splash