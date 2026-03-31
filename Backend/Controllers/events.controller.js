const db = require('../DB/db');

exports.createEvent = (req, res) => {

    const { subject_id, title, event_type, due_date, due_time, notes, event_status, created_at } = req.validatedData;
    const userId = req.user.id;

    db.all('SELECT * FROM subjects WHERE user_id = ? AND id = ?',
        [userId, subject_id],

        function (err, rows){

            if (err){
                return res.status(500).json({ error : err.message })
            }
            else if (rows == 0){
                return res.status(404).json({ error : 'Subject not valid' })
            }
            else {
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
        }
    )
}