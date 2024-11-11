const router = require("express").Router();
const pool = require("../db");



router.get("/:book_category", async (req, res) => {
    try {
        // const books = await pool.query("SELECT * FROM booklist");

        //  const { name } = req.query;


        //const data = await pool.query("SELECT * FROM booklist WHERE book_category ILIKE $1",[`%${name}%`]);
        const data = await pool.query("SELECT * FROM books WHERE book_category ILIKE $1", [req.params.book_category]);
        res.json(data.rows);


    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})



module.exports = router;