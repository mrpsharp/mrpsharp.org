function rk4(x, v, a, dt) {
  // Returns final (position, velocity) array after time dt has passed.
  //        x: initial position
  //        v: initial velocity
  //        a: acceleration function a(x,v,dt) (must be callable)
  //        dt: timestep
  var x1 = x;
  var v1 = v;
  var a1 = a(x1, v1, 0);

  var x2 = x + 0.5*v1*dt;
  var v2 = v + 0.5*a1*dt;
  var a2 = a(x2, v2, dt/2);

  var x3 = x + 0.5*v2*dt;
  var v3 = v + 0.5*a2*dt;
  var a3 = a(x3, v3, dt/2);

  var x4 = x + v3*dt;
  var v4 = v + a3*dt;
  var a4 = a(x4, v4, dt);

  var xf = x + (dt/6)*(v1 + 2*v2 + 2*v3 + v4);
  var vf = v + (dt/6)*(a1 + 2*a2 + 2*a3 + a4);

  return [xf, vf];
  }

function compute() {
  var tMax = parseFloat(document.getElementById("tMax").value);
  var xZero = parseFloat(document.getElementById("xZero").value);
  var vZero = parseFloat(document.getElementById("vZero").value);
  var steps = 10000;
  var dt = tMax / steps; // divide by number of steps
  var state = [[0, xZero, vZero]]; // (t,x,v)
  var accelFunc = new Function("x", "v", "t", "dt", document.getElementById("function").value);
  // eval("accelFunc = function (x,v,t,dt) {"+document.getElementById("function").value+"}");
  for (i=0;i<steps;i++) {
    nextState = rk4(state[i][1],state[i][2],accelFunc,dt);
    state.push([state[i][0]+dt,nextState[0],nextState[1]]);
  }
  console.log("Calculation finished");
  var tValues = [];
  var xValues = [];
  var vValues = [];
  for (i=0;i<steps;i++) {
    tValues.push(state[i][0]);
    xValues.push(state[i][1]);
    vValues.push(state[i][2]);
  }
  var xTrace = {
    x: tValues,
    y: xValues,
    mode: "lines",
    name: "Position"

  }
  if (document.getElementById("computeVelocity").checked) {
    var vTrace = {
      x: tValues,
      y: vValues,
      mode: "lines",
      yaxis: "y2",
      name: "Velocity"
    }
    var data = [xTrace, vTrace];
    var layout = {
      xaxis: {
        title: "time / s"
      },
      yaxis: {
        title: "position / m"
      },
      yaxis2: {
        title: "velocity / m/s",
        overlaying: "y",
        side: "right"
      }
    };
  } else {
    var data = [xTrace];
    var layout = {
      xaxis: {
        title: "time / s"
      },
      yaxis: {
        title: "position / m"
      },
    };
  }

  Plotly.newPlot("chart", data, layout);
}

document.getElementById("compute").addEventListener("click",compute);
var exampleSelect = document.getElementById("exampleSelect");
exampleSelect.addEventListener("change", function() {
  switch (exampleSelect.value) {
    case "shm":
      document.getElementById("function").value = "var m = 0.5;\nvar k = 30;\nreturn -(k/m)*x;"
      break;
    case "dhm":
      document.getElementById("function").value = "var m = 0.5;\nvar k = 30;\nvar b = 0.5;\nreturn -(k/m)*x-b*v;"
      break;
    case "pendulum":
      document.getElementById("function").value = "var g = 9.81;\nvar L = 1;\nreturn -(g/L)*Math.sin(x);"
      break;
    case "falling":
      document.getElementById("function").value = "var b=0.5;\nreturn 9.81-b*v;"
  }
});
