
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const {currentUser} = useSelector(state=>state.user);
    console.log(currentUser);
  return (
    <header className='bg-stone-950'> 
      <div className='flex justify-between  items-center max-w-6xl mx-auto p-3'>
      <Link to="/">
      <h1 className='font-bold text-sm sm:text-xl  flex flex-wrap'>
            <span className=' text-white'><span>B</span>ooking</span>
            <span className='text-blue-600'>.com</span>
        </h1>
      </Link>
      
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
           <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <FaSearch className='text-slate-600'/>
        </form>

        <ul className=' text-white flex items-center gap-4'  >
           <Link to="/">
           <li className='hidden sm:inline text-lg font-bold hover:text-blue-600 cursor-pointer'>Home</li>
           </Link>
           <Link to="/about">
           <li className='hidden sm:inline text-lg font-bold hover:text-blue-600 cursor-pointer'>About</li>
           </Link>
        
           <Link to="/profile">
           {currentUser ?(<img className="rounded-full h-10 w-10 object-cover hover:scale-110" src={currentUser.avatar}  alt="profile_image"/>): ( <li className='text-lg font-bold hover:text-blue-600 cursor-pointer'>Sign in</li>)}
           </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header