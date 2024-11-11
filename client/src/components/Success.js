import React, { useState, useEffect } from "react";
import "./cssoptions/success.css";
import { toast } from "react-toastify";
import { Link, useHistory, useLocation } from "react-router-dom";
import Spinner from './Spinner'


const Success = ({ setTotalPrice, setCartBooks}) => {

  const search = useLocation();

  const history = useHistory();


  async function successfulPurchase() {
    try {




      const response = await fetch(`http://localhost:5000/shoppingcart/order/success${search.search}`, {
        method: "POST",
        headers: {
          //   token: localStorage.token,
          "Content-type": "application/json; charset=UTF-8",
        },
      })

         const getResponse = await response.json();
        console.log(getResponse)

        if (getResponse === "TRUE") {
          setTotalPrice(0);
          setCartBooks(0);
        } else {
          history.push(`/booklist`)
        }


      //   //console.log(getResponse)

      //   toast.success(getResponse)
      //   history.push(`/booklist`);

    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    successfulPurchase();
    //history.push(`/booklist`);
  }, []);









  return (

    <div className="thankyou-page bottom-marg">
      <div className="_header">
        <div className="logo">
        </div>
        <h1>Dziękujemy!</h1>
      </div>
      <div className="_body">
        <div className="_box">
          <h2>
            <center><strong>Płatność została zakończona sukcesem.</strong></center>
          </h2>
          <center>
            <p>
              Ksiązki z wykupionym dostępem znajdują się w zakładce <strong>Moje konto</strong>. Dziękujemy serdecznie za zakupy na naszej stronie!
            </p>
          </center>
        </div>
      </div>
      <div className="_footer">
        <Link to="/booklist" className="btn">Powróć na stronę główną</Link>
      </div>
    </div>

  )

}

export default Success;