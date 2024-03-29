const express = require("express");
require("express-async-errors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require('xss-clean');
const csrf = require('csurf');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require("connect-flash")
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const searchRoutes = require('./routes/search')
const passport = require("passport");
const passportInit = require("./passport/passportInit");
const auth = require("./middleware/auth");


const app = express();

app.set("view engine", "ejs");

app.use(require("body-parser").urlencoded({ extended: true }));

app.use('/styles', express.static('styles'));
app.use('/scripts', express.static('scripts'));

require("dotenv").config();
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  
app.use(flash());

const MongoDBStore = require("connect-mongodb-session")(session);
const url = process.env.MONGO_URI;

const store = new MongoDBStore({
  uri: url,
  collection: "mySessions",
});
store.on("error", function (error) {
  console.log(error);
});



const sessionParms = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: { secure: false, sameSite: "strict" },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); 
  sessionParms.cookie.secure = true;
}

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",    
        'https://code.jquery.com',
        'https://cdn.jsdelivr.net',
        
      ],
      imgSrc: ["'self'", 'https://books.google.com'],
    },
  })
);

app.use(xss());

app.use(csrf({ cookie: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);


app.use(passport.initialize());
app.use(passport.session());
passportInit();

app.use(require("./middleware/storeLocals"));



app.use(session(sessionParms));

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});


app.get("/", (req, res) => {
    res.render("index", { user: req.user });
  });

app.use('/user', userRoutes);
app.use('/books',auth, bookRoutes);
app.use('/search',auth, searchRoutes);



app.use((req, res) => {
    res.status(404).send(`That page (${req.url}) was not found.`);
});
  

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
    console.log(err);
});


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await require("./db/connect")(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = {
  getCsrfToken: (req, res) => {
    return req.csrfToken(); 
  }
};