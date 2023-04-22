import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import MovieList from './components/MovieList'


import { initializeApp } from 'firebase/app'

function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: '',
    authDomain: 'your-auth-domain',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-messaging-sender-id',
    appId: 'your-app-id'
  };

  const [app, setApp] = useState(null);

  useEffect(() => {
    setApp(initializeApp(firebaseConfig));
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
        </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
