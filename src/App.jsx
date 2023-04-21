import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Header from './components/header/Header'
import MovieList from './components/movieList/movieList'


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
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<h1>Movie</h1>} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="/*" element={<h1>Error Page</h1>} />
          
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
