/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const axios = require('axios');

//let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

//app.listen(8888);

const url = 'http://localhost:8888';
chai.use(chaiHttp);

// describe('express', () => {
//   beforeEach(() => {
//     nightmare = new Nightmare();
//   });

//   it('should have the correct page title', () =>
//     nightmare
//       .goto(url)
//       .evaluate(() => document.querySelector('body').innerText)
//       .end()
//       .then((text) => {
//         expect(text).to.equal('Movie Finder\n\nGo!');
//       })
//   );

//   it('returns the correct status code', () => axios.get(url)
//     .then(response => expect(response.status === 200)));
// });

let nightmare = new Nightmare();

describe('Verify App', function() {
  this.timeout(12000);

  let pageObject = null;
  let httpServer = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  it('should have the correct page title for main page', () => {
    return pageObject
      .evaluate(() => document.querySelector('body').innerText)
      .then((text) => {
        expect(text).to.contain('Movie Finder');
      });
  });

  it('returns the correct status code on search page', () =>
    axios.get(url)
      .then(response => expect(response.status === 200))
  );

  it('should display an input field for searching', () => {
    return pageObject
      .evaluate(() => document.querySelector('input[id=inputSearch]').innerText)
      .then(output => {
        expect(output).to.exist;
      });
  });

  it('should display a button for searching', () => {
    return pageObject
      .evaluate(() => document.querySelector('#submitSearch').innerText)
      .then(output => {
        expect(output).to.exist;
      });
  });
  
  //movie/tt0076759 star wars
  it('should get an object for this Detail page', (done) => {
    chai.request(app)
      .get('/movie/tt0076759')
      .end((err, res) => {
        expect(typeof res).to.equal('object');
        expect(err).to.be.null;
        done();
      });
  });

  it('should get an object for this Detail page', (done) => {
    chai.request(app)
      .get('/movie/tt0076760')
      .end((err, res) => {
        expect(typeof res).to.equal('object');
        expect(err).to.be.null;
        done();
      });
  });

  it('should get an object for this Detail page', (done) => {
    chai.request(app)
      .get('/movie/tt0076761')
      .end((err, res) => {
        expect(typeof res).to.equal('object');
        expect(err).to.be.null;
        done();
      });
  });

  it('should get an object for this Detail page', (done) => {
    chai.request(app)
      .get('/movie/tt4154756')
      .end((err, res) => {
        expect(typeof res).to.equal('object');
        expect(err).to.be.null;
        done();
      });
  });

  it('should get an object when this search term is used', (done) => {
    chai.request(app)
      .get('/movies/star')
      .end((err, res) => {
        expect(typeof res).to.equal('object');
        expect(err).to.be.null;
        done();
      });
  });

  it('should get an object when this search term is used', (done) => {
    chai.request(app)
      .get('/movies/war')
      .end((err, res) => {
        expect(typeof res).to.equal('object');
        expect(err).to.be.null;
        done();
      });
  });

});