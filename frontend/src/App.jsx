import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../src/pages/Mainsite/Mainsite'
import Login from '../src/pages/Logsign/Lsig'
import Signin from '../src/pages/Logsign/Register'
import Dash from '../src/pages/Mainsite/Dashboard'
import axios from 'axios';
import {Toaster} from 'react-hot-toast'


axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true


function App() {
  return (
    <>
        <Toaster position='bottom-right' toastOptions={{duration:3000}} />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signin />} />
        <Route path='/dash' element={<Dash />} />
    </Routes>
    </>
   
    
  )
}

export default App