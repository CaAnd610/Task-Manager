const db = require('../DB/db');

exports.getAllUsers = (req, res) => {
    db.all('SELECT id, username, email FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({error : err.message});
        }

        res.json(rows);
    });
}

exports.getUserById = (req, res) => {
    const id = Number(req.params.id);

    db.get('SELECT id, username, email FROM users WHERE id = ?', 
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({error : err.message});
            }

            if (!row) {
                return res.status(404).json({error : 'User not found'});
            }

            res.status(200).json(row);
        }
    );
}

exports.updateUserEmail = (req, res) => {
    const id = Number(req.params.id);
    const { email } = req.body;

    db.run('UPDATE users SET email = ? WHERE id = ?',
        [email, id],

        function(err){
            if (err) {
                return res.status(500).json({error : err.message});
            }

            if (this.changes === 0) {
                return res.status(404).json({error : 'User not found'});
            }

            res.status(200).json({message : 'Email updates succesfully'});
        }
    );
}

exports.deleteUser = (req, res) => {
    const id = Number(req.params.id);

    db.run('DELETE FROM users WHERE id = ?',
        [id],

        function(err){
            if (err){
                return res.status(500).json({error : err.message});
            }

            if (this.changes === 0){
                return res.status(404).json({error : 'User not found'});
            }

            return res.status(200).json({message : 'User deleted succesfully'});
        }
    );
}