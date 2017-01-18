function kineticEnergy(r, n) {
  return n * n * h * h / (8 * PI * PI * me * r * r * e);
}

function potentialEnergy(r,Z) {
  return -(ke*e*Z/r);
}

function drawGraph() {
  var n =document.getElementById('nValue').value;
  var Z =document.getElementById('zValue').value;
  var r = [], KE = [], PE = [], E = [] // array of radii
  for (var i=0.1;i<=10;i+=0.01) {
    r.push(i); // r in angstrom
    var tempKE = kineticEnergy(i*1e-10, n);
    var tempPE = potentialEnergy(i*1e-10,Z);
    KE.push(tempKE);
    PE.push(tempPE);
    E.push(tempPE+tempKE);
  }
  var keTrace = {
    x: r,
    y: KE,
    type: 'scatter',
    name: 'Kinetic Energy'
  };
  var peTrace = {
    x: r,
    y: PE,
    type: 'scatter',
    name: 'Potential Energy'
  };
  var eTrace = {
    x: r,
    y: E,
    type: 'scatter',
    name: 'Total Energy'
  };

  var data = [keTrace, peTrace, eTrace];
  var layout = {
    xaxis: {
      title: "R / angstroms"
    },
    yaxis: {
      title: "Energy / eV",
      range: [-15,5]
    }
  }
  Plotly.newPlot('graphDiv', data, layout);
}

document.addEventListener('DOMContentLoaded', drawGraph(1), false);
