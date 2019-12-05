'use strict'

function SpikedImages(item) {
  this.image_url = item.image_url;
  this.title = item.title;
  this.horns = item.horns;
  this.keyword = item.keyword;
  this.description = item.description;

  imageTotals.push(this);
}

const imageTotals = [];

SpikedImages.prototype.renderHornItem = function () {
  $('main').append('<section class="clone"><section>');
  let $clone = $('section[class="clone"]');
  let cloneTemplate = $('#photo-template').html();

  $clone.html(cloneTemplate);

  $clone.find('h2').text(this.title);
  $clone.find('p').text(this.description);
  $clone.find('img').attr('src', this.image_url);
  $clone.find('img').attr('alt', this.title);
  $clone.removeClass('clone');
  $clone.attr('class', this.keyword);
}

Image.prototype.renderWithHandlerBars = function () {
  let spikeHtml = $('#photo-template').html();
  const renderImageWithHandlebars = Handlebars.compile(spikeHtml);
  const spikeImage = renderImageWithHandlebars(this);
  $('main').append(spikeImage);
};


SpikedImages.prototype.renderKeyValues = function () {
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
  $('select').on('change', function () {
    let passPhrase = $(this).val();
    if (passPhrase !== 'default') {
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
      imageTotals.forEach(image => {
        image.renderHornItem();
        image.renderKeyValues();
      })
    })
}

$(() => {
  jsonData();
  filterSpikePics();
});

