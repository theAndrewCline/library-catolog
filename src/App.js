import React, { useState, useEffect } from 'react'
import './App.css'

import Book from './components/Book'
import AddForm from './components/AddForm'

function App () {
  const [books, updateBooks] = useState([])
  const [isFormOpen, toggleForm] = useState(false)

  useEffect(() => {
    updateList()
  }, [])

  function handleAddButtonClick (event) {
    event.preventDefault()
    toggleForm(true)
  }

  function updateList () {
    fetch('http://localhost:4000/books')
      .then(x => x.json())
      .then(updateBooks)
      .catch(console.error)
  }

  function addBook (newBook) {
    fetch('http://localhost:4000/books/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBook)
    })
      .then(x => x.json())
      .then((createdBook) => {
        updateBooks([...books, createdBook])
        toggleForm(false)
      })
  }

  if (isFormOpen) {
    return (
      <div className='App'>
        <AddForm addBook={addBook} />
      </div>
    )
  } else {
    return (
      <div className='App' style={{ flexDirection: 'column' }}>
        <button style={{ width: '45px' }} onClick={handleAddButtonClick}>Add Book</button>
        {books.map((book) => <Book info={book} key={book.id} updateList={updateList} />)}
      </div>
    )
  }
}

export default App
