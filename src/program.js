Flowshop_population = null;
Flowshop = null;

var utils = function(){
  "use strict";
 
  var _class2type = {};
 
  var _type = function( obj ) {
    return obj === null ? String( obj ) : _class2type[ toString.call(obj) ] || "object" ;
  };
 
  var _isWindow = function( obj ) {
    return obj !== null && obj == obj.window;
  };
 
  var _isFunction = function(target){
    return toString.call(target) === "[object Function]";
  };
 
  var _isArray =  Array.isArray || function( obj ) {
      return _type(obj) === "array";
  };
 
  var _isPlainObject = function( obj ) {
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if ( !obj || _type(obj) !== "object" || obj.nodeType || _isWindow( obj ) ) {
      return false;
    }
 
    try {
      // Not own constructor property must be Object
      if ( obj.constructor &&
        !hasOwn.call(obj, "constructor") &&
        !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
        return false;
      }
    } catch ( e ) {
      // IE8,9 Will throw exceptions on certain host objects #9897
      return false;
    }
 
    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
 
    var key;
    for ( key in obj ) {}
 
    return key === undefined || hasOwn.call( obj, key );
  };
 
  var _extend = function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
 
    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }
 
    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !_isFunction(target) ) {
      target = {};
    }
 
    if ( length === i ) {
      target = this;
      --i;
    }
 
    for ( ; i < length; i++ ) {
      // Only deal with non-null/undefined values
      if ( (options = arguments[ i ]) !== null ) {
        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];
 
          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }
 
          // Recurse if we're merging plain objects or arrays
          if ( deep && copy && ( _isPlainObject(copy) || (copyIsArray = _isArray(copy)) ) ) {
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && _isArray(src) ? src : [];
 
            } else {
              clone = src && _isPlainObject(src) ? src : {};
            }
 
            // Never move original objects, clone them
            target[ name ] = _extend( deep, clone, copy );
 
          // Don't bring in undefined values
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }
    // Return the modified object
    return target;
  };
 
  return {
    class2type: _class2type,
    type: _type,
    isWindow: _isWindow,
    isFunction: _isFunction,
    isArray: _isArray,
    isPlainObject: _isPlainObject,
    extend: _extend
  };
}();

Flowshop_population = function (root, options) {
  return {
    population: [],
    data: {
      count: 0
    },
    root: root,
    makeNewMember: function () {
      var that = this,
        population = that.population,
        member = that.generateMember();

      that.root.checkIfBestThenInsert(member);

      that.data.count++;
      return population.push(member);
    },
    /**
     * Insert given member
     * @param member object
     */
    insertMember: function (member) {
      var that = this,
        population = that.population;

      that.root.checkIfBestThenInsert(member);

      that.data.count++;
      return population.push(member);
    },
    /**
     * Dasdasdas
     * @param object member1 Costamcos
     */
    pBX: function (member1, member2) {
      var that = this,
        root = that.root,
        mask = null,
        changeCount = ~~ ((Math.random() * root.data.jobs) / 2) + 1,
        maskArray = {},
        member1_order = member1.order,
        member2_order = member2.order,
        member1_children = utils.extend(true, {}, member1),
        member2_children = utils.extend(true, {}, member2),
        member1_children_order = member1_children.order,
        member2_children_order = member2_children.order,
        random = null,
        job = null,
        number = null,
        i = 0;

      // making mask
      for (i = 0; i < changeCount; i++) {
        random = ~~ (Math.random() * root.data.jobs);
        member1_children_order[random] = null;
        member2_children_order[random] = null;
      }
      // setting first member's clone values
      i = 0;
      for (number in member1_children_order) {
        job = member1_children_order[number];
        if (job !== null) {
          continue;
        }
        while (in_array(member1_children_order, member2_order[i])) i++;
        member1_children_order[number] = member2_order[i];
      }
      // setting second member's clone values
      i = 0;
      for (number in member2_children_order) {
        job = member2_children_order[number];
        if (job !== null) {
          continue;
        }
        while (in_array(member2_children_order, member1_order[i])) i++;
        member2_children_order[number] = member1_order[i];
      }
      member1_children.y = root.fx(member1_children);
      member2_children.y = root.fx(member2_children);
      member1_children.orderString = '[' + member1_children.order.toString() + ']';
      member2_children.orderString = '[' + member2_children.order.toString() + ']';

      return member1_children.y > member2_children.y ? member1_children : member2_children;
    },
    /**
     * Dasdasdas
     * @param object member1 Costamcos
     */
    uX2: function (member1, member2) {
      var that = this,
        root = that.root,
        mask = null,
        maskArray = {},
        member1_order = member1.order,
        member2_order = member2.order,
        member1_children = utils.extend(true, {}, member1),
        member2_children = utils.extend(true, {}, member2),
        member1_children_order = member1_children.order,
        member2_children_order = member2_children.order,
        random1 = null,
        random2 = null,
        job = null,
        number = null,
        i = 0,
        tmp = 0;

      //making mask

      random1 = ~~ (Math.random() * root.data.jobs);
      random2 = ~~ (Math.random() * root.data.jobs);
      if (random1 > random2) {
        tmp = random1;
        random1 = random2;
        random2 = tmp;
      }
      for (i = 0; i < random1; i++) {
        member1_children_order[i] = null;
        member2_children_order[i] = null;
      }
      for (i = random2; i < root.data.jobs; i++) {
        member1_children_order[i] = null;
        member2_children_order[i] = null;
      }

      //setting first member's clone values
      i = 0;
      for (number in member1_children_order) {
        job = member1_children_order[number];
        if (job !== null) {
          continue;
        }
        while (in_array(member1_children_order, member2_order[i])) i++;
        member1_children_order[number] = member2_order[i];
      }
      //setting second member's clone values
      i = 0;
      for (number in member2_children_order) {
        job = member2_children_order[number];
        if (job !== null) {
          continue;
        }
        while (in_array(member2_children_order, member1_order[i])) i++;
        member2_children_order[number] = member1_order[i];
      }
      member1_children.y = root.fx(member1_children);
      member2_children.y = root.fx(member2_children);
      member1_children.orderString = '[' + member1_children.order.toString() + ']';
      member2_children.orderString = '[' + member2_children.order.toString() + ']';

      return member1_children.y > member2_children.y ? member1_children : member2_children;
    },
    /*
     * Dasdasdas
     * @param object member1 Costamcos
     */
    uX1: function (member1, member2) {
      var that = this,
        root = that.root,
        member1_order = member1.order,
        member2_order = member2.order,
        member1_children = utils.extend(true, {}, member1),
        member2_children = utils.extend(true, {}, member2),
        member1_children_order = member1_children.order,
        member2_children_order = member2_children.order,
        random = null,
        job = null,
        number = null,
        i = 0,
        i1 = 0,
        i2 = 0;

      // making mask
      // setting first member's clone values
      i1 = 0;
      // console.log(JSON.stringify(member1_children.order));
      // console.log(JSON.stringify(member2_children.order));
      do {
        job = member1_children_order[i1];
        i2 = 0;
        while (member2_order[i2] != job)
          i2++;
        i = i1;
        while (member2_order[i2] == member1_children_order[i1] && i1 < root.data.jobs && i2 < root.data.jobs) {
          i1++;
          i2++;
        }
        if (i1 - i == 1) {
          member1_children_order[i1 - 1] = null;
        }
        i1++;
      } while (i1 <= root.data.jobs);
      // console.log(JSON.stringify(member1_children.order));
      i1 = 0;
      do {
        job = member2_children_order[i1];
        i2 = 0;
        while (member1_order[i2] != job)
          i2++;
        i = i1;
        while (member1_order[i2] == member2_children_order[i1] && i1 < root.data.jobs && i2 < root.data.jobs) {
          i1++;
          i2++;
        }
        if (i1 - i == 1) {
          member2_children_order[i1 - 1] = null;
        }
        i1++;
      } while (i1 <= root.data.jobs);

      for (number in member1_children_order) {
        job = member1_children_order[number];
        if (job !== null) {
          continue;
        }
        while (in_array(member1_children_order, member2_order[i])) {
          i++;
        }
        member1_children_order[number] = member2_order[i];
      }
      // setting second member's clone values
      i = 0;
      for (number in member2_children_order) {
        job = member2_children_order[number];
        if (job !== null) {
          continue;
        }
        while (in_array(member2_children_order, member1_order[i])) {
          i++;
        }
        member2_children_order[number] = member1_order[i];
      }
      member1_children.y = root.fx(member1_children);
      member2_children.y = root.fx(member2_children);
      member1_children.orderString = '[' + member1_children.order.toString() + ']';
      member2_children.orderString = '[' + member2_children.order.toString() + ']';

      return member1_children.y > member2_children.y ? member1_children : member2_children;
    },
    /**
     * Mutationg member
     */
    mutation: function (member) {
      var that = this,
        random1 = ~~ (Math.random() * root.data.jobs),
        random2 = ~~ (Math.random() * root.data.jobs);

      var firstVal = member.order[random1];
      var secondVal = member.order[random2];
      member.order[random1] = secondVal;
      member.order[random2] = firstVal;
      member.orderString = '[' + member.order.toString() + ']';
      member.y = root.fx(member);
      return member;
    },
    mutation1: function (member) {
      var that = this,
        random1 = 0;
      random2 = ~~ (Math.random() * root.data.jobs);

      var firstVal = member.order[random1];
      var secondVal = member.order[random2];
      member.order[random1] = secondVal;
      member.order[random2] = firstVal;
      member.orderString = '[' + member.order.toString() + ']';
      member.y = root.fx(member);
      return member;
    },
    /**
     * Make children
     */
    makeChildren: function () {
      var that = this,
        population = that.population,
        choosenParents = that.root.tournamentChoose(that);

      return that.uX2(choosenParents[0], choosenParents[1]);
    },
    /**
     * Generate member
     */
    generateMember: function () {
      var that = this,
        i = 0,
        memberObject = {
          order: []
        },
        temp = 0,
        random1 = null,
        random2 = null;

      //normal order
      for (i; i < that.root.data.jobs; i++) {
        memberObject.order.push(i);
      }
      i = 0;
      //mutating order
      for (i; i < that.root.data.jobs * that.root.data.jobs; i++) {
        random1 = ~~ (Math.random() * root.data.jobs);
        random2 = ~~ (Math.random() * root.data.jobs);
        temp = memberObject.order[random1];
        memberObject.order[random1] = memberObject.order[random2];
        memberObject.order[random2] = temp;
      }
      //order in string
      memberObject.orderString = '[' + memberObject.order.toString() + ']';

      memberObject.y = that.root.fx(memberObject);
      return memberObject;
    }
  };
};

var bestMemberTimeout = null;
Flowshop = {
  data: {
    bestMember: null
  },
  initialize: function (options) {
    var that = this;

    that.data = utils.extend(true, that.data, options);
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
    if (that.data.bestMember === null || member.y < that.data.bestMember.y) {
      // if (typeof bestMemberTimeout === 'number') {
      //   clearTimeout(bestMemberTimeout);
      //   bestMemberTimeout = setTimeout(function () {
      //     window.location.href = window.location.href;
      //   }, 60 * 1000);
      // }
      that.data.bestMember = member;
      // console.warn('---- newBest', member.y);
      if (typeof member.who === 'undefined') {
        // member.who = navigator.appVersion;
        member.who = 'node';
      }
      // //socket emit
      // if (typeof socket === 'object') {
      //   socket.emit('newBestMember', member);
      // }

      // //visual insertion
      // if (typeof tableObject === 'object') {
      //   tableObject.addNewFlowshopRecord(member);
      // }
    }
  },
  /**
   * The method comprising the population
   */
  makePopulation: function () {
    var that = this;
    // console.warn('Best member timeout: ', bestMemberTimeout);
    // if (typeof bestMemberTimeout !== 'number') {
    //   bestMemberTimeout = setTimeout(function () {
    //     window.location.href = window.location.href;
    //   }, 60 * 1000);
    // }
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
      };
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
      bMinimum = (((that.data.max - that.data.min) * Math.pow(10, precise)) <= Math.pow(2, minimum) - 1) ? true : false ;
    }
    return minimum;
  }
};

function in_array(givenArray, p_val) {
  for (var i = 0, l = givenArray.length; i < l; i++) {
    if (givenArray[i] == p_val) {
      return true;
    }
  }
  return false;
}

function extend(){
    for(var i=1; i<arguments.length; i++)
        for(var key in arguments[i])
            if(arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
    return arguments[0];
}

//var timesObject = {};

/**
 * Algorytm genetyczny
 */
Flowshop.initialize({
  machines: 10,
  jobs: 50,
  membersCount: 100
});

/*
 * Iterating through machines
 * give time of job on machine
 */
/*(function() {
      for(var j = 0; j < Flowshop.data.machines; j++) {
          timesObject[j] = {};
          for(var k = 0; k < Flowshop.data.jobs; k++) {
              timesObject[j][k] = ~~(Math.random()*100)
          }
      }
  })();
  */
var timesObject = [
  [46, 52, 79, 45, 97, 10, 44, 24, 85, 75, 66, 49, 95, 61, 19, 47, 84, 13, 11, 19, 98, 2, 85, 44, 7, 73, 19, 69, 12, 73, 85, 23, 53, 16, 88, 8, 26, 42, 58, 63, 7, 2, 44, 38, 24, 76, 85, 61, 32, 90],
  [61, 87, 51, 25, 73, 93, 28, 90, 94, 59, 64, 2, 16, 35, 53, 40, 81, 26, 85, 4, 4, 10, 63, 96, 55, 71, 66, 94, 7, 15, 11, 99, 37, 50, 56, 69, 22, 56, 67, 63, 96, 74, 4, 42, 40, 30, 93, 36, 25, 87],
  [3, 1, 58, 85, 33, 71, 58, 56, 64, 43, 48, 69, 96, 35, 82, 53, 64, 11, 61, 36, 53, 87, 88, 10, 32, 38, 25, 24, 90, 7, 11, 49, 2, 76, 17, 32, 39, 9, 83, 69, 67, 28, 88, 23, 91, 71, 3, 26, 41, 96],
  [51, 24, 21, 57, 69, 51, 50, 51, 21, 19, 63, 91, 11, 6, 31, 63, 36, 39, 57, 47, 56, 65, 59, 4, 10, 12, 62, 43, 49, 54, 87, 29, 2, 18, 75, 39, 77, 69, 15, 78, 68, 37, 22, 41, 92, 67, 24, 87, 91, 31],
  [37, 16, 42, 47, 94, 14, 94, 34, 72, 36, 88, 51, 41, 71, 94, 99, 11, 97, 44, 77, 69, 91, 38, 25, 87, 7, 66, 54, 86, 49, 3, 48, 44, 93, 37, 82, 31, 59, 78, 33, 36, 3, 58, 10, 98, 6, 44, 62, 24, 94],
  [79, 93, 68, 75, 37, 44, 34, 39, 76, 62, 74, 28, 78, 43, 98, 83, 91, 27, 6, 82, 60, 44, 43, 76, 99, 66, 11, 35, 52, 8, 40, 62, 25, 24, 30, 1, 73, 27, 16, 91, 33, 11, 99, 2, 60, 90, 36, 62, 15, 3],
  [83, 87, 38, 38, 86, 67, 23, 19, 97, 78, 66, 67, 7, 23, 67, 8, 77, 71, 85, 29, 49, 3, 94, 76, 95, 48, 4, 37, 82, 57, 61, 6, 97, 5, 27, 95, 46, 92, 46, 52, 8, 11, 7, 54, 72, 57, 85, 22, 87, 65],
  [22, 29, 99, 25, 98, 55, 80, 82, 33, 68, 47, 74, 26, 61, 95, 55, 11, 42, 72, 14, 8, 98, 90, 36, 75, 69, 26, 24, 55, 98, 86, 30, 92, 94, 66, 47, 3, 41, 41, 47, 89, 28, 39, 80, 47, 57, 74, 38, 59, 5],
  [27, 92, 75, 94, 18, 41, 37, 58, 56, 20, 2, 39, 91, 81, 33, 14, 88, 22, 36, 65, 79, 23, 66, 5, 15, 51, 2, 81, 12, 40, 59, 32, 16, 87, 78, 41, 43, 94, 1, 93, 22, 93, 62, 53, 30, 34, 27, 30, 54, 77],
  [24, 47, 39, 66, 41, 46, 24, 23, 68, 50, 93, 22, 64, 81, 94, 97, 54, 82, 11, 91, 23, 32, 26, 22, 12, 23, 34, 87, 59, 2, 38, 84, 62, 10, 11, 93, 57, 81, 10, 40, 62, 49, 90, 34, 11, 81, 51, 21, 39, 27]
];

Flowshop.data.times = timesObject; // machines -> jobs

function Run(data) {
  var iterationNumber = 0;

  // Data assignments
  var maxIteration = data.maxIteration;

  var i = 0,
    firstPopulation = Flowshop.makePopulation(),
    newPopulation = null,
    intervalObj = null,
    timeout = 1000,
    cross = ~~ (Math.random() * Flowshop.data.membersCount * 0.9),
    mut = ~~ ((Flowshop.data.membersCount - cross) * (Math.random()));

  // console.log('Started');
  // socket.on('newBestMember', function (data) {
  // console.log(data);
  //   Flowshop.checkIfBestThenInsert(data);
  // });

  iterationNumber++;
  // console.log('iterationNumber: ', iterationNumber);
  // console.log(cross+" "+mut);
  for (i = 0; i < Flowshop.data.membersCount; i++) {
    firstPopulation.makeNewMember();
  }

  // 
  // Set interval is commented and replaced by the next while cycle
  // 
    // intervalObj = setInterval(function () {
    //   var member = null;
    //   iterationNumber++;
    //   console.log('iterationNumber (cycle): ', iterationNumber);
    //   // if (false && iterationNumber === maxIteration) {
    //   if ( iterationNumber === maxIteration) {
    //     clearInterval(intervalObj);
    //     $('#content').append($('<div></div>').html('END'));
    //   }
    //   var i = 0,
    //     parentPopulation = (newPopulation === null) ? firstPopulation : newPopulation,
    //     childrenPopulation = Flowshop.makePopulation();

    //   for (i; i < Flowshop.data.membersCount / 2; i++) { //Flowshop.data.membersCount/2
    //     childrenPopulation.insertMember(parentPopulation.makeChildren());
    //   }

    //   for (i; i < (Flowshop.data.membersCount - 11); i++) { //Flowshop.data.membersCount-11
    //     member = utils.extend(true, {}, Flowshop.data.bestMember);
    //     childrenPopulation.insertMember(parentPopulation.mutation(member));
    //   }
    //   // for(i; i < Flowshop.data.membersCount-10; i++) {
    //   //   member= utils.extend(true, {}, Flowshop.data.bestMember);
    //   //   childrenPopulation.insertMember(parentPopulation.mutation1(parentPopulation.mutation1(member)));
    //   // }

    //   for (i; i < Flowshop.data.membersCount - 1; i++) {
    //     childrenPopulation.makeNewMember();
    //   }

    //   childrenPopulation.insertMember(Flowshop.data.bestMember);

    //   newPopulation = childrenPopulation;
    // }, timeout);
  //

  while (iterationNumber !== maxIteration) {
    var member = null;
    iterationNumber++;
    // console.log('iterationNumber (cycle): ', iterationNumber);
    // if (false && iterationNumber === maxIteration) {

    i = 0;
    var parentPopulation = (newPopulation === null) ? firstPopulation : newPopulation,
      childrenPopulation = Flowshop.makePopulation();

    for (i; i < Flowshop.data.membersCount / 2; i++) { //Flowshop.data.membersCount/2
      childrenPopulation.insertMember(parentPopulation.makeChildren());
    }

    for (i; i < (Flowshop.data.membersCount - 11); i++) { //Flowshop.data.membersCount-11
      member = utils.extend(true, {}, Flowshop.data.bestMember);
      childrenPopulation.insertMember(parentPopulation.mutation(member));
    }
    // for(i; i < Flowshop.data.membersCount-10; i++) {
    //   member= utils.extend(true, {}, Flowshop.data.bestMember);
    //   childrenPopulation.insertMember(parentPopulation.mutation1(parentPopulation.mutation1(member)));
    // }

    for (i; i < Flowshop.data.membersCount - 1; i++) {
      childrenPopulation.makeNewMember();
    }

    childrenPopulation.insertMember(Flowshop.data.bestMember);

    newPopulation = childrenPopulation;
  }
  clearTimeout(bestMemberTimeout);
  return Flowshop.data.bestMember;
}

module.exports = Run;