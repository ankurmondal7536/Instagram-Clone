import React, { useState } from 'react'
import { Link } from 'react-router'


const Register = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input type="text" placeholder='username' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
