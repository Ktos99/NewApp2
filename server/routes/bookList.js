const router = require("express").Router();
const pool = require("../db");
const paginate = require("jw-paginate");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");


router.get("/", async (req, res) => {
    try {

        const { name } = req.query;
        
        
        let final_obj = [];

        let array_of_words = name.split(" ");

        //console.log(array_of_words.length)
        let search_object = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1", [`%${array_of_words[0]}%`]);
        //console.log(search_object) 
        if (array_of_words.length === 1) {
            console.log("JESTEM W 1",);
            //console.log(search_object.rows);

            final_obj = search_object.rows;

        } else if (array_of_words.length === 2) {



            console.log("JESTEM W 2",);
            //console.log(search_object.rows)    
            const data = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1", [`%${array_of_words[1]}%`]);

            let ids = new Set(search_object.rows.map(d => d.book_id));
            let merged = [...search_object.rows, ...data.rows.filter(d => !ids.has(d.book_id))];
            final_obj = merged;
            //console.log(merged);
            //search_object = data.filter( (ele, ind) => ind === data.findIndex( elem => elem.book_title === ele.book_title && elem.book_id === ele.book_id))


        } else if (array_of_words.length > 2) {
            let ids = new Set(search_object.rows.map(d => d.book_id));
            for (var i = 1; i < array_of_words.length; i++) {

                console.log("i= ", i);
                //console.log(search_object.rows)    
                
                const data = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1", [`%${array_of_words[i]}%`]);


                let merged = [...search_object.rows, ...data.rows.filter(d => !ids.has(d.book_id))];
                final_obj = merged;
                //console.log(merged);
                //search_object = data.filter( (ele, ind) => ind === data.findIndex( elem => elem.book_title === ele.book_title && elem.book_id === ele.book_id))

            }

        }
        
        res.json(final_obj);


    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");

    }
})

router.get("/book/:book_title", async (req, res) => {
    try {
        const book = await pool.query("SELECT * FROM books WHERE book_title = $1", [req.params.book_title]);

        res.json(book.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})

router.get("/books/allbookscount", async (req, res) => {
    try {
        const book = await pool.query("SELECT * FROM books");

        res.json(book.rows.length);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})

router.get("/books/allbooks", async (req, res) => {
    try {

        const books = await pool.query("SELECT * FROM books");

        return res.json(books.rows);


    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})


router.get("/books/allbooksorderalphabet", async (req, res) => {
    try {
        const books = await pool.query("SELECT * FROM books ORDER BY book_title ASC");



        return res.json(books.rows);



    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})

router.get("/books/allbooksordernew", async (req, res) => {
    try {
        const book = await pool.query("SELECT * FROM books ORDER BY book_add_date DESC");

        res.json(book.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})

router.get("/books/allbooksorderviews", async (req, res) => {
    try {
        const book = await pool.query("SELECT * FROM books ORDER BY book_views DESC");

        res.json(book.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})

router.post("/books/allbooksorderalphabetcategory", async (req, res) => {
    try {
        const { category } = req.body;


        const book = await pool.query("SELECT * FROM books WHERE book_category = $1 ORDER BY book_title ASC", [(category.charAt(0).toUpperCase() + category.slice(1))]);

        res.json(book.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})

router.post("/books/allbooksordernewcategory", async (req, res) => {
    try {
        const { category } = req.body;
        const book = await pool.query("SELECT * FROM books WHERE book_category = $1 ORDER BY book_add_date DESC", [(category.charAt(0).toUpperCase() + category.slice(1))]);

        res.json(book.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})

router.post("/books/allbooksorderviewscategory", async (req, res) => {
    try {
        const { category } = req.body;
        const book = await pool.query("SELECT * FROM books WHERE book_category = $1 ORDER BY book_views DESC", [(category.charAt(0).toUpperCase() + category.slice(1))]);

        res.json(book.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})


router.post("/books/allbooksorderalphabetsearch", async (req, res) => {
   
   
   
   
    try {
        const { name } = req.query;
        
        
        let final_obj = [];

        let array_of_words = name.split(" ");

        //console.log(array_of_words.length)
        let search_object = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1 ORDER BY book_title ASC", [`%${array_of_words[0]}%`]);
        //console.log(search_object) 
        if (array_of_words.length === 1) {
            console.log("JESTEM W 1",);
            //console.log(search_object.rows);

            final_obj = search_object.rows;

        } else if (array_of_words.length === 2) {



            console.log("JESTEM W 2",);
            //console.log(search_object.rows)    
            const data = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1 ORDER BY book_title ASC", [`%${array_of_words[1]}%`]);

            let ids = new Set(search_object.rows.map(d => d.book_id));
            let merged = [...search_object.rows, ...data.rows.filter(d => !ids.has(d.book_id))];
            final_obj = merged;
            //console.log(merged);
            //search_object = data.filter( (ele, ind) => ind === data.findIndex( elem => elem.book_title === ele.book_title && elem.book_id === ele.book_id))


        } else if (array_of_words.length > 2) {
            let ids = new Set(search_object.rows.map(d => d.book_id));
            for (var i = 1; i < array_of_words.length; i++) {

                console.log("i= ", i);
                //console.log(search_object.rows)    
                
                const data = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1 ORDER BY book_title ASC", [`%${array_of_words[i]}%`]);


                let merged = [...search_object.rows, ...data.rows.filter(d => !ids.has(d.book_id))];
                final_obj = merged;
                //console.log(merged);
                //search_object = data.filter( (ele, ind) => ind === data.findIndex( elem => elem.book_title === ele.book_title && elem.book_id === ele.book_id))

            }

        }
        
        res.json(final_obj);


    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})

router.post("/books/allbooksordernewsearch", async (req, res) => {
    try {
        const { name } = req.query;
        
        
        let final_obj = [];

        let array_of_words = name.split(" ");

        //console.log(array_of_words.length)
        let search_object = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1 ORDER BY book_add_date DESC", [`%${array_of_words[0]}%`]);
        //console.log(search_object) 
        if (array_of_words.length === 1) {
            console.log("JESTEM W 1",);
            //console.log(search_object.rows);

            final_obj = search_object.rows;

        } else if (array_of_words.length === 2) {



            console.log("JESTEM W 2",);
            //console.log(search_object.rows)    
            const data = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1 ORDER BY book_add_date DESC", [`%${array_of_words[1]}%`]);

            let ids = new Set(search_object.rows.map(d => d.book_id));
            let merged = [...search_object.rows, ...data.rows.filter(d => !ids.has(d.book_id))];
            final_obj = merged;
            //console.log(merged);
            //search_object = data.filter( (ele, ind) => ind === data.findIndex( elem => elem.book_title === ele.book_title && elem.book_id === ele.book_id))


        } else if (array_of_words.length > 2) {
            let ids = new Set(search_object.rows.map(d => d.book_id));
            for (var i = 1; i < array_of_words.length; i++) {

                console.log("i= ", i);
                //console.log(search_object.rows)    
                
                const data = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1 ORDER BY book_add_date DESC", [`%${array_of_words[i]}%`]);


                let merged = [...search_object.rows, ...data.rows.filter(d => !ids.has(d.book_id))];
                final_obj = merged;
                //console.log(merged);
                //search_object = data.filter( (ele, ind) => ind === data.findIndex( elem => elem.book_title === ele.book_title && elem.book_id === ele.book_id))

            }

        }
        
        res.json(final_obj);


    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})

router.post("/books/allbooksorderviewssearch", async (req, res) => {
    try {
        const { name } = req.query;
        
        
        let final_obj = [];

        let array_of_words = name.split(" ");

        //console.log(array_of_words.length)
        let search_object = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1 ORDER BY book_views DESC", [`%${array_of_words[0]}%`]);
        //console.log(search_object) 
        if (array_of_words.length === 1) {
            console.log("JESTEM W 1",);
            //console.log(search_object.rows);

            final_obj = search_object.rows;

        } else if (array_of_words.length === 2) {



            console.log("JESTEM W 2",);
            //console.log(search_object.rows)    
            const data = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1 ORDER BY book_views DESC", [`%${array_of_words[1]}%`]);

            let ids = new Set(search_object.rows.map(d => d.book_id));
            let merged = [...search_object.rows, ...data.rows.filter(d => !ids.has(d.book_id))];
            final_obj = merged;
            //console.log(merged);
            //search_object = data.filter( (ele, ind) => ind === data.findIndex( elem => elem.book_title === ele.book_title && elem.book_id === ele.book_id))


        } else if (array_of_words.length > 2) {
            let ids = new Set(search_object.rows.map(d => d.book_id));
            for (var i = 1; i < array_of_words.length; i++) {

                console.log("i= ", i);
                //console.log(search_object.rows)    
                
                const data = await pool.query("SELECT * FROM books WHERE book_title ILIKE $1 OR book_author_firstname || ' ' || book_author_lastname ILIKE $1 ORDER BY book_views DESC", [`%${array_of_words[i]}%`]);


                let merged = [...search_object.rows, ...data.rows.filter(d => !ids.has(d.book_id))];
                final_obj = merged;
                //console.log(merged);
                //search_object = data.filter( (ele, ind) => ind === data.findIndex( elem => elem.book_title === ele.book_title && elem.book_id === ele.book_id))

            }

        }
        
        res.json(final_obj);


    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})





// router.get("/", async (req, res) => {
//     try {
//         const amount = await pool.query("SELECT * FROM booklist");

//         //console.log(`count: ${count}`);
//         //const count1 = JSON.stringify(count);
//         res.json(amount.rows.length);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json("server Error");
//     }
// })

// function paginatedResults(model) {
//     return(req, res, next) => {
//         const page = parseInt(req.query.page);
//         const limit = parseInt(req.query.limit);
//         const startIndex = (page - 1) * limit;
//         const endIndex = page * limit;

//         const results = {};

//         if (endIndex < model.rows.length)
//             results.next = {
//                 page: page + 1,
//                 limit: limit
//             }

//         if (startIndex > 0){
//             results.previous = {
//                 page: page - 1,
//                 limit: limit
//             }
//         }    
//         results.results = model.rows.slice(startIndex, endIndex);
//         res.paginatedResults = results;
//         next();
//     }
// }

module.exports = router;