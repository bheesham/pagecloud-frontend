
export default function (node_Id) {
  var json = $.getJSON('../tests/bots.json');
  
  // if(errorHandler(node_Id, json)){
  //   return;
  // }

  var botCount = json.data.bots.count;

  var userCount = json.data.users.count;

  var data = [{
    values: [botCount,userCount],
    labels: ['Bots','Users'],
    type: 'pie'
  }];

var layout = {
  height: 400,
  width: 500
};

Plotly.newPlot(node_Id, data, layout);
}
