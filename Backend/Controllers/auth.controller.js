const bcrypt = require('bcrypt');
const db = require('../DB/db');
const jwt = require('jsonwebtoken');

exports.signupUser = (req, res) => {
    const { username, email, password } = req.validatedData;

    //hash the password with bcrypt
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            return res.status(500).json({error : err.message});
        }

        //store user in the database
        db.run('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hash],

            function(err){
                if (err) {
                    return res.status(500).json({error : err.message});
                }

                res.status(201).json({id: this.lastID});
            }
        );
    });
}

exports.loginUser = (req, res) => {
    const { email, password } = req.body;        //fetch user from databse

     db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {

        if (err) {
            return res.status(500).json({ error : err.message});
        }

        if (!row) {
            return res.status(404).json({ error : 'User not found'});
        }

        //compare password with hashed password
        bcrypt.compare(password, row.password_hash, (err, result) =>{
            if (err){
                return res.status(500).json({ error : err.message});
            }

            if (!result) {
                return res.status(401).json({ error : 'Invalid password'});
            }

            const token = jwt.sign(
                { id : row.id, email : row.email },
                process.env.JWT_SECRET,
                { expiresIn : '1h' }  
            );
            
            res.status(200).json({ message : 'Login successful', token});
        });
    });
}