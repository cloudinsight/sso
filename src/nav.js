import styles from './templates/nav.css';
import $ from 'jquery';
import sweetAlert from 'sweetalert';
import '!style!css!sweetalert/dist/sweetalert.css';

const style = Object.assign({}, styles);

import compiled from './templates/nav.ejs';

var element = document.createElement('div');
element.className = style.nav;
element.innerHTML = compiled({
  style
});
var ciWeb = [{
  'linkName' : '产品' ,
  'link' : "//cloudinsight.oneapm.com/product/product.html"
},{
  'linkName' : '文档' ,
  'link' : "//docs-ci.oneapm.com"
},{
  'linkName' : '关于' ,
  'link' : "//cloudinsight.oneapm.com/about/group.html"
},{
  'linkName' : '技术博客' ,
  'link' : "//cloudinsight.daoapp.io/"
},{
  'linkName' : '图片' ,
  'link' : "//cloudinsight.oneapm.com/activity/gettee.html"
}];
var docsCi = [{
  'linkName' : '快速入门' ,
  'link' : "/quick-start/"
},{
  'linkName' : '安装配置' ,
  'link' : "/agent/"
},{
  'linkName' : '操作指南' ,
  'link' : "/platform/"
},{
  'linkName' : '实践案例' ,
  'link' : "/best-practise/"
},{
  'linkName' : '常见问题' ,
  'link' : "/qa/"
}];
var demo = [
  {
    groupName: '蓝海讯通有限公司',
    defaultGroup: true,
    groupId: 123
  },{
    groupName: 'blueware',
    defaultGroup: false,
    groupId: 456
  },{
    groupName:'OneApm',
    defaultGroup: false,
    groupId: 789
  }];
function setInfo(data) {
  for (var i=0; i < data.length;i++) {
    var infoItem = document.createElement('li');
    var infoBox = document.createElement('p');
    var Span = document.createElement('span');
    var rightIcon = document.createElement('i');
    if(data[i].defaultGroup === true){
      rightIcon.className = style['right'];
      $('.' + style['infoBox']).children('span').html(data[i].groupName);
      console.log($('.' + style['infoList']));
      $(infoBox).addClass(style['onlineGroup']);
      $(infoBox).css('color','#333');
    }
    $(infoBox).addClass(style['clearfix']);
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
const http = window.location.protocol;
function getInfo() {
  $.ajax({
    type: 'GET',
    dataType: 'JSONP',
    jsonpCallback:"foo",
    url: `${http}//cloud.oneapm.com/v1/user/groups`,
    success(data) {
      const arr = [];
      if (data.result.length !== 0) {
        $('.'+style['accountBtn']).css('display', 'none');
        $('.'+style['accountInfo']).css('display', 'inline-block');
        setInfo(data.result);
      }
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
function setDoscNavActive() {
  var key=window.location.pathname;
  var arr5=['agent','api','cloud-integration','services','services_example'];
  var arr1=['quick-start'];
  var arr3=['release-note','platform','dashboard','metric','alert','event'];
  var arr4=['use-case','best-practise'];
  var arr2=['qa'];
  var Arr=[arr1,arr2,arr3,arr4,arr5];
  for(var i=0;i<6;i++) {
    $.each(Arr[i], function (e, a) {
      if (key.indexOf(a) !== -1) {
        switch (i + 1) {
          case 1:
            key = '/quick-start/';
            break;
          case 5:
            key = '/agent/';
            break;
          case 3:
            key = '/platform/';
            break;
          case 4:
            key = '/best-practise/';
            break;
          case 2:
            key = '/qa/';
            break;
        }
      }
    });
  }
  return key;
}
function setWebNavActive() {
  var key=window.location.pathname;
  if (key.indexOf('about') !== -1) {
    return 'about';
  } else if (key.indexOf('product') !== -1) {
    return 'product'
  }
}
function createNavBtn(data) {
  var doscKeyInfo = setDoscNavActive();
  var webKeyInfo = setWebNavActive();
  for (var i=0; i < data.length;i++) {
    var navItem = document.createElement('a');
    $(navItem).attr('href', data[i].link);
    if (data[i].link.indexOf(doscKeyInfo) !== -1 && doscKeyInfo !== '/') {
      $(navItem).addClass(style['show'])
    }
    if (data[i].link.indexOf(webKeyInfo) !== -1) {
      $(navItem).addClass(style['active']);
      $('.'+style['nav-container']).addClass(style['black'])
    }
    if (data[i].linkName === '图片') {
      navItem.className = style['activityicon'];
      var img1 = document.createElement('i');
      img1.className = style['img1'];
      var img2 = document.createElement('i');
      img2.className = style['img2'];
      $(navItem).append(img1);
      $(navItem).append(img2);
    } else {
      navItem.innerHTML = data[i].linkName;
    }
    // $('.'+style['nav-container']).append(navItem);
    $(navItem).insertBefore($('.'+style['accountBtn']));
  }
}
function setNavInfo() {
  var loc = window.location.hostname;
  var port = window.location.port;
  switch (loc) {
    case 'localhost':
      switch (port) {
        case '8080': createNavBtn(ciWeb);
              break;
        case '4567': createNavBtn(docsCi);
          break;
        case '9100': createNavBtn(ciWeb);
          break;
      }
      break;
    case 'docs-ci.oneapm.com':
      createNavBtn(docsCi);
      break;
    case 'cloudinsight.oneapm.com':
      createNavBtn(ciWeb);
      break
  }
}
$(document).ready(function(){
  // $('body').click(function () {
  //   if(!$('.'+ style['info']).hasClass(style['open'])){
  //     console.log(1)
  //     return false
  //   } else {
  //     $('.'+ style['info']).removeClass(style['open']);
  //     console.log(2)
  //   }
  // });
  setNavInfo();
  getInfo();
  // setCookie('key','123');
  console.log($('.' + style['onlineGroup']));
  setTimeout(function () {
    $('.' + style['onlineGroup']).parent().css('backgroundColor', '#fff');
  },300);
  // 绑定进入系统接口
  $('.'+style['infoList']).children().each(function() {
    if($(this).find('span').text()){
      $(this).click(function () {
        var group_id= $(this).find('span').attr('key');
        $.ajax({
          type: 'GET',
          url: `${http}//cloud.oneapm.com/user/groups/${group_id}/switch`
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
            $.ajax({
              type: 'GET',
              dataType: 'JSONP',
              jsonpCallback:"foo",
              url: `https://cloud.oneapm.com/tpm/account/logout`
            });
            window.location= 'http://user.oneapm.com/pages/v2/login_ci';
            swal.close();
          } else {
            swal.close();
          }
        })
  })
});

document.body.appendChild(element);
