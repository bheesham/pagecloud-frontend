import errorHandler from './errorhandler'
export default function (node_Id) {
  $.getJSON('/tests/unique.json',json => {
    if(errorHandler(node_Id, json)){
      return;
    }

    json.data.unique.sort((a,b)=>{
      if(new Date(a.datetime) > new Date(b.datetime)){
        return 1;
      }else if(new Date(a.datetime) < new Date(b.datetime)){
        return -1;
      }else{
        return 0;
      }
    });

    json.data.nonunique.sort((a,b)=>{
      if(new Date(a.datetime) > new Date(b.datetime)){
        return 1;
      }else if(new Date(a.datetime) < new Date(b.datetime)){
        return -1;
      }else{
        return 0;
      }
    });

    var uniqueCounts = [];
    var uniqueDates = [];
    var nonuniqueCounts = [];
    var nonuniqueDates = [];

    for(var uniqueVisitor in json.data.unique) {
      uniqueCounts.push(json.data.unique[uniqueVisitor].count);
      uniqueDates.push(json.data.unique[uniqueVisitor].datetime.replace(/T/, ' '));
    }

    for(var nonuniqueVisitor in json.data.nonunique) {
      nonuniqueCounts.push(json.data.nonunique[nonuniqueVisitor].count);
      nonuniqueDates.push(json.data.nonunique[nonuniqueVisitor].datetime.replace(/T/, ' '));
    }



    var unique = {
      x: uniqueDates,
      y: uniqueCounts,
      mode: 'scatter',
      name: 'unique',
      fill: 'tozeroy'
    };

    var nonunique = {
      x: nonuniqueDates,
      y: nonuniqueCounts,
      mode: 'scatter',
      name: 'nonunique',
      fill: 'tonexty'
    };

    var layout = {
      title: "Unique Users"
    };

    var data = [unique, nonunique];

    Plotly.plot(node_Id, data, layout);
  });
}
