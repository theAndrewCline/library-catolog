import React, { useState, useEffect } from 'react';
import './App.css';

import Book from './components/Book'
import AddForm from './components/AddForm'
import PouchDB from 'pouchdb'

const dummyData = [
  {
    _id: '1234',
    title: 'Call Of The Wild',
    author: 'Jack London',
    imgSrc: undefined
  },
  {
    _id: '2345',
    title: 'The Bible',
    author: 'God',
    imgSrc: undefined
  }
]

function App () {

  let db = new PouchDB('library')

  const [ books, updateBooks ] = useState([])
  const [ isFormOpen, toggleForm ] = useState(false)
  const [ isDataCollected, collectData ] = useState(true)

  useEffect(() => {
    if (isDataCollected) {
      db.get('1234')
        .then(doc => {
          updateBooks([doc])
        })
        .then(() => {
          collectData(true)
        })
    }
  }, [db, isDataCollected])

  function handleAddButtonClick (event) {
    event.preventDefault()
    toggleForm(true)
  } 

  function addBook (newBook) {
    updateBooks([...books, newBook])
    toggleForm(false)
  }

  if (isFormOpen) {
    return (
      <div className="App">
        <AddForm addBook={addBook}/>
      </div>
    )
  } else {
    return (
      <div className="App">
        <button onClick={handleAddButtonClick}>Add Book</button>
        {books.map((book) => <Book info={book} key={book._id} />)}
      </div>
    )
  }
}

export default App;
