import './App.css';
import { BrowserRouter, Routes , Route  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Explore from './Pages/Explore';
import Offer from './Pages/Offer';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';
import Category from './Pages/Category';
import CreateListing from './Pages/CreateListing';
import Listing from './Pages/Listing';
import Contact from './Pages/Contact';
import EditListing from './Pages/EditListing';
import Navbar from './Components/Navbar';
import PrivetRoute from './Components/PrivetRoute';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/house-marketplace' element={<Explore/>} />
        <Route path='/house-marketplace/offer' element={<Offer/>} />
        <Route path='/house-marketplace/category/:categoryName' element={<Category/>} />
        <Route path='/house-marketplace/profile' element={<PrivetRoute/>}>
          <Route path='/house-marketplace/profile' element={<Profile/>} />
        </Route>
        <Route path='/house-marketplace/sign-in' element={<Signin/>} />
        <Route path='/house-marketplace/sign-up' element={<Signup/>} />
        <Route path='/house-marketplace/forgot-password' element={<ForgotPassword/>} />
        <Route path='/house-marketplace/create-listing' element={<CreateListing/>} />
        <Route path='/house-marketplace/edit-listing/:listingId' element={<EditListing/>} />
        <Route path='/contact/:landlordId' element={<Contact/>} />
        <Route path='/house-marketplace/category/:categoryName/:listingId' element={<Listing/>} />
      </Routes> 
      <Navbar/>
    </BrowserRouter>
    <ToastContainer
    rtl={true}
    />
    </>    
  );
}

export default App;
