import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { H1 } from 'styles'

const Home: FC = () => {
  
  return (
    <div className="home">
      <H1>Home component</H1>
      <Link to="/atoms">Go to Atoms</Link>
      <Link to="/login">Go to Login</Link>
    </div>
  )
}

export default Home
