import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';
import { Debounce } from 'react-throttle';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      filteredBooks: []
    };
  }
  
  updateQuery = (query) => {
    this.setState({query: query.trim()})
    BooksAPI.search(query, 20).then((filteredBooks) => {
      if(filteredBooks.length) {
        filteredBooks.map(book => this.props.books.filter(b=> book.id === b.id).map(b => book.shelf = b.shelf))
        this.setState({filteredBooks})
      }
    })
  }
  
  render () {
    const { filteredBooks } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="200" handler="onChange">
              <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              filteredBooks.map(book =>
                <li key={book.id}>
                  <Book book={book} updateMoveShelf={this.props.updateMoveShelf}/>
                </li>
              )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search