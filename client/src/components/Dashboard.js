import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/username-data", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      //console.log(parseRes);
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);

    }
  }

  const logout = eve => {
    eve.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Wylogowałeś się pomyślnie");
  }

  useEffect(() => {
    getName();

  }, []);


  return (
    <Fragment>
      <h1> Dashboard {name} </h1>
      <button className="btn btn-primary" onClick={eve => logout(eve)}>Wyloguj</button>

    </Fragment>
  );
};

export default Dashboard;