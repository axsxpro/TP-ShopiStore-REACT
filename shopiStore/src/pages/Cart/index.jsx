import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/cart.css';
import ProductCard from '../../components/ProductCard';


const Cart = () => {

    // État pour stocker les produits du panier et le prix total
    const [panier, setPanier] = useState([]);
    const [userId, setUserId] = useState(2);
    

    // Utilisation de useEffect pour charger les produits 
    useEffect(() => {

        // Appel à l'API avec axios pour obtenir les produits de user n°2
        axios.get('https://fakestoreapi.com/carts/user/' + userId)
            .then(response => {

                // Mise à jour du panier avec les produits et la quantité initiale
                setPanier(response.data[0].products)

            })
            .catch(error => {
                console.error('Erreur lors du chargement des articles :', error.message);
            });

    }, []);

    // affichage du tableau d'articles
    console.log('le ¨Panier actuel :', panier)


    function supprimerArticle(id) {

        // Utilisation de filter, on veut seulement les articles qui n'ont pas le meme id que (id)
        const articleRestant = panier.filter(article => article.productId !== id);
        console.log(' Element récupérer apres le filter : ', articleRestant)

        // stocker les articles non supprimés
        setPanier(articleRestant);
    };


    // Fonction pour rediriger vers la page paiement après validation 
    function redirection() {
        // Rediriger l'utilisateur vers la page de paiement
        window.location.href = '/';
    };

    return (

        <div className='pagePanier'>

            <div className='panierArticle'>

                <h1> Panier </h1>

                {/* va parcourir les données stockées dans le usestate panier et précisement la ligne products  */}
                {panier?.map(article => (

                    <div>

                        {/* va afficher dans la console  la ligne products qui contient : {productId: 9, quantity: 1} */}
                        {console.log(article.productId.quantity)}

                        <div>
                            {/* // la card product contient un id produit= 1 et 9  et la quantité des articles = 2 et 1 */}
                            <ProductCard key={article.productId} id={article.productId} quantity={article.quantity} />


                        </div>

                        <div className='boutonSuprimerArticle'>
                            <button onClick={() => supprimerArticle(article.productId)} id='boutonSupprimer'>Supprimer l'article </button>
                        </div>

                    </div>

                ))}

            </div>


            <button onClick={redirection} id='buttonPanier'>Valider le Panier</button>

        </div>
    )

}

export default Cart