const router = require("express").Router();
const pool = require("../db");
const validInfoUserDataCart = require("../middleware/validInfoUserDataCart");

router.post("/changeuserdata", validInfoUserDataCart, async (req, res) => {
    try {

        const { user_name, user_lastname, user_email } = req.body;



        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Dany adres e-mail nie istnieje");
        }

        if (user.rows.user_name === user_name && user.rows.user_surname === user_lastname) {
            return res.status(200).json("Dane się nie zmieniły");
        }


        const editUser = await pool.query(
            "UPDATE users SET user_name = $1, user_surname = $2 WHERE user_email = $3 RETURNING *",
            [(user_name.charAt(0).toUpperCase() + user_name.slice(1)), (user_lastname.charAt(0).toUpperCase() + user_lastname.slice(1)), user_email]
        );


        res.status(200).json("Dane użytkownika zostały zmienione");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});

module.exports = router;