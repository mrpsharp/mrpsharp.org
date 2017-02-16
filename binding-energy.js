document.addEventListener('DOMContentLoaded', function () {
  Plotly.d3.csv('/binding-energy.csv', function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  var z_data=[ ]
  for(i=0;i<143;i++)
  {
    z_data.push(unpack(rows,i));
  }

  var data = [{
    colourscale: 'Blackbody',
    z: z_data,
     type: 'surface',
  }];

  var layout = {
    title: 'Binding Energy per Nucleon',
    // autosize: false,
    // width: 500,
    // height: 500,
    margin: {
      l: 65,
      r: 50,
      b: 65,
      t: 90,
    }
  };
  Plotly.newPlot('graphDiv', data, layout);
  });
}, false);
