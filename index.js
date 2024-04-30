const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const port = 3000

app.use(express.json())

const db = new sqlite3.Database('mi-base.db')

// db.serialize(() => {
//    db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, textp TEXT)")
// })

app.get('/comments', (req, res) => {
    db.all('SELECT * FROM comments', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/comments', (req, res) => {
    const { id, texto } = req.body;

    if (!texto) {
        res.status(400).json({ error: 'El campo esta vacio' });
        return;
    }

    db.run('INSERT INTO comments (id, textp) VALUES (?, ?)', [id, texto], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id, texto });
    });
});

app.listen(port, () => {
    console.log('Tamos redy')
})