import styles from './templates/footer.css';
import grids from 'purecss/build/grids.css';
import responsiveGrids from 'purecss/build/grids-responsive.css';

const style = Object.assign({}, styles, grids, responsiveGrids);

import compiled from './templates/footer.ejs';

var element = document.createElement('div');
element.className = style.footer;
element.innerHTML = compiled({
  style
});

document.body.appendChild(element);
