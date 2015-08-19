// Generic required assets
require('./main.less');

// Test using a component
require('./components/southAmerica/southAmerica')(document.getElementsByTagName('body')[0]);

var p = document.createElement('p');
var pol = 'interpolation';
p.innerHTML = `This uses ES6 ${pol}!`;
document.body.appendChild(p);
