import styles from './templates/nav.css';

const style = Object.assign({}, styles);

import compiled from './templates/nav.ejs';

var element = document.createElement('div');
element.className = style.nav;
element.innerHTML = compiled({
  style
});

document.body.appendChild(element);
