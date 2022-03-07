import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App.js'


function LoginPage() {
  const API = process.env.REACT_APP_API
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const fetchedCredentials = await axios.post(`${API}/login/`, { username: username, password: password })
      console.log('fetchedCredentials', fetchedCredentials)
      const currentUser = await axios.get(`${API}/users/${username}`)
      console.log('currentUser', currentUser)
      setCurrentUser(currentUser.data)
      if (currentUser.data.is_superuser) { navigate("/admin/orders") }
      else { navigate("/") }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  return (
    <div style={{height:'90vh'}}>
      <div style={{ width: "100%", maxWidth: "330px", padding: "15px", margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src="/shopiify_icon.png" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="enter username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating">
            <input type="password" autoComplete="on" className="form-control" id="floatingPassword" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

        </form>
        
        <a href='/signup' >
          Create a new account here
        </a>
      </div>
    </div >
  );
}

export default LoginPage;
