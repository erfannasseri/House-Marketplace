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
        <Route path='/' element={<Explore/>} />
        <Route path='/offer' element={<Offer/>} />
        <Route path='/category/:categoryName' element={<Category/>} />
        <Route path='/profile' element={<PrivetRoute/>}>
          <Route path='/profile' element={<Profile/>} />
        </Route>
        <Route path='/sign-in' element={<Signin/>} />
        <Route path='/sign-up' element={<Signup/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/create-listing' element={<CreateListing/>} />
        <Route path='/edit-listing/:listingId' element={<EditListing/>} />
        <Route path='/contact/:landlordId' element={<Contact/>} />
        <Route path='/category/:categoryName/:listingId' element={<Listing/>} />
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
