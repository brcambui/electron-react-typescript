import React, { useEffect, useState } from "react"
import { getDate } from "../../common/getDate"

import styles from "./App.module.scss"
import logo from "../public/logo192.png"

export const App: React.FC = () => {

  const [date, setDate] = useState(getDate())

  useEffect(() => {
    setTimeout(() => setDate(getDate()), 1000)
  }, [date, setDate])

  return (
    <div className={styles.app}>
      <img
        src={logo}
        alt="React logo"
      />
      <h1>Electron React Typescript</h1>
      <p>Code changes will reload the app automatically.</p>
      <pre>{date}</pre>
    </div>
  )
}
