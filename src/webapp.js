var fs = require('fs');

var CrowdProcess = require('crowdprocess')({
  email: 'pedroafonso@crowdprocess.com',
  password: 'blablabla'
});

var program = fs.readFileSync('./build/program.js');


var N = 10000;
var data = [];

var minimum = 9999999;

for (var i = 0; i < N; i++) {
  data.push({maxIteration: Math.floor((Math.random()*40)+30)});
}

var job = CrowdProcess(data, program);

job.on('data', function (result) {
  if (result.y < minimum) {
    minimum = result.y;
    $('#minimum').text(minimum);
    console.log('new best: ', result.y);
  }
});

job.on('end', function () {
  console.log('end!');
  clearInterval(iv);
});