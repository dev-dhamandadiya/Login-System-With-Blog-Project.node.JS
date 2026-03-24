// Check if user is authenticated
const auth = (req, res, next) => {
  // Make user available in all views
  res.locals.user = req.user || null;

  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // update path to your login route
  }

  next();
};

export default auth;