import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./cssoptions/bookList.css";
import BooksListShow from "./BookListShow.js";
import Pagination from "./Pagination.js";
import Spinner from 'react-bootstrap/Spinner'



const BookList = ({ setAuth, setSelectOptionBook, selectOptionBook, allBooks, setAllBooks, setState, setUrl, setCurrentPage, currentPage, activeMenu, setActiveMenu, setCurrentPageCategory, setBooksPerPage, booksPerPage }) => {



	//const [allBooks, setAllBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [focused, setFocused] = useState(false);
	const [focused2, setFocused2] = useState(false);
	const [value1, setValue1] = useState("");
	const [value2, setValue2] = useState("");
	const history = useHistory();
	const location = useLocation();

	const onFocus = () => setFocused(true);
	const onBlur = () => setFocused(false);
	const onFocus2 = () => setFocused2(true);
	const onBlur2 = () => setFocused2(false);
	//const [currentPage, setCurrentPage] = useState(1);


	//const [booksPerPage, setBooksPerPage] = useState(5);



	const [appState, changeState] = useState({
		activeObject: null,
		objects: [
			{ id: 1, name: "Ekonomia", value: "Ekonomia", path: "/booklist/ekonomia" },
			{ id: 2, name: "Nauki humanistyczne", value: "Nauki humanistyczne", path: "/booklist/nauki_humanistyczne" },
			{ id: 3, name: "Czasopisma Naukowe", value: "Czasopisma naukowe", path: "/booklist/czasopisma_naukowe" },
			{ id: 4, name: "Przewodniki", value: "Przewodniki", path: "/booklist/przewodniki" },
			{ id: 5, name: "Prawo", value: "Prawo", path: "/booklist/prawo" },
			{ id: 6, name: "Nauki matematyczno-przyrodnicze", value: "nauki matematyczno-przyrodnicze", path: "/booklist/nauki_matematyczno_przyrodnicze" },
			{ id: 7, name: "Medycyna", value: "Medycyna", path: "/booklist/medycyna" },
			{ id: 8, name: "Informatyka", value: "Informatyka", path: "/booklist/informatyka" }
		]
	});



	useEffect(() => {

		
		const getBooks = async () => {

			setLoading(true)
			if (allBooks.length === 0) {
				const response = await fetch("http://localhost:5000/bookList/books/allbooks", {
					method: "GET",
					headers: { "Content-type": "application/json" }
				});
				const parseRes = await response.json();

				setAllBooks(parseRes);
			}
			setLoading(false)
		}

		getBooks();
		
	}, []);


	//   useEffect(() => {

	// 	loadPage();
	//   }, [loadPage(), booksPerPage, valueR]);

	//  async function loadPage() {


	//     const params = new URLSearchParams(window.location.search);
	// 	const page = parseInt(params.get('page')) || 1;
	// 	const limit = parseInt(params.get('limit')) || 5;
	// 	const order = parseInt(params.get('order')) || 1 || 2 || 3;

	//     if (page !== pager.currentPage || booksPerPage !== limit || valueR !== order ) {
	// 	   await fetch(`http://localhost:5000/booklist/books/allbooks?page=${page}&limit=${booksPerPage}&order=${valueR}`, 
	// 			   { method: 'GET' })
	// 					.then(response => response.json())
	// 					.then(({pager, pageOfItems}) => {
	// 						setPager(pager);
	// 						setPageOfItems(pageOfItems);
	// 						setBooksPerPage(limit);
	// 						setValueR(order);
	// 					});
	//     }
	// }

	function handleClick(index, element) {
		try {

			changeState({ ...appState, activeObject: appState.objects[index] });
			setState(appState.objects[index]);
			console.log(appState.objects[index]);
			setUrl(element);
			setActiveMenu('page1');
			setCurrentPageCategory(1);
			setBooksPerPage(5);

		} catch (err) {
			console.error(err.message);
		}
	}


	function handleValueChange(e) {

		e.preventDefault();
		const { value } = e.target;

		setBooksPerPage(value);

	}

	async function handleBooksOrder(e) {

		e.preventDefault();

		const { value } = e.target;


		if (value === "0") {

			setSelectOptionBook(value)

			const response = await fetch("http://localhost:5000/booklist/books/allbooksorderalphabet", {
				method: "GET",
				headers: { "Content-type": "application/json" }
			});

			const parseRes = await response.json();

			setAllBooks(parseRes);






		} else {



			if (value === "1") {

				setSelectOptionBook(value)

				const response = await fetch("http://localhost:5000/booklist/books/allbooksorderviews", {
					method: "GET",
					headers: { "Content-type": "application/json" }
				});

				const parseRes = await response.json();

				setAllBooks(parseRes);

			} else {

				if (value === "2") {

					setSelectOptionBook(value)

					const response = await fetch("http://localhost:5000/booklist/books/allbooksordernew", {
						method: "GET",
						headers: { "Content-type": "application/json" }
					});

					const parseRes = await response.json();

					setAllBooks(parseRes);
				}

			}

		}


	}


	// function toggleActive(index) {
	// 	changeState({...appState, activeObject: appState.objects[index]});
	// }


	function toggleActiveStyles(index) {
		if (appState.objects[index] === appState.activeObject) {
			return "active-menu";
		} else {
			return "";
		}
	}

	let currentBooks = null;
	const indexOfLastBook = currentPage * booksPerPage;
	const indexOfFirstPost = indexOfLastBook - booksPerPage;
	currentBooks = allBooks.slice(indexOfFirstPost, indexOfLastBook);
	//console.log(currentBooks);




	//console.log(currentBooks);

	const onChangeInput = (event) => {
		setValue1(event.target.value);
		console.log(event.target.value);
	};

	const onChangeInput2 = (event) => {
		setValue2(event.target.value);
		console.log(event.target.value);
	};

	async function handleClick(value1, value2) {
		try {
			const query = new URLSearchParams(location.search);
			console.log(location)
			//console.log(query)
			if (value1 > value2 && value2.length > 0) {
				setValue1(value2)
				setValue2(value1)
			}

			if (value1.length > 0 && value2.length === 0 && location.search === '') {
				query.set('pricefrom', value1.toString())
				history.push(`/booklist?${query.toString()}`)
			}

			if (value1.length > 0 && value2.length === 0 && location.search != '') {
				if (query.get('pricefrom') != null && query.get('priceto') === null) {
					//query.delete('priceto')
					history.push(`/booklist?pricefrom=${value1.toString()}`)
				} else {
					query.delete('priceto')
					query.set('pricefrom', value1.toString())
					history.push(`/booklist?${query.toString()}`)
				}
			}

			if (value1.length === 0 && value2.length > 0 && location.search === '') {
				query.set('priceto', value2.toString())
				history.push(`/booklist?${query.toString()}`)
			}

			if (value1.length === 0 && value2.length > 0 && location.search != '') {
				if (query.get('pricefrom') === null && query.get('priceto') != null) {
					//query.set('priceto', value2.toString())
					history.push(`/booklist?priceto=${value2.toString()}`)
				} else {
					query.delete('pricefrom')
					query.set('priceto', value2.toString())
					history.push(`/booklist?${query.toString()}`)
				}
			}

			if (value1.length > 0 && value2.length > 0 && location.search === '') {
				history.push(`/booklist?pricefrom=${value1.toString()}&priceto=${value2.toString()}`)
			}

			if (value1.length > 0 && value2.length > 0 && location.search != '') {
				if (query.get('pricefrom') != null && query.get('priceto') != null) {
					query.set('pricefrom', value1.toString())
					query.set('priceto', value2.toString())
					//console.log(query)
					//console.log(location.search)
					history.replace({
						search: query.toString()
					})

					console.log(query.toString())
					history.push(`/booklist?${query.toString()}`)
				} else {
					query.set('pricefrom', value1.toString())
					query.set('priceto', value2.toString())
					history.push(`/booklist?${query.toString()}`)
				}
			}



		} catch (err) {
			console.error(err.message)
		}
	}


	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
		setActiveMenu('page' + pageNumber);

	}

	
		//console.log(query.)

	const selected = <selected />;
	//console.log(currentPage);
	return (
		<Fragment>
			<div id="pageContent">
				<div className="container con-opt_booklist"></div>
				<br></br>
				<section className="list">
					<div className="wrapper-max">


						<div className="row">


							<div className="col-lg-3 visible-lg pad-left">
								<div>
									<section id="result_menu" className="results-menu">
										<div className="row">
											<div className="col-lg-12 pad-left pad-right">
												<div className="clearfix js_results_close">
													<span className="results-menu__title"></span>

												</div>
												<form noValidate="">
													<p className="results-menu__title results-menu__title--main">
														KATEGORIE
													</p>
													<div className="results-menu__categories results-menu__select">
														<ul>
															{appState.objects.map((elements, index) => (
																<li key={index} className={toggleActiveStyles(index)} onClick={() => { handleClick(index, elements.value) }}>
																	<label>
																		<input type="hidden" value={elements.value} />
																		<Link to={elements.path}>{elements.name}
																		</Link>
																	</label>
																</li>
															))}

														</ul>
													</div>
													<div className="results-menu__format">
													<p className="results-menu__title results-menu__title--main">
														CENA
													</p>
														<div className="filter-ctrl-price-range">
															
																<div className="row">
																	<div className="col-lg-6 pull-left">
																		<div className={focused === true || value1.length > 0 ? "mdl-textfield mdl-js-textfield mdl-textfield--floating-label pill-input undefined is-upgraded is-focused" : "mdl-textfield mdl-js-textfield mdl-textfield--floating-label pill-input undefined is-upgraded"}>
																			<input className="mdl-textfield__input text-color-booklist" id="textfield-Cenaod" styles="color: #ddd;" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} value={value1} onFocus={onFocus} onBlur={onBlur} onChange={onChangeInput}/>
																			<label className ="mdl-textfield__label" htmlFor="textfield-Cenaod">Cena od</label>
																		</div>
																	</div>
																	<div className="col-lg-6 pull-left">
																		<div className={focused2 === true || value2.length > 0 ? "mdl-textfield mdl-js-textfield mdl-textfield--floating-label pill-input undefined is-upgraded is-focused" : "mdl-textfield mdl-js-textfield mdl-textfield--floating-label pill-input undefined is-upgraded"}>
																			<input className="mdl-textfield__input text-color-booklist" id="textfield-Cenado" styles="color: #ddd;" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} value={value2} onFocus={onFocus2} onBlur={onBlur2}  onChange={onChangeInput2}/>
																			<label className ="mdl-textfield__label" htmlFor="textfield-Cenado">Cena do</label>
																		</div>
																	</div>
																</div>
															
														</div>
														<div className="filte-ctrl-action-button btn custom-yellow-button" onClick={(e) => handleClick(value1, value2)}><b>Potwierdź</b></div>
													</div>
													<div className="results-menu__publisher">

													</div>
													<div className="results-menu__price">

													</div>
												</form>
											</div>
										</div>
									</section>
								</div>

							</div>

							<div className="col-xs-12 col-sm-12 col-lg-9 pad-right pad-left">
								<div className="row"></div>
								<div className="row"></div>
								<div className="row"></div>
								<section className="list__books product-listing pad-left-10 pad-right-10">
									<div id="list-wrapper" className="list-wrapper">
										<div className="list__nav new-color pad-left-10 pad-right-10 text-left katlistfiltr back-color">
											<div className="row">
												<div className="col-xs-6 pad-right col-sm-12 col-lg-4 pad-left">
													<p className="list__inf list__inf--top list__inf--results">
														Znaleziono: <span className="bold-700">{allBooks.length} pozycji</span>
													</p>
												</div>
												{/* <div className="col-xs-6 pad-left col-sm-3 col-lg-2 pad-right">
							<p className="list__inf list__inf-view list__inf--top bold-600">
								Przeglądaj:&nbsp;
								<a className="link-row-view active" data-url="#" title="widok listy">
									<i className="fas fa-list-ul" aria-hidden="true"></i>
								</a>
								&nbsp;
								<a className="link-grid-view" data-url="#" title="widok kafelkowy">
									<i className="fas fa-th-large" aria-hidden="true"></i>
								</a> 
							</p>
						</div> */}
												<div className="col-xs-8 col-sm-6 col-lg-4 pad-left pad-right-d list__nav-sort">
													<span className="list__inf list__inf--form bold-600">Sortuj według:</span>
													<form className="list__form form">
														<div className="form__box form__el">
															<select className="orderme" name="order" value={selectOptionBook} onChange={handleBooksOrder}>
																<option value="0" className="defualt-text">alfabetycznie</option>
																<option value="1" >popularności</option>
																<option value="2">nowości</option>
															</select>
														</div>
													</form>
												</div>
												<div className="col-xs-4 col-sm-3 col-lg-4 pad-left-d pad-right list__inf-pages">
													<span className="list__inf list__inf--form bold-600">Wyświetl: </span>
													<form className="list__form form">
														<div className="form__box form__box--page form__el form__el--page">
															<select name="limit" value={booksPerPage} onChange={handleValueChange}>
																<option value={5}>5</option>
																<option value={10}>10</option>
																<option value={15}>15</option>
																<option value={20}>20</option>
																<option value={25}>25</option>
															</select>
														</div>
													</form>
												</div>
											</div>
										</div>
										<div>
											<section className="position book">


												<BooksListShow books={currentBooks} loading={loading} />
												{/* {books.length === 0 && <p className="text-center">Brak wyników dla danego zapytania!</p>} */}
											</section>

										</div>

										{/* {pager.pages && pager.pages.length &&
                        <ul>
                            <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=1&limit=${booksPerPage}&order=${valueR}` }} className="page-link">Pierwsza</Link>
                            </li>
                            <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.currentPage - 1}&limit=${booksPerPage}&order=${valueR}` }} className="page-link">Poprzednia</Link>
                            </li>
                            {pager.pages.map(page =>
                                <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                    <Link to={{ search: `?page=${page}&limit=${booksPerPage}&order=${valueR}` }} className="page-link">{page}</Link>
                                </li>
                            )}
                            <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.currentPage + 1}&limit=${booksPerPage}&order=${valueR}` }} className="page-link">Następna</Link>
                            </li>
                            <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.totalPages}&limit=${booksPerPage}&order=${valueR}` }} className="page-link">Ostatnia</Link>
                            </li>
                        </ul>
                    }                     */}
										<Pagination booksPerPage={booksPerPage} totalBooks={allBooks.length} activeMenu={activeMenu} setCurrentPage={setCurrentPage} currentPage={currentPage} paginate={paginate} />

									</div>
								</section>
							</div>
						</div>
					</div>
				</section>
			</div>

		</Fragment>
	);
}

export default BookList;