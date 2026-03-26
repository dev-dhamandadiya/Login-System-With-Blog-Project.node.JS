import express from 'express';
import envConfig from "./configs/dotenv.js";
import db from "./configs/database.js";
import router from './routes/index.js';
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./middlewares/passport.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = envConfig.PORT || 3000;
db();

// View Engine
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Body Parser (modern)
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Session (🔥 FIXED)
app.use(session({
    secret: envConfig.SESSION_SECRET,  // ✅ IMPORTANT FIX
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
console.log("SESSION SECRET:", envConfig.SESSION_SECRET);

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
app.listen(PORT, (error) => {
    if (!error) {
        console.log('✅ Server started');
        console.log(`👉 http://localhost:${PORT}`);
    } else {
        console.log(error.message);
    }
});