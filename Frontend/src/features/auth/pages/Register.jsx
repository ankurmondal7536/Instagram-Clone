import React, { useState } from 'react'
import { Link } from 'react-router'
import "../styles/form.scss"
import axios from 'axios'

const Register = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    axios.post("http://localhost:3000/api/auth/register", {
      username,
      email,
      password
    }, {
      withCredentials: true
    }).then(res => {
      console.log(res.data)
    })
    // setting placeholders as default values to avoid uncontrolled input error
    setusername("")
    setemail("")
    setpassword("")
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
