var tv = 50;
var scale = d3.scale.linear().domain([3000, 4000]).nice();

// instantiate our graph!
var graph;

var i = 0;
var iv = setInterval( function() {
  if (minimum.innerText){
    if (i === 0){ // Init chart
      i++;
      graph = new Rickshaw.Graph( {
        element: document.getElementById("chart"),
        width: 900,
        height: 500,
        renderer: 'line',
        interpolation: 'basis',
        min: 'auto',
        max: '3300',
        padding: {
          top: 0.3,
          bottom:0.3
        },
        series: [
          {
            name: "CrowdProcess",
            color: "#c05020",
            data: [{ x: new Date().getTime(), y: Number(minimum.innerText) }]
          }
        ]
      } );

      // Hover on Chart
      var hoverDetail = new Rickshaw.Graph.HoverDetail( {
        graph: graph
      } );

      // X-axys
      var axes = new Rickshaw.Graph.Axis.Time(
        {
          graph: graph,
          timeFixture: new Rickshaw.Fixtures.Time.Local()
        } );

      // Y-axys
      var y_axis = new Rickshaw.Graph.Axis.Y( {
            graph: graph,
            // orientation: 'left',
            // tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            element: document.getElementById('y_axis'),
            scale: scale
      } );
      console.log(minimum.innerText);
    } else { // Add data
      var data = { x: new Date().getTime(), y: Number(minimum.innerText) };
      graph.series[0].data.push(data);
    }
    graph.render();
  }
}, tv );