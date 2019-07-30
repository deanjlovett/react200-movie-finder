const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config();

const app = express();

let idMap = new Map();
let searchMap = new Map();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/movies/:movie', (req, res) => {
  const key = process.env.OMDB_API_KEY
  const movieName = req.params.movie;

  let searchData = searchMap.get(movieName);
  if( searchData != undefined ) {
    res.status(200).send( searchData );
  } else {
    return axios.get(`http://www.omdbapi.com/?apikey=${key}&type=movie&s=${movieName}`)
      .then(response => {
        searchMap.set(searchData, response.data);
        res.status(200).send(response.data);
      })
      .catch(err => console.log(err));
  }
});

app.get('/movie/:id', (req, res) => {
  const key = process.env.OMDB_API_KEY
  const id = req.params.id;
  let idData = idMap.get(id);
  if( idData != undefined ) {
    res.status(200).send( idData );
  }else {
    return axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${id}`)
      .then(response => {
        idMap.set(id, response.data);
        res.status(200).send(response.data);
      })
      .catch(err => console.log(err));
  }
});

module.exports = app;

