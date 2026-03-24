import express from "express";
import envConfig from "./configs/dotenv.js";
import db from "./configs/database.js";
import router from "./routers/index.js";

import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./middlewares/passport.js";

const app = express();
const PORT = envConfig.PORT || 3000;

// Connect DB
db();

// View engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Session
app.use(
  session({
    secret: envConfig.SESSION_SECRET, // ✅ fixed
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Routes
app.use(router);

// Server
app.listen(PORT, () => {
  console.log("Server started 🚀");
  console.log(`http://localhost:${PORT}`);
});