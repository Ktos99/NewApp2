import React from 'react';
//import Spinner from './Spinner.js';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

const BooksListShow = ({books, loading}) => {

	if (loading) {
		return <center><Spinner animation="border" role="status">
		{/* <span className="visually-hidden">Loading...</span> */}
	  </Spinner></center>
	}

	
return (
    books.map(d => 
	<div className="row book-list_look" key={d.book_id}>
						
						<div className="col-lg-12 pad-left-d">
							<div className="row">
								<div className="col-xs-4 col-sm-2 col-lg-3 pad-left pad-right">
									
									<Link to={`/book/${d.book_title}`}>
										<div className="position__discount">
											<img className="img-responsive position__cover cover" src={d.book_imageurl} alt={d.book_title} width="157"/>
											<div className="discount-big visible-lg">
												{/* <p>-<span className="book__discount">15</span>%</p> */}
											</div>
										</div>
										</Link>
									
								</div>
								<div className="col-xs-8 col-sm-10 col-lg-9 pad-right pad-left-t-25 pad-left-d-20 pad-left-xd">
									<div className="wrapper__data-book">
										{/* <div className="row">
											<div className="col-sm-12 hidden-xs pad-left">
												<span className="badge-first"></span>
												<a href="#" className="item__badge item__badge--first" title="nowość">
													<span></span></a>
												<a href="#" className="item__badge item__badge--third" title="promocja">
													<span></span></a>
											</div>
										</div> */}
										
										<div className="view__title">
											<Link to={`/book/${d.book_title}`}>
												<h2 className="position__inf position__inf--title bold-600 title">{d.book_title}</h2>
											</Link>
										</div>
								
										<div className="row row__stars">

										</div>
										<div className="view__inf">
											<p className="position__inf">Autor: <a href="#" className="book-author">{d.book_author_firstname} {d.book_author_lastname}</a> </p>
											<p className="position__inf row__publisher">Wydawnictwo: <a href="#" className="publisher">{d.book_phouse}</a></p>
											<p className="position__inf position__inf--form">Format: <span className="format">{d.book_format}</span></p>
										</div>

									</div>
									<div className="wrapper__price-book">

										<div className="view__description">
										<p className="position__inf position__inf--description book-description">{d.book_description_short} <span><Link to={`/book/${d.book_title}`}>więcej&nbsp;&gt;</Link></span></p>
										</div>
										<div className="view__price">
										<p className="position__inf position__inf--prices js-book__price">
										
												<span className="position__price price">{d.book_price} zł</span>
												{/* <span className="position__prevprice prev-price">41,00</span>
												<span className="position__prevprice"> zł</span> */}
												</p>
										</div>
									</div>
								</div>
							</div>
						</div>	
                    </div>
    )
);
    
                                        };

export default BooksListShow;