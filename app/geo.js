import errorHandler from './errorhandler'
export default function (node_Id) {
  $.getJSON('/api/geo',json => {
    if(errorHandler(node_Id, json)){
      return;
    }
    
    var countryNames = [];
    var countryCount = [];

    for(var country in json.data.geo) {
      countryNames.push(json.data.geo[country].country);
      countryCount.push(json.data.geo[country].count);
    }

    var data = [{
      type: 'choropleth',
      locations: countryNames,
      z: countryCount,
      text: countryNames,
      colorscale: [
          [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
          [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
          [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
      autocolorscale: false,
      reversescale: true,
      marker: {
          line: {
              color: 'rgb(180,180,180)',
              width: 0.5
          }
      },
      tick0: 0,
      zmin: 0,
      dtick: 1000,
      colorbar: {
        autotic: false
      }
    }];

    var layout = {
      width: 1225,
      height: 787.5,
      geo:{
        scope: "world",
        showframe: false,
        projection:{
            type: 'mercator'
        }
      },
      title: "User Geoplot"
    };

    Plotly.plot(node_Id, data, layout);   
  });
}
