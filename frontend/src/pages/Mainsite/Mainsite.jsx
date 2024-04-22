import React,{useState,useEffect,useContext} from 'react'
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import {CiLogout,CiLogin} from 'react-icons/ci'
import { MdOutlineAdd } from "react-icons/md";
import Hero from './Hero'
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';

const Mainsite = () => {

  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/profile');
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000); // Set timeout for 6 seconds

    fetchUserProfile(); // Start fetching user profile immediately

    return () => clearTimeout(timeout); // Cleanup function to clear timeout
  }, [setUser]);


  const [nav,SetNav]= useState(false)
  
  return (
    
    <div>
      <section>
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
      
      <div className='flex items-center'>
        <div onClick={()=> SetNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
          Shop<span className='font-bold'>Ease</span>
        </h1>
      
        <div className='flex space-x-9 pl-10'>
        <button className='bg-black text-white  items-center py-1  rounded-full w-20'>
        HOME
      </button>
      <button className='bg-black text-white  items-center py-1 rounded-full w-20'>
        ABOUT
      </button>
      <button className='bg-black text-white  items-center py-1  rounded-full w-20'>
        SEARCH
      </button>
     </div>
      
    </div>
      

    {loading ? (
        <div className="spinner">
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      ) : (
        user ? (
          <div>
            <Link to="/Login">
              <button className='bg-black text-white items-center py-1 rounded-full w-20 hidden sm:inline'>
                {user.name}
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/Login">
              <button className='bg-black text-white items-center py-1 rounded-full w-20 hidden sm:inline'>
                SignIn
              </button>
            </Link>
          </div>
        )
      )}
    
    

    {nav? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> :''}
    

    <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300': 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 '}>
      <AiOutlineClose onClick={()=> SetNav(!nav)} size={30} className='absolute right-4 top-4 cursor-pointer'/>
      <h2 className='text-2xl p-4'>Shop<span className='font-bold'>Ease</span></h2>
      <nav>
        <ul className='flex flex-col p-4 text-gray-800'>
          <li className='text-xl py-4 flex'><MdOutlineAdd size={25} className='mr-4 ' />Add Product</li>
          <li className='text-xl py-4 flex'><CiLogin size={25} className='mr-4 ' />Login</li>
          <li className='text-xl py-4 flex'><CiLogout size={25} className='mr-4 ' />Logout</li>
        </ul>
      </nav>
    </div>
   


    </div>
    <hr className='border-2'></hr>
    </section>
    <section>
    <Hero />
    </section>
    
  
    </div>
     
  )
}

export default Mainsite