/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';


describe('express', () => {
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  it('should have the correct page title', () =>
    nightmare
      .goto(url)
      .evaluate(() => document.querySelector('body').innerText)
      .end()
      .then((text) => {
        expect(text).to.equal('Movie Finder\n\nGo!');
      })
  );

  it('should have the correct page title for main page', () => {
    return pageObject
      .evaluate(() => document.querySelector('body').innerText)
      .then((text) => {
        expect(text).to.contain('Movie Finder');
      });
  });


  it('returns the correct status code', () => axios.get(url)
    .then(response => expect(response.status === 200)));
});
