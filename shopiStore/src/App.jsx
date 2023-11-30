import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from './pages/Home';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import './App.css'



function App() {



  return (


    <div className='App'>

      {/* La navbar sera composé de plusieurs routes  */}
      <Navbar />

      {/* <Routes> : Creation du groupe des routes  */}
      <Routes>

        {/* <Route>: creation de chaque Route  */}
        {/* path: c'est le chemin à charger (le lien) */}
        {/* element={<Home/>} : va charger le composant/element Home, qui est enfant de App. */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/SignUp" element={<SignUp/>} />

        <Route path="/Cart" element={<Cart/>} />

      </Routes>


    </div >

  )

};

export default App
