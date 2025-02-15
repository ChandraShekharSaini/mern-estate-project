import { BrowserRouter, Routes,Route } from "react-router-dom"
import Header from './components/Header'
import Home from "./pages/Home"
import SignIn from "./pages/Signin"
import SignUp from "./pages/Signup"
import About from "./pages/About"
import Profile from "./pages/Profile"
import CreateListing from "./components/CreateListing"
import UpdateListing from "./pages/UpdateListing"
import PrivateRoute from "./components/PrivateRoute"
import Listing from "./pages/Listing"
import Search from './pages/Search';
import Blog from './pages/Blog/Blog'
import Testimonial from './pages/Testimonial'
import WaitPage from "./components/WaitPageAuth"
const App = () => {
  return (
      <BrowserRouter>
      <Header/>
         <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path='/search' element={<Search />} />
          <Route path='/redirect-to-home' element={<WaitPage />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/testimonail' element={<Testimonial/>} />
          <Route path='/listing/:listingId' element={<Listing />} />

        
          <Route element={<PrivateRoute/>}>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/create-listing" element={<CreateListing/>} />
              <Route path="/update-listing/:listingId" element={<UpdateListing/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App