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
  $('.sso-burger-wrapper').click(function(){
    if($('.sso-main-navblock').hasClass('sso-navOpen')){
      $('body').removeClass('sso-homeShow');
      $('.sso-main-navblock').removeClass('sso-navOpen');
      $('.sso-burger').removeClass('sso-active-burger');
    }else{
      $('body').addClass('sso-homeShow');
      $('.sso-main-navblock').addClass('sso-navOpen');
      $('.sso-burger').addClass('sso-active-burger');
    }
  });
});

document.body.appendChild(element);
