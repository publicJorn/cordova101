require('./southAmerica.less');

const imgSouthAmerica = require('./images/south-america.png');

module.exports = (parent, caption = 'South America Trip') => {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const figCaption = document.createElement('figcaption');

  img.src = imgSouthAmerica;
  img.alt = 'South America';

  // Using some fancy ES6 string interpolation, because we can
  figCaption.innerHTML = `✈ ${caption} ✈`;

  figure.setAttribute('class', 'south-america');
  figure.appendChild(img);
  figure.appendChild(figCaption);
  parent.appendChild(figure);
};
