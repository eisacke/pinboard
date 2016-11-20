const express = require('express');
const morgan  = require('morgan');
const app     = express();
const bodyParser = require('body-parser');
const port    = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.get('/', (req, res)=>(res.render('index')));

app.listen(port, () => console.log(`Listening on port: ${port}`));
