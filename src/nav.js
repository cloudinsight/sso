import styles from './templates/nav.css';
import $ from 'jquery';
import sweetAlert from 'sweetalert';
import '!style!css!sweetalert/dist/sweetalert.css';

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
// var demo = [
//   {
//     groupName: '蓝海讯通有限公司',
//     defaultGroup: true,
//     groupId: 123
//   },{
//     groupName: 'blueware',
//     defaultGroup: false,
//     groupId: 456
//   },{
//     groupName:'OneApm',
//     defaultGroup: false,
//     groupId: 789
//   }];
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
    $(Span).attr('key', data[i].groupId);
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
function setCookie(name,value,days){
  var exp=new Date();
  exp.setTime(exp.getTime() + days*24*60*60*1000);
  var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
  document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString()+";path=/";
}
function getCookie(name){
  var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
  if(arr!=null){
    return unescape(arr[2]);
    return null;
  }
}
function delCookie(name){
  var exp=new Date();
  exp.setTime(exp.getTime()-1);
  var cval=getCookie(name);

  if(cval!=null){
    document.cookie=name+"="+cval+";expires="+exp.toGMTString();
  }
}
$(document).ready(function(){
  getInfo();
  // setInfo(demo);
  setCookie('key','123');
  // 绑定进入系统接口
  $('.'+style['infoList']).children().each(function() {
    if($(this).find('span').text()){
      $(this).click(function () {
        var group_id= $(this).find('span').attr('key');
        $.ajax({
          type: 'GET',
          url: `${http}//${host}${BlueWare.urlPrefix}user/groups/${group_id}/switch`
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
  $('.'+style['changeAccount']).click(function () {
    swal({
          title: "确定继续 ?",
          text: "此操作将退出当前账号",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            delCookie('key');
            swal.close();
          } else {
            swal.close();
          }
        })
  })
});

document.body.appendChild(element);
