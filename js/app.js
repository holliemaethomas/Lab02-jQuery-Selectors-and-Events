'use strict';
let hornKeywords = [];
// Jquery notes

// getter
let main = $('main');

// setting element content

$('h1').text('The Gallery of Horns');

$('select').attr('id', 'dropBox')
$('select').append('option')


// setting html elements
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



let HornObjects = [];
function HornObject(image_url, title, description, keyword, horns) {
  this.image_url = image_url
  this.title = title
  this.description = description
  this.keyword = keyword
  this.horns = 0
}


// This function gets the objects a whole from JSON
let allObjects = [];
$.get('../data/page-1.json').then(
  (dataArray) => {
    dataArray.forEach((horn) => {
      allObjects.push(horn)
    })
    for (var j = 0; j < allObjects.length; j++) {
      new HornObject(allObjects[j])
    }
  });
console.log(allObjects);



const showImage = function () {

  allObjects.forEach(
    $('#display').append(`
    <div>
      <h2>${allObjects.title}</h2>
      <img src="${allObjects.image_url}"></img>
      <p>${allObjects.description}</p>
      <p>${allObjects.keyword}</p>
      <p>${allObjects.horns}</p>
    </div>
  `))
}


showImage();


