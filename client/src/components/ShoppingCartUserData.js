import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./cssoptions/shoppingCart.css";


const ShoppingCartUserData = ({ isAuthenticated, setTotalCartBooksLength, setTotalCartPrice }) => {

    const [userData, setUserData] = useState([]);
    const history = useHistory();

    const [inputs, setInputs] = useState({
        user_name: "",
        user_lastname: ""
    });








    useEffect(() => {
        const getUserShopData = async () => {

            const response = await fetch("http://localhost:5000/dashboard/username-shopcartdata", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            //console.log(parseRes)

            setInputs({ user_name: parseRes.user_name, user_lastname: parseRes.user_surname })
            setUserData(parseRes);

        }

        getUserShopData();
    }, []);

    const { user_name, user_lastname } = inputs;

    const onChange = eve => {
        setInputs({ ...inputs, [eve.target.name]: eve.target.value });
    };

    const onSubmitFormUserData = async (eve) => {
        eve.preventDefault();

        try {

            const user_email = userData.user_email;

            const body = { user_name, user_lastname, user_email };

            const response = await fetch("http://localhost:5000/userdatacartchange/changeuserdata", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            //const parseRes = await response.json();
            //console.log(parseRes);
            history.push("/shopcart_summary");
        } catch (err) {
            console.error(err.message);
        }
    }



    return (

        <div className="con-opt_new">
            <div className="container"></div>
            <section className="trolley__content">
                <div className="wrapper-max">
                    <div>
                        <section>
                            <section className="buy-form">
                                <div className="col-lg-12 text-color-shoppingcart">
                                    <h3 className="text-center">DANE ODBIORCY</h3>

                                    <div className="card con-opt userdata-change">

                                        <form onSubmit={onSubmitFormUserData}>
                                            <label>Imię: </label>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                                </div>
                                                <input className="form-control" placeholder="Imię" type="text" name="user_name" value={user_name} onChange={eve => onChange(eve)} />
                                            </div>
                                            <label>Nazwisko: </label>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                                </div>
                                                <input className="form-control" placeholder="Nazwisko" type="text" name="user_lastname" value={user_lastname} onChange={eve => onChange(eve)} />
                                            </div>
                                            <label>Email: </label>
                                            <div className="form-group input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                                </div>
                                                <input className="form-control" type="email" value={userData.user_email} disabled />
                                            </div>

                                        </form>

                                    </div>

                                </div>
                            </section>
                            <section className="buy-nav section__brdr-top">
                                <div className="wrapper-max">
                                    <div className="row">
                                        <div className="col-lg-6">

                                            <Link to="/shopcart" className="buy-nav__btn-prev text-color-shoppingcart">Powrót</Link>
                                        </div>
                                        <div className="col-lg-6">
                                            <button className="main-button main-button--red buy-nav__btn-next" onClick={onSubmitFormUserData}>PODSUMOWANIE</button>
                                        </div>
                                    </div>

                                </div>


                            </section>
                        </section>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default ShoppingCartUserData;