import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./cssoptions/myAccount.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MyAccount = ({ setAuth, }) => {



    const [userBooks, setUserBooks] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userVerified, setUserVerified] = useState(true);
    const [selectedBookId, setSelectedBookId] = useState("");
    const history = useHistory();



    useEffect(() => {
        const getUserBooks = async () => {
            try {

                const response = await fetch("http://localhost:5000/shoppingcart/alluserbooks", {
                    method: "GET",
                    headers: {
                        token: localStorage.token,
                        "Content-type": "application/json"
                    }
                });
                const parseRes = await response.json();
                console.log(parseRes);

                let tempArr = [];

                if (parseRes.length !== 0) {

                    const dateNowNew = new Date();
                    const dateNow = new Date(new Date(dateNowNew).getTime() + 1000 * 60 * 60 * 24);
                    let k = 0;
                    //console.log("Data dzisiejsza" + dateNow);

                    for (var i = 0; i < parseRes.length; i++) {
                        let resDate = new Date(parseRes[i].access_to);
                        //console.log("Data z bazy danych!" + resDate);
                        if (resDate.getTime() < dateNow) {
                            tempArr[k] = parseRes[i];
                            k = k + 1;
                        }
                    }

                    let result = [];

                    if (tempArr.length !== 0) {

                        result = parseRes.filter(pR => tempArr.some(tA => pR.book_id !== tA.book_id));


                        await fetch("http://localhost:5000/dashboard/changeaccesstoexpiredbook", {
                            method: "PUT",
                            body: JSON.stringify(tempArr),
                            headers: {
                                token: localStorage.token,
                                'Content-Type': 'application/json'
                            }
                        });

                        setUserBooks(result);

                    } else {

                        setUserBooks(parseRes);
                    }

                }
            } catch (err) {
                console.error(err.message);
            }
            //console.log(tempArr);
            //setUserBooks(parseRes);


        }


        getUserBooks();
    }, []);

    useEffect(() => {
        const getUserEmail = async () => {
            try {


                const response = await fetch("http://localhost:5000/dashboard/username-data", {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
                const parseRes = await response.json();
                setUserEmail(parseRes.user_email);
                setUserVerified(parseRes.verified)


            } catch (err) {
                console.error(err.message);
            }

        }


        getUserEmail();
    }, []);




    function handleReadPDF(id) {

        const newList = userBooks.filter((item) => item.book_id === id);
        //console.log(newList[0].book_id);
        setSelectedBookId(newList[0].book_id);
        history.push(`/myaccount/mybooks/${newList[0].book_id}`);

    }

    async function sendVerificationEmail() {

        try {


            const response = await fetch("http://localhost:5000/auth/resend_verification_email", {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            toast.info(parseRes)

        } catch (err) {
            console.error(err.message);
        }


    }





    return (

        <div className="marg-op_new1">
            <div className="container marg-op_new1"> </div>

            <section className="account-menu">
                <div className="wrapper-max">
                    <div className="row">
                        <div className="col-lg-6">
                            {userVerified === false && <div className="account__user clearfix">
                                <p className="align-right_opt text-color-myaccount"><button type="button" className="main-button main-button--red item-accept__button buybtn" onClick={() => sendVerificationEmail()}>
                                    WYŚLIJ EMAIL AKTYWACYJNY</button></p>
                            </div>}

                            {/* <PDFViewer url="/books_pdf/bibliawindowsserver2019.pdf"/> */}
                        </div>
                        <div className="col-lg-6">
                            <div className="account__user_new clearfix">
                                <p className="align-right_opt text-color-myaccount">Jesteś zalogowany/a jako <span>{userEmail}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <div className="collapse navbar-collapse"></div>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">

                                        <li className="nav-item active">
                                            <Link to="/myaccount/mybooks" className="nav-link">Twoje książki</Link>
                                        </li>
                                        <li className="nav-item">
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
                    <div className="account__books">
                        <div className="wrapper-max">
                            <div className="list-wrapper">
                                {userBooks.map(d =>
                                    <div className="row" key={d.book_id}>

                                        <section className="account__shelf buy-b__book">

                                            <div className="row">
                                                <div className="col-lg-9 pad-right pad-left">
                                                    <div className="buy-b__content">
                                                        <div className="row">
                                                            <div className="col-lg-3 col-lg-2 pad-left-10 pad-right pad-right-d">
                                                                <img className="img-responsive buy-b__cover" src={d.book_imageurl} alt={d.book_title} />
                                                            </div>
                                                            <div className="col-lg-9 text-color-myaccount">
                                                                <div>
                                                                    <p className="buy-b__inf buy-b__inf--t">{d.book_title}</p>
                                                                    <p className="buy-b__inf">Autor: {d.book_author_firstname} {d.book_author_lastname}</p>
                                                                    <p className="buy-b__inf">Wydawnictwo: {d.book_phouse}</p>
                                                                    <p className="buy-b__inf">Format: <span>{d.book_format}</span></p>
                                                                    <p className="buy-b__inf"><b>Dostęp do: </b><span>{(d.access_to).toString().substring(0, 10)}</span></p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-lg-3 pad-left-5 pad-right-5 shelf-right">
                                                    <div className="shelf-right__content clearfix ">
                                                        <button type="button" className="btn btn-primary button-add_opt" onClick={() => handleReadPDF(d.book_id)}>Czytaj <i className="fas fa-book"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    </div>
                                )}
                                {userBooks.length === 0 && <p className="history-margins_top_bottom text-center colored-text"><b>Brak książek na półce</b></p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default MyAccount;