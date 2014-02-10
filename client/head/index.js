minByteLength = null;
bestResult = {y : 0};
iterationNumber = 0;
tableObject = null;

(function(){
    /**
     * Algorytm genetyczny
     */
    $(document).ready(function() {
    	var timeout = 500,
    		parentCount = 20,
    		i = 0;
    		firstPopulation = Evolution.makePopulation(),
    		newPopulation = null,
    		maxIteration = 10000,
    		intervalObj = null;
    	
		iterationNumber++;
    	
    	for(i = 0; i < parentCount; i++) {
    		firstPopulation.makeNewMember();
    	}
    	intervalObj = setInterval(function() {
        	iterationNumber++;
        	if(iterationNumber === maxIteration) {
        		clearInterval(intervalObj);
        		$('#content').append($('<div></div>').html('END'));
        	}
    		var i = 0,
    			parentPopulation = (newPopulation === null) ? firstPopulation : newPopulation,
    			childrenPopulation = Evolution.makePopulation();
    		
        	for(i; i < parentCount/2; i++) {
        		childrenPopulation.insertMember(parentPopulation.makeChildren());
        	}
        	for(i; i < parentCount-1; i++) {
        		childrenPopulation.makeNewMember();
        	}
        	childrenPopulation.insertMember(bestResult);
        	
        	newPopulation = childrenPopulation;
    	}, timeout);
	});
    
    /**
     * Table object
     */
    tableObject = {
    	addNewRecord : function(newBestResult) {
    		var that = this,
    			table = $('#table tbody'),
    			newRecord = $('<tr class="record"></tr>'),
    			number = $('<td class="number"></td>'),
    			byte = $('<td class="byte"></td>'),
    			iteration = $('<td class="iteration"></td>'),
    			who = $('<td class="who"></td>');
    		
    		number.text(newBestResult.y);
    		byte.text(newBestResult.string);
    		iteration.text(iterationNumber);
    		if(newBestResult.who) {
	    		who.text(newBestResult.who);
    		} else {
	    		who.text('me');
    		}
    		
    		newRecord.append(number, byte, iteration, who);
    		table.append(newRecord);
    	}
    }
})();