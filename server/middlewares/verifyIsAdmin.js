function verifyIsAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Not allowed, only Admin" });
  }
  next();
}

module.exports = verifyIsAdmin;
