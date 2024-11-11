import React, { useState, useEffect } from "react";
import "./cssoptions/register.css";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import Spinner from './Spinner'


const Confirm = ({ match }) => {


  const history = useHistory();


  async function confirmAccount() {
    try {
      const { vkey_string } = match.params

      console.log(vkey_string)

      const response = await fetch("http://localhost:5000/auth/verify_account", {
        method: "POST",
        body: JSON.stringify({
          vkey: vkey_string,
        }),
        headers: {
          token: localStorage.token,
          "Content-type": "application/json; charset=UTF-8",
        },
      })

      const getResponse = await response.json();

      //console.log(getResponse)

      toast.success(getResponse)
      history.push(`/booklist`);

    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    confirmAccount();
    history.push(`/booklist`);
  }, []);









  return null;

}

export default Confirm;