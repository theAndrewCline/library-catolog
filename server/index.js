const express = require('express')
const cors = require('cors')
const app = express()
const sqlite3 = require('sqlite3')
const path = require('path')
const db = new sqlite3.Database(path.resolve(__dirname, '../books.db'))

app.use(cors())
app.use(express.json())

app.get('/books', (req, res) => {
  db.all('select * from books', (err, rows) => {
    if (err) {
      res.status(500).send(err)
      console.log(err)
    } else {
      res.send(rows)
    }
  })
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  db.get('select * from books where id = ?', [id], (err, book) => {
    if (err) {
      res.status(500).send(err)
      console.log(err)
    } else {
      res.send(book)
    }
  })
})

app.post('/books/create', (req, res) => {
  const { title, author, imgSrc } = req.body
  db.run('insert into books (title, author, imgSrc) values (?, ?, ?)', [title, author, imgSrc], function (err, rows) {
    if (err) {
      res.status(500).send(err)
      console.log(err)
    } else {
      console.log(this.lastID, this.changes)
      res.send({
        title,
        author,
        imgSrc,
        id: this.lastID
      })
    }
  })
})

app.post('/books/:id/update', (req, res) => {
  const id = req.params.id
  const { title, author, imgSrc } = req.body
  db.all('update books set title = ?, author = ?, imgSrc = ? where id = ?', [title, author, imgSrc, id], (err, rows) => {
    if (err) {
      res.status(500).send(err)
      console.log(err)
    } else {
      res.send(rows)
    }
  })
})

app.post('/books/:id/delete', (req, res) => {
  const id = req.params.id
  db.all('delete from books where id = ?', [id], (err, rows) => {
    if (err) {
      res.status(500).send(err)
      console.log(err)
    } else {
      res.send(rows)
    }
  })
})

const port = 4000

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
