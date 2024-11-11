import React, { Fragment, useState, useEffect } from "react";
import "./cssoptions/bookBorrow.css";
import Spinner from 'react-bootstrap/Spinner'
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";


const BookBorrow = ({ setAuth, match, isAuthenticated, setTotalCartPrice, setTotalCartBooksLength }) => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState(61);
    const [price, setPrice] = useState(0.00);
    const history = useHistory();

    



    useEffect(() => {
        const getBook = async () => {
            


            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/booklist/book/${match.params.book_title}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                const parseRes = await response.json();

                //console.log(parseRes.book_price);
                setBook(parseRes);
                setPrice(parseFloat(parseRes.book_price));
                setLoading(false);
            } catch (err) {
                console.error(err.message);

            }
            
        }
        getBook();
        //console.log(match);
    }, []);

    if (loading) {
        return  <center><Spinner animation="border" role="status"></Spinner></center>
    }


    async function addToCart(book_id, period_of_time, price) {
        try {



            if (isAuthenticated == false) {

                toast.info('Musisz być zalogowany by skorzystać z tej funkcji!')

                history.push("/login");

            } else {

                const resCheck = await fetch("http://localhost:5000/dashboard/username-verification", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const prCheck = await resCheck.json();

                console.log(prCheck.verified)

                if (prCheck.verified === true) {


                    const res1 = await fetch("http://localhost:5000/shoppingcart/allusercartbooks", {
                        method: "GET",
                        headers: { token: localStorage.token }
                    });

                    let pR = await res1.json();

                    const res2 = await fetch("http://localhost:5000/shoppingcart/alluserbooks", {
                        method: "GET",
                        headers: { token: localStorage.token }
                    });

                    let parseRes = await res2.json();

                    if (parseRes.length == 0 && pR.length == 0) {

                        const res = await fetch("http://localhost:5000/shoppingcart/addbooktocart", {
                            method: "POST",
                            body: JSON.stringify({
                                book_id: book_id,
                                period_of_time: period_of_time,
                                book_price: price
                            }),
                            headers: {
                                token: localStorage.token,
                                "Content-type": "application/json",
                            },
                        })
                        let data = await res.json()
                        //console.log(data)


                        let totalCartUserPrice = 0;

                        if (data.length == 1) {

                            setTotalCartPrice(parseFloat(data[0].price));
                            setTotalCartBooksLength(data.length);

                        } else {

                            for (var i = 0; i < data.length; i++) {
                                totalCartUserPrice = totalCartUserPrice + parseFloat(data[i].price);
                            }

                            setTotalCartPrice(totalCartUserPrice);
                            setTotalCartBooksLength(data.length);
                        }

                        toast.success("Dodałeś ksiązkę do koszyka");



                    } else {

                        let k = 0;
                        let l = 0;

                        for (var f = 0; f < parseRes.length; f++) {
                            if (parseRes[f].book_id == book_id) {
                                k = k + 1;
                            }
                        }

                        for (var j = 0; j < pR.length; j++) {
                            if (pR[j].book_id == book_id) {
                                l = l + 1;
                            }
                        }

                        if (k == 0 && l == 0) {

                            const res = await fetch("http://localhost:5000/shoppingcart/addbooktocart", {
                                method: "POST",
                                body: JSON.stringify({
                                    book_id: book_id,
                                    period_of_time: period_of_time,
                                    book_price: price
                                }),
                                headers: {
                                    token: localStorage.token,
                                    "Content-type": "application/json",
                                },
                            })
                            let data = await res.json()
                            console.log(data)

                            let totalCartUserPrice = 0;

                            if (data.length == 1) {

                                setTotalCartPrice(parseFloat(data[0].price));
                                setTotalCartBooksLength(data.length);

                            } else {

                                for (var m = 0; m < data.length; m++) {
                                    totalCartUserPrice = totalCartUserPrice + parseFloat(data[m].price);
                                }

                                setTotalCartPrice(totalCartUserPrice);
                                setTotalCartBooksLength(data.length);
                            }


                            toast.success("Dodałeś ksiązkę do koszyka");

                        } else {
                            toast.info("Ta książka została już przez Ciebie wypożyczona lub znajduje się już w koszyku");
                        }





                    }



                } else if (prCheck.verified === false) {
                    toast.info('Twoje konto nie zostało jeszcze aktywowane. Sprawdź swoją skrzynkę pocztową, na który został wysłany klucz aktywacyjny. W przypadku braku wiadomości z kluczem aktywacyjnym, prosimy przejść do zakładki "Moje Konto" i kliknąć przycisk "Wyślij wiadomość email z kluczem aktywacyjny ponownie" ')
                }
            }

        } catch (err) {
            console.log(err.message)
        }
    }



    function handleChange(e) {

        const { value } = e.target;


        setDays(value);
        console.log(days)

        if (value == 61) {
            setPrice(book.book_price * 1);
            console.log(price)
        } else {
            if (value == 183) {
                setPrice(book.book_price * 2);
                console.log(price)
            } else {
                if (value == 7) {
                    setPrice(book.book_price * 0.2)
                    console.log(price)
                } else {
                    if (value == 1) {
                        setPrice(book.book_price * 0.1);
                        console.log(price)
                    }
                }
            }
        }
    }



    

    return (
        <Fragment>

            <div className="container-fluid main-container con-opt_borrow">
                <div id="pageContent">

                    <div className="container"></div>
                    <br></br>
                    <section className="item">
                        <div className="wrapper-max">
                            <div className="row">
                                <div className="col-lg-2">
                                    <button type="button" className="main-button main-button--red item-accept__button buybtn button-margin-main " onClick={() => history.goBack()}><i className="fas fa-arrow-left"></i>cofnij</button>
                                </div>
                                <div className="col-lg-10">
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-4 col-lg-3">
                                    <div className="item__cover">
                                        <div className="item__img">
                                            <img className="img-responsive" src={book.book_imageurl} alt={book.book_title} title={book.book_title} />
                                            <div className="discount-big item__discount">
                                                {/* <p>-<span className="book__discount">20</span>%</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-8 col-lg-5 text-color_borrow">
                                    <div className="row">
                                        <div className="col-xs-12 pad-left pad-right">
                                            <div className="item__badges">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row row__stars">
                                        <div className="col-xs-12 pad-left pad-right">
                                            <h1 className="item__title title">
                                                {book.book_title}
                                            </h1>
                                            <div className="row">
                                                <p className="col-lg-4 pad-left item__details bold-700">Autor:</p>
                                                <p className="col-lg-8 padding-left_bookborrow">
                                                    <Link to="#" className="item__details item__author author asd">{book.book_author_firstname} {book.book_author_lastname}</Link>
                                                </p>
                                            </div>
                                            <div className="row"></div>
                                            <div className="row">
                                                <p className="col-lg-4 pad-left item__details bold-700">Wydawca:</p>
                                                <p className="col-lg-8 padding-left_bookborrow">
                                                    <Link to="#" className="publisher item__details item__publisher publisher asd" title={book.book_phouse}>{book.book_phouse}</Link>
                                                </p>
                                            </div>
                                            <div className="row">
                                                <p className="col-lg-4 pad-left item__details bold-700">Format:</p>
                                                <p className="col-lg-8 item__details padding-left_bookborrow">
                                                    <span className="item__form format">
                                                        <span className="asd">{book.book_format}</span>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="row">
                                                <p className="col-lg-4 pad-left item__details bold-700">Liczba stron: </p>
                                                <p className="col-lg-8 item__details padding-left_bookborrow">
                                                    <span className="item__form format">
                                                        <span className="asd">{book.book_nm_of_pages}</span>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="row">
                                                <p className="col-lg-4 pad-left item__details bold-700">Język publikacji:</p>
                                                <p className="col-lg-8 item__details padding-left_bookborrow">
                                                    <span className="item__form format">
                                                        <span className="asd">{book.book_lang_of_publication}</span>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-lg-4 col-lg-offset-0 pad-left pad-right">
                                    <div className="row">
                                        <form className="buy-type">
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-6 col-sm-push-6 col-lg-push-0 col-lg-12 pad-left-t-15 pad-right-t-15">
                                                    <p className="item__choose-t bold-700">WYPOŻYCZ</p>
                                                    <div className="row buy-type__line buy-type__line--checked">

                                                        <div className="col-lg-12 pad-left-5 pad-right-5">
                                                            <div className="row">
                                                                <div className="col-xs-7 pad-left pad-right"></div>
                                                                <div className="col-xs-5 pad-left pad-right buy-type__price">&nbsp;</div>
                                                                <div className="col-lg-12 pad-left pad-right"></div>
                                                                <div className="col-lg-12 pad-left pad-right">
                                                                    <p className="item__choose-t">WYBIERZ DŁUGOŚĆ DOSTĘPU</p>
                                                                    <div className="row">
                                                                        <div className="col-lg-12 pad-left pad-right buy-type__av">
                                                                            <p className="item__choose-l clearfix">
                                                                                <input type="radio" value={183} name="dayAmount" id="6month" onChange={(e) => handleChange(e)} />
                                                                                <label htmlFor="6month"><span></span> 6 miesięcy</label>
                                                                                <label className="bold-500 pull-right">{(book.book_price * 2).toFixed(2)} zł</label>
                                                                            </p>
                                                                            <p className="item__choose-l clearfix">
                                                                                <input type="radio" value={61} name="dayAmount" id="2month" onChange={(e) => handleChange(e)} defaultChecked={true} />
                                                                                <label htmlFor="2month"><span></span> 2 miesiące</label>
                                                                                <label className="bold-500 pull-right">{book.book_price} zł</label>
                                                                            </p>
                                                                            <p className="item__choose-l clearfix">
                                                                                <input type="radio" value={7} name="dayAmount" id="7days" onChange={(e) => handleChange(e)} />
                                                                                <label htmlFor="7days"><span></span> 1 tydzień</label>
                                                                                <label className="bold-500 pull-right">{(book.book_price * 0.2).toFixed(2)} zł</label>
                                                                            </p>
                                                                            <p className="item__choose-l clearfix">
                                                                                <input type="radio" value={1} name="dayAmount" id="1day" onChange={(e) => handleChange(e)} />
                                                                                <label htmlFor="1day"><span></span> 1 dzień</label>
                                                                                <label className="bold-500 pull-right">{(book.book_price * 0.1).toFixed(2)} zł</label>
                                                                            </p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-sm-pull-6 col-lg-pull-0 col-lg-12 pad-left-t-15 pad-right-t-15">
                                                    <div className="item-accept">
                                                        <div className="item-accept__content">
                                                            <p>
                                                                <span className="item-accept__new">
                                                                    <span>{(price * 1).toFixed(2)}</span> zł</span>
                                                            </p>
                                                            <p className="item-accept__inf">cena zawiera podatek VAT</p>

                                                        </div>
                                                        <button type="button" className="main-button main-button--red item-accept__button buybtn" onClick={(e) => addToCart(book.book_id, days, price)} >
                                                            <img src="cart.png" alt="" /> DODAJ DO KOSZYKA</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                    <section className="book-desc">
                        <nav className="navbar navbar-default" role="navigation">
                            <div className="wrapper-max ">

                            </div>
                        </nav>
                        <div className="wrapper-max text-color_borrow">
                            <div className="row">
                                <div className="col-lg-12">
                                    <p className="book-desc__text"></p>
                                    <p>{book.book_description_full}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <table className="table text-color_borrow">
                                        <tbody>
                                            <tr><th>Ilość stron</th><td>{book.book_nm_of_pages}</td></tr>
                                            <tr><th>ISBN-13</th><td>{book.book_isbn}</td></tr>
                                            <tr><th>Język publikacji</th><td>{book.book_lang_of_publication}</td></tr>
                                            <tr><th>Numer wydania</th><td>{book.book_edition_number}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            </div>

        </Fragment>
    );
};

export default BookBorrow;