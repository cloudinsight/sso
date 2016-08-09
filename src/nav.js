import styles from './templates/nav.less';
const style = Object.assign({}, styles);
import compiled from './templates/nav.ejs';

var element = document.createElement('div');
element.innerHTML = compiled({
  style
});

document.body.appendChild(element);
