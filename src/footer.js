import styles from './templates/footer.css';
import grids from 'purecss/build/grids.css';
import $ from 'jquery';
import responsiveGrids from 'purecss/build/grids-responsive.css';

const style = Object.assign({}, styles, grids, responsiveGrids);

import compiled from './templates/footer.ejs';

var element = document.createElement('div');
element.className = style.footer;
element.innerHTML = compiled({
  style
});

var nowDate = new Date();
$(document).ready(function () {
  $("."+style['cr-end-time']).text(nowDate.getFullYear());
  $("."+style['wechat']).mouseover(function () {
    $('.'+style['wechatQR']).addClass(style['show']);
  })
  $("."+style['wechat']).mouseout(function () {
    $('.'+style['wechatQR']).removeClass(style['show']);
  })
});

document.body.appendChild(element);
