
window.$        = require('jquery');
window.jQuery = window.$;
window._        = require('lodash');
window.Plotly   = require('plotly.js');

require('../../node_modules/waypoints/lib/jquery.waypoints.js');
require('jquery-smooth-scroll');

$(()=>{
  // "use strict";
  $('section').height($(window).height())
  $('#unique').waypoint({
    element: document.getElementById('unique'),
    handler: (dir)=> {
      if(dir === 'up')
        $('nav').addClass('hidden')
      else
        $('nav').removeClass('hidden')
    }
  });
  $('a').smoothScroll();
})
