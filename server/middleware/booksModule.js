
module.exports = async (req, res, next) => {
    try {
        const book = await pool.query("SELECT * FROM books");
       
        res.json(book.rows.length);
        
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }


};