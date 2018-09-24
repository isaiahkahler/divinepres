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
    const id = decodeURIComponent(req.params.id);
    const reading = await fetchReading(id);
    res.send(reading);
});


async function fetchReading(passage) {
  const response = await fetch(`https://www.biblegateway.com/passage/?search=${passage.replace(" ", "+")}&version=NKJV`);
  const readingHTML = await response.text();
  const document = new JSDOM(readingHTML).window.document;
  const dummyElement = document.createElement('div');
  dummyElement.innerHTML = readingHTML;
  const passageElement = dummyElement.querySelector('.passage-content');
  passageElement.querySelector(".footnotes").outerHTML = '';
  passageElement.querySelector(".crossrefs").outerHTML = '';


  let chapters = passageElement.getElementsByClassName('chapternum');
  for(let i = 0; i < chapters.length; i++){
    chapters[i].classList.add('slideitem');
  }
  let verses = passageElement.getElementsByClassName('versenum');
  for(let i = 0; i < verses.length; i++){
    verses[i].classList.add('slideitem');
  }


  if (!passageElement) return null;
  const passageHTML = passageElement.outerHTML;
  return passageHTML;
}

app.listen(4000, () => console.log('running on port 4000'));
