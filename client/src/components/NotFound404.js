import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./cssoptions/notFound404.css";




const NotFound404 = () => {



	return (
		<Fragment>

			<div className="page-wrap d-flex flex-row align-items-center">
				<div className="container">
					<div className="row justify-content-center color-page">
						<div className="col-md-12 text-center">
							<span className="display-1 d-block color-page">404</span>
							<div className="mb-4 lead">Dana strona nie istnieje</div>
							<Link to="/booklist" className="btn btn-link color-link">Powróc na stronę główną</Link>
						</div>
					</div>
				</div>
			</div>


		</Fragment>
	);
}

export default NotFound404;