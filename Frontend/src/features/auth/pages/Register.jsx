import React, { useState } from 'react'
import { Link } from 'react-router'
import "../styles/form.scss"
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'


const Register = () => {

  const { user, loading, handleRegister } = useAuth()

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await handleRegister(username, email, password)
    console.log("user registered")
    navigate('/')

  }

  if (loading) {
    return (<main><h1>Loading....</h1></main>)
  }


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setusername(e.target.value)
            }}
            type="text"
            value={username}
            placeholder='username' />

          <input
            onChange={(e) => {
              setemail(e.target.value)
            }}
            type="email"
            value={email}
            placeholder='email' />

          <input
            onChange={(e) => { setpassword(e.target.value) }}
            type="password"
            value={password}
            placeholder='Enter password' />


          <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
