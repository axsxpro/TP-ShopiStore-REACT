import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
// sauter 2 dossiers parents pour atteindre le css
import '../../assets/css/signUp.css'
import { Link } from 'react-router-dom';
import axios from "axios";


const SignUp = () => {

  // comme le Usestate, utilisation de useFormik pour gérer le formulaire
  const formik = useFormik({

    // Créer un objet Formik avec les valeurs initiales
    // initialValues: creation des valeurs initiales des champs du formulaire.
    initialValues: {
      email: '',
      username: '',
      password: '',

      name: {
        firstname: '',
        lastname: ''
      },

      adresse: {
        city: '',
        street: '',
        number: '',
        zipcode: ''
      }

    },


    // Gestion de la validation du formulaire. 
    // formik reçoit les valeurs des données du formulaire et valide chaque champs en fonction des règles définies par le schéma de validation Yup.
    validationSchema: Yup.object({
      email: Yup.string()
        // règles
        .email('Adresse e-mail invalide')
        .required('Champ requis'),
      username: Yup.string()
        .min(3, "Mininum 3 characters")
        .max(15, "Maximum 15 characters")
        .required('Champ requis'),
      password: Yup.string()
        .min(6, 'Le mot de passe doit contenir au minimum 6 caractères')
        .max(20, 'Le mot de passe doit contenir au maximum 20 caractères')
        .matches(/[A-Z]/, 'Le mot de passe doit contenir au minimum une majuscule')
        .matches(/[0-9]/, 'Le mot de passe doit contenir au minimum un chiffre'),


      name: Yup.object({
        firstname: Yup.string()
          .required('Champ requis'),
        lastname: Yup.string()
          .required('Champ requis'),
      }),

      adresse: Yup.object({
        city: Yup.string()
          .required('Champ requis'),
        street: Yup.string()
          .required('Champ requis'),
        number: Yup.string()
          .required('Champ requis'),
        zipcode: Yup.string()
          .required('Champ requis'),
      }),
    }),


    // Soumission des données du formulaire
    // une fonction sera appelée lorsque les données sont validées sans erreurs
    onSubmit: values => {

      // Make a POST request to the API endpoint
      axios.post('https://fakestoreapi.com/users', values)
        .then(response => {

          if (response.status == 200) {
            alert(' Félicitation Vous etes bien enregistré! maintenant connectz vous :)')
            console.log('Utilisateur bien enregistré :', values);
            console.log('Utilisateur bien enregistré :', response.data);
            window.location.href = '/login';
          }
        })
        .catch(error => {
          console.error("Erreur d'enregistrement de l'utilisateur :", error.message);

        });
    },

  });


  return (

    // div qui va contenir le formulaire
    <div className='formulaireInscription'>

      {/* debut du formulaire */}
      <form onSubmit={formik.handleSubmit} id="formulaireInscription">


        <div className='logoFormulaire'>
          <Link to='/'>
            <img src="./images/shopistore_logo1.png" alt="logo" />
          </Link>
        </div>

        <div className='titreInscription'>

          <h1 className='text-3xl py-8 text-[#8A4B8B]'>Inscrivez Vous </h1>

        </div>


        {/* chaque champs est inséré dans une div */}
        <div>
          {/* nom du champs */}
          <label htmlFor="email">Email</label>
          {/* debut du champs avec le input */}
          <input
            type="email"
            placeholder='exemple@gmail.com'
            id="email"
            // getFieldProps: gérer les valeurs et les événements
            /* peut etre remplacé dans l'input par : 
            
            value={formik.values[nom valeur]} : fournit la valeur actuelle du champ 
            onChange={formik.handleChange} : permettant de mettre à jour l'état du formulaire lorsque le champ est modifié.
            onBlur={formik.handleBlur} : evenement qui s'active lorsque l'utilisateur quitte un champ de formulaire, champs qui perd le focus */
            {...formik.getFieldProps('email')}
          />
          {/* gestion des erreurs, utilisation d'une ternaire: si un champs a été touché et que la valeur est fausse (formik.touched.email && formik.errors.email ?) */}
          {/*  formik.touched : vérifier si un champ a été touché (a eu le focus au moins une fois)
           formik.errors : vérifie si les valeurs entrées dans les champs sont conformes au schéma de validation Yup */}
          {formik.touched.email && formik.errors.email ? (
            // formik.errors.email contiendra un message associé à l'erreur  : affichage du message d'erreur, si un champs a été touché et que la valeur est fausse (voir required pour les msg personnalisés)
            <p>{formik.errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            placeholder='Spiderman'
            id="username"
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username ? (
            <p>{formik.errors.username}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            placeholder='Au minimum 6 caractères, une majuscule et un chiffre'
            id="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
        </div>


        <div>
          <label htmlFor="firstname">Nom</label>
          <input
            type="text"
            id="firstname"
            placeholder='Parker'
            {...formik.getFieldProps('name.firstname')}
          />
          {formik.touched.name?.firstname && formik.errors.name?.firstname ? (
            <p>{formik.errors.name.firstname}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="lastname">Prénom</label>
          <input
            type="text"
            id="lastname"
            placeholder='Peter'
            {...formik.getFieldProps('name.lastname')}
          />
          {formik.touched.name?.lastname && formik.errors.name?.lastname ? (
            <p>{formik.errors.name.lastname}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            id="city"
            placeholder='New York'
            {...formik.getFieldProps('adresse.city')}
          />
          {formik.touched.adresse?.city && formik.errors.adresse?.city ? (
            <p>{formik.errors.adresse.city}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="street">Rue</label>
          <input
            type="text"
            id="street"
            placeholder=' Ingram Street'
            {...formik.getFieldProps('adresse.street')}
          />
          {formik.touched.adresse?.street && formik.errors.adresse?.street ? (
            <p>{formik.errors.adresse.street}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="number">Numéro de voie</label>
          <input
            type="text"
            id="number"
            placeholder='20'
            {...formik.getFieldProps('adresse.number')}
          />
          {formik.touched.adresse?.number && formik.errors.adresse?.number ? (
            <p>{formik.errors.adresse.number}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="zipcode">Code Postal</label>
          <input
            type="text"
            id="zipcode"
            placeholder='11375'
            {...formik.getFieldProps('adresse.zipcode')}
          />
          {formik.touched.adresse?.zipcode && formik.errors.adresse?.zipcode ? (
            <p>{formik.errors.adresse.zipcode}</p>
          ) : null}
        </div>

        <button type="submit" id='buttonFormulaire' >S'inscrire</button>

      </form>

    </div>

  )
}

export default SignUp