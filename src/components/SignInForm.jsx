import React, { useState } from 'react';
import useData from '../hooks/useData'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useCookies } from 'react-cookie';


export default function SignInForm() {

  const [logUName, setLogUName] = useState();
  const [logPwd, setLogPwd] = useState();
  const { setLoginUser, setLogin } = useData();
  const navigate = useNavigate();
  const url = "http://localhost:5000/signin"



  function login() {
    const person = {
      userName: logUName,
      Password: logPwd,

    }
    axios.post(url, person)
    .then((res) => {
        if (res.data) {
          console.clear()
          console.log(res.data)
          navigate("/profile");
          setLoginUser(res.data.userName);
          setLogin(true);

        }
        else {

          alert("Invalid UserName or Password")
        }
      })
      .catch((err) => {
        console.log(err)

      })




    //   const found = users.find((items) => { return items.userName == logUName && items.Password == logPwd })

    //   if (found) {
    //     navigate("/profile");
    //     setLoginUser(found.userName);
    //     setLogin(true);
    //   } else {
    //     alert("Invalid User Name Or Password")
    //   }
  }


  return (

    <div className='container mt-5'>

      <div className="border border-2 p-3 d-flex flex-column">
        <h1 className='text-center'>Sign In</h1>

        <input className='d-block m-auto mt-3 mx-5' type="text" placeholder='Write Unique UserName' value={logUName} onChange={(e) => { setLogUName(e.target.value) }} />
        <input className='d-block m-auto mt-3 mx-5' type="password" placeholder='Password' value={logPwd} onChange={(e) => { setLogPwd(e.target.value) }} />

        <button className="btn btn-primary d-block mt-3 mx-5" onClick={login}>Login</button>

        <span className='d-block text-center mt-3'> <Link to={'/signup'}>don't have an account ?</Link> </span>
      </div>
    </div>


  )
}
