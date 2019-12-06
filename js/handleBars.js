'use strict'

var spikeImageArr = [];
var keywordArr = ['Filter by Keyword'];
var hornsArr = ['Filter by Horns'];
var sortBy = ['Sort by', 'title', 'horns'];
var finalSort = [];
var idGetter = ['#section-template', '#option-template'];
var options = [
  ['.keywordFilter', keywordArr],
  ['.imgFilter', hornsArr],
  ['.sortFilter', sortBy]
];

var SpikedImages = function(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword
  this.horns = horns
  spikeImageArr.push(this)
};

SpikedImages.prototype.renderSpikes = function () {
  htmlSetter(idGetter[0], '.content-placeHolder', spikeImageArr)
};

var htmlSetter = (templateId, htmlClass, arr) => {
  var templateScript = $(templateId).html();
  var template = Handlebars.compile(templateScript);
  var compiledHTML = template(arr);
  $(htmlClass).html(compiledHTML);
};


var sorted = selection => {
  finalSort = spikeImageArr.sort((a, b) => {
    if (a[selection] < b[selection]) return -1;
    if (a[selection] > b[selection]) return 1;
    return 0;
  });
  finalSort.forEach(titleSort => titleSort.renderSpikes)
}


// var keywords = ['Filter By Keyword']
var buildSpiked = imageJSON => {
  imageJSON.forEach(spikeImage => {
    new SpikedImages(spikeImage.image_url, spikeImage.title, spikeImage.description, spikeImage.keyword, spikeImage.horns);
    if (!keywordArr.includes(spikeImage.keyword)){
      keywordArr.push(spikeImage.keyword);
    }
    if (!hornsArr.includes(spikeImage.horns)) {
      hornsArr.push(spikeImage.horns);
    }
  });
  options.forEach(value => htmlSetter(idGetter[1], value[0], value[1]));
  spikeImageArr.forEach(spikeImage => spikeImage.renderSpikes);
}

var hideIt = () => {
  $('section').hide();
  $('h2').hide();
  $('img').hide();
  $('p').hide();
}

var showIt = label => {
  $(`section${label}`).show();
  $(`h2${label}`).show();
  $(`img${label}`).show();
  $(`p${label}`).show();
}

var defaulter = (drop1, drop2) => {
  $(options[drop1])[0].selectedIndex = 'default';
  $(options[drop2])[0].selectedIndex = 'default';
};

// keyword filter
$('select[class = "FilterByKeyWord"]').on('change', function () {
  var $select = $(this).val();
  hideIt();
  showIt(`[data=$"${$select}"]`);
  defaulter(0, 2);
});

//  spiked image filter
$('select[class=".imgFilter"]').on('change', function () {
  var $select = $(this).val();
  hideIt();
  showIt(`[data=$"${$select}"]`);
  defaulter(0, 2);
});

$('select[class="sortFilter"]').on('change', function () {
  var $select = $(this).val()
  $('main').empty();
  sorted($select);
  $('section').show();
  $('h2').show();
  $('img').show();
  $('p').show();
  defaulter[0, 2]
});

$('button[name="reset"]').click(function () {
  location.reload();
});

SpikedImages.getAll = (fileName) => {
  var filePath = `${fileName}`;
  var fileType = 'json';
  $.get(filePath, fileType).then(buildSpiked)
};

$('button[class="page-1"]').click(function() {
  spikeImageArr.length = 0;
  $('main').empty();
  SpikedImages.getAll('data/page-1.json');
});

$('button[class="page-2"]').click(function() {
  (spikeImageArr.length = 0);
  $('main').empty();
  SpikedImages.getAll('data/page-2.json');
});




// nick Paro helped me redo this lab

