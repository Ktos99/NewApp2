import React, { Fragment, useState } from "react";
import "./cssoptions/login.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";



const Login = ({ setAuth, setUserRole }) => {

  const initialValues = {
    email: "",
    password: ""
  }

  const onSubmit = async (values) => {
    //console.log('Form data', values)


    try {



      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const parseRes = await response.json();

      //console.log(parseRes);

      if (parseRes.token) {

        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        const response2 = await fetch("http://localhost:5000/dashboard/username-role", {
          method: "GET",
          headers: { token: localStorage.token }
        });
        const parseRes2 = await response2.json();

        setUserRole(parseRes2);



        toast.success("Zalogowałeś się pomyślnie");

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


    if (!values.email) {
      errors.email = "Te pole jest wymagane!"
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))) {
      errors.email = "Nieprawidłowy format adresu email"
    }

    if (!values.password) {
      errors.password = "Te pole jest wymagane!"
    }


    return errors
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  // const [inputs, setInputs] = useState({
  //   email: "",
  //   password: ""
  // });

  // const {email, password} = inputs;

  // const onChange = eve => {
  //   setInputs({...inputs, [eve.target.name]: eve.target.value});
  // };

  // const onSubmitForm = async (eve) => {
  //   eve.preventDefault();
  //   try{

  //     const body = {email, password}

  //     const response = await fetch("http://localhost:5000/auth/login", {
  //       method: "POST",
  //       headers: {"Content-Type": "application/json"},
  //       body: JSON.stringify(body)
  //     });

  //     const parseRes = await response.json();

  //     //console.log(parseRes);

  //     if(parseRes.token){

  //       localStorage.setItem("token", parseRes.token);
  //       setAuth(true);
  //       const response2 = await fetch("http://localhost:5000/dashboard/username-role", {
  //         		method: "GET",
  //         		headers: {token: localStorage.token}
  //         	  });
  //         	  const parseRes2 = await response2.json();

  //             setUserRole(parseRes2);



  //       toast.success("Zalogowałeś się pomyślnie");

  //     } else {

  //       setAuth(false);
  //       toast.error(parseRes);
  //     }


  //   }catch(err){
  //     console.error(err.message);
  //   }
  // }

  return (
    <Fragment>
      {/* <h1 className="text-center my-5"> Login </h1>
          <form onSubmit={onSubmitForm}>
            <input type="email" name="email" placeholder="Email" className="form-control my-3" value={email} onChange = {eve=>onChange(eve)}/>
            <input type="password" name="password"  placeholder="Hasło" className="form-control my-3" value={password} onChange = {eve=>onChange(eve)}/>
            <button className="btn btn-success btn-block">Zatwierdź</button>
          </form> */}

      <div className="row margin-main login-menu con-opt_new-login">
        <div className="col-md-4 col-md-offset-4"></div>
        <div className="col-md-4 col-md-offset-4 text-color_login">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Panel Logowania</h3>
            </div>
            <p className="divider-text">
              <span className="back-color_login"></span>
            </p>
            <div className="panel-body">
              <form onSubmit={formik.handleSubmit}>
                <fieldset>
                  <label>Adres email:</label>
                  {/* <div className="form-group">
                          <input className="form-control" placeholder="twojadresemail@example.com" name="email" type="email" value={email} onChange = {eve=>onChange(eve)}/>
                      </div> */}
                  <div className="form-group input-group margin-bottom_new_mod">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                    </div>
                    <input className="form-control" placeholder="twojadresemail@example.com" name="email" type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                  </div>
                  {formik.touched.email && formik.errors.email ? <div className="errors_login">{formik.errors.email}</div> : null}
                  <label>Hasło:</label>
                  {/* <div className="form-group">
                      <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                        <input className="form-control" placeholder="Hasło" name="password" type="password" value={password} onChange = {eve=>onChange(eve)}/>
                      </div> */}
                  <div className="form-group input-group margin-bottom_new_mod">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input className="form-control" placeholder="Hasło" name="password" type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                  </div>
                  {formik.touched.password && formik.errors.password ? <div className="errors_login">{formik.errors.password}</div> : null}
                  <p className="divider-text">
                    <span className="back-color_login"></span>
                  </p>
                  <button className="btn btn-primary btn-block" type="submit"> Zaloguj się </button>
                </fieldset>
              </form>
              <hr />

            </div>
          </div>
        </div>
        <div className="col-md-4 col-md-offset-4"></div>
      </div>



    </Fragment>
  );
};

export default Login;