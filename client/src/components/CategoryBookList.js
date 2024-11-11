import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cssoptions/bookList.css";
import BooksListShow from "./BookListShow.js";
import Pagination from "./Pagination.js";



const CategoryBookList = ({ setAuth, setSelectOptionBook, selectOptionBook, state, url, match, booksCategory, setBooksCategory, currentPageCategory, setCurrentPageCategory, activeMenu, setActiveMenu, setBooksPerPage, booksPerPage, currentPage, setCurrentPage}) => {

	//const [booksCategory, setBooksCategory] = useState([]);
	const [loading] = useState(false);
	//const [currentPageCategory, setCurrentPageCategory] = useState(1);
	//const [booksPerPage, setBooksPerPage] = useState(5);
	//const [activeMenu, setActiveMenu] = useState('page1');
	const [appState, changeState] = useState ({
		activeObject: null,
		objects: [
			      { id: 1, name: "Ekonomia", value: "Ekonomia", path: "/booklist/ekonomia"},
				  { id: 2, name: "Nauki humanistyczne", value: "Nauki humanistyczne", path: "/booklist/nauki humanistyczne"},
				  { id: 3, name: "Czasopisma Naukowe", value: "Czasopisma naukowe", path: "/booklist/czasopisma_naukowe"},
				  { id: 4, name: "Przewodniki", value: "Przewodniki", path: "/booklist/przewodniki"},
				  { id: 5, name: "Prawo", value: "Prawo", path: "/booklist/prawo"},
				  { id: 6, name: "Nauki matematyczno-przyrodnicze", value: "nauki matematyczno-przyrodnicze", path: "/booklist/nauki_matematyczno_przyrodnicze"},
				  { id: 7, name: "Medycyna", value: "Medycyna", path: "/booklist/medycyna"},
				  { id: 8, name: "Informatyka", value: "Informatyka", path: "/booklist/informatyka"}
				 ]
	});




	useEffect(() => {
		const getCategBooks = async () => {
			// setBooksCategory(categoryBookListData);

			changeState({...appState, activeObject: state});
			
			
			if(booksCategory.length === 0) {
				if (url === "" || url === null) {


					const response = await fetch(`http://localhost:5000/countbooks/${match.params.book_category}`,  {
							method: "GET",
							headers: {"Content-type":"application/json"}
					});
					
				
					const parseRes = await response.json();
					//console.log(parseRes);
					setBooksCategory(parseRes);
					

				} else {
				

				const response = await fetch(`http://localhost:5000/countbooks/${url}`,  {
							method: "GET",
							headers: {"Content-type":"application/json"}
					});
				
			
				const parseRes = await response.json();
				//console.log(parseRes);
				setBooksCategory(parseRes);
				}
					
			}
		}
		getCategBooks();
	  }, []);
	
	
	
	async function handleClick(index, element) {
		try{
		changeState({...appState, activeObject: appState.objects[index]});
	  
				
			
			const input_value = element;
			//console.log(input_value);
			//   setUrlPartCategory(input_value);
			//   console.log(urlPartCategory);
	  
				

					const response = await fetch(`http://localhost:5000/countbooks/${input_value}`,  {
							method: "GET",
							headers: {"Content-type":"application/json"}
					});
					
				
					const parseRes = await response.json();
					//console.log(parseRes);
					
					setBooksCategory(parseRes);
	  } catch (err) {
		console.error(err.message);
	  }
	}

	function handleValueChange(e) {
		const { value } = e.target;

		setBooksPerPage(value);

	  }

	   function toggleActiveStyles(index) {
		if (appState.objects[index] === appState.activeObject) {
			return "active-menu";
		} else {
			return "";
		}
	}
	  

	async function handleBooksOrder(e) {
		const { value } = e.target;


	if ( value == "0") {

		setSelectOptionBook(value)

				const response = await fetch("http://localhost:5000/booklist/books/allbooksorderalphabetcategory", {
				method: "POST",
				body: JSON.stringify({
					category: match.params.book_category,
				  }),
				headers: {"Content-type":"application/json"}
			});

			const parseRes = await response.json();
			
			setBooksCategory(parseRes);
			console.log(parseRes)
			
		} else {

				if ( value == "1") {

					setSelectOptionBook(value)

					const response = await fetch("http://localhost:5000/booklist/books/allbooksorderviewscategory", {
					method: "POST",
					body: JSON.stringify({
						category: match.params.book_category,
					  }),
					headers: {"Content-type":"application/json"}
				});

				const parseRes = await response.json();
				
				setBooksCategory(parseRes);
				console.log(parseRes)
				} else {

					if ( value == "2") {

						setSelectOptionBook(value)

						const response = await fetch("http://localhost:5000/booklist/books/allbooksordernewcategory", {
						method: "POST",
						body: JSON.stringify({
							category: match.params.book_category,
						  }),
						headers: {"Content-type":"application/json"}
					});
	
					const parseRes = await response.json();
					
					setBooksCategory(parseRes);
					console.log(parseRes)
					}

				}

		} 

		
	}

	


	   
	  const indexOfLastBook = currentPage * booksPerPage;
	  const indexOfFirstPost = indexOfLastBook - booksPerPage;
	  const currentBooks = booksCategory.slice(indexOfFirstPost, indexOfLastBook);
	  console.log(currentBooks)
	

	

	  


	
	const paginate = pageNumber => {
		try {
		
		setCurrentPage(pageNumber)
		setActiveMenu('page'+pageNumber)

	} catch (err) {
		console.error(err.message);
	  }
	}

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
								<div className="col-xs-12 pad-left pad-right">
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
												<li key={index} onClick={() => {handleClick(index, elements.value)}}>
													<label className={toggleActiveStyles(index)}>
														<input type="hidden" value={elements.value}/>
														<Link to={elements.path}>{elements.name}
														</Link>
													</label>
												</li>
												))}
											</ul>
										</div>
										<div className="results-menu__format">

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
				<div className="list__nav pad-left-10 pad-right-10 text-left katlistfiltr back-color">
					<div className="row">
						<div className="col-xs-6 pad-right col-sm-12 col-lg-4 pad-left">
							<p className="list__inf list__inf--top list__inf--results">
								  Znaleziono: <span className="bold-700">{booksCategory.length} pozycji</span>
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
										<option value="0">alfabetycznie</option>
										<option value="1" className="defualt-text">popularności</option>
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
						
						{/* {books.length === 0 && <p className="text-center">Brak wyników dla danego zapytania!</p>} */}
					</section>

				</div>
				
				 <Pagination booksPerPage={booksPerPage} totalBooks={booksCategory.length} paginate={paginate} activeMenu={activeMenu} setCurrentPage={setCurrentPage} currentPage={currentPage}/> 
				
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

export default CategoryBookList;