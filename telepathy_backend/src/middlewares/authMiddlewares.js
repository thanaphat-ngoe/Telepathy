export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.headers)
        return next();
    }
    console.log(req.headers)
    res.status(401).json({ message: "Unauthorized" });
};