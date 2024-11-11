const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const nodemailer = require('nodemailer');


router.post("/register", async (req, res) => {
    try {



        const { name, email, password, surname } = req.body;

        const ranstring = getRandomString(50)
        console.log(ranstring)


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Weryfikacja konta - Internetowa wypożyczalnia książek',
            text: 'Weryfiakcja konta',
            html: ` <p>Dziękujemy za rejestrację konta w naszej stronie.</br> 
            Oto link do aktywacji konta: <a href="https://localhost:3000/confirm/${ranstring}">KLIKNIJ TU BY AKTYWOWAĆ KONTO</a></p>`
        }


        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).json("Dany adres e-mail jest już zajęty");
        }



        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(bcryptPassword)



        const dateNowNew = new Date();
        const dateNow = new Date(new Date(dateNowNew).getTime() + 1000 * 60 * 60 * 24);
        const timestamp = dateNow;


        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_surname, user_email, user_password, user_role) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [(name.charAt(0).toUpperCase() + name.slice(1)), (surname.charAt(0).toUpperCase() + surname.slice(1)), email, bcryptPassword, 'user']
        );

        await pool.query("INSERT INTO verification_keys (user_email, vkey_string, vkey_creation_date) VALUES ($1,$2,$3)",
            [email, ranstring, timestamp])




        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {

                console.log(err);
            } else {

                console.log('Email sent: ' + data.response);
            }
        });

        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });






    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});



router.post("/login", validInfo, async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Adres email lub hasło jest nieprawidłowe");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Adres email lub hasło jest nieprawidłowe");
        }

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }


})

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/verify_account", async (req, res) => {

    try {

        const { vkey } = req.body

        console.log(vkey)

        const us_email = await pool.query("SELECT user_email FROM verification_keys WHERE vkey_string = $1", [vkey]);


        console.log(us_email.rows[0].user_email)

        if (us_email.rows.length === 0) {
            return res.status(401).json("Dane konto zostało już aktywowane lub nie istnieje");
        }


        await pool.query("DELETE FROM verification_keys WHERE vkey_string = $1", [vkey]);

        await pool.query("UPDATE users SET verified = true WHERE user_email = $1", [us_email.rows[0].user_email]);

        res.json('Konto zostało poprawnie aktywowane')

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.post("/resend_verification_email", authorization, async (req, res) => {
    try {


        const user = await pool.query("SELECT user_email FROM users WHERE user_id = $1", [req.user]);

        const ranstring = getRandomString(50)
        console.log(ranstring)


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let mailOptions = {
            from: process.env.MAIL_USER,
            to: user.rows[0].user_email,
            subject: 'Weryfikacja konta - Internetowa wypożyczalnia książek',
            text: 'Weryfikacja konta',
            html: ` <p>Dziękujemy za rejestrację konta w naszej stronie.</br> 
            Oto link do aktywacji konta: <a href="http://localhost:3000/confirm/${ranstring}">KLIKNIJ TU BY AKTYWOWAĆ KONTO</a></p>`
        }




        const dateNowNew = new Date();
        const dateNow = new Date(new Date(dateNowNew).getTime() + 1000 * 60 * 60 * 24);
        const timestamp = dateNow;


        await pool.query("DELETE FROM verification_keys WHERE user_email = $1", [user.rows[0].user_email]);

        await pool.query("INSERT INTO verification_keys (user_email, vkey_string, vkey_creation_date) VALUES ($1,$2,$3)",
            [user.rows[0].user_email, ranstring, timestamp])




        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {

                console.log(err);
            } else {

                console.log('Email sent: ' + data.response);
            }
        });


        res.json('Email aktywujący konto został ponownie wysłany');






    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});


module.exports = router;


function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}