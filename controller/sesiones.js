//Usarla cuando queremos validar si la sesión está iniciada
function auth(req, res, next) {
    if (req.session.user)
      return next();
    else
      return res.sendStatus(401);
  };

  function authAdmin(req, res, next) {
    if (req.session.ingresado && req.session.admin)
      return next();
    else
      return res.sendStatus(401);
  };

  module.exports = {auth, authAdmin};