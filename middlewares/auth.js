// middleware/auth.js

const auth = (req, res, next) => {
  // Make user available in all EJS views
  res.locals.user = req.user || null;

  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  next();
};

export default auth;