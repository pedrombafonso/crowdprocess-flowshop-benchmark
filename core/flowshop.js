Flowshop = null;

(function () {
  'use strict';
  var bestMemberTimeout = null;
  Flowshop = {
    data: {
      bestMember: null
    },
    initialize: function (options) {
      var that = this;
      that.start = new Date().getTime();
      that.data = $.extend(true, that.data, options);
    },
    /**
     * Function which we want to maximize or minimize
     */
    fx: function (member) {
      var that = this,
        machine = 0,
        number = null,
        minimumEndTime = {},
        job = null,
        order = member.order;

      /*
       * Iterating through machines
       * set 0 on every job on every machine
       */
      (function () {
        for (var j = 0; j < that.data.machines; j++) {
          minimumEndTime[j] = {};
          for (var k = 0; k < that.data.jobs; k++) {
            minimumEndTime[j][k] = 0;
          }
        }
      })();
      /*
       * Iterating through machines
       * give time of job on machine
       */
      for (number in order) {
        number = ~~ (number);
        job = order[number];

        if (typeof job !== 'number') {
          continue;
        }
        for (machine = 0; machine < that.data.machines; machine++) {
          if (machine === 0) { // if first machine
            minimumEndTime[machine][number] = (that.data.times[machine][job] + minimumEndTime[machine][number - 1]) || that.data.times[machine][job]; // czas member[order] zadania na j-tej maszynie
          } else if (typeof minimumEndTime[machine][number - 1] === 'number') { //if job is not first and not first machine
            minimumEndTime[machine][number] = ((minimumEndTime[machine][number - 1] > minimumEndTime[machine - 1][number]) ? minimumEndTime[machine][number - 1] : minimumEndTime[machine - 1][number]) + that.data.times[machine][job];
          } else { // if job is first and is not first machine
            minimumEndTime[machine][number] = minimumEndTime[machine - 1][number] + that.data.times[machine][job];
          }
        }
      }
      return minimumEndTime[that.data.machines - 1][that.data.jobs - 1];
    },
    /**
     * This method check if inserted/created member is best of all, if yes then it will
     */
    checkIfBestThenInsert: function (member) {
      var that = this;
      // if (member.y > 4000)
      //   console.warn('%d\t%d', member.y, (new Date().getTime()) - that.start);
      if (that.data.bestMember === null || member.y < that.data.bestMember.y) {
        if (typeof bestMemberTimeout === 'number') {
          clearTimeout(bestMemberTimeout);
          bestMemberTimeout = setTimeout(function () {
            window.location.href = window.location.href;
          }, 60 * 1000);
        }
        that.data.bestMember = member;
        $('#minimum-serial').text(that.data.bestMember.y);
        //socket emit
        if (typeof socket === 'object') {
          // socket.emit('newBestMember', member);
        }

        //visual insertion
        if (typeof tableObject === 'object') {
          tableObject.addNewFlowshopRecord(member);
        }
      }
    },
    /**
     * The method comprising the population
     */
    makePopulation: function () {
      var that = this;
      // console.warn('Best member timeout: ', bestMemberTimeout);
      if (typeof bestMemberTimeout !== 'number') {
        bestMemberTimeout = setTimeout(function () {
          window.location.href = window.location.href;
        }, 60 * 1000);
      }
      return new Flowshop_population(that);
    },
    /**
     * Tournament choose dwo members from population
     */
    tournamentChoose: function (populationObject) {
      var that = this,
        members = [],
        population_length = populationObject.data.count,
        randomNumber_first = ~~ (Math.random() * population_length),
        randomNumber_second = ~~ (Math.random() * population_length);

      members.push(populationObject.population[randomNumber_first]);
      members.push(populationObject.population[randomNumber_second]);

      return members;
    },
    /**
     * Metoda odpowiedzialna za wybieranie 2-ch parentów z populacji :)
     */
    chooseTwoParentsFromPopulation: function (population, probabilitySet) {
      var that = this,
        i = 0,
        j = 0,
        k = 0,
        minY = 0,
        probabilitySum = 0,
        fullCount = 0; //suma wszystkich randomow - aby dostosowac prawdopodobienstwo wylosowania danego rodzica

      if (probabilitySet) {
        return that.rouletteWheel(population);
      }
      /*
       * wyszukiwanie obiektu o y mniejszym od 0 i wyszukanie namniejszego takiego obiektu
       */
      for (i; i < 20; i++) {
        if (population[i] < 0 && population[i] < minY) {
          minY = population[i];
        }
      }
      i = 0;
      /*
       * Przydzielanie wartosci random do obiektow
       */
      for (i; i < 20; i++) {
        population[i].random = population[i].y + minY;
        fullCount += population[i].random;
      }
      /*
       * dopisywanie prawdopodobieństwa
       */
      for (j; j < population.length; j++) {
        population[j].probability = {
          probability: population[j].random / fullCount, //przypisanie prawdopodobienstwa wylosowania danego rodzica
          start: probabilitySum
        }
        population[j].probability.end = probabilitySum + population[j].probability.probability;
        probabilitySum = population[j].probability.end;
      }
      return that.rouletteWheel(population);
    },
    minByteLength: function (precise) {
      var that = this;
      var minimum = 0;
      var bMinimum = false;
      while (bMinimum !== true) {
        minimum += 1;
        bMinimum = ((that.data.max - that.data.min) * Math.pow(10, precise) <= Math.pow(2, minimum) - 1) ? true : false;
      }
      return minimum;
    }
  };
})();

if (typeof module !== 'undefined') {
  module.exports = Evolution;
}