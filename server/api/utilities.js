const requireCustomer = async (req, res, next) => {
  if (!req.customer) {
    res.status(401);
    next({ message: "User is not authorized" });
  } else {
    next();
  }
};
const requireAdmin = async (req, res, next) => {
  if (!req.customer.admin) {
    res.status(401);
    next({ message: "Not an admin" });
  } else {
    next();
  }
};
module.exports = { requireCustomer, requireAdmin };
