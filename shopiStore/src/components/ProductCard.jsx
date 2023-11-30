import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../assets/css/cart.css';


const ProductCard = ({ id, quantity }) => {

    const [article, setArticle] = useState([]);
    const [prixTotal, setPrixTotal] = useState([]);


    const apiUrl = 'https://fakestoreapi.com/products/' + id;

    useEffect(() => {
        // Appel à l'API avec axios pour obtenir les produits 
        axios.get(apiUrl)
            .then(response => {

                // Récupération des infos du produit et stockage dans le usestate article
                setArticle(response.data)
            })
            .catch(error => {
                console.error('Erreur lors du chargement des articles :', error.message);
            });

    }, []);


    console.log(article);

    // // Fonction pour mettre à jour la quantité d'un produit dans le panier
    function modifQuantite(id, nouvelleQuantite) {

        // stockage du résultat dans la const majQuantite
        /* parcours de tout les articles avec map, avec comme condition si l'id de l'article ou il y a eu l'evenement 
        est égal à l'id d'un article dans le tableau d'objet  parcourue par la map alors la quantité de l'article visé va prendre la valeur de l'input */

        if (article.id === id) {

            const majQuantite = { ...article, quantity: nouvelleQuantite }
            setArticle(majQuantite)

        }

        const calculPrixTotal = (nouvelleQuantite * article.price).toFixed(2);
        setPrixTotal(calculPrixTotal)
    
    };


    return (

        <div>

            <div className="blocArticle" key={article.id}>

                <div className='imageArticle'>
                    <img src={article.image} alt={article.title} style={{ width: '150px' }} />
                </div>

                <div className='descriptionArticle'>
                    <ul>
                        <li>{article.title}</li>
                        <li>Prix: {article.price} €</li>
                        <li>Quantité: {article.quantity || quantity} </li>
                        <li>Prix total pour {article.quantity || quantity} article(s): {(article.quantity * article.price || quantity * article.price).toFixed(2)} € </li>

                        {/*  à chaque changement de valeur, on appelera la fonction modif Quantité avec en parametre id de l'article et la valeur convertit au format int  */}
                        <li><input type="number" onChange={(e) => modifQuantite(article.id, parseInt(e.target.value))} style={{ width: '20%' }} name='inputQuantite' min='1' max='10' /></li>
                    </ul>

                </div>

            </div>

            <div className='prixTotal'>
                <p>Total: {prixTotal} €</p>
            </div>

        </div>

    )

}

export default ProductCard