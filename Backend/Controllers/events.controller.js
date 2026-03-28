const db = require('../DB/db');

exports.createEvent = (req, res) => {

    const { subject_id, title, event_type, due_date, event_status, created_at } = req.body;
    const due_time = req.body.time || null;
    const notes = req.body.notes || null;
    const userId = req.user.id;

    db.all('SELECT * FROM subjects WHERE user_id = ? AND id = ?',
        [userId, subject_id],

        function (err, rows){
            if (err){
                return res.status(500).json({ error : err.message })
            }
            if (rows == 0){
                return res.status(404).json({ error : 'Subject not valid' })
            }
        }
    )

    db.run('INSERT INTO events (user_id, subject_id, title, event_type, due_date, due_time, notes, event_status, created_at) VALUES (?,?,?,?,?,?,?,?,?)',
        [userId, subject_id, title, event_type, due_date, due_time, notes, event_status, created_at],

        function(err){
            if (err) {
                return res.status(500).json({ error : err.message});
            }

            return res.status(201).json({ message : 'Event created succesfully', event_id : this.lastID });
        }
    )
}