const fetch = require('node-fetch');
const express = require('express');
const app = express();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;

async function fetchHymn(hymn) {
  const response = await fetch(`https://hymnary.org/hymn/BH1991/${hymn}`);
  const hymnHtml = await response.text();
  const dummyElement = document.createElement('div');
  dummyElement.innerHTML = hymnHtml;
  const textElement = dummyElement.querySelector('#text');
  if (!textElement) return '';
  return textElement.textContent;
}

async function fetchHymnTitle(hymn) {
  const response = await fetch(`https://hymnary.org/hymn/BH1991/${hymn}`);
  const hymnHtml = await response.text();
  const dummyElement = document.createElement('div');
  dummyElement.innerHTML = hymnHtml;
  const textElement = dummyElement.querySelector('.hymntitle');
  if (!textElement) return '';
  return textElement.textContent;
}

app.get('/api/hymn/:id', async (req, res) => {
  const id = req.params.id;
  const hymn = await fetchHymn(id);
  res.send(hymn);
});

app.get('/api/hymntitle/:id', async (req, res) => {
    const id = req.params.id;
    const hymn = await fetchHymnTitle(id);
    res.send(hymn);
});

app.get('/api/reading/:id', async (req, res) => {
    const id = req.params.id;
    // const hymn = await fetchHymnTitle(id);
    // res.send(hymn);
});

app.listen(4000, () => console.log('running on port 4000'));
