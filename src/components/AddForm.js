import React from 'react'
import '../styles/Form.css'

function AddForm (props) {
  const titleRef = React.useRef()
  const authorRef = React.useRef()
  const imgSrcRef = React.useRef()
  const idRef = React.useRef()

  function handleAddBookClick (event) {
    event.preventDefault()

    const newBook = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      imgSrc: imgSrcRef.current.value
    }

    props.addBook(newBook)
  }

  return (
    <form>
      <label htmlFor='title'>Title</label>
      <input ref={titleRef} id='title' type='text' />
      <label htmlFor='author'>Author</label>
      <input ref={authorRef} id='author' type='text' />
      <label htmlFor='id'>id</label>
      <input ref={idRef} id='id' type='text' />
      <label htmlFor='imgSrc'>Image Source</label>
      <input ref={imgSrcRef} id='imgSrc' type='text' />
      <button onClick={handleAddBookClick}>add me!</button>
    </form>
  )
}

export default AddForm
