import React, { useEffect, useState } from 'react'
import { ipcRenderer as ipc } from 'electron'

import './splash.scss'
import logo from '../../assets/logo.svg'

export const Splash: React.FC = () => {
  const [version, setVersion] = useState(``)
  const [message, setMessage] = useState(`Waiting...`)

  useEffect(() => {
    ipc.invoke(`appVersion`)
      .then(setVersion)
  }, [])

  useEffect(() => {
    ipc.on(`updateMessage`,
      (event, message) => setMessage(message)
    )
    return () => {
      ipc.removeAllListeners(`updateMessage`)
    }
  }, [])

  return (
    <div className="Splash">
      <header className="Splash-header">
        <img src={logo} className="Splash-logo" alt="logo" />
        <h1 className="Splash-title">Electron React Typescript</h1>
        <p className="Splash-intro">
          <small>
            {message}
            <br />
            v{version}
          </small>
        </p>
      </header>
    </div>
  )
}