import errorHandler from './errorhandler'
import sortByKey from './sortByKey'
export default function(node_Id) {
    $.getJSON('/api/referrers', json => {
        if (errorHandler(node_Id, json)) {
            return;
        }

        var referrers = json.data.referrers;
        var name = [];
        var count = [];

        console.log(referrers);
        var referrers = sortByKey(referrers, 'count');
        console.log(referrers);

        for (var i = 0; i < referrers.length; i++) {
            name[i] = referrers[i].name;
            count[i] = referrers[i].count;
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
