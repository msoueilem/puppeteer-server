const validateUrl = (req, res, next) => {
    const url = req.params[0];
    // Simple validation to check if the URL starts with http:// or https://
    if (/^https?:\/\/.*/.test(url)) {
        next();
    } else {
        res.status(400).send("Invalid URL format");
    }
}

module.exports = {
    validateUrl
}