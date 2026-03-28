
const validateEvent = (req, res, next) => {
    const { title, event_type, due_date, event_status, created_at, due_time, notes } = req.body;

    if (!title || !event_type || !due_date || event_status || !created_at) {
        return res.status(400).json({ error: 'All fields are required: title, type, due date, status, created at' });
    }
    if (title === ' ' ||  due_date === ' ' || created_at === ' ') {
        return res.status(400).json({ error : 'Fields cannot be empty spaces' });
    }
    if (event_type !== 'Homework' && event_type !== 'Exam'){
        return res.status(400).json({ error : 'Type must be either Homework or Exam' });
    }
    if (event_status !== 0 && event_status !== 1) {
        return res.status(400).json({ error : 'Status must be either 0 (not completed) or 1 (completed)' });
    }
    if (isNaN(Date.parse(due_date)) || isNaN(Date.parse(created_at))) {
        return res.status(400).json({ error : 'Date fields must be valid dates' });
    }
    if (typeof title !== 'string') {
        return res.status(400).json({ error : 'Title must be text' });
    }
    next();
}

module.exports = validateEvent;