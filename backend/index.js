const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./utils/db');
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

const port = process.env.PORT || 5000;

const initSupertokens = require('./utils/supertokens');
const {middleware, errorHandler} = require('supertokens-node/framework/express');

const app = express();
app.use(bodyParser.json());
initSupertokens();
connectDB();
app.use(middleware());
app.get("/", (req, res) => {
    res.json("CTS: Up and Running");
})

app.use("/user", userRoute);
app.use("/post", postRoute);

app.use(errorHandler());
app.listen(port, ()=> {
    console.log(`Server running on ${port}`);
})