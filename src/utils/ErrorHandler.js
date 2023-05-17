export default (req, res) => {
    if (!req.statusCode) req.statusCode = 500;
    if (req.statusCode === 301) return res.status(301).redirect('/not-found');
    return res.status(req.statusCode).json({ error: "Not found" });
};