const express = require("express");
const app = express();
const cors = require("cors");



app.use(express.json()); //req.body
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//ROUTES//

app.use("/auth", require("./routes/jwtAuth"));



//dashboard route

app.use("/dashboard", require("./routes/dashboard"));
app.use("/booklist", require("./routes/bookList"));
app.use("/countbooks", require("./routes/countBooks"));
app.use("/searchbooks", require("./routes/searchBooks"));
app.use("/shoppingcart", require("./routes/shoppingCart"));
app.use("/passwordchange", require("./routes/passwordChange"));
app.use("/userdatacartchange", require("./routes/userDataCartChange"));
app.use("/adminactions", require("./routes/adminActions"));

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});