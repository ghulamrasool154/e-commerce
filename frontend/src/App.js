import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Signup from './components/signup/Signup';
import Header from './components/header/Header';
import PrivateComponent from './components/privatecomp/PrivateComponent';
import Home from './components/home/Home';
import Login  from './components/login/Login';
import Addproduct from './components/addproduct/Addproduct';
import Products from './components/products/Products';
import UpdateData from './components/update/UpdateData';
function App() {
  return (
    <BrowserRouter>
      <div className="App ">
        <Header />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<Products/>} />
            <Route path='/add' element={<Addproduct />} />
            <Route path='/update' element={<UpdateData/>} />
            <Route path='/update/:id' element={<UpdateData/>} />
            <Route path='/logout' element={<h1>logout page</h1>} />
            <Route path='/profile' element={<h1>profile page</h1>} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
