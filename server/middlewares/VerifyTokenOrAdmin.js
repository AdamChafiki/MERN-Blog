module.exports = (req, res, next) => {
  // Assuming you have a middleware to handle user authentication and set req.user
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.params.id === req.user.id || req.user.isAdmin) {
    next();
  } else {
    console.log("Access denied for user:", req.user.id);
    return res.status(403).json({ message: "Not allowed" });
  }
};
