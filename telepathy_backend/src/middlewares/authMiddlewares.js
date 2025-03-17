export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req)
        return next();
    }
    console.log(req)
    res.status(401).json({ message: "Unauthorized" });
};