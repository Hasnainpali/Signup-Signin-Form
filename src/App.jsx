import { Route, Routes, useNavigate, } from 'react-router-dom';
import Navbar from './components/Navbar'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import Profile from './components/Profile'

import './App.css';


function App() {

    const navigate = useNavigate();
    // const [cookie, setcookie, removecookie] = useCookies()

    // function signin() {
    //     setcookie("name", prompt("Enter your name"))
    // }
    // useEffect(() => {
    //     if (cookie) {
    //         console.log(cookie.name)
    //     }
    //     else {
    //         console.log("User not found")
    //     }
    // }, [])

    return (
        <>
            <Navbar />
            {/* <button onClick={signin}>Signin</button> */}

            <Routes>

                <Route path='/' element={<h1 className='text-center'>I am Home</h1>} />
                <Route path='signup' element={<SignUpForm />} />
                <Route path='signin' element={<SignInForm />} />
                <Route path='profile' element={<Profile />} />

            </Routes>

        </>
    )
}
export default App