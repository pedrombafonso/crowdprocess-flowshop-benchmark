var makePremise = null;
var makeConclusion = null;

var makeArray = null;

(function() {
	makeArray = function(givenObject) {
		var returnedArray = [];
		for(premise in givenObject) {
			returnedArray.push(givenObject[premise]);
		}
		return returnedArray;
	}
	
	$.ajax({
		url: 'templates/premise.tpl',
		dataType: 'html',
		cache : true,
		success: function(data) {
			var templateData = $(data).html();
			
			makePremise = function(givenObject) {
				var template = templateData;
				
				return $(Mustache.to_html(template, givenObject));
			}
		}
	});
	
	$.ajax({
		url: 'templates/conclusion.tpl',
		dataType: 'html',
		cache : true,
		success: function(data) {
			var templateData = $(data).html();
			
			makeConclusion = function(givenObject) {
				var template = templateData;
				return $(Mustache.to_html(template, givenObject));
			}
		}
	});
})();