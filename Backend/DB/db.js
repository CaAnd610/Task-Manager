const sqlite = require('sqlite3').verbose();
const path = require('path');

const filepath = path.join(__dirname, '../../Database/database.db');

const createDbConnection = () => {
    const db = new sqlite.Database(filepath, (err) => {
        if (err) {
            return console.error('Error opening database:', err.message);
        }
    })

    return db;
}

module.exports = createDbConnection();