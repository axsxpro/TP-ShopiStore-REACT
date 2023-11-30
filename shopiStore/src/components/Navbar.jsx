// Faire RAFCE pour chaque page afin d'importer la structure React
import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {



    return (

        <nav>

            {/* Link dans la navbar: ces Links renverront au routes  */}
            <Link to="/"> Accueil </Link>
            <Link to="/login"> Se connecter</Link>
            <Link to="/SignUp">Inscrition</Link>
            <Link to="/Cart">Panier</Link>

        </nav>


    )
};

export default Navbar