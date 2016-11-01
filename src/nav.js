import styles from './templates/nav.css';
import $ from 'jquery';
const style = Object.assign({}, styles);

import compiled from './templates/nav.ejs';

let host;
if (window.location.port === '') {
  host = window.location.hostname;
} else {
  host = `${window.location.hostname}:${window.location.port}`;
}
const http = window.location.protocol;

var element = document.createElement('div');
element.className = style.nav;
element.innerHTML = compiled({
  style
});
var demo = [
  {
    groupName: '蓝海讯通有限公司',
    used: true
  },{
    groupName: 'blueware',
    used: false
  },{
    groupName:'OneApm',
    used: false
  }];
function setInfo(data) {
  for (var i=0; i < data.length;i++) {
    var infoItem = document.createElement('li');
    var infoBox = document.createElement('p');
    var Span = document.createElement('span');
    var rightIcon = document.createElement('i');
    if(data[i].defaultGroup === true){
      rightIcon.className = style['right'];
    }
    $('.'+style['right']).parent().parent().css('background-color','#fff');
    infoBox.className = style['clearfix'];
    Span.innerHTML = data[i].groupName;
    infoBox.appendChild(Span);
    infoBox.appendChild(rightIcon);
    infoItem.appendChild(infoBox);
    var info = document.getElementsByClassName('info')[0];
    $('.'+style['infoList']).append(infoItem)
  }
}
function openInfo() {
  $(this).toggleClass(style['Open']);
  $(this).find('i').toggleClass(style['shangjiantou']);
  $('.'+style['info']).toggleClass(style['open']);
}
function getInfo() {
  $.ajax({
    type: 'GET',
    url: `${http}//${host}${BlueWare.urlPrefix}user/groups`,
    success(data) {
      setInfo(data);
    }
  })
}
$(document).ready(function(){
  getInfo();
  // 绑定进入系统接口
  $('.'+style['infoList']).children().each(function() {
    if($(this).find('span').text()){
      $(this).click(function (e) {
        $.ajax({
          type: 'GET',
          url: `${http}//${host}${BlueWare.urlPrefix}user/groups/${e.target.key}/switch`
        })
      });
    }
  });
  $('.'+style['infoBox']).click(openInfo);
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
