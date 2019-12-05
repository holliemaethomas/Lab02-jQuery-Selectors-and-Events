'use strict'

<<<<<<< HEAD
<<<<<<< HEAD
function SpikedImages(item) {
  this.image_url = item.image_url;
  this.title = item.title;
  this.horns = item.horns;
  this.keyword = item.keyword;
  this.description = item.description;

  imageTotals.push(this);
}

const imageTotals =[];

SpikedImages.prototype.renderHornItem = function() {
  $('main').append('<section class="clone"><section>');
  let $clone = $('section[class="clone"]');
  let cloneTemplate = $('#photo-template').html();
=======
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
>>>>>>> 2552d8990524b6e7f2209de4f6249f5d5cc2931f

  $clone.html(cloneTemplate);

<<<<<<< HEAD
=======

function SpikedImages(item) {
  this.image_url = item.image_url;
  this.title = item.title;
  this.horns = item.horns;
  this.keyword = item.keyword;
  this.description = item.description;

  imageTotals.push(this);
}

const imageTotals =[];

SpikedImages.prototype.renderHornItem = function() {
  $('main').append('<section class="clone"><section>');
  let $clone = $('section[class="clone"]');
  let cloneTemplate = $('#photo-template').html();

  $clone.html(cloneTemplate);


>>>>>>> 630c49a539bb07571b05627c7e5799fe093ae0de
  $clone.find('h2').text(this.title);
  $clone.find('p').text(this.description);
  $clone.find('img').attr('src', this.image_url);
  $clone.find('img').attr('alt', this.title);
  $clone.removeClass('clone');
  $clone.attr('class', this.keyword);
}


SpikedImages.prototype.renderKeyValues = function() {
  let filterSelectValues = [];
  // remove all elements except for first one
  $('option').not(':first').remove();
  imageTotals.forEach(image => {
    if (!filterSelectValues.includes(image.keyword)) {
      filterSelectValues.push(image.keyword);
    }
  });

  filterSelectValues.sort();

  filterSelectValues.forEach(keyword => {
    let altPhrase = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(altPhrase);
  });
}

function filterSpikePics() {
  $('select').on('change', function() {
    let passPhrase = $(this).val();
    if(passPhrase !== 'default') {
      $('section').hide();
      $(`section[class = "${passPhrase}"]`).show();
    } else {
      $('section').show();
    }
  });
}

function jsonData() {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(spikedImageObj => {
        new SpikedImages(spikedImageObj);
      })
    })
    .then(() => {
      imageTotals.forEach( image =>{
        image.renderHornItem();
        image.renderKeyValues();
      })
    })
}
<<<<<<< HEAD
=======
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
>>>>>>> 2552d8990524b6e7f2209de4f6249f5d5cc2931f

allObjects.forEach(HornObject => {
  HornObject.renderWithJquery()
})
=======
>>>>>>> 630c49a539bb07571b05627c7e5799fe093ae0de

$(() => {
  jsonData();
  filterSpikePics();
});
