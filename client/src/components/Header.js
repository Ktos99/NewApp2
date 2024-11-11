import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import '../App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ setAuth, setSearchT,cartBooks, setCartBooks,totalPrice, setTotalPrice,setBooksPerPage, setSearchTerm, totalCartBookLength, totalCartPrice, isAuthenticated, setIsAuthenticated, setUserRole, setAllBooks, setActiveMenu, setCurrentPage, setBooksSearch }) => {


  // const [cartBooks, setCartBooks] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [value, setValue] = useState("");
  const [userR, setUserR] = useState("");
  const history = useHistory();



  async function handleClick(value) {
    try {

      if (value.length === 0) {

        toast.info("Pole wyszukiwania jest puste!")

      } else {
        //console.log(value)
        setSearchT(value);
        setActiveMenu('page1')
        setCurrentPage(1);
        setBooksPerPage(5);

        const response = await fetch(`http://localhost:5000/booklist/?name=${value}`, {
          method: "GET",
          headers: { "Content-type": "application/json" }
        });


        const parseRes10 = await response.json();


        console.log(parseRes10)
        setBooksSearch(parseRes10)
        history.push(`/search?name=${value}`);
      }

    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = eve => {
    eve.preventDefault();

    localStorage.removeItem("token");



    setIsAuthenticated(false);
    setUserRole("");
    setUserR("");
    toast.success("Wylogowałeś się pomyślnie");
  }




  useEffect(() => {
    const getCartBooks = async () => {

      if (isAuthenticated === false) {

        setUserRole("");
        //setUserR("");
        setTotalPrice(0.00);
        setCartBooks(0);
        //console.log(userR)

      } else {

        const response3 = await fetch("http://localhost:5000/dashboard/username-role", {
          method: "GET",
          headers: { token: localStorage.token }
        });
        const parseRes3 = await response3.json();

        setUserR(parseRes3);
        setUserRole(userR);
        //console.log(userR)


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

        if (totalCartBookLength === 0) {
          setTotalPrice(total);
          setCartBooks(parseRes.length);

        } else {

          setTotalPrice(totalCartPrice);
          setCartBooks(totalCartBookLength);
        }

        // const response2 = await fetch("http://localhost:5000/dashboard/username-role", {
        //     		method: "GET",
        //     		headers: {token: localStorage.token}
        //     	  });
        //     	  const parseRes2 = await response2.json();

        //         setUserRole(parseRes2);

      }

      //console.log(userRole);
    }

    getCartBooks();
  }, [isAuthenticated, totalCartBookLength, totalCartPrice, setUserRole, userR]);


  // useEffect(() => {

  //   const getUserRole = async () =>{

  //     const response3 = await fetch("http://localhost:5000/dashboard/username-role", {
  //     method: "GET",
  //     headers: {"Content-type":"application/json"}
  //     });
  //     const parseRes3 = await response3.json();

  //     setUserRole(parseRes3);



  //   getUserRole();
  // }});





  const onChangeInput = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };


  async function getAllBooksEvent() {
    try {
      setAllBooks([]);
      const response = await fetch("http://localhost:5000/bookList/books/allbooks", {
        method: "GET",
        headers: { "Content-type": "application/json" }
      });
      const parseRes = await response.json();

      setAllBooks(parseRes);
      setActiveMenu('page1');
      setCurrentPage(1);
      setBooksPerPage(5);

    } catch (err) {
      console.error(err.message);
    }
  }


  return (
    <Fragment>
      <div>

        <nav className="navbar navbar-expand-lg navStyle fixed-top">
          {/* <a className="brand-navbar" href="#"><img src="image/logo.png" alt="Internetowa wypożyczalnia książek" height="60px"/></a> */}
          <button className="navbar-toggler" data-toggle="collapse" data-target="#mainMenu">
            <span><i className="fas fa-align-right iconStyle"></i></span>
          </button>

          {(isAuthenticated === true && userR === "admin" &&
            <div className="collapse navbar-collapse" id="mainMenu">
              <ul className="navbar-nav ml-auto navList">
                <li className="nav-item">
                  <Link to="/admin/addbook"><i className="fas fa-book"></i>Panel admina</Link>
                </li>
                <li className="nav-item">
                  <Link to="/booklist" onClick={getAllBooksEvent}><i className="fas fa-book"></i>Lista E-book'ów</Link>
                </li>
                <li className="nav-item">
                  <Link to="/myaccount/mybooks"><i className="fas fa-user"></i>Moje konto</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register"><i className="fas fa-unlock"></i>Rejestracja</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" onClick={eve => logout(eve)}><i className="fas fa-unlock"></i>Wyloguj</Link>
                </li>
              </ul>
            </div>)
            || (isAuthenticated === true && userR === "admin" &&
              <div className="collapse navbar-collapse" id="mainMenu">
                <ul className="navbar-nav ml-auto navList">
                  <li className="nav-item">
                    <Link to="/admin/addbook"><i className="fas fa-book"></i>Panel admina</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/booklist" onClick={getAllBooksEvent}><i className="fas fa-book"></i>Lista E-book'ów</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/myaccount/mybooks"><i className="fas fa-user"></i>Moje konto</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register"><i className="fas fa-unlock"></i>Rejestracja</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" onClick={eve => logout(eve)}><i className="fas fa-unlock"></i>Wyloguj</Link>
                  </li>
                </ul>
              </div>)
            || (isAuthenticated === true &&
              <div className="collapse navbar-collapse" id="mainMenu">
                <ul className="navbar-nav ml-auto navList">
                  <li className="nav-item">
                    <Link to="/booklist" onClick={getAllBooksEvent}><i className="fas fa-book"></i>Lista E-book'ów</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/myaccount/mybooks"><i className="fas fa-user"></i>Moje konto</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register"><i className="fas fa-unlock"></i>Rejestracja</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" onClick={eve => logout(eve)}><i className="fas fa-unlock"></i>Wyloguj</Link>
                  </li>
                </ul>
              </div>)
            || (isAuthenticated === false &&
              <div className="collapse navbar-collapse" id="mainMenu">
                <ul className="navbar-nav ml-auto navList">
                  <li className="nav-item">
                    <Link to="/booklist" onClick={getAllBooksEvent}><i className="fas fa-book"></i>Lista E-book'ów</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/myaccount/mybooks"><i className="fas fa-user"></i>Moje konto</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register"><i className="fas fa-unlock"></i>Rejestracja</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login"><i className="fas fa-unlock"></i>Logowanie</Link>
                  </li>
                </ul>
              </div>)}


        </nav>
        <div className="sticky-top">

          <section className="menu navbar-fixed">
            <div className="wrapper-max">
              <div className="row margins-opt">
                <div className="col-xs-9 col-sm-8 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-md-6 menu__loupe-pos">
                  <div className="d-flex">
                    <input className="form-control" placeholder="Wpisz tytuł, autora ksiązki lub zwrot..." value={value} onChange={onChangeInput} />
                    
                      <div onClick={(e) => handleClick(value)} className="btn btn-primary">
                        <i className="fa fa-search" />
                      </div>
                    
                  </div>
                </div>
                <div className="col-xs-2 col-sm-1 col-md-2 col-lg-1 right-shopcart text-center">

                  <Link to="/shopcart"><div className="btn btn-success"><i className="fa fa-shopping-cart"></i></div>
                    <span className="right-cart-number">{cartBooks}</span></Link>

                </div>
                <div className="col-sm-2 col-md-1 col-lg-1 visible-sm visible-md visible-lg pad-left show__basket basket__word span_opt">

                  <Link to="/shopcart" className="menu__cost"><span className="span_spec">KOSZYK</span>
                    <span><strong className="totalprice">{totalPrice.toFixed(2)}</strong> zł</span></Link>

                </div>
              </div>
            </div>
          </section>



          {/* <nav className="navbar navbar-expand-lg navStyle fixed-top-2">
           <div className="collapse navbar-collapse" id="mainMenu">
                <ul className="navbar-nav ml-auto navList">
                    <li className="nav-item active">
                    <div className="span12">
                      <form id="custom-search-form" className="form-search form-horizontal pull-right">
                         <div className="input-append span12">
                           <input type="text" className="search-query" placeholder="Search"/>
                           <button type="submit" className="btn"><i className="fas fa-search"></i></button>
                         </div>
                      </form>
                    </div>
                      </li>
                      
               
          
        
                    <li className="nav-item">
                        
                    </li>
                    <li className="nav-item">
                        
                    </li>
                    <li className="nav-item">
                        
                    </li> 
                </ul>
            </div>
        </nav>    */}
        </div>
      </div>
    </Fragment>
  );


};

export default Header;