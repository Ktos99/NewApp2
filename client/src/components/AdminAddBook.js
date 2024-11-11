import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cssoptions/myAccount.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";



const AdminAddBook = ({ setAuth }) => {


  const [userEmail, setUserEmail] = useState("");



  useEffect(() => {
    const getUserEmail = async () => {
      try {

        const response = await fetch("http://localhost:5000/dashboard/username-data", {
          method: "GET",
          headers: { token: localStorage.token }
        });
        const parseRes = await response.json();
        setUserEmail(parseRes.user_email);

      } catch (err) {
        console.error(err.message)
      }

    }


    getUserEmail();
  }, []);


  const initialValues = {
    book_title: "",
    book_author_firstname: "",
    book_author_lastname: "",
    book_phouse: "",
    book_category: "",
    book_edition_number: 0,
    book_lang_of_publication: "",
    book_isbn: "",
    book_description_short: "",
    book_description_full: "",
    book_nm_of_pages: 0,
    book_price: 0.00,
    book_imageurl: "",
    book_pdfurl: "",
  }

  const onSubmit = async (values) => {


    try {


      // const body = { book_title, book_author_firstname, book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_price, book_imageurl, book_pdfurl};

      const response = await fetch("http://localhost:5000/adminactions/addbook", {
        method: "POST",
        headers: {
          token: localStorage.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const parseRes = await response.json();
      //console.log(parseRes);
      toast.info(parseRes);

    } catch (err) {
      console.error(err.message);
    }
  }



  const validate = values => {
    let errors = {}

    if (!values.book_title) {
      errors.book_title = "Te pole jest wymagane!"
    } else if (values.book_title.length < 2 || values.book_title.length > 255) {
      errors.book_title = "Tytuł musi zawierać od 2 do 255 znaków"
    }

    if (!values.book_author_firstname) {
      errors.book_author_firstname = "Te pole jest wymagane!"
    } else if (values.book_author_firstname.length < 2 || values.book_author_firstname.length > 40) {
      errors.book_author_firstname = "Imię musi zawierać od 2 do 40 znaków"
    } else if (!(/^[A-Za-z]+$/.test(values.book_author_firstname))) {
      errors.book_author_firstname = "Imię nie może zawierać znaków specjalnych";
    }

    if (!values.book_author_lastname) {
      errors.book_author_lastname = "Te pole jest wymagane!"
    } else if (values.book_author_lastname.length < 2 || values.book_author_lastname.length > 40) {
      errors.book_author_lastname = "Nazwisko musi zawierać od 2 do 40 znaków"
    } else if (!(/^[A-Za-z]+$/.test(values.book_author_lastname))) {
      errors.book_author_lastname = "Nazwisko nie może zawierać znaków specjalnych";
    }

    if (!values.book_phouse) {
      errors.book_phouse = "Te pole jest wymagane!"
    } else if (values.book_phouse.length < 2 || values.book_phouse.length > 255) {
      errors.book_phouse = "Nazwa wydawnictwa musi zawierać od 2 do 255 znaków"
    }

    if (!values.book_category) {
      errors.book_category = "Te pole jest wymagane!"
    }

    if (!values.book_edition_number) {
      errors.book_edition_number = "Te pole jest wymagane + tylko cyfry!"
    } else if (!(/^[0-9]*$/.test(values.book_edition_number))) {
      errors.book_edition_number = "Tylko cyfry"
    }

    if (!values.book_lang_of_publication) {
      errors.book_lang_of_publication = "Te pole jest wymagane!"
    }

    if (!values.book_isbn) {
      errors.book_isbn = "Te pole jest wymagane!"
    } else if (!(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(values.book_isbn))) {
      errors.book_isbn = "Nieprawidłowy format numeru ISBN"
    }

    if (!values.book_description_short) {
      errors.book_description_short = "Te pole jest wymagane!"
    } else if (values.book_description_short.length < 200 || values.book_description_short.length > 250) {
      errors.book_description_short = "Krótki opis musi zawierać od 200 do 250 znaków"
    }

    if (!values.book_description_full) {
      errors.book_description_full = "Te pole jest wymagane!"
    } else if (values.book_description_full.length < 251 || values.book_description_full.length > 1500) {
      errors.book_description_full = "Dłuższy opis musi zawierać od 251 do 1500 znaków"
    }

    if (!values.book_nm_of_pages) {
      errors.book_nm_of_pages = "Te pole jest wymagane!"
    } else if (!(/^[0-9]*$/.test(values.book_nm_of_pages))) {
      errors.book_nm_of_pages = "Tylko cyfry"
    }

    if (!values.book_price) {
      errors.book_price = "Te pole jest wymagane!"
    }

    if (!values.book_imageurl) {
      errors.book_imageurl = "Te pole jest wymagane!"
    }

    if (!values.book_pdfurl) {
      errors.book_pdfurl = "Te pole jest wymagane!"
    }





    return errors
  }
  // const [inputs, setInputs] = useState({
  //     book_title: "",
  //     book_author_firstname: "",
  //     book_author_lastname: "",
  //     book_phouse: "",
  //     book_category: "",
  //     book_edition_number: 0,
  //     book_lang_of_publication: "",
  //     book_isbn: "",
  //     book_description_short: "",
  //     book_description_full: "",
  //     book_nm_of_pages: 0,
  //     book_price: 0.00,
  //     book_imageurl: "",
  //     book_pdfurl: "",
  //   });


  //   const { book_title, book_author_firstname, book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_price, book_imageurl, book_pdfurl} = inputs;

  //   const onChange = eve => {
  //     setInputs({ ...inputs, [eve.target.name] : eve.target.value});

  //   };




  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  });



  return (

    <div className="marg-op_new1">
      <div className="container marg-op_new1"> </div>

      <section className="account-menu">
        <div className="wrapper-max">
          <div className="row">
            <div className="col-lg-12">
              <div className="account__user clearfix">
                <p className="align-right_opt color_text_my_account">Jesteś zalogowany/a jako <span>{userEmail}</span></p>
              </div>
              {/* <PDFViewer url="/books_pdf/bibliawindowsserver2019.pdf"/> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse"></div>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">


                    <li className="nav-item active">
                      <Link to="/admin/addbook" className="nav-link">Dodaj książkę</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/adduser" className="nav-link">Dodaj użytkownika</Link>
                    </li>


                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <div className="tab-content">
        <div className="tab-pane active">
          <div className="account__form">
            <div className="wrapper-max">
              <div className="row">
                <div className="col-lg-12">


                  <div className="card background_color_text_my_account color_text_my_account margin-top_my_account">
                    <h3 className="text-center ">DODAJ KSIĄŻKĘ</h3>
                    <article className="card-body margins-size_my_account" styles="max-width: 400px;">
                      <form onSubmit={formik.handleSubmit}>
                        <label>Tytuł ksiązki:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="Tytuł książki" type="text" name="book_title" value={formik.values.book_title} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_title && formik.errors.book_title ? <div className="errors">{formik.errors.book_title}</div> : null}
                        <label>Imię autora:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="Imię autora" type="text" name="book_author_firstname" value={formik.values.book_author_firstname} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_author_firstname && formik.errors.book_author_firstname ? <div className="errors">{formik.errors.book_author_firstname}</div> : null}
                        <label>Nazwisko autora:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="Nazwisko autora" type="text" name="book_author_lastname" value={formik.values.book_author_lastname} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_author_lastname && formik.errors.book_author_lastname ? <div className="errors">{formik.errors.book_author_lastname}</div> : null}
                        <label>Wydawnictwo:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="Nazwa wydawnictwa" type="text" name="book_phouse" value={formik.values.book_phouse} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_phouse && formik.errors.book_phouse ? <div className="errors">{formik.errors.book_phouse}</div> : null}
                        <label>Kategoria książki:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <select className="form-control" name="book_category" onBlur={formik.handleBlur} onChange={formik.handleChange}>
                            <option value="Ekonomia">Ekonomia</option>
                            <option value="Nauki humanistyczne">Nauki humanistyczne</option>
                            <option value="Czasopisma naukowe">Czasopisma</option>
                            <option value="Przewodniki">Przewodniki</option>
                            <option value="Prawo">Prawo</option>
                            <option value="Nauki matematyczno-przyrodnicze">Nauki matematyczno-przyrodnicze</option>
                            <option value="Medycyna">Medycyna</option>
                            <option value="Informatyka">Informatyka</option>
                          </select>
                          {/* <input className="form-control" placeholder="Kategoria książki" type="text" name="book_category" value = {book_category} onChange={eve => onChange(eve)}/> */}
                        </div>
                        {formik.touched.book_category && formik.errors.book_category ? <div className="errors">{formik.errors.book_category}</div> : null}
                        <label>Numer wydania:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="Numer wydania" type="number" name="book_edition_number" value={formik.values.book_edition_number} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_edition_number && formik.errors.book_edition_number ? <div className="errors">{formik.errors.book_edition_number}</div> : null}
                        <label>Język publikacji:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <select className="form-control" name="book_lang_of_publication" onBlur={formik.handleBlur} onChange={formik.handleChange}>
                            <option value="polski">polski</option>
                            <option value="angielski">angielski</option>
                            <option value="niemiecki">niemiecki</option>
                            <option value="hiszpański">hiszpański</option>
                            <option value="portugalski">portugalski</option>
                            <option value="włoski">włoski</option>
                            <option value="czeski">czeski</option>
                            <option value="słoweński">słoweński</option>
                            <option value="rosyjski">rosyjski</option>
                          </select>
                        </div>
                        {formik.touched.book_lang_of_publication && formik.errors.book_lang_of_publication ? <div className="errors">{formik.errors.book_lang_of_publication}</div> : null}
                        <label>ISBN ksiązki:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="ISBN książki" type="text" name="book_isbn" value={formik.values.book_isbn} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_isbn && formik.errors.book_isbn ? <div className="errors">{formik.errors.book_isbn}</div> : null}
                        <label>Krótki opis:        &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Ilość użytych znaków: {formik.values.book_description_short.length}/250</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <textarea className="form-control" placeholder="Krótki opis książki" type="text" name="book_description_short" value={formik.values.book_description_short} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_description_short && formik.errors.book_description_short ? <div className="errors">{formik.errors.book_description_short}</div> : null}
                        <label>Długi opis:          &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Ilość użytych znaków: {formik.values.book_description_full.length}/1500</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <textarea className="form-control" placeholder="Dłuższy opis książki" type="text" name="book_description_full" value={formik.values.book_description_full} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_description_full && formik.errors.book_description_full ? <div className="errors">{formik.errors.book_description_full}</div> : null}
                        <label>Ilość stron:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="Ilość stron" type="number" name="book_nm_of_pages" value={formik.values.book_nm_of_pages} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_nm_of_pages && formik.errors.book_nm_of_pages ? <div className="errors">{formik.errors.book_nm_of_pages}</div> : null}
                        <label>Cena:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="Cena książki" type="text" name="book_price" value={formik.values.book_price} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_price && formik.errors.book_price ? <div className="errors">{formik.errors.book_price}</div> : null}
                        <label>Nazwa zdjęcia:</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="Nazwa zdjęcia + (jpg, png itp...)" type="text" name="book_imageurl" value={formik.values.book_imageurl} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_imageurl && formik.errors.book_imageurl ? <div className="errors">{formik.errors.book_imageurl}</div> : null}
                        <label>Nazwa książki (bez rozszerzenia .pdf):</label>
                        <div className="form-group input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-book"></i> </span>
                          </div>
                          <input className="form-control" placeholder="Nazwa pdf książki" type="text" name="book_pdfurl" value={formik.values.book_pdfurl} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.touched.book_pdfurl && formik.errors.book_pdfurl ? <div className="errors">{formik.errors.book_pdfurl}</div> : null}
                        <p className="text-center"><b>Wszystkie pola są wymagane</b></p>
                        <div className="form-group">
                          <button className="btn btn-primary btn-block" type='submit'> Dodaj książkę </button>
                        </div>
                      </form>
                    </article>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )


}

export default AdminAddBook;