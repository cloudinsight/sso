import styles from './templates/nav.css';
import $ from 'jquery';
const style = Object.assign({}, styles);

import compiled from './templates/nav.ejs';

var element = document.createElement('div');
element.className = style.nav;
element.innerHTML = compiled({
  style
});
$(document).ready(function(){
  $('.'+style['burger-wrapper']).click(function(){
    if($('.'+style['main-navblock']).hasClass(style['navOpen'])){
      $('.'+style['main-navblock']).removeClass(style['navOpen']);
      $('.'+style['burger']).removeClass(style['active-burger']);
    }else{
      $('.'+style['main-navblock']).addClass(style['navOpen']);
      $('.'+style['burger']).addClass(style['active-burger']);
    }
  });
});

document.body.appendChild(element);
