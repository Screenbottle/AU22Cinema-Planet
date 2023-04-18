import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import responseExample from './responseExample'
import Video from './components/Video'

function App() {
  const linkArray = [];
  const [content, setContent] = useState(null)
  // get a response from the API using the get movie video method
  // https://developers.themoviedb.org/3/movies/get-movie-videos
  // https://api.themoviedb.org/3/movie/76600/videos?api_key=<<api_key>>&language=en-US 
  // filter out only the videos that are both stored on youtube and that are trailers
  // loop trough the data and check if the video site attribute === Youtube and that the type attribute === Trailer
  // the useEffect code will be run twice if the dev server is set to strict, will not appear in the final build
  useEffect(() => {
    responseExample.results.forEach(video => {
      if (video.site === "YouTube" && video.type === "Trailer") {
        const key = video.key
  
        const link = `https://www.youtube.com/embed/${key}`
        linkArray.push(link)
      }

    });

    console.log(linkArray);
    const videoArray = [];
    linkArray.forEach(link => {
      const embeddedVideo = (
        <div>
          <Video link={link}/>
        </div>
      )
      videoArray.push(embeddedVideo);
      
    });
    setContent(videoArray);
    console.log(videoArray);
  }, [])

  // Example of API response data for one video: 
  /* 
  const data = {
    "iso_639_1": "en",
    "iso_3166_1": "US",
    "name": "Official Teaser Trailer",
    "key": "a8Gx8wiNbs8",
    "site": "YouTube",
    "size": 1080,
    "type": "Trailer",
    "official": true,
    "published_at": "2022-05-09T14:00:00.000Z",
    "id": "627921d29979d234ffdf01ef"
  };

  // get the video key from the data
  const key = data.key;
  
  // construct your link
  const link = `https://www.youtube.com/embed/${key}`; */





  return (
    <div className="App">
       {content}
    </div>
  )
}

export default App
