import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./cssoptions/shoppingCart.css";
import { toast } from "react-toastify";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51JSfY5HOqUZvPQiuyfc506FiiOnKhGBjtVbux1BilWyqRbUnTJrWA4Wx7aa5K1Hzr6bO0EW2lGpi9UWyMD3tTdiN007erWCcco')

const ShoppingCartSummary = ({ isAuthenticated, setTotalCartBooksLength, setTotalCartPrice }) => {

    const [shoppingCartBooks, setShoppingCartBooks] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const history = useHistory();

    //const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE)







    useEffect(() => {
        const getShopCartBooks = async () => {

            const response = await fetch("http://localhost:5000/shoppingcart/allusercartbooks", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            //console.log(parseRes);
            let total = 0;

            if (parseRes.length !== 0) {

                for (var i = 0; i < parseRes.length; i++) {
                    total = total + parseFloat(parseRes[i].price);
                    //console.log(total);
                }

            }

            setTotalPrice(total);

            setShoppingCartBooks(parseRes);

        }

        getShopCartBooks();
    }, []);




    async function handleBorrow() {

        try {


            if (isAuthenticated == false) {

                history.push("/login");

            } else {

                const res = await fetch("http://localhost:5000/shoppingcart/allusercartbooks", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await res.json();




                const stripeResp = await fetch("http://localhost:5000/shoppingcart/addbookstouser", {
                    method: "POST",
                    body: JSON.stringify({
                        totalPrice: totalPrice
                    }),
                    headers: {
                        token: localStorage.token,
                        "Content-type": "application/json"
                    },
                })

                const { id: sessionId } = await stripeResp.json()
                console.log(sessionId)

                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({ sessionId });
                console.log(error)


                await fetch("http://localhost:5000/shoppingcart/deletemorethanonebook", {
                    method: "DELETE",
                    body: JSON.stringify(parseRes),
                    headers: {
                        token: localStorage.token,
                        "Content-type": "application/json"
                    },
                })





                let priceCartTotal = 0;

                for (var i = 0; i < parseRes.length; i++) {
                    priceCartTotal = priceCartTotal + parseFloat(parseRes[i].price);
                }

                setTotalCartPrice(0.00);
                setTotalCartBooksLength(0);
                toast.success("Książki zostały pomyślnie dodane do twojej półki");
            }
        } catch (err) {

            console.error(err);

        }
    }




    return (

        <div className="con-opt_new">
            <div className="container"></div>
            <section className="trolley__content">
                <div className="wrapper-max">
                    <div>
                        <div className="content clearfix text-color-shoppingcart">
                            <h3 id="trolley_steps-h-0" className="title current"></h3>
                            <section className="body current">
                                <section className="buy-b">
                                    <div className="wrapper-max">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-8 col-lg-9">
                                                <h1 className="buy-b__title font-700">PRODUKTY</h1>
                                            </div>
                                            <div className="col-sm-4 col-lg-3">
                                                <h1 className="buy-b__title buy-b__title--price font-700">CENA</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <section className="buy-b__book buy-b__book--buy book">
                                                {shoppingCartBooks.map(d =>
                                                    <div className="row row-margin" key={d.item_id}>
                                                        <div className="col-xs-12 col-sm-8 col-lg-9 pad-right pad-left buy-b__left">
                                                            <div className="buy-b__content buy-b__content--height">
                                                                <div className="row">
                                                                    <div className="col-xs-3 col-lg-2 pad-left-10 pad-right pad-right-d">
                                                                        <div className="buy-b__box">
                                                                            <a href="#"><img className="img-responsive buy-b__cover" src={d.book_imageurl} alt={d.book_title} /> </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xs-9 col-lg-10 buy-b__text">
                                                                        <div className="buy-b__text-box">
                                                                            <p className="buy-b__inf buy-b__inf--t">{d.book_title}</p>
                                                                            <p className="buy-b__inf">Autor: {d.book_author_firstname} {d.book_author_lastname}</p>
                                                                            <p className="buy-b__inf">Wydawnictwo: {d.book_phouse} </p>
                                                                            <p className="buy-b__inf">Format:<span>{d.book_format}</span></p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-12 col-sm-4 col-lg-3 pad-left-5 pad-right-5 buy-b__background">
                                                            <div className="buy-b__price">
                                                                <p><span className="buy-b__money buy-b__money--main"><span>{d.price}</span> zł</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </section>
                                        </div>
                                    </div>
                                </section>
                                <section className="buy-p section__bk-shadow section__brdr-top">
                                    <div className="wrapper-max">
                                        <div className="row">
                                            <div className="col-xs-12 col-lg-7 pad-left pad-right">
                                                <div className="row"><div className="col-xs-12"><br></br> <p></p></div></div>
                                                <div className="row"><div className="col-xs-12"></div></div>
                                            </div>
                                            <div className="col-xs-12 col-lg-5">
                                                <div className="row">
                                                    <div className="col-lg-12 pad-left-5 pad-right-5 pad-left-d pad-right-d-5">
                                                        <div className="buy-p__value-box">
                                                            <div className="row">
                                                                <div className="col-xs-7 col-sm-4 col-md-3 col-lg-7 col-xs-offset-1 col-sm-offset-5 col-md-offset-7 col-lg-offset-1 pad-left pad-right">
                                                                    <p className="buy-p__value">Wartość zamówienia:</p>
                                                                </div>
                                                                <div className="col-xs-4 col-sm-3 col-md-2 col-lg-4 pad-left pad-right text-right">
                                                                    <span className="buy-p__value buy-p__value--color"><span> {totalPrice.toFixed(2)}</span> zł</span>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-xs-7 col-sm-4 col-md-3 col-lg-7 col-xs-offset-1 col-sm-offset-5 col-md-offset-7 col-lg-offset-1 pad-left pad-right">
                                                                </div>
                                                                <div className="col-xs-4 col-sm-3 col-md-2 col-lg-4 pad-left pad-right text-right">
                                                                </div>
                                                                <div className="col-lg-12 pad-left pad-right">
                                                                    <p className="buy-p__inf buy-p__inf--bottom text-color-shoppingcart" styles="color: gray;">cena zawiera podatek VAT</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="buy-nav section__bk-shadow section__brdr-top">
                                    <div className="wrapper-max">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6 col-sm-push-6">
                                                <Link to="/booklist" className="buy-nav__btn-prev text-color-shoppingcart">kontynuuj zakupy</Link>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-sm-pull-6 clearfix">
                                                <button className="main-button main-button--red buy-nav__btn-next" onClick={() => handleBorrow()}>WYPOŻYCZ i ZAPŁAĆ</button>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                            </section>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                    </div>

                </div>

            </section>
        </div>

    );
};

export default ShoppingCartSummary;