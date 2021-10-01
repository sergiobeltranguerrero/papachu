import React from 'react'
import NavBar from './NavBar'

const Home = () => {
  return (
    <div>
      <NavBar/>
      <h1>Hola!</h1>
      <iframe src="https://giphy.com/embed/fPSxQDOJ7bGso" width="480" height="208" frameBorder="0"
              className="giphy-embed" allowFullScreen/>
    </div>
  )
}

export default Home
