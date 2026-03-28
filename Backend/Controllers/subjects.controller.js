const db = require('../DB/db');

exports.createSubject = (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

     db.all('SELECT * FROM subjects WHERE subject_name = ? AND user_id = ?',
        [name, userId],
        (err, rows) => {
            if (err){
                return res.status(500).json({ error : err.message });
            }

            if (rows.length > 0){
                return  res.status(400).json({ error : 'Subject already exists' });
            }
        }
    )

    db.run('INSERT INTO subjects (subject_name, user_id) VALUES (?, ?)',
        [name, userId],
        function(err) {
            if (err) {
                return res.status(500).json({ error : err.message });
            }

            return res.status(201).json({ message : 'Subject created succesfully', subjectId : this.lastID });

        }
    )
}

exports.getAllSubjects = (req, res) => {
    const userId = req.user.id;

    if (!userId){
        return res.status(400).json({ error : 'User ID is required' });
    }

    db.all('SELECT * FROM subjects WHERE user_id = ?',
        [userId],
        (err, rows) => {
            if (err){
                return res.status(500).json({ error : err.message});
            }

            return res.status(200).json({ subjects : rows });
        }
    )
}

exports.getSubjectById = (req, res) => {
    const userId = req.user.id;
    const subjectId = req.params.id;

    db.get('SELECT * FROM subjects WHERE id = ? AND user_id = ?',
        [subjectId, userId],

        (err, row) => {
            if (err){
                return res.status(500).json({ error : err.message });
            }

            if (!row){
                return res.status(404).json({ error : 'Subject not found' });
            }

            return res.status(200).json({ subject : row });
        }
    );
}

exports.updateSubject = (req, res) => {
    const userId = req.user.id;
    const subjectId = req.params.id;
    const { name } = req.body;

    db.get('SELECT * FROM subjects WHERE id = ? AND user_id = ?',
        [subjectId, userId],

        (err, row)=>{
            if (err){
                return res.status(500).json({ error : err.message });
            }

            if (!row){
                return res.status(404).json({ error : 'Subject not found' });
            }

            if (row.subject_name === name){
                return res.status(400).json({ error : 'No changes detected' });
            }
        }
    )

    db.run('UPDATE subjects SET subject_name = ? WHERE id = ? AND user_id = ?',
        [name, subjectId, userId],

        function(err) {
            if (err){
                return res.status(500).json({ error : err.message });
            }

            if (this.changes === 0){
                return res.status(404).json({ error : 'No changes made' });
            }

            return res.status(200).json({ message : 'Subject updated successfully' });
        }
    )
}

exports.deleteSubject = (req, res) => {
    const userId = req.user.id;
    const subjectId = req.params.id;

    db.run('DELETE FROM subjects WHERE id = ? AND user_id = ?',
        [subjectId, userId],

        function(err){
            if (err){
                return res.status(500).json({ error : err.message });
            }

            if (this.changes === 0){
                return res.status(404).json({ error : 'Subject not found' });
            }

            return res.status(200).json({ message : 'Subject deleted successfully' });
        }
    );
}