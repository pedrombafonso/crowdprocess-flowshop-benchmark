VNS = null;

(function() {
	'use strict';
	VNS  = {
		data : {
			bestMember : null
		},
		initialize : function(options) {
			var that = this;

			that.data = $.extend(true, that.data, options);
		},
		/**
		*	1. Choose position from which value will be replaced
		*	2. Choose position to which value will be placed
		*/
		insertMutation : function(member) {
			var that = this,
				clonedMember = $.extend(true, {}, member),
				firstPosition = ~~(Math.random()*Flowshop.data.jobs),
				secondPosition = ~~(Math.random()*Flowshop.data.jobs),
				i = null;
			
			//prepend not overwriting same position
			while(firstPosition === secondPosition) {
				secondPosition = ~~(Math.random()*Flowshop.data.jobs);
			}
			
			var firstVal = clonedMember.order[firstPosition];
			var secondVal = clonedMember.order[secondPosition];
			if(firstPosition < secondPosition) {
				for(i = firstPosition; i < secondPosition; i++) {
					clonedMember.order[i] = clonedMember.order[i+1];
				}
			} else {
				for(i = firstPosition; i > secondPosition; i--) {
					clonedMember.order[i] = clonedMember.order[i-1];
				}
			}
			clonedMember.order[secondPosition] = firstVal;
            clonedMember.orderString = '['+clonedMember.order.toString()+']';
            clonedMember.y = Flowshop.fx(clonedMember);
			return clonedMember;
		},
		/**
		*	Choose two positions then replace them
		*/
		interChangeMutation : function(member) {
			var that = this,
				clonedMember = $.extend(true, {}, member),
				firstPosition = ~~(Math.random()*Flowshop.data.jobs),
				secondPosition = ~~(Math.random()*Flowshop.data.jobs);
			
			//prepend not overwriting same position
			while(firstPosition === secondPosition) {
				secondPosition = ~~(Math.random()*Flowshop.data.jobs);
			}
			
			var firstVal = clonedMember.order[firstPosition];
			var secondVal = clonedMember.order[secondPosition];
			
			clonedMember.order[firstPosition] = secondVal;
			clonedMember.order[secondPosition] = firstVal;
			
            clonedMember.orderString = '['+clonedMember.order.toString()+']';
            clonedMember.y = Flowshop.fx(clonedMember);
			return clonedMember;
		}
	}
})();

if(typeof module !== 'undefined') {
	module.exports = VNS;
}