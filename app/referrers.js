import errorHandler from './errorhandler'
import sortByKey from './sortByKey'
export default function(node_Id) {
  "use strict";
  $.getJSON('/api/referrers', json => {
    if (errorHandler(node_Id, json)) {
      return;
    }

    let referrers = sortByKey(json.data.referrers,'count');
    let referrers_showable = [];
    let name = [];
    let count = [];

    for (let i = 0; i < referrers.length && referrers_showable.length < 15; i++) {
      if(referrers[i].count <= 2){
        continue;
      }
      if(referrers[i].name==="pagecloud.com"){
        continue;
      }
      if(referrers[i].name===""){
        continue;
      }
      referrers_showable.push(referrers[i]);
    }

    for (let i = 0; i < referrers_showable.length; i++) {
      name[i] = referrers_showable[i].name;
      count[i] = referrers_showable[i].count;
    }

    var data = [{
      type: 'bar',
      x: count,
      y: name,
      orientation: 'h'
    }];

    // var layout = {
    //   height: 400,
    //   width: 500
    // };

    Plotly.newPlot(node_Id, data);
  });
}
