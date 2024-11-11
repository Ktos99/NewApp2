const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfoPassword = require("../middleware/validInfoPassword");
const nodemailer = require("nodemailer");

router.post("/changepassword", validInfoPassword, async (req, res) => {
    try {



        const { oldpassword, newpassword, user_email } = req.body;



        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Dany adres e-mail nie istnieje");
        }


        const validPassword = await bcrypt.compare(oldpassword, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Wprowadzone hasło jest nieprawidłowe!");
        }




        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(newpassword, salt);


        const editUser = await pool.query(
            "UPDATE users SET user_password = $1 WHERE user_email = $2 RETURNING *",
            [bcryptPassword, user_email]
        );


        const htmlEmail = `
    
                        <p>Twoje hasło zostało zmienione na: ${newpassword}</p>
            
                    `;

        const emailConfig = {
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        }


        let transporter = nodemailer.createTransport(emailConfig);

        let mailOptions = {
            from: process.env.MAIL_USER,
            to: user_email,
            subject: 'Zmiana hasła',
            text: 'Zmiana hasła',
            html: htmlEmail
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {

                res.status(500).send('Hasło nie zostało zmienione')
            } else {

                res.status(200).json('Hasło zostało zmienione')
            }
        });


        //res.status(200).json("Hasło zostało zmienione");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});

module.exports = router;