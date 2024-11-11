const router = require("express").Router();
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");


router.get("/", async (req, res) => {
    try {

        const { name } = req.query;

        
        const data = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1", [`%${name}%`]);

        res.json(data.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})



module.exports = router;