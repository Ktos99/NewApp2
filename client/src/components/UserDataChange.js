import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cssoptions/myAccount.css";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const UserDataChange = ({ setAuth }) => {

    
    const [userData, setUserData] = useState([]);
    


    const [inputs, setInputs] = useState({
        user_name: "",
        user_lastname: ""
      });
      




  


    useEffect(() => {
		const getUserShopData= async () =>{
			
			const response = await fetch("http://localhost:5000/dashboard/username-shopcartdata", {
			method: "GET",
            headers: {token: localStorage.token}
		  });
          const parseRes = await response.json();

          //console.log(parseRes)
          
          setInputs({user_name: parseRes.user_name, user_lastname: parseRes.user_surname})
		  setUserData(parseRes);
		 
		}

		getUserShopData();
      }, []);

    
      

      const { user_name, user_lastname} = inputs;
      
      const onChange = eve => {
        setInputs({ ...inputs, [eve.target.name] : eve.target.value});
      };

      const onSubmitFormUserData = async(eve) => {
        eve.preventDefault();
    
        try {
    
            const user_email = userData.user_email;

          const body = {user_name, user_lastname, user_email };
    
          const response = await fetch("http://localhost:5000/userdatacartchange/changeuserdata", {
            method: "POST",
            headers: {'Accept': 'application/json',
                       'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          });
    
          //const parseRes = await response.json();
          
          toast.success("Twoje dane zostały zmienione");
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
                                    <p className="align-right_opt color_text_my_account">Jesteś zalogowany/a jako <span>{userData.user_email}</span></p>
                                </div>
                                
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
                                                <li className="nav-item">
													<Link to="/myaccount/password_change" className="nav-link">Zmiana hasła</Link>
												</li>
                                                <li className="nav-item active">
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
                                        
                                    
                                            <div className="background_color_text_my_account color_text_my_account margin-top_my_account card"> 
                                            <h3 className="text-center ">DANE UŻYTKOWNIKA</h3>
                                                <article className="card-body mx-auto" styles="max-width: 400px;">
                                                <form onSubmit={onSubmitFormUserData}>
                                                    <label>Imię: </label>
                                                    <div className="form-group input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                                        </div>
                                                        <input className="form-control" placeholder="Imię" type="text" name="user_name" value = {user_name} onChange={eve => onChange(eve)}/>
                                                    </div> 
                                                    <label>Nazwisko: </label> 
                                                    <div className="form-group input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                                        </div>
                                                        <input className="form-control" placeholder="Nazwisko" type="text" name="user_lastname" value = {user_lastname} onChange={eve => onChange(eve)}/>
                                                    </div> 
                                                    <label>Email: </label> 
                                                    <div className="form-group input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                                        </div>
                                                        <input className="form-control"  type="email"  value = {userData.user_email} disabled/>
                                                    </div>    
                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block"> Zapisz zmiany  </button>
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

export default UserDataChange;