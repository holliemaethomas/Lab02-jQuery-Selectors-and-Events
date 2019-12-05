'use strict';

let hornKeywords = [];


// getter
let main = $('main');

// setting element content
$('h1').text('The Gallery of Horns');
$('select').attr('id', 'dropBox')
$('select').append('option')


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


// constructor function to assign props of JSON objs
let HornObjects = [];
function HornObject(image_url, title, description, keyword, horns) {
  this.image_url = image_url
  this.title = title
  this.description = description
  this.keyword = keyword
  this.horns = horns
}


// This function gets the objects as a whole from JSON
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




HornObject.prototype.renderWithJquery = function () {
  let clone = $('#display').clone();
  clone.find('img').attr('src', this.image_url)
  clone.find('h2').text(this.title)
  clone.find('#description').text(this.description)
  clone.find('#horn').text(this.horns)
  clone.find('#keyword').text(this.description)
  $('#display').append(clone)
  console.log(clone);
}


HornObject.prototype.render()

allObjects.forEach(HornObject => {
  HornObject.renderWithJquery()
})

