import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Loading from './components/Loading';
import Login from './components/Login';
import Signup from './components/Signup';
import { authContext, AuthState } from './context/authContext';



function App() {


  const { authUser, loadingUser } = useContext(authContext);

  console.log(loadingUser);
  console.log(authUser);

  return (

    <div className="main">
      
        
    <BrowserRouter>
     
      {loadingUser ? <Loading/>:
        <Routes>
        <Route path='/' element={authUser ? <Home /> : <Login/>} />
        <Route path='/login' element={authUser ? <Home /> : <Login/>} />
        <Route path='/signup' element={authUser ? <Home /> : <Signup/>} />
      </Routes>
      
      }

    </BrowserRouter>

    </div>
  );
}

export default App;
