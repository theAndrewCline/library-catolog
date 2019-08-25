import React from 'react'

function Book (props) {
  function deleteBook () {
    fetch(`http://localhost:4000/books/${props.info.id}/delete`, {
      method: 'POST'
    })
      .then(props.updateList())
  }

  return (
    <div>
      <h1>{props.info.title}</h1>
      <button onClick={deleteBook}>x</button>
    </div>
  )
}

export default Book
