import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cssoptions/myAccount.css";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const PasswordChange = ({ setAuth }) => {

    
    const [userEmail, setUserEmail] = useState("");
  
   

    useEffect(() => {
		const getUserEmail = async () =>{
            try {
			
			const response = await fetch("http://localhost:5000/dashboard/username-data", {
			method: "GET",
			headers: {token: localStorage.token}
		  });
		  const parseRes = await response.json();
		  setUserEmail(parseRes.user_email);
          
        } catch (err) {
            console.error(err.message)
        }
		  
        }

        
		getUserEmail();
      }, []);
      

    const [inputs, setInputs] = useState({
        oldpassword: "",
        newpassword: "",
        passwordcheck: ""
      });
      


      const { oldpassword, newpassword, passwordcheck } = inputs;

      const onChange = eve => {
        setInputs({ ...inputs, [eve.target.name] : eve.target.value});
      };

      const onSubmitFormPassword = async(eve) => {
        eve.preventDefault();
    
        try{

            const user_email = userEmail;
    
          const body = {oldpassword, newpassword, passwordcheck, user_email};
    
          const response = await fetch("http://localhost:5000/passwordchange/changepassword", {
            method: "POST",
            headers: {'Accept': 'application/json',
                       'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          });
    
          const parseRes = await response.json();
          //console.log(parseRes);
          toast.info(parseRes);
    
        }catch (err) {
          console.error(err.message);
        }
      }


      


    return (

        <div className="marg-op_new1">
            <div className="container marg-op_new1"> </div>

                <section className="account-menu">
                    <div className="wrapper-max">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="account__user_g clearfix">
                                    <p className="align-right_opt color_text_my_account">Jesteś zalogowany/a jako <span>{userEmail}</span></p>
                                </div>
                                {/* <PDFViewer url="/books_pdf/bibliawindowsserver2019.pdf"/> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <div className="collapse navbar-collapse"></div>
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav">
                                        
                                        
                                                <li className="nav-item">
													<Link to="/myaccount/mybooks" className="nav-link">Twoje książki</Link>
												</li>
                                                <li className="nav-item active">
													<Link to="/myaccount/password_change" className="nav-link">Zmiana hasła</Link>
												</li>
                                                <li className="nav-item">
													<Link to="/myaccount/userdata_change" className="nav-link">Dane konta</Link>
												</li>
                                                <li className="nav-item">
													<Link to="/myaccount/history_of_orders" className="nav-link">Historia zamówień</Link>
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
                                        
                                            
                                            <div className="background_color_text_my_account color_text_my_account card margin-top_my_account"> 
                                            <h3 className="text-center ">ZMIANA HASŁA</h3>
                                                <article className="card-body color_text_my_account mx-auto" styles="max-width: 400px;">
                                                    <form onSubmit={onSubmitFormPassword}>
                                                    <label>Wpisz stare hasło:</label>
                                                    <div className="form-group input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                                        </div>
                                                        <input className="form-control" placeholder="Wpisz stare hasło" type="password" name="oldpassword" value = {oldpassword} onChange={eve => onChange(eve)}/>
                                                    </div> 
                                                    <label>Wpisz nowe hasło:</label>
                                                    <div className="form-group input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                                        </div>
                                                        <input className="form-control" placeholder="Wpisz nowe hasło" type="password" name="newpassword" value = {newpassword} onChange={eve => onChange(eve)}/>
                                                    </div> 
                                                    <label>Powtórz nowe hasło:</label>
                                                    <div className="form-group input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                                        </div>
                                                        <input className="form-control" placeholder="Powtórz nowe hasło" type="password" name="passwordcheck" value = {passwordcheck} onChange={eve => onChange(eve)}/>
                                                    </div>    
                                                    <p className="text-center">Wszystkie pola są wymagane </p>                                       
                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block"> Zmień hasło  </button>
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

export default PasswordChange;