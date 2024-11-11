const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);




router.post("/addbooktocart", authorization, async (req, res) => {

    //const {book_id, book_title, book_author_firstname, book_author_lastname, book_phouse, book_format, book_price, book_imageurl, period_of_time} = req.body;
    const { book_id, period_of_time, book_price } = req.body;

    try {
        let cart_data = await pool.query("SELECT * FROM shopping_cart WHERE book_id = $1 AND user_id = $2", [book_id, req.user]);

        if (cart_data.rows.length !== 0) {
            return res.status(200).json("Ta książka znajduje się już w koszyku!");
        } else {

            const newCartItem = await pool.query(
                "INSERT INTO shopping_cart (user_id, book_id, price, period_of_time) VALUES ($1,$2,$3,$4) RETURNING *",
                [req.user, book_id, parseFloat(book_price), parseInt(period_of_time)]);
        }

        let cart_data_all = await pool.query("SELECT * FROM shopping_cart WHERE user_id = $1", [req.user]);

        res.json(cart_data_all.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

// router.get("/allcartbooks", async (req, res) => {
//     try {
//         const book = await pool.query("SELECT * FROM shopping_cart");

//         res.json(book.rows);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json("Server Error");
//     }
// })

router.get("/allusercartbooks", authorization, async (req, res) => {
    try {
        const books = await pool.query("SELECT * FROM shopping_cart INNER JOIN books ON shopping_cart.book_id = books.book_id WHERE user_id = $1", [req.user]);

        res.json(books.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})


router.delete("/deletebook", authorization, async (req, res) => {
    try {
        const { item_id } = req.body;

        await pool.query("DELETE FROM shopping_cart WHERE item_id = $1 AND user_id = $2", [item_id, req.user]);


        res.status(200).json("Książka została usunięta z koszyka");

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})



router.delete("/deletemorethanonebook", authorization, async (req, res) => {
    try {


        if (req.body.length === 0) {

            res.status(200).json("Nie ma książek do usunięcia z koszyka!");

        } else {

            if (req.body.length === 1) {

                await pool.query("DELETE FROM shopping_cart WHERE book_id = $1 AND user_id = $2", [req.body[0].book_id, req.user]);
                res.status(200).json("Tą książkę juz wypożyczyłeś!");

            } else {

                for (var i = 0; i < req.body.length; i++) {

                    await pool.query("DELETE FROM shopping_cart WHERE book_id = $1 AND user_id = $2", [req.body[i].book_id, req.user]);

                }

                res.status(200).json("Książka/ki została/y usunięta/e z koszyka");

            }
        }






    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.get("/alluserbooks", authorization, async (req, res) => {
    try {


        const usersBooks = await pool.query("SELECT bb.book_id, bb.access_from, bb.access_to, bb.access_to_book, bks.book_imageurl, bks.book_author_firstname, bks.book_author_lastname, bks.book_title, bks.book_format, bks.book_phouse, bks.book_pdfurl FROM borrowed_books AS bb INNER JOIN books AS bks ON bb.book_id = bks.book_id WHERE user_id = $1 AND access_to_book = true", [req.user]);

        res.json(usersBooks.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.post("/addbookstouser", authorization, async (req, res) => {

    const { totalPrice } = req.body;

    try {
        const cartBooks = await pool.query("SELECT * FROM shopping_cart WHERE user_id = $1", [req.user]);
        const user_email = await pool.query("SELECT user_email FROM users WHERE user_id = $1", [req.user]);
        // const dateNowNew = new Date();
        // const dateNow = new Date(new Date(dateNowNew).getTime() + 1000 * 60 * 60 * 24);
        // const timestamp = dateNow;
        // console.log(timestamp)

        let currentTimestamp = Date.now()
        //console.log(currentTimestamp); // get current timestamp
        let date1 = new Intl.DateTimeFormat('default', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
        //console.log(date)
        const access = false;

        await pool.query("INSERT INTO order_book (user_id, number_of_books, total_price, date_of_order) VALUES ($1,$2,$3,$4)",
            [req.user, cartBooks.rows.length, totalPrice, date1]);

        const orderB = await pool.query("SELECT order_id FROM order_book WHERE date_of_order = $1 AND user_id = $2", [date1, req.user]);
        
        

        if (cartBooks.rows.length !== 0) {



            for (var i = 0; i < cartBooks.rows.length; i++) {

                //const date = new Date(new Date(dateNowNew).getTime() + 1000 * 60 * 60 * 24 * parseInt(cartBooks.rows[i].period_of_time));
                const period =  currentTimestamp + (parseInt(cartBooks.rows[i].period_of_time) * 24 * 60 * 60 * 1000);
                console.log('period',period)
                const date = new Intl.DateTimeFormat('default', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(period);
                console.log('date',date)


                await pool.query(
                    "INSERT INTO borrowed_books (user_id, book_id, price, access_from, access_to, access_to_book) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
                    [req.user, cartBooks.rows[i].book_id, cartBooks.rows[i].price, date1, date, access]);

                if (orderB.rows.length > 1) {

                    await pool.query("INSERT INTO order_content (order_id, book_id, single_book_price, period_of_time) VALUES ($1,$2,$3,$4)",
                        [orderB.rows[orderB.rows.length-1].order_id, cartBooks.rows[i].book_id, cartBooks.rows[i].price, cartBooks.rows[i].period_of_time]);

                } else if (orderB.rows.length === 1) {
                    await pool.query("INSERT INTO order_content (order_id, book_id, single_book_price, period_of_time) VALUES ($1,$2,$3,$4)",
                        [orderB.rows[0].order_id, cartBooks.rows[i].book_id, cartBooks.rows[i].price, cartBooks.rows[i].period_of_time]);
                }
            }
        } else if (cartBooks.rows.length === 0) {
            res.json('Koszyk jest pusty');

        }

        if (orderB.rows.length > 1) {

            const stripeResp = await stripe.checkout.sessions.create({
                success_url: `https://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderB.rows[orderB.rows.length-1].order_id}`,
                cancel_url: 'https://localhost:3000/booklist',
                payment_method_types: ['card', 'p24'],
                line_items: [
                    { amount: (roundToTwo(totalPrice, 2) * 100), name: 'Cena całkowita', currency: 'PLN', quantity: 1 },
                ],

                mode: 'payment',
                customer_email: user_email.rows[0].user_email
            });

            //console.log(stripeResp)
            res.json(stripeResp)

        } else if (orderB.rows.length === 1) {

            const stripeResp = await stripe.checkout.sessions.create({
                success_url: `https://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderB.rows[0].order_id}`,
                cancel_url: 'https://localhost:3000/booklist',
                payment_method_types: ['card', 'p24'],
                line_items: [
                    { amount: (roundToTwo(totalPrice, 2) * 100), name: 'Cena całkowita', currency: 'PLN', quantity: 1 },
                ],

                mode: 'payment',
                customer_email: user_email.rows[0].user_email
            });

            //console.log(stripeResp)
            res.json(stripeResp)
        }
        // DODAJ DATE DO payments, DODANIE Z KOSZYKA DO BAZY USERA KSIAZKI PO KLIKNIECIU I OZNACZYC JAKO BRAK DOSTEPU< PO SUCCESS W PLATNOSCI ZMIENIC NA TRUE W DOSTEPIE DO KSIAZEK
        // ZAMIAST CENA CALKOWITA W ZAMOWIENI ZMIENIC NA ORDER ID !!!!!!!!!!!!!!!!!!!!!!!!
        // if (cartBooks.rows.length !== 0) {

        //     const dateNowNew = new Date();
        //     const dateNow = new Date(new Date(dateNowNew).getTime() + 1000 * 60 * 60 * 24);
        //     const timestamp = dateNow;
        //     const access = false;

        //     await pool.query("INSERT INTO order_book (user_id, number_of_books, total_price, date_of_order) VALUES ($1,$2,$3,$4)",
        //         [req.user, cartBooks.rows.length, totalPrice, timestamp]);

        //     const orderB = await pool.query("SELECT order_id FROM order_book WHERE date_of_order = $1 AND user_id = $2", [timestamp, req.user]);

        //     for (var i = 0; i < cartBooks.rows.length; i++) {

        //         const date = new Date(new Date(dateNowNew).getTime() + 1000 * 60 * 60 * 24 * parseInt(cartBooks.rows[i].period_of_time));

        //         await pool.query(
        //             "INSERT INTO borrowed_books (user_id, book_id, price, access_from, access_to, access_to_book) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        //             [req.user, cartBooks.rows[i].book_id, cartBooks.rows[i].price, timestamp, date, access]);

        //         await pool.query("INSERT INTO order_content (order_id, book_id, single_book_price) VALUES ($1,$2,$3)",
        //             [orderB.rows[0].order_id, cartBooks.rows[i].book_id, cartBooks.rows[i].price]);


        //     }



        //     res.status(200).json("Książki zostały pomyślnie dodane do twojej półki")

        // } else {

        //     res.status(200).json("Koszyk jest pusty!");

        // }

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.post('/order/success', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        const { order_id } = req.query;
        //console.log('order_id= '+order_id)
        const customer = await stripe.customers.retrieve(session.customer);

       
        const check_if_exist = await pool.query("SELECT * FROM payments WHERE order_id = $1 AND user_email = $2", [order_id, customer.email]);

        if (check_if_exist.rows.length >= 1) {
            return res.json("Dane zamówienie zostało już zrealizowane")
        }

        const check_if_order_exist = await pool.query("SELECT * FROM order_book WHERE order_id = $1", [order_id]);

        if (check_if_order_exist.rows.length === 0) {
            return res.json("Zamówienie o takim numerze nie istnieje")
        }

        let currentTimestamp = Date.now()

        let date1 = new Intl.DateTimeFormat('default', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)


        const user_id = await pool.query("SELECT user_id FROM users WHERE user_email = $1", [customer.email])

        const books_borrowed = await pool.query("SELECT book_id, period_of_time FROM order_content WHERE order_id = $1", [order_id])
        // const books_period_of_time = await pool.query("SELECT * FROM borrowed_books WHERE user_id = $1 AND book_id = $2", [user_id.rows[0].user_id, ])

        console.log(order_id, customer.email, (session.amount_total / 100), date1)
        await pool.query("INSERT INTO payments (order_id, user_email, total_price, date_of_crreation) VALUES ($1,$2,$3,$4)",
            [order_id, customer.email, (session.amount_total / 100), date1]);

        for (let i = 0; i < books_borrowed.rows.length; i++) {
            const period =  currentTimestamp + (parseInt(books_borrowed.rows[i].period_of_time) * 24 * 60 * 60 * 1000);
                console.log('period',period)
                const date = new Intl.DateTimeFormat('default', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(period);
                console.log('date',date)

            await pool.query("UPDATE borrowed_books SET access_to_book = true, access_to = $1 WHERE user_id = $2 AND book_id = $3", [date, user_id.rows[0].user_id, books_borrowed.rows[i].book_id])
        }

        await pool.query("UPDATE order_book SET if_paid = true WHERE order_id = $1 AND user_id = $2", [order_id, user_id.rows[0].user_id])

        const ans = await pool.query("DELETE FROM shopping_cart WHERE user_id = $1", [user_id.rows[0].user_id])
        //console.log(ans)

        res.json(`TRUE`);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
});


router.get("/book/:book_id", async (req, res) => {
    try {
        const book = await pool.query("SELECT bks.book_pdfurl FROM borrowed_books AS bb INNER JOIN books AS bks ON bb.book_id = bks.book_id WHERE bb.book_id = $1", [req.params.book_id]);

        res.json(book.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error");
    }
})





function roundToTwo(num, scale) {
    if(!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
  }

module.exports = router;




