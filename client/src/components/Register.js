import React, { Fragment, useState } from "react";
import "./cssoptions/register.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const Register = ({ setAuth }) => {

  const initialValues = {
    surname: '',
    name: '',
    email: '',
    password: '',
    passwordcheck: ''
  }

  const onSubmit = async (values) => {
    //console.log('Form data', values)

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const parseRes = await response.json();
      //console.log(parseRes);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("By w pełni korzystać z dostępnych możliwości, należy aktywować konto linkiem aktywacyjnym wysłanym na adres email podany w formularzu.");

      } else {

        setAuth(false);
        toast.error(parseRes);
      }


    } catch (err) {
      console.error(err.message);
    }
  }

  const validate = values => {
    let errors = {}

    if (!values.surname) {
      errors.surname = "Te pole jest wymagane!"
    } else if (values.surname.length < 2 || values.surname.length > 30) {
      errors.surname = "Nazwisko musi zawierać od 2 do 30 znaków"
    } else if (!(/^[A-Za-z]+$/.test(values.surname))) {
      errors.surname = "Nazwisko musi zaczynać się z dużej litery oraz nie może zawierać znaków specjalnych";
    }

    if (!values.name) {
      errors.name = "Te pole jest wymagane!"
    } else if (values.name.length < 2 || values.name.length > 30) {
      errors.name = "Imię musi zawierać od 2 do 30 znaków"
    } else if (!(/^[A-Za-z]+$/.test(values.name))) {
      errors.name = "Imię musi zaczynać się z dużej litery oraz nie może zawierać znaków specjalnych";
    }

    if (!values.email) {
      errors.email = "Te pole jest wymagane!"
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))) {
      errors.email = "Nieprawidłowy format adresu email"
    }

    if (!values.password) {
      errors.password = "Te pole jest wymagane!"
    } else if (!(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(values.password))) {
      errors.password = "Hasło musi zawierać od 8 do 20 znaków, minimum jeden znak specjalny oraz dużą i małą literę"
    }

    if (!values.passwordcheck) {
      errors.passwordcheck = "Te pole jest wymagane!"
    } else if (values.passwordcheck != values.password) {
      errors.passwordcheck = "Hasła muszą być identyczne"
    }




    return errors
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  //console.log('Visitedorm fields', formik.touched)
  // const [inputs, setInputs] = useState({
  //   email: "",
  //   password: "",
  //   name: "",
  //   surname: "",
  //   passwordcheck: ""
  // });

  // const {email, password, name, surname, passwordcheck} = inputs;

  // const onChange = eve => {
  //   setInputs({ ...inputs, [eve.target.name] : eve.target.value});
  // };

  // const onSubmitForm = async(eve) => {
  //   eve.preventDefault();

  //   try{

  //     const body = {email, password, name, surname, passwordcheck};

  //     const response = await fetch("http://localhost:5000/auth/register", {
  //       method: "POST",
  //       headers: {'Accept': 'application/json',
  //                  'Content-Type': 'application/json'},
  //       body: JSON.stringify(body)
  //     });

  //     const parseRes = await response.json();
  //     //console.log(parseRes);

  //     if (parseRes.token) {
  //       localStorage.setItem("token", parseRes.token);
  //       setAuth(true);
  //       toast.success("Zajerestrowałeś się pomyślnie");

  //     } else {

  //       setAuth(false);
  //       toast.error(parseRes);
  //     }
      

  //   }catch (err) {
  //     console.error(err.message);
  //   }
  // }

  return (
    <Fragment>

      <div className="card back-color-register con-opt_register">
        <article className="card-body text-color margins-size">
          <h4 className="card-title mt-3 text-center">Stwórz Konto</h4>

          <p className="divider-text">
            <span></span>
          </p>
          <form onSubmit={formik.handleSubmit}>

            <label>Nazwisko:</label>
            <div className="form-group input-group margin-bottom_new_mod">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
              </div>
              <input name="surname" className="form-control" placeholder="Nazwisko" type="text" value={formik.values.surname} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            </div>
            {formik.touched.surname && formik.errors.surname ? <div className="errors">{formik.errors.surname}</div> : null}
            <label>Imię:</label>
            <div className="form-group input-group margin-bottom_new_mod">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
              </div>
              <input type="text" name="name" className="form-control" placeholder="Imię" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            </div>
            {formik.touched.name && formik.errors.name ? <div className="errors">{formik.errors.name}</div> : null}

            <label>Adres email:</label>
            <div className="form-group input-group margin-bottom_new_mod">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
              </div>
              <input type="email" name="email" className="form-control" placeholder="Adres Email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            </div>
            {formik.touched.email && formik.errors.email ? <div className="errors">{formik.errors.email}</div> : null}

            <label>Hasło:</label>
            <div className="form-group input-group margin-bottom_new_mod">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
              </div>
              <input name="password" className="form-control" placeholder="Wpisz hasło" type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            </div>
            {formik.touched.password && formik.errors.password ? <div className="errors">{formik.errors.password}</div> : null}

            <label>Powtórz hasło:</label>
            <div className="form-group input-group margin-bottom_new_mod">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
              </div>
              <input className="form-control" placeholder="Powtórz hasło" type="password" name="passwordcheck" value={formik.values.passwordcheck} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            </div>
            {formik.touched.passwordcheck && formik.errors.passwordcheck ? <div className="errors">{formik.errors.passwordcheck}</div> : null}

            <p className="divider-text">
              <span></span>
            </p>
            <div className="form-group">

              <button className="btn btn-primary btn-block" type='submit'> Stwórz Konto  </button>
            </div>

            <p className="text-center">Masz już konto? <Link to="/login">Zaloguj się</Link> </p>
          </form>
          {/* <form onSubmit={onSubmitForm}>

          <label>Nazwisko:</label>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                </div>
                  <input name="surname" className="form-control" placeholder="Nazwisko" type="text" value = {surname} onChange={eve => onChange(eve)}/>
              </div> 
          <label>Imię:</label>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-user"></i> </span>
              </div>
                  <input type="text" name="name" className="form-control" placeholder="Imię"  value = {name} onChange={eve => onChange(eve)}/>
              </div> 
              <label>Adres email:</label>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
              </div>
                  <input type="email" name="email" className="form-control" placeholder="Adres Email"  value = {email} onChange={eve => onChange(eve)}/>
              </div> 
              <label>Hasło:</label>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
              </div>
                  <input name="password" className="form-control" placeholder="Wpisz hasło" type="password" value = {password} onChange={eve => onChange(eve)}/>
              </div> 
              <label>Powtórz hasło:</label>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
              </div>
                  <input className="form-control" placeholder="Powtórz hasło" type="password" name="passwordcheck" value = {passwordcheck} onChange={eve => onChange(eve)}/>
              </div>                                       
              <div className="form-group">
                  <button className="btn btn-primary btn-block"> Stwórz Konto  </button>
              </div>     
              <p className="text-center">Masz już konto? <Link to="/login">Zaloguj się</Link> </p>                                                                 
          </form> */}

        </article>
      </div>


    </Fragment>
  );
};

export default Register;