module.exports = (req, res, next) => {
  console.log(req.params.id); 
  if (req.params.id === req.user.id) {
    next();
  } else {
    return res.status(403).json({ message: "Not allowed" });
  }
};
