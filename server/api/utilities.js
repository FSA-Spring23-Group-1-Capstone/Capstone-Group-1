const requireCustomer = async (req, res, next) => {
  if (!req.customer) {
    res.status(401);
    next({ message: "User is not authorized" });
  } else {
    next();
  }
};

module.exports = requireCustomer;
