import { useNavigate } from 'react-router-dom'
import {useState,} from 'react'
import axios from 'axios'

function SignupPage() {
  const API = process.env.REACT_APP_API
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleChangeUsername= async (e)=>{
    setUsername(e.target.value)
    const matchedUser = await axios.get(`${API}/users/${e.target.value}`)
    console.log("matchedUser",matchedUser.data.status)
    if (matchedUser.data.status!=='not ok'){
      alert('username has already been used, please choose another')
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const createdUser = await axios.post(`${API}/signup/`,{
        username,
        password,
        email
      })
      console.log('createdUser',createdUser)
      alert(`Account created, please login`)
      navigate('/login')
    } catch (error) {
      console.log(error)
      alert(error)
    }


  }
  return (
    <div style={{height:'90vh'}}>
    <div style={{ width: "100%", maxWidth: "330px", padding: "15px", margin: "auto" }}>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <img className="mb-4" src="/shopiify_icon.png" alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Create a New Account</h1>

        <div className="form-floating">
          <input type="text" className="form-control" id="floatingUsername" placeholder="enter username" value={username} onChange={handleChangeUsername} />
          <label htmlFor="floatingUsername">Username</label>
        </div>

        <div className="form-floating">
          <input type="email" className="form-control" id='floatingEmail' placeholder="enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <label htmlFor="floatingEmail">Email</label>
        </div>

        <div className="form-floating">
          <input type="password" autoComplete="on" className="form-control" id="floatingPassword" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>

      </form>

    </div>
  </div >
  );
}

export default SignupPage;
