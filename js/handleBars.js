/* eslint-disable no-undef */
'use strict'

let allSpikedImages = [];
let horns = ['Filter by Horns'];
let keywordArr = ['Filter by Keyword'];
let sortBy = ['Sort by', 'title', 'horns'];
let finalSort = [];
let idGetter = ['#section-template', '#option-template'];
let options = [['.FilterByKeyword', keywordArr], ['.imgFilter', '.FilterbyHorns'], ['.sortFilter', sortBy]];

const SpikedImages = function (image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword
  this.horns = horns
  allSpikedImages.push(this)
};

SpikedImages.prototype.renderSpikes = function () {
  htmlSetter(idGetter[0], '.content-placeHolder', allSpikedImages)
};

 let htmlSetter = (templateID, htmlClass, arr) => {
  let templateScript = $(templateID).html();
  let template = Handlebars.compile(templateScript);
  let compiledHTML = template(arr);
  $(htmlClass).html(compiledHTML);
}


const sorted = selection => {
  finalSort = allSpikedImages.sort((a, b) => {
    if (a[selection] < b[selection]) return -1;
    if (a[selection] > b[selection]) return -1;
    return 0;
  });
  finalSort.forEach(titleSort => titleSort.renderSpikes)
}


let keywords = ['Filter By Keyword']
const buildSpiked = imageJSON => {
  imageJSON.forEach(spikeImage => {
    new SpikedImages(spikeImage.image_url, spikeImage.title, spikeImage.description, spikeImage.keyword, spikeImage.horns);
    if (!keywords.includes(spikeImage.keyword)) {
      keyword.push(spikeImage.keyword);
    }
    if (!keywords.includes(spikeImage.horns)) {
      keyword.push(spikeImage.horns);
    }
  }); options.forEach(value => htmlSetter(idGetter[1], value[0], value[1]));
  allSpikedImages.forEach(spikeImage.renderSpikes);
}

const hideIt = () => {
  $('section').hide();
  $('h2').hide();
  $('img').hide();
  $('p').hide();
}

const showIt = label => {
  $(`section ${label} `).show();
  $(`h2 ${label} `).show();
  $(`img ${label} `).show();
  $(`p ${label} `).show();
}

const defaulter = (drop1, drop2) => {
  $(options[drop1])[0].selectedIndex = 'default';
  $(options[drop2])[0].selectedIndex = 'default';
};

// keyword filter
$('select[class = "FilterByKeyWord"]').on('change', function () {
  let $select = $(this).val();
  hideIt();
  showIt(`[data=$"${$select}"]`);
  defaulter(0, 2);
});

//  spiked image filter
$('select[class=".imgFilter"]').on('change', function () {
  let $select = $(this).val();
  hideIt();
  showIt(`[data=$"${$select}"]`);
  defaulter(0, 2);
});

$('select[class="sortFilter"]').on('change', function () {
  let $select = $(this).val()
  $('main').empty();
  sorted($select);
  $('section').show();
  $('h2').show();
  $(img).show();
  $('p').show();
  defaulter[0, 2]
});

$('button[name="reset"]').click(function () {
  location.reload();
});

SpikedImages.getAll = (fileName) => {
  let filePath = `${fileName}`;
  let fileType = 'json';
  $.get(filePath, fileType).then(buildSpiked)
};

$('button[class="page1"]').click(function () {
  SpikedImages.length = 0;
  $('main').empty();
  Images.getAllImagesFromFile('data/page-1.json');
});

$('button[class="page1"]').click(function () {
  SpikedImages.length = 0;
  $('main').empty();
  Images.getAllImagesFromFile('data/page-1.json');
});

// nick Paro helped me redo this lab