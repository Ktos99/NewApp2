import React, { useState } from 'react';
import { Link } from "react-router-dom";


const Pagination = ({booksPerPage, totalBooks, paginate, activeMenu,setCurrentPage, currentPage}) => {
    
    const pageNumbers = [];

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);
    

    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
        if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) {
                return (
                
                <Link to={'#page'+number}  key={number}>
                <li id={'page'+number} className={activeMenu == 'page'+number ? 'active' : null} onClick={() => paginate(number)} >
                {number}
                </li>
                </Link>

                // <Link to={'#page'+number} id={'page'+number} className={activeMenu == 'page'+number ? 'active' : ''} onClick={() => paginate(number)}  key={number}>
                // {number}
                // </Link>
                
                )
        } else {
            return null
        }
    })

    const handleNextBtn = () => {

        paginate(currentPage+1)  
        
        if (currentPage + 1 > maxpageNumberLimit) {
            setMaxPageNumberLimit(maxpageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minpageNumberLimit + pageNumberLimit)
        }

    }

    const handlePrevBtn = () => {

        paginate(currentPage - 1)  
        
        if ((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minpageNumberLimit - pageNumberLimit)
        }

    }

    let pageIncrementBtn = null
    if(pageNumbers.length > maxpageNumberLimit) {
        pageIncrementBtn = <li onClick = {handleNextBtn}> &hellip; </li>
    }

    let pageDecrementBtn = null
    if(minpageNumberLimit >= 1 ) {
        pageDecrementBtn = <li onClick = {handlePrevBtn}> &hellip; </li>
    }

    return (
        <>
        <div className="pagination">
            
            {/* <Link to={`#page`+(currentPage-1)} id={'page'+currentPage}  onClick = {handlePrevBtn}>Poprzednia</Link> */}

            <ul className="pagination">
                <li>
                    <button 
                    onClick={handlePrevBtn}
                    disabled={currentPage === pageNumbers[0] ? true : false}
                    >
                        Poprzednia
                    </button>
                </li>
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}

                <li>
                    <button 
                    onClick = {handleNextBtn}
                    disabled={currentPage === pageNumbers[pageNumbers.length - 1] ? true : false}
                    >
                        Następna
                    </button>
                </li>

            {/* <Link to={`#page`+(currentPage+1)} id={'page'+currentPage}  onClick = {handleNextBtn}>Następna</Link> */}

                {/* {pageNumbers.map(number => (
                    <Link to={'#page'+number} id={'page'+number} className={activeMenu == 'page'+number 
                    ? 'active'
                    : ''
                    } onClick={() => paginate(number)}  key={number}>
                    {number}
                    </Link>
                ))} */}

            </ul>
			
		 </div>

        </>
    );
};

export default Pagination;

// return (
//     <div className="pagination">
        
//             {pageNumbers.map(number => 
//                 { 
//                     if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) { (
//                         <Link to={'#page'+number} id={'page'+number} className={activeMenu == 'page'+number ? 'active' : '' } onClick={() => paginate(number)}  key={number}>
//                         {number}
//                         </Link>
//                    )} 
//                      else {
//                         return null
//                      }
//                 })
//             } 

        
//      </div>


// );