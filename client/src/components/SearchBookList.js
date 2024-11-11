import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./cssoptions/bookList.css";
import BooksListShow from "./BookListShow.js";
import PaginationSearch from "./PaginationSearch.js";



const SearchBookList = ({ setAuth, searchT, setSearchT, booksSearch, setBooksSearch, setSelectOptionBook, selectOptionBook, setBooksPerPage, booksPerPage, searchTerm, setState, setUrl, match, setSearchBooks, searchBooks, currentPage, setCurrentPage, activeMenu, setActiveMenu, setCurrentPageCategory }) => {

	
	
	const [loading] = useState(false);
	//const [currentPage, setCurrentPage] = useState(1);
	//const [booksPerPage, setBooksPerPage] = useState(5);
	//const [allBooks, setAllBooks] = useState([]);
	//const [activeMenu, setActiveMenu] = useState('page1');
	
	const [focused, setFocused] = useState(false);
	const [focused2, setFocused2] = useState(false);
	const [value1, setValue1] = useState("");
	const [value2, setValue2] = useState("");
	
	const onFocus = () => setFocused(true);
	const onBlur = () => setFocused(false);
	const onFocus2 = () => setFocused2(true);
	const onBlur2 = () => setFocused2(false);


	const [appState, changeState] = useState ({
		activeObject: null,
		objects: [
			      { id: 1, name: "Ekonomia", value: "Ekonomia", path: "/booklist/ekonomia"},
				  { id: 2, name: "Nauki humanistyczne", value: "Nauki humanistyczne", path: "/booklist/nauki_humanistyczne"},
				  { id: 3, name: "Czasopisma Naukowe", value: "Czasopisma naukowe", path: "/booklist/czasopisma_naukowe"},
				  { id: 4, name: "Przewodniki", value: "Przewodniki", path: "/booklist/przewodniki"},
				  { id: 5, name: "Prawo", value: "Prawo", path: "/booklist/prawo"},
				  { id: 6, name: "Nauki matematyczno-przyrodnicze", value: "nauki matematyczno-przyrodnicze", path: "/booklist/nauki_matematyczno_przyrodnicze"},
				  { id: 7, name: "Medycyna", value: "Medycyna", path: "/booklist/medycyna"},
				  { id: 8, name: "Informatyka", value: "Informatyka", path: "/booklist/informatyka"}
				 ]
	});



    const search = useLocation();
	// console.log(search.pathname)
	 //console.log(search.search.substr(6,search.search.length))
	// console.log(search.key)
	//const replaced = search.search.replace(/ /g, '+');
	//console.log(replaced);
	
	

    useEffect(() => {
		const getSearchBooks = async () =>{


			try {
				
				
				const response = await fetch(`http://localhost:5000/booklist/${search.search}`, {
					method: "GET",
					headers: { "Content-type": "application/json" }
				});


				const parseRes = await response.json();
				//const str = search.search.substr(6,search.search.length)
				const query = new URLSearchParams(search.search);
				const str2 = query.get('name')
				const rep2 = str2.replace(/%20/, ' ');
				setSearchT(rep2)

				console.log(parseRes)
				setBooksSearch(parseRes);
			} catch (err) {
				console.error(err.message);
			}
			
			// if (searchBooks.length === 0 ){
			// 	if(searchTerm === "" || searchTerm === null) {

			// 			const response = await fetch(`http://localhost:5000/booklist/?name=${match.params.search_query}`,  {
			// 						method: "GET",
			// 						headers: {"Content-type":"application/json"}
			// 					});
							

			// 				const parseRes = await response.json();
							
							
			// 				console.log(parseRes)
			// 				setSearchBooks(parseRes);


			// 		} else {
			// 				const response = await fetch(`http://localhost:5000/booklist/?name=${searchTerm}`,  {
			// 						method: "GET",
			// 						headers: {"Content-type":"application/json"}
			// 					});
							

			// 				const parseRes = await response.json();
							
							
			// 				console.log(parseRes)
			// 				setSearchBooks(parseRes);
			// 			}
			// 		}
			}
		

		getSearchBooks();
	   }, []);


	function handleClick(index, element) {
		try{

			changeState({...appState, activeObject: appState.objects[index]});
			setState(appState.objects[index]);
			setUrl(element);
			setActiveMenu('page1');
			setCurrentPageCategory(1);
			setBooksPerPage(5);

			} catch (err) {
				console.error(err.message);
			}
	}

	function toggleActiveStyles(index) {
		if (appState.objects[index] === appState.activeObject) {
			return "active-menu";
		} else {
			return "";
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


		if ( value === "0") {

			setSelectOptionBook(value)

			const response = await fetch(`http://localhost:5000/booklist/books/allbooksorderalphabetsearch${search.search}`, {
			method: "POST",
			headers: {"Content-type":"application/json"}
		});

		const parseRes = await response.json();
		
		setBooksSearch(parseRes);
		console.log(parseRes)
		  } else {

			if ( value === "1") {

				setSelectOptionBook(value)

				const response = await fetch(`http://localhost:5000/booklist/books/allbooksorderviewssearch${search.search}`, {
				method: "POST",
				headers: {"Content-type":"application/json"}
			});

			const parseRes = await response.json();
			
			setBooksSearch(parseRes);
			console.log(parseRes)

			} else {

				if ( value === "2") {

					setSelectOptionBook(value)

					const response = await fetch(`http://localhost:5000/booklist/books/allbooksordernewsearch${search.search}`, {
					method: "POST",
					headers: {"Content-type":"application/json"}
				});

				const parseRes = await response.json();
				
				setBooksSearch(parseRes);
				console.log(parseRes)
				}

			}


		} 

		
	}

	




let currentBooks = [];	
const indexOfLastBook = currentPage * booksPerPage
const indexOfFirstPost = indexOfLastBook - booksPerPage
currentBooks = booksSearch.slice(indexOfFirstPost, indexOfLastBook)
		 
 //console.log(currentBooks);	


	  

	//   console.log(currentBooks);

	// Change page
	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
		setActiveMenu('page'+pageNumber);
	}

	const onChangeInput = (event) => {
		setValue1(event.target.value);
		console.log(event.target.value);
	  };

	  const onChangeInput2 = (event) => {
		setValue2(event.target.value);
		console.log(event.target.value);
	  };


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
									<form>
										<p className="results-menu__title results-menu__title--main">
											KATEGORIE
										</p>
										<div className="results-menu__categories results-menu__select"> {/*BRAK W EDYTORZE USUNĄĆ PÓŻNIEJ*/}
											<ul>
											{appState.objects.map((elements, index) => (
												<li key={index} className={toggleActiveStyles(index)} onClick={() => {handleClick(index, elements.value)}}>
													<label>
														<input  type="hidden" value={elements.value}/>
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
														<button className="filte-ctrl-action-button btn custom-yellow-button"><b>Potwierdź</b></button>
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
		{booksSearch.length !== 0 && <h5 className="text-center text-color-booklist">WYNIK WYSZUKIWANIA DLA : {searchT} </h5>}
		
		<div className="row"></div>
		<div className="row"></div>
		<div className="row"></div>
		<section className="list__books product-listing pad-left-10 pad-right-10">
			<div id="list-wrapper" className="list-wrapper">
				<div className="list__nav pad-left-10 pad-right-10 text-left katlistfiltr back-color">
					<div className="row">
						<div className="col-xs-6 pad-right col-sm-12 col-lg-4 pad-left">
							<p className="list__inf list__inf--top list__inf--results">
								  Znaleziono: <span className="bold-700">{booksSearch.length} pozycji</span>
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
										<option value="1">popularności</option>
										<option value="2">nowości</option>
										</select>
									</div>
								</form>
						</div>
						<div className="col-xs-4 col-sm-3 col-lg-4 pad-left-d pad-right list__inf-pages">
							<span className="list__inf list__inf--form bold-600">Wyświetl: </span>
							<form className="list__form form">
								<div className="form__box form__box--page form__el form__el--page">
								<select name="limit" onChange={handleValueChange}>
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
										

						<BooksListShow books={currentBooks} loading={loading}/>
						 {booksSearch.length === 0 && <p className="text-center"> <b>Brak wyników dla danego zapytania!</b></p>} 
					</section>

				</div>
				
				 <PaginationSearch booksPerPage={booksPerPage} search={search.search} totalBooks={booksSearch.length} paginate={paginate} activeMenu={activeMenu} setCurrentPage={setCurrentPage} currentPage={currentPage}/> 
				
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

export default SearchBookList;