import React, { useState } from 'react'
import "../styles/form.scss"
import { Link } from 'react-router'

const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <input type="text" placeholder='username' />
          <input type="password" placeholder='password' />
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>

    </main>
  )
}

export default Login
