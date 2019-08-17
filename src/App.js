import React, { useState } from 'react';
import './App.css';

import Book from './components/Book'
import AddForm from './components/AddForm'

const dummyData = [
  {
    id: 1234,
    title: 'Call Of The Wild',
    author: 'Jack London',
    imgSrc: undefined
  },
  {
    id: 2345,
    title: 'The Bible',
    author: 'God',
    imgSrc: undefined
  }
]

function App () {

  const [ books, updateBooks ] = useState(dummyData)
  const [ isFormOpen, toggleForm ] = useState(true)

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
        {books.map((book) => <Book info={book} key={book.id} />)}
      </div>
    )
  }
}

export default App;
