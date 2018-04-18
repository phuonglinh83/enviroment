/**
 * ================================= isLoggedIn.js ===================================
 * A small middleware module to check if user is logedin.
 * If not, then user is redirected to login page.
 *
 */

module.exports = (req, res, next) => {
					if(req.isAuthenticated())
						return next();
					res.redirect("/user/login");
				}
