import React, {Fragment, useState, useEffect} from "react";
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter, BrowserRouter as  Router, Switch, Route, Redirect } from "react-router-dom";




import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import BookList from "./components/BookList";
import BookBorrow from "./components/BookBorrow";
import CategoryBookList from "./components/CategoryBookList";
import ShoppingCart from "./components/ShoppingCart";
import ShoppingCartUserData from "./components/ShoppingCartUserData";
import ShoppingCartSummary from "./components/ShoppingCartSummary";
import MyAccount from "./components/MyAccount";
import PDFViewBook from "./components/PDFViewBook";
import SearchBookList from "./components/SearchBookList";
import PasswordChange from "./components/PasswordChange";
import UserDataChange from "./components/UserDataChange";
import HistoryOfOrders from "./components/HistoryOfOrders";
import AdminAddBook from "./components/AdminAddBook";
import AdminAddUser from "./components/AdminAddUser";
import Confirm from "./components/Confirm";
import NotFound404 from "./components/NotFound404";
import Unpaid from "./components/Unpaid";
import Success from "./components/Success";


toast.configure();




let App = (props) => {

  let location = props.location;
  let hideIf = location.pathname && location.pathname.match(/^\/myaccount\/mybooks\/[0-9]+$/);
  //console.log('hideIf', hideIf);


  const [userRole, setUserRole] = useState("");
  const [categoryBookListData, setCategoryBookListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [totalCartBookLength, setTotalCartBooksLength] = useState(0);
  const [state, setState] = useState(null);
  const [url, setUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState('page1');
  const [allBooks, setAllBooks] = useState([]);
  const [currentPageCategory, setCurrentPageCategory] = useState(1);
  const [booksCategory, setBooksCategory] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [selectOptionBook, setSelectOptionBook] = useState('0');
  const [booksSearch, setBooksSearch] = useState([]);
  const [cartBooks, setCartBooks] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchT, setSearchT] = useState('')


  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      //console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    isAuth();

  });





  return (
    <Fragment>


      {!hideIf && <Header searchT={searchT}  setSearchT={setSearchT} setSearchTerm={setSearchTerm} totalPrice={totalPrice} setTotalPrice={setTotalPrice} cartBooks={cartBooks} setCartBooks={setCartBooks} totalCartPrice={totalCartPrice} totalCartBookLength={totalCartBookLength} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} userRole={userRole} setAllBooks={setAllBooks} setActiveMenu={setActiveMenu} setCurrentPage={setCurrentPage} setBooksPerPage={setBooksPerPage} booksSearch={booksSearch} setBooksSearch={setBooksSearch} />}

      <Switch>
        {/* <Route exact path="/" component={Login} />  */}
        <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} setUserRole={setUserRole} /> : <Redirect to="/booklist" />} />
        <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/shopcart" render={props => isAuthenticated ? <ShoppingCart {...props} isAuthenticated={isAuthenticated} setTotalCartPrice={setTotalCartPrice} setTotalCartBooksLength={setTotalCartBooksLength} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/shopcart_userdata" render={props => isAuthenticated ? <ShoppingCartUserData {...props} isAuthenticated={isAuthenticated} setTotalCartPrice={setTotalCartPrice} setTotalCartBooksLength={setTotalCartBooksLength} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/shopcart_summary" render={props => isAuthenticated ? <ShoppingCartSummary {...props} isAuthenticated={isAuthenticated} setTotalCartPrice={setTotalCartPrice} setTotalCartBooksLength={setTotalCartBooksLength} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/admin/addbook" render={props => isAuthenticated && (userRole === "admin") ? <AdminAddBook {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/admin/adduser" render={props => isAuthenticated && (userRole === "admin") ? <AdminAddUser {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/myaccount/mybooks" render={props => isAuthenticated ? <MyAccount {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/myaccount/mybooks/:book_id" render={props => isAuthenticated ? <PDFViewBook {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/myaccount/password_change" render={props => isAuthenticated ? <PasswordChange {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/myaccount/userdata_change" render={props => isAuthenticated ? <UserDataChange {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/myaccount/history_of_orders" render={props => isAuthenticated ? <HistoryOfOrders {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/myaccount/history_of_orders/unpaid" render={props => isAuthenticated ? <Unpaid {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
        <Route exact path="/booklist" render={props => <BookList {...props} setCategoryBookListData={setCategoryBookListData} setState={setState} setCurrentPage={setCurrentPage} currentPage={currentPage} setUrl={setUrl} activeMenu={activeMenu} setActiveMenu={setActiveMenu} allBooks={allBooks} setAllBooks={setAllBooks} setCurrentPageCategory={setCurrentPageCategory} booksPerPage={booksPerPage} setBooksPerPage={setBooksPerPage} setSelectOptionBook={setSelectOptionBook} selectOptionBook={selectOptionBook} />} />
        <Route exact path="/booklist/:book_category" render={props => <CategoryBookList {...props} categoryBookListData={categoryBookListData} state={state} url={url} currentPage={currentPage} setCurrentPage={setCurrentPage} booksCategory={booksCategory} setBooksCategory={setBooksCategory} activeMenu={activeMenu} setActiveMenu={setActiveMenu} booksPerPage={booksPerPage} setBooksPerPage={setBooksPerPage} setSelectOptionBook={setSelectOptionBook} selectOptionBook={selectOptionBook} />} />
        <Route exact path="/book/:book_title" render={props => <BookBorrow {...props} setTotalCartPrice={setTotalCartPrice} setTotalCartBooksLength={setTotalCartBooksLength} isAuthenticated={isAuthenticated} setCurrentPage={setCurrentPage} currentPage={currentPage} />} />
        <Route exact path="/search" render={props => <SearchBookList {...props} searchT={searchT}  setSearchT={setSearchT} setUrl={setUrl} setState={setState} searchTerm={searchTerm} setCurrentPage={setCurrentPage} currentPage={currentPage} activeMenu={activeMenu} setActiveMenu={setActiveMenu} searchBooks={searchBooks} setSearchBooks={setSearchBooks} setCurrentPageCategory={setCurrentPageCategory} booksPerPage={booksPerPage} setBooksPerPage={setBooksPerPage} setSelectOptionBook={setSelectOptionBook} selectOptionBook={selectOptionBook} booksSearch={booksSearch} setBooksSearch={setBooksSearch} />} />
        <Route exact path="/order/success" render={props => <Success {...props}  setTotalPrice={setTotalPrice} setCartBooks={setCartBooks} setTotalCartPrice={setTotalCartPrice} setTotalCartBooksLength={setTotalCartBooksLength}/>} />
        <Route exact path="/confirm/:vkey_string" render={props => <Confirm {...props} setAuth={setAuth} />} /> 
        <Route component={NotFound404} />

      </Switch>





      {!hideIf && <Footer />}

    </Fragment>
  );
}

export default App = withRouter(App);;
