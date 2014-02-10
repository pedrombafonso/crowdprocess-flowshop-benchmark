var tv = 50;
var scale = d3.scale.linear().domain([3000, 4000]).nice();

// instantiate our graph!
var graph;

var i = 0;
var serieCP = false;
var serieSerial = false;
var iv = setInterval( function() {
  if ($('#minimum-cp').text() || $('#minimum-serial').text()){
    var series = [];
    if ($('#minimum-cp').text() && !serieCP) {
      console.log('CP IN');
      serieCP = true;
      graph.series.push({
        name: "CrowdProcess",
        color: "#1ba6d7",
        data: [{ x: new Date().getTime(), y: Number($('#minimum-cp').text()) }]
      });
    }

    if ($('#minimum-serial').text() && !serieSerial) {
      console.log('SERIAL IN');
      serieSerial = true;
      series.push({
        name: "Serial",
        color: "#c05020",
        data: [{ x: new Date().getTime(), y: Number($('#minimum-serial').text()) }]
      });
    }

    if (i === 0){ // Init chart
      i++;
      graph = new Rickshaw.Graph( {
        element: document.getElementById("chart"),
        width: 900,
        height: 500,
        renderer: 'line',
        interpolation: 'basis',
        min: 'auto',
        // max: 'auto',
        padding: {
          top: 0.3,
          bottom:0.4
        },
        series: series
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
      console.log($('#minimum-cp').text());
    } else { // Add data
      console.log('serieCP', serieCP);
      console.log('graph.series[1]', graph.series[1]);
      if (serieCP && graph.series[1]) {
        var dataCP = { x: new Date().getTime(), y: Number($('#minimum-cp').text()) };
        console.log('Data CP', Number($('#minimum-cp').text()));
        graph.series[1].data.push(dataCP);
      }
      if (serieSerial && graph.series[0]) {
        var dataSerial = { x: new Date().getTime(), y: Number($('#minimum-serial').text()) };
        console.log('Data Serial', Number($('#minimum-serial').text()));
        graph.series[0].data.push(dataSerial);
      }
    }
    graph.render();
  }
}, tv );