Flowshop_population = null;
(function () {
  'use strict';
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
          member1_children = $.extend(true, {}, member1),
          member2_children = $.extend(true, {}, member2),
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
          member1_children = $.extend(true, {}, member1),
          member2_children = $.extend(true, {}, member2),
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
          member1_children = $.extend(true, {}, member1),
          member2_children = $.extend(true, {}, member2),
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
        // alert(JSON.stringify(member1_children.order));
        // alert(JSON.stringify(member2_children.order));
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
        //alert(JSON.stringify(member1_children.order));
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
        var secondVal = member.order[random2];;
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
    }
  };
})();