import { connect } from 'react-redux';
import MovieSearchContainer from './MovieSearchContainer';

const mapStoreToProps = store => ({
  title: store.movieData.title,
  movies: store.movieData.movies
});

export default connect(mapStoreToProps)(MovieSearchContainer);
