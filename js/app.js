'use strict'

let imageOneAll = [];
let imageTwoAll = [];


const SpikeImage = function (image_url, title, description, keyword, numberofhorns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.numberofhorns = numberofhorns;
};

SpikeImage.prototype.renderWithHandleBars = function () {
  let hornHtml = $('#horn-template').html();
  const renderImageWithHandlebars = Handlebars.compile(hornHtml);
  const hornImage = renderImageWithHandlebars(this);
  $('main').append(hornImage);
};


const pageOneRend = () => {
  imageOneAll.forEach(image => {
    image.renderWithHandleBars();
  })
}

const pageOneGetAll = () => {
  $.get('data/page-1.json').then(images => {
    images.forEach(eachImage => {
      imageOneAll.push(new SpikeImage(eachImage.image_url, eachImage.title, eachImage.description, eachImage.keyword, eachImage.horns));
    })
    pageOneRend();
  })
}

const pageTwoRender = () => {
  imageTwoAll.forEach(image => {
    image.renderWithHandleBars();
  })
}

const getAllPageTwoFiles = () => {
  $.get('data/page-2.json').then(images => {
    images.forEach(eachImage => {
      imageTwoAll.push(new SpikeImage(eachImage.image_url, eachImage.title, eachImage.description, eachImage.keyword, eachImage.horns));
    })
  })
}


getAllPageTwoFiles();
pageOneGetAll();

//-------------------------------------

function renderDropDown(attribute) {
  const uniques = [];
  let dropdown = $('select');
  imageOneAll.forEach(image => {
    let flag = true;
    uniques.forEach(uniqueImage => {
      if (uniqueImage === image[attribute]) {
        flag = false;
      }
    })
    if (flag) {
      dropdown
        .append($('<option></option>')
          .attr('value', image[attribute])
          .text(image[attribute]));
      uniques.push(image[attribute]);
    }
  })
}

$('select').on('change', function () {
  let $selected = $(this).val();
  $('section').hide();
  $(`img[data-keyword = ${$selected}]`).parent().show();
  $(`img[data-horns = ${$selected}]`).parent().show();
});

$('input[type=radio]').on('change', function () {
  $('select').empty();
  let $clicked = $(this).val();
  //console.log($(this).val())
  if ($clicked === 'radio-btn1') {
    renderDropDown('keyword');
  } else {
    renderDropDown('numberofhorns');
  }
});

$('#page-one').on('click', function () {
  $('section').hide();
  pageOneRend();
})

$('#page-two').on('click', function () {
  $('section').hide()
  pageTwoRender();
})
