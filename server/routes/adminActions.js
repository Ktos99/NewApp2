const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfoBook = require("../middleware/validInfoBook");
const validInfo = require("../middleware/validInfo");


router.post("/addbook", validInfoBook, async (req, res) => {
    try {

        const { book_title, book_author_firstname, book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_price, book_imageurl, book_pdfurl } = req.body;


        const book = await pool.query("SELECT * FROM books WHERE book_title = $1", [book_title]);

        if (book.rows.length !== 0) {
            return res.status(401).json("Dana książka już istnieje");
        }


        const dateNowNew = new Date();
        const dateNow = new Date(new Date(dateNowNew).getTime() + 1000 * 60 * 60 * 24);

        await pool.query(
            "INSERT INTO books (book_title, book_author_firstname, book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_format, book_price, book_imageurl, book_pdfurl, book_add_date, book_views) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *",
            [book_title, book_author_firstname, book_author_lastname, book_phouse, book_category, parseInt(book_edition_number), book_lang_of_publication, book_isbn, book_description_short, book_description_full, parseInt(book_nm_of_pages), 'pdf', parseFloat(book_price), '/book_images/' + book_imageurl, ('/books_pdf/' + book_pdfurl + '.pdf'), dateNow, 0]
        );

        res.json("Książka została dodana pomyślnie");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});


router.post("/adduser", validInfo, async (req, res) => {
    try {

        const { name, email, password, surname } = req.body;



        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).json("Dany adres e-mail jest już zajęty");
        }




        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);



        await pool.query(
            "INSERT INTO users (user_name, user_surname, user_email, user_password, user_role) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [(name.charAt(0).toUpperCase() + name.slice(1)), (surname.charAt(0).toUpperCase() + surname.slice(1)), email, bcryptPassword, 'user']
        );

        res.json("Dodanie nowego użytkownika przebiegło pomyślnie");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});



module.exports = router;