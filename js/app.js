'use strict';

// Jquery notes

// getter
let main = $('main');


// setting html elements
main.append(`
<h1></h1>
<select></select>
`)

$.get('./data/page-1.json').then(
  (data) => {
    console.log(data);

  });


// getter then a setter
// we can write either css or custom jquery selectors to select things
//text() is used as a setter
$('h1').text('The Gallery of Horns');
// text() is used as a getter
$('select').attr('id' , 'dropBox')


function Dog(name, img, hobbies){
  this.name = name;
  this.img = img;
  this.hobbies = hobbies;
}

Dog.prototype.renderWithJquery = function(){
  $('#dogs').append(`
    <div>
      <h2>${this.name}</h2>
      <img src="${this.img}"></img>
      <p>${this.hobbies}</p>
    </div>
  `);
};

Dog.prototype.renderWithJqueryClone = function(){
  let clone = $('#dog-template').clone();

  //change the h2, p, and image
  // find looks in the targeted jquery object
  clone.find('h2').text(this.name);
  clone.find('img').attr('src', this.img);
  clone.find('p').text(this.hobbies);
  clone.removeAttr('id');
  console.log(clone);

  $('#dogs').append(clone);
};

let odie = new Dog('Odie', 'https://vignette.wikia.nocookie.net/garfield/images/a/ac/OdieCharacter.jpg/revision/latest?cb=20161218045212', 'annoying garfield, loving jon');

odie.renderWithJquery();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();

// $('#dog-template').hide();


