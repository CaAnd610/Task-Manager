
const validateSubject = (req, res, next) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required' });
    }
    next();
}

module.exports = validateSubject;