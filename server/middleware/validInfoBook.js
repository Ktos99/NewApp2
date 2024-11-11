module.exports = function(req, res, next) {
    const { book_title, book_author_firstname, book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_price, book_imageurl, book_pdfurl } = req.body;
    
  
    function validISBN(book_isbn) {
      return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(book_isbn);
    }

    
  
    if (req.path === "/addbook") {
      if (![book_title, book_author_firstname, book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_price, book_imageurl, book_pdfurl].every(Boolean)) {
        return res.status(401).json("Wszystkie pola muszą być uzupełnione");
      } else if (book_title.length < 2 || book_title.length > 255) {
        return res.status(401).json("Tytuł książki musi mieścić sie w zakresie 2 - 255 znaków");
      } else if (book_author_firstname.length < 2 || book_author_firstname.length > 40) {
        return res.status(401).json("Imię musi mieścić sie w zakresie 2 - 40 znaków");
      } else if (book_author_lastname.length < 2 || book_author_lastname.length > 40) {
        return res.status(401).json("Nazwisko opis musi mieścić sie w zakresie 2 - 40 znaków");
      } else if (!validISBN(book_isbn)) {
        return res.status(401).json("Nieprawidłowy ISBN. Przykład: 978-1-56619-909-4, 1-56619-909-3");
      } else if (book_description_short.length < 200 || book_description_short.length > 250) {
        return res.status(401).json("Krótki opis musi mieścić sie w zakresie 200 - 250 znaków");
      } else if (book_description_full.length < 251 || book_description_full.length > 1500) {
        return res.status(401).json("Długi opis musi mieścić sie w zakresie 251 - 1500 znaków");
    
      } 
    } 
  
    next();
  };

