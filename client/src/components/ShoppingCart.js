import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cssoptions/shoppingCart.css";


const ShoppingCart = ({ isAuthenticated, setTotalCartBooksLength, setTotalCartPrice }) => {

    const [shoppingCartBooks, setShoppingCartBooks] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    //const history = useHistory();








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

    async function handleRemove(id) {
        //console.log(id);
        try {
            const newList = shoppingCartBooks.filter((item) => item.item_id !== id);

            await fetch("http://localhost:5000/shoppingcart/deletebook", {
                method: "DELETE",
                body: JSON.stringify({
                    item_id: id,
                }),
                headers: {
                    token: localStorage.token,
                    "Content-type": "application/json"
                }
            })


            //console.log(newList)
            setShoppingCartBooks(newList);
            setTotalCartBooksLength(newList.length);
            let total = 0;

            if (newList.length !== 0) {

                for (var i = 0; i < newList.length; i++) {
                    total = total + parseFloat(newList[i].price);
                    //console.log(total);
                }

            }


            setTotalPrice(total);
            setTotalCartPrice(total);

        } catch (err) {

            console.error(err);
        }

    }
      

   
      

    return (

        <div className="con-opt_new">
            <div className="container"></div>
            {(shoppingCartBooks.length !== 0 && 
            <section className="trolley__content">
                
                <div className="wrapper-max">   
                    <div>
                       <div className="content clearfix">
                            <h3 id="trolley_steps-h-0" className="title current"></h3>
                            <section className="body current">
                                <section className="buy-b">
                                    <div className="wrapper-max">
                                        <div className="row text-color-shoppingcart">
                                            <div className="col-xs-12 col-sm-8 col-lg-9">
                                                <h1 className="buy-b__title font-700">PRODUKTY</h1>
                                            </div>
                                            <div className="col-sm-4 col-lg-3">
                                                <h1 className="buy-b__title buy-b__title--price font-700">CENA</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <section className="buy-b_book--shopcart buy-b__book--buy book">
                                            {shoppingCartBooks.map(d => 
	                                             <div className="row row-margin" key={d.item_id}>  
                                                    <div className="col-xs-12 col-sm-8 col-lg-9 pad-right pad-left buy-b__left">
                                                        <div className="buy-b__content buy-b__content--height">
                                                            <div className="row">
                                                                <div className="col-xs-3 col-lg-2 pad-left-10 pad-right pad-right-d">
                                                                    <div className="buy-b__box">
                                                                    <img className="img-responsive buy-b__cover" src={d.book_imageurl} alt={d.book_title}/> 
                                                                    </div>
                                                                </div>
                                                                <div className="col-xs-9 col-lg-10 buy-b__text text-color-shoppingcart">
                                                                    <div className="buy-b__text-box">
                                                                        <p className="buy-b__inf buy-b__inf--t">{d.book_title}</p>
                                                                        <p className="buy-b__inf">Autor: {d.book_author_firstname} {d.book_author_lastname}</p>
                                                                        <p className="buy-b__inf">Wydawnictwo: {d.book_phouse} </p>
                                                                        <p className="buy-b__inf">Format:<span>{d.book_format}</span></p>
                                                                        <button type="button" onClick={()=> handleRemove(d.item_id)}><span className="buy-b__delete"><span className="del_btn">Usuń z koszyka</span></span></button>
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
                                                                <div className="col-xs-7 col-sm-4 col-md-3 col-lg-7 col-xs-offset-1 col-sm-offset-5 col-md-offset-7 col-lg-offset-1 pad-left pad-right text-color-shoppingcart">
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
                                                                <div className="col-lg-12 pad-left pad-right ">
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
                                            <Link to="/shopcart_userdata"><button className="main-button main-button--red buy-nav__btn-next">Dalej</button></Link>
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
                
            </section>)
                    || (shoppingCartBooks.length === 0 && 
                    <div className="container-fluid mt-100">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body cart">
                                        <div className="col-sm-12 empty-cart-cls text-center"> <img src="/shop-cart-icons/dCdflKN.png" alt="Koszyk" width="130" height="130" className="img-fluid mb-4 mr-3"/>
                                            <h3><strong>Twój koszyk jest pusty</strong></h3>
                                            <Link to="/booklist" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Kontynuuj zakupy</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)} 
        </div>
         
    );
};

export default ShoppingCart;