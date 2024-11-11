import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./cssoptions/myAccount.css";
import { Collapse } from "react-collapse";




const HistoryOfOrders = ({ setAuth }) => {

    
    const [userEmail, setUserEmail] = useState([]);
    const [orders, setOrders] = useState([]);
    const [ordersContentInfo, setOrdersContentInfo] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    






  


    useEffect(() => {
		const getHistoryOfOrderInfo= async () =>{
            
			const response = await fetch("http://localhost:5000/dashboard/username-data", {
			method: "GET",
            headers: {token: localStorage.token}
		  });
          const parseRes = await response.json();
        
          setUserEmail(parseRes.user_email);
         
          const response2 = await fetch("http://localhost:5000/dashboard/getuserorders-paid", {
			method: "GET",
            headers: {token: localStorage.token}
		  });
          const parseRes2 = await response2.json();

          setOrders(parseRes2);

          const response3 =  await fetch("http://localhost:5000/dashboard/getordercontent", {
            method: "POST",
            body: JSON.stringify({
              order_id: 9,
            }),
            headers: {token: localStorage.token,
                "Content-type": "application/json; charset=UTF-8",},
          })
          
          const parseRes3 = await response3.json();
          setOrdersContentInfo(parseRes3);
          
		}

		getHistoryOfOrderInfo();
      }, []);

    
      


      async function handleAction(id, index) {

        setActiveIndex(activeIndex === index ? null : index)
        
        setOrdersContentInfo([]);
        
            const response =  await fetch("http://localhost:5000/dashboard/getordercontent", {
            method: "POST",
            body: JSON.stringify({
              order_id: id,
            }),
            headers: {token: localStorage.token,
                "Content-type": "application/json; charset=UTF-8",},
          })
          
          const parRes = await response.json();

          //console.log(parRes)
          setOrdersContentInfo(parRes);
        

    } 
      
   


    //const show = menu ? "show" : "" ;

    return (

        <div className="marg-op_new1">
            <div className="container marg-op_new1"> </div>

                <section className="account-menu">
                    <div className="wrapper-max">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="account__user_g clearfix">
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
                                        
                                        
                                                <li className="nav-item">
													<Link to="/myaccount/mybooks" className="nav-link">Twoje książki</Link>
												</li>
                                                <li className="nav-item">
													<Link to="/myaccount/password_change" className="nav-link">Zmiana hasła</Link>
												</li>
                                                <li className="nav-item">
													<Link to="/myaccount/userdata_change" className="nav-link">Dane konta</Link>
												</li>
                                                <li className="nav-item active">
													<Link to="/myaccount/history_of_orders" className="nav-link">Historia zamówień</Link>
												</li>

                                        </ul>
                                    </div>
                                    </nav>
                            </div>
                        </div>
                </div>
            </section>
            <div className='wrapper-max'>
            <div className="row">
                <div className="col-lg-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse"></div>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">

                                <li className="nav-item active">
                                    <Link to="/myaccount/history_of_orders" className="nav-link">Opłacone</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/myaccount/history_of_orders/unpaid" className="nav-link">Nieopłacone</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            </div>
                        <div className="account-nav">
                            <div className="wrapper-max">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="tab-content">  
                                            <div className="tab-pane active">
                                                <section className="history">
                                                {orders.map((d, index) => 
                                                    <div key={d.order_id}>
                                                        <div className="history__top">
                                                        
                                                            <div className="row text-color-myaccount">
                                                                <div className="col-xs-8 col-sm-8 col-lg-9 pad-left">
                                                                    <p>Numer zamówienia: <span className="bold-600">{d.order_id}</span></p>
                                                                    <p>Data zamówienia: <span className="bold-600">{(d.date_of_order).toString().substring(0, 10)}</span> r.</p>
                                                                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={"#"+index} aria-expanded="false" aria-controls={index} onClick={event => handleAction(d.order_id, index)}>Więcej szczegółów <i className="fa fa-arrow-down "></i></button>
                                                                </div>
                                                                <div className="col-xs-4 col-sm-4 col-lg-3 pad-left-5 pad-right-5 shelf-right pad-right">
                                                                    <div className="history__right">
                                                                        <p className="bold-600">Suma: <span>{d.total_price}</span><span> zł</span></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                        
                                                            <section className="account__shelf book-order_history text-color-myaccount">
                                                                <Collapse isOpened={activeIndex === index}>
                                                            {ordersContentInfo.map(dd => 
                                                                <div className={classNames("row", {
                                                                    show: activeIndex === index,
                                                                    hide: activeIndex !== index
                                                                    })}  key={dd.order_content_id}>

                                                                    <div className="col-xs-12 col-sm-8 col-lg-9 pad-right pad-left buy-b__left">
                                                                        <div className="buy-b__content">
                                                                            <div className="row">
                                                                                <div className="col-xs-3 col-lg-2 pad-left-10 pad-right pad-right-d pad-left-t">
                                                                                    <div className="buy-b__subscribe">
                                                                                        <img className="img-responsive" src={dd.book_imageurl} alt={dd.book_title}/>
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-xs-9 col-lg-10">
                                                                                    <div className="buy-b__text-box">
                                                                                        <p className="buy-b__inf buy-b__inf--t">{dd.book_title}</p>
                                                                                        <p className="buy-b__inf">Autor: <span>{dd.book_author_firstname} {dd.book_author_lastname}</span></p>
                                                                                        <p className="buy-b__inf">Rodzaj dostępu: <span>{dd.book_format}</span></p>
                                                                                        <p className="buy-b__inf">Wydawnictwo: <span>{dd.book_phouse}</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xs-12 col-sm-4 col-lg-3 pad-left-5 pad-right-5 shelf-right">
                                                                        <div className="history__price">
                                                                            <p>{dd.single_book_price} zł</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            </Collapse>
                                                            </section>
                                                            
                                                        </div>
                                                    </div>
                                                    )}
                                                    {orders.length === 0 && <p className="history-margins_top_bottom text-center colored-text"><b>BRAK HISTORII ZAMÓWIEŃ</b></p>}
                                                </section>
                                            </div>
                                        
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               
    )
        

}

export default HistoryOfOrders;