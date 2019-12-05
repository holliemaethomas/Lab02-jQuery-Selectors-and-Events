'use strict';

let hornKeywords = [];


// getter
let main = $('main');

// setting element content
$('h1').text('The Gallery of Horns');
$('select').attr('id', 'dropBox');
$('select').append('option');


// setting the static html elements
main.append(`
<h1></h1>
<select></select>
`)


// This function gets the keywords out of JSON file and appends them to the dropdown as options
$.get('../data/page-1.json').then(
  (dataArray) => {
    dataArray.forEach((horn) => {
      hornKeywords.push(horn.keyword)
    })
    for (var i = 0; i < hornKeywords.length; i++) {
      $('#dropBox').append($('<option>').text(hornKeywords[i]))
    }
  });

$('h1').text('The Gallery of Horns');
$('select').attr('id', 'dropBox')


// constructor function to assign properties of JSON objs
function HornObject(image_url, title, description, keyword, horns) {
  this.image_url = image_url
  this.title = title
  this.description = description
  this.keyword = keyword
  this.horns = horns
}


// This function gets the objects as a whole from JSON and instantiates 
let allObjects = [];
$.get('../data/page-1.json').then(
  (dataArray) => {
    dataArray.forEach((horn) => {
      new HornObject(horn.image_url, horn.title, horn.description, horn.keyword, horn.horns);
      allObjects.push(horn);
    })
  });


const renderWithJquery = function (item) {
  let $clone = $('#display').html()
  $clone.find('img').attr('src', item.image_url);
  $clone.find('h2').text(item.title);
  $clone.find('#description').text(item.description);
  $clone.find('#horn').text(item.horns);
  $clone.find('#keyword').text(item.description);
  main.append($clone);
};

allObjects.forEach(hornObject => {
  renderWithJquery(hornObject)
});

// main.append($`#display`);