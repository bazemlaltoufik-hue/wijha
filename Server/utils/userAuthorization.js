export const userAuthorization = (req, res, next) => {
  if (!req.user.role === "employer") {
    console.log(req.user.role);
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};
