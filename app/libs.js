var $, jQuery;
window._ = require('lodash')
window.$ = $ = jQuery = require('jquery')
window.Plotly = require('plotly.js')
require('jquery-smooth-scroll')

$(()=>{
  $('section').height($(window).height())
  console.log("heightfix executed")

})
