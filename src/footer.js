import styles from './templates/footer.less';
import grids from 'purecss/build/grids.css';
import responsiveGrids from 'purecss/build/grids-responsive.css';

const style = Object.assign({}, styles, grids, responsiveGrids)
import compiled from './templates/footer.ejs';

console.log(style);

var element = document.createElement('div');
element.innerHTML = compiled({
  style
});

document.body.appendChild(element);
