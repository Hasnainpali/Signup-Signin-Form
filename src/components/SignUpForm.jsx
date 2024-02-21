import React, {  useState } from 'react';
// import useData from '../hooks/useData'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useCookies } from 'react-cookie';


export default function SignUpForm() {

  const [inputName, setInputName] = useState();
  const [inputUName, setInputUName] = useState();
  const [inputPwd, setInputPwd] = useState();
  const navigate = useNavigate();



  const url = "http://localhost:5000/signup"

  const register = (e) => {
    e.preventDefalut()
    console.clear();

    const person = {
      fullName: inputName,
      userName: inputUName,
      Password: inputPwd,
    }



    axios.post(url, person)
    .then((res) => {
        if (res.data) {
          if (person.fullName && person.userName && person.Password) {
            console.clear()
            console.log(res.data)
            navigate("/signin")
          }
          else {
            alert("Please Provide Complete info")
          }
        }
        else {

          alert("User Already registered")
        }
      })
      .catch((err) => {
        console.log(err)

      })




    // const found = users.find((items) => { return items.userName == person.userName })

    // if (!found) {
    //   // setUsers([...users, person]);
    //   users.push(person)
    //   console.log(users);
    //   navigate('/signin');
    // }
    // else{
    //   alert("User Already Registered");
    // }

  }

  return (
    <div className='container mt-5'>

      <div className="border border-2 p-3 d-flex flex-column">
        <h1 className='text-center'>Sign Up</h1>

        <input className='d-block m-auto mt-3 mx-5' type="text" placeholder='Full Name'value={inputName} onChange={(e) => { setInputName(e.target.value) }} />
        <input className='d-block m-auto mt-3 mx-5' type="text" placeholder='Write Unique UserName'value={inputUName} onChange={(e) => { setInputUName(e.target.value) }} />
        <input className='d-block m-auto mt-3 mx-5' type="password" placeholder='Password'value={inputPwd} onChange={(e) => { setInputPwd(e.target.value) }} />

        <button className="btn btn-primary d-block mt-3 mx-5" onClick={register}>Register</button>

        <span className='d-block text-center mt-3'> <Link to={'/signin'}>already have an account ?</Link> </span>
      </div>
    </div>
  )
}
