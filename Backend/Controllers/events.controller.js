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

exports.getEvents = (req, res) => {
    const userId = req.user.id;

    db.all('SELECT * FROM events WHERE user_id = ?',
        [userId],
        function (err, rows){

            if (err){
                return res.status(500).json({ error : err.message })
            }
            if (rows.length === 0){
                return res.status(404).json({ error : 'No events found' })
            }
            return res.status(200).json({ events : rows })
        }
    )
}

exports.getEventById = (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;

    db.get('SELECT * FROM events WHERE user_id = ? AND id = ?',
        [userId, eventId],
        function (err, row){
            if (err){
                return res.status(500).json({ error : err.message });
            }
            if (!row){
                return res.status(404).json({ error : 'Event not found' });
            }
            return res.status(200).json({ event : row });
        }
    )
}

exports.updateEvent = (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;
    const { subject_id, title, event_type, due_date, due_time, notes, event_status } = req.validatedData;

    db.get('SELECT * FROM events WHERE user_id = ? AND id = ?',
        [userId, eventId],
        function (err, row){
            if (err){
                return res.status(500).json({ error : err.message });
            }
            if (!row){
                return res.status(404).json({ error : 'Event not found' });
            }
        }
    )

    db.get('SELECT * FROM subjects WHERE user_id = ? AND id = ?',
        [userId, subject_id],
        function(err, row){
            if (err){
                return res.status(500).json({ error : err.message });
            }
            if (!row){
                return res.status(404).json({ error : 'Subject not valid' });
            }
            if (row){
                db.run('UPDATE events SET subject_id = ?, title = ?, event_type = ?, due_date = ?, due_time = ?, notes = ?, event_status = ? WHERE user_id = ? AND id = ?',
                    [subject_id, title, event_type, due_date, due_time, notes, event_status, userId, eventId],
                    function (err){
                        if (err){
                            return res.status(500).json({ error : err.message });
                        }
                        return res.status(200).json({ message : 'Event updated successfully' });
                    }
                )
            }
        }
    )
}

exports.deleteEvent = (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;

    db.get('SELECT * FROM events WHERE user_id = ? AND id = ?',
        [userId, eventId],
        function (err, row){
            if (err){
                return res.status(500).json({ error : err.message });
            }
            if (!row){
                return res.status(404).json({ error : 'Event not found' });
            }
        }
    )

    db.run('DELETE FROM events WHERE user_id = ? AND id = ?',
        [userId, eventId],
        function (err){
            if (err){
                return res.status(500).json({ error : err.message });
            }
            return res.status(200).json({ message : 'Event deleted successfully' });
        }
    )
}