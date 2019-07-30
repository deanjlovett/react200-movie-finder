import { Link } from 'react-router-dom';
import React from 'react';
import { updateSearch, getMovie } from './searchAction';

export default class MovieSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(event) {
    const { dispatch } = this.props;
    const { value } = event.target;
    dispatch( updateSearch( value ) );
  }

  handleSubmit() {
    const { title, dispatch } = this.props;
    dispatch( getMovie(title) );
  }

  render() {
    const { value, movies } = this.props;
    return (
      <div>
        <div className='container'>
          <div className='jumbotron'>
            <h1 id='appTitle' className='display-3 text-center'>Movie Finder</h1>
          </div>
          <div className='row' >
            <input
              id='inputSearch'
              name='inputSearch'
              type='text'
              className='col-11'
              placeholder='Enter a movie title'
              value={ value }
              onChange={ this.handleSearch }
            />
            <div className='col-1'>
              <button
                id='submitSearch'
                name='submitSearch'
                className='btn btn-outline-secondary'
                type='button'
                onClick={ this.handleSubmit }
              >Go!</button>
            </div>
          </div>
        </div>

        {movies.map((searchedMovie,sindex) => (
          <div className='card' key={ searchedMovie.imdbID }>
            <div className='card-body row'>
              <div className='col-3'>
                <img
                  className='img-fluid'
                  src={ searchedMovie.Poster }
                  alt={ searchedMovie.Title }
                />
              </div>
              <div className='col-9'>
                <h5 className='card-title'>{searchedMovie.Title}</h5>
                <h6 
                  className='card-subtitle'
                >
                  <b>{searchedMovie.Year}</b>
                </h6>
                <hr />
                <p className='card-text'>{searchedMovie.Plot}</p>
                <Link
                  id='linkDetail{sindex}'
                  to={ `/movie/${searchedMovie.imdbID}` }
                  className='btn btn-primary float-right'
                >
                  More Information
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
