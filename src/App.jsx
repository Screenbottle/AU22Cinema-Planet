import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initializeApp } from "firebase/app";

function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA63z_hiERVvdwqjaFzotvDSv4i2khRX4c",
    authDomain: "au22cinema-planet.firebaseapp.com",
    projectId: "au22cinema-planet",
    storageBucket: "au22cinema-planet.appspot.com",
    messagingSenderId: "271914838545",
    appId: "1:271914838545:web:4851c4d8fc1a38eaa5dfb0"
  };

  const [app, setApp] = useState(null)

  useEffect(() => {
    setApp(initializeApp(firebaseConfig));
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
