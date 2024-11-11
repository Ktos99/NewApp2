import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cssoptions/myAccount.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";



const AdminAddUser = ({ setAuth }) => {



  const [userEmail, setUserEmail] = useState("");





  useEffect(() => {
    const getUserEmail = async () => {
      try {

        const response = await fetch("http://localhost:5000/dashboard/username-data", {
          method: "GET",
          headers: { token: localStorage.token }
        });
        const parseRes = await response.json();
        setUserEmail(parseRes.user_email);

      } catch (err) {
        console.error(err.message)
      }

    }


    getUserEmail();
  }, []);

  const initialValues = {
    surname: '',
    name: '',
    email: '',
    password: '',
    passwordcheck: ''
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


  const onSubmit = async (values) => {

    try {




      const response = await fetch("http://localhost:5000/adminactions/adduser", {
        method: "POST",
        headers: {
          token: localStorage.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const parseRes = await response.json();
      //console.log(parseRes);
      toast.info(parseRes);

    } catch (err) {
      console.error(err.message);
    }


  }

  //   const [inputs, setInputs] = useState({
  //     email: "",
  //     password: "",
  //     name: "",
  //     surname: "",
  //     passwordcheck: ""
  //   });


  //   const {email, password, name, surname, passwordcheck} = inputs;

  //   const onChange = eve => {
  //     setInputs({ ...inputs, [eve.target.name] : eve.target.value});
  //   };

  //   const onSubmitFormUser = async(eve) => {
  //     eve.preventDefault();

  //     try{


  //         const body = {email, password, name, surname, passwordcheck};

  //       const response = await fetch("http://localhost:5000/adminactions/adduser", {
  //         method: "POST",
  //         headers: {'Accept': 'application/json',
  //                    'Content-Type': 'application/json'},
  //         body: JSON.stringify(body)
  //       });

  //       const parseRes = await response.json();
  //       //console.log(parseRes);
  //       toast.info(parseRes);

  //     }catch (err) {
  //       console.error(err.message);
  //     }
  //   }


  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  });



  return (

    <div className="marg-op_new1">
      <div className="container marg-op_new1"> </div>

      <section className="account-menu">
        <div className="wrapper-max">
          <div className="row">
            <div className="col-lg-12">
              <div className="account__user clearfix">
                <p className="align-right_opt text-color-myaccount">Jesteś zalogowany/a jako <span>{userEmail}</span></p>
              </div>
              {/* <PDFViewer url="/books_pdf/bibliawindowsserver2019.pdf"/> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg bg-light navbar-light">
                <div className="collapse navbar-collapse"></div>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">


                    <li className="nav-item">
                      <Link to="/admin/addbook" className="nav-link">Dodaj książkę</Link>
                    </li>
                    <li className="nav-item active">
                      <Link to="/admin/adduser" className="nav-link">Dodaj użytkownika</Link>
                    </li>

                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <div className="tab-content">
        <div className="tab-pane active">
          <div className="account__form">
            <div className="wrapper-max">
              <div className="row">
                <div className="col-lg-12">


                  <div className="card background_color_text_my_account color_text_my_account margin-top_my_account">
                    <h3 className="text-center ">DODAJ UŻYTKOWNIKA</h3>
                    <article className="card-body mx-auto" styles="max-width: 400px;">
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

                      </form>
                    </article>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )


}

export default AdminAddUser;