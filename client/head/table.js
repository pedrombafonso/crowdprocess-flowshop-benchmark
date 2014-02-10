tableObject = null;

(function() {
    /**
     * Table object
     */
    tableObject = {
    	addNewFlowshopRecord : function(member) {
    		var that = this,
				table = $('#table tbody'),
				newRecord = $('<tr class="record"></tr>'),
				number = $('<td class="number"></td>'),
				byte = $('<td class="byte"></td>'),
				iteration = $('<td class="iteration"></td>'),
				who = $('<td class="who"></td>');
			
			number.text(member.y);
			byte.text(member.orderString);
			iteration.text(iterationNumber);
			if(member.who) {
	    		who.text(member.who);
			} else {
	    		who.text('me');
			}
			
			newRecord.append(number, byte, iteration, who);
			table.append(newRecord);
    	},
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