import React, { useEffect, useState } from "react";

import styles from "./App.module.scss";
import icon from "./icon.png";
import getDate from "@/common/getDate";

const App: React.FC = () => {
  const [commonDate, setCommonDate] = useState(getDate());
  const [preloadDate, setPreloadDate] = useState(window.getDate());

  useEffect(() => {
    setTimeout(() => setCommonDate(getDate()), 1000);
    setTimeout(() => setPreloadDate(window.getDate()), 1000);
  }, [commonDate, setCommonDate]);

  return (
    <div className={styles.app}>
      <img
        src={icon}
        alt="React logo"
      />
      <h1>Electron React Typescript</h1>
      <p>Code changes will reload the app automatically.</p>
      <br />
      <pre>From /@/common/getDate.ts: {commonDate}</pre>
      <pre>From preload.js: {preloadDate}</pre>
    </div>
  );
};

export default App;