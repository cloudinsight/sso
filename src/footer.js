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
  $('.sso-cr-end-time').text(nowDate.getFullYear());
  $('.sso-wechat').mouseover(function () {
    $('.sso-wechatQR').addClass('sso-show');
  })
  $('.sso-wechat').mouseout(function () {
    $('.sso-wechatQR').removeClass('sso-show');
  })
});

document.body.appendChild(element);
