import React from 'react'
import {Link} from 'react-router-dom'

const OtherPage = () => {
  return (
    <div>
        <h1>Other Page</h1>
        <Link to='/'>go back home</Link>
    </div>
  )
}

export default OtherPage