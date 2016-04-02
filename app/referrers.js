import errorHandler from './errorhandler'
export default function (node_Id) {
  $.getJSON('/tests/referrers.json',json => {
    if(errorHandler(node_Id, json)){
      return;
    }

    var referrers = [];
    var count = [];

    for (var i = 0; i < json.data.referrers.length; i++) {
      referrers[i] = json.data.referrers[i].name;
      count[i] = json.data.referrers[i].count;
    }

    count.sort(function(a, b){return a-b});

    console.log(count);

    var data = [{
      type: 'bar',
      x: count,
      y: referrers,
      orientation: 'h'
    }];

    // var layout = {
    //   height: 400,
    //   width: 500
    // };

    Plotly.newPlot(node_Id, data);
  });
}
