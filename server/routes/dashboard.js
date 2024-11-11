const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');

router.get("/username-data", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_email, verified FROM users WHERE user_id = $1", [req.user]);

        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})

router.get("/username-verification", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT verified FROM users WHERE user_id = $1", [req.user]);

        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})

router.get("/username-role", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_role FROM users WHERE user_id = $1", [req.user]);



        res.json(user.rows[0].user_role);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})

router.get("/username-shopcartdata", authorization, async (req, res) => {
    try {
        const order = await pool.query("SELECT user_name, user_surname, user_email FROM users WHERE user_id = $1", [req.user]);

        res.json(order.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})



router.get("/user_id-data", authorization, async (req, res) => {
    try {
        //const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[req.user]);

        res.json(req.user);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})

router.delete("/deleteexpiredbook", authorization, async (req, res) => {
    try {


        if (req.body.length === 0) {

            res.status(200).json("Brak książek to usunięcia z półki użytkownika");

        } else {

            if (req.body.length === 1) {

                await pool.query("DELETE FROM borrowed_books WHERE book_id = $1 AND user_id = $2", [req.body[0].book_id, req.user]);

                res.status(200).json("Książka została usunięta z półki użytkownika");
            } else {

                for (var i = 0; i < req.body.length; i++) {

                    await pool.query("DELETE FROM borrowed_books WHERE book_id = $1 AND user_id = $2", [req.body[i].book_id, req - user]);

                }

                res.status(200).json("Książka/ki została/y usunięta/e z półki użytkownika");

            }
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.put("/changeaccesstoexpiredbook", authorization, async (req, res) => {
    try {

        const access = false;
        if (req.body.length === 0) {

            res.status(200).json("Brak książek do zaktualizowania");

        } else {

            if (req.body.length === 1) {
                await pool.query(
                    "UPDATE borrowed_books SET access_to_book = $1 WHERE book_id = $2 AND user_id = $3 RETURNING *",
                    [access, req.body[0].book_id, req.user]
                );
                res.status(200).json("Książki zostały zaktualizowane");

            } else {

                for (var i = 0; i < req.body.length; i++) {

                    await pool.query("UPDATE borrowed_books SET access_to_book = $1 WHERE book_id = $2 AND user_id = $3 RETURNING *", [access, req.body[i].book_id, req.user]);

                }

                res.status(200).json("Książka/ki zostały zaktualizowane");

            }


        }

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.get("/userhistoryoforder", authorization, async (req, res) => {
    try {
        //const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[req.user]);

        res.json(req.user);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})

router.get("/getuserorders-paid", authorization, async (req, res) => {
    try {
        const order = await pool.query("SELECT * FROM order_book WHERE user_id = $1 AND if_paid = TRUE", [req.user]);

        res.json(order.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})

router.get("/getuserorders-unpaid", authorization, async (req, res) => {
    try {
        const order = await pool.query("SELECT * FROM order_book WHERE user_id = $1 AND if_paid = FALSE", [req.user]);

        res.json(order.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})

router.post("/getordercontent", authorization, async (req, res) => {

    try {
        const { order_id } = req.body;
        const order_contenter = await pool.query("SELECT ord.order_id, ordcont.order_content_id, ordcont.book_id, ordcont.single_book_price, bok.book_title, bok.book_author_firstname, bok.book_author_lastname, bok.book_phouse, bok.book_format, bok.book_imageurl FROM order_book ord INNER JOIN order_content ordcont ON ordcont.order_id = ord.order_id INNER JOIN books bok ON ordcont.book_id = bok.book_id WHERE user_id = $1 AND ordcont.order_id = $2", [req.user, order_id]);

        res.json(order_contenter.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})


module.exports = router;