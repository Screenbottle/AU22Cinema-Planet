import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initializeApp } from "firebase/app";
import responseExample from './responseExample';

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

  // all info regarding base urls and size settings can be found with the API call for configuration
  // sizes for backdrops: "w300", "w780", "w1280", "original"
  // sizes for company logos: "w45", "w92", "w154", "w185", "w300", "w500", "original"
  // sizes for posters: "w92", "w154", "w185", "w342", "w500", "w780", "original"
  // sizes for profiles: "w45", "w185", "h632", "original"
  // sizes for stills: "w92", "w185", "w300", "original"

  // the url for an image is constructed from 3 components, the base url, the size, and the image key
  // this example function takes in the key for an image and a size, and returns a url for the image
  const createImageUrl = (key, size) => {
    const url = `http://image.tmdb.org/t/p/${size}${key}`

    return url;
  }

  


  const createImg = (url) => {
    return (
      <img src='url'/>
    )
  }

  return (
    <div className="App">
      
    </div>
  )
}

export default App
