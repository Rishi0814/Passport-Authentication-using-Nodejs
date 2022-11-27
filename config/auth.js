module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("error_msg", "please log in to view this resourse");
      res.redirect("/users/login");
    }
  },
};
