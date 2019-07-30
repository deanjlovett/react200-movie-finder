import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getInfo } from '../MovieSearchContainer/searchAction';

export default class MovieDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getInfo(this.props.match.params.id));
  }

  render() {
    const { movieInfo } = this.props;
    return (
      <div>
        <div className='jumbotron'>
          <h1 className='display-3 text-center'>Movie Finder</h1>
        </div>
        <div id={ 'movie' }>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <Link 
                  to='/' 
                  className='btn btn-outline-primary'
                  style={{marginBottom: '25px'}}
                >Go Back</Link>
                <br/>
                <div className='row'>
                  <div className='col-4'>
                    <div className='card'>
                      <div className='card-body' />
                      <img
                        className='img-fluid'
                        src={ movieInfo.Poster }
                        alt={ movieInfo.Title }
                      />
                    </div>
                  </div>
                  <div className='col-8'>
                    <div className='card'>
                      <div className='card-header'
                        style={{color: 'Blue ', backgroundColor: 'LightBlue'}}
                      >
                        <h2><b>Movie Details</b></h2>
                      </div>
                      <div className='card-body'>
                        <h3>{ movieInfo.Title }</h3>
                        <Link className='btn btn-primary'>{ movieInfo.Year }</Link>{' '}
                        <Link className='btn btn-primary'>{ movieInfo.Runtime }</Link>{' '}
                        <Link className='btn btn-primary'>{ movieInfo.Genre }</Link>{' '}
                        <h6>{' '}</h6>
                        <h5>{ movieInfo.Plot }</h5>
                        <br/>
                        <h5>{ movieInfo.Awards!='N/A' ? movieInfo.Awards : ' ' }</h5>
                        <p>
                          <span><b>Metascore:</b> { movieInfo.Metascore }/100 </span>
                          <br />
                          <span><b>IMDB:</b> { movieInfo.imdbRating }/10 </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
