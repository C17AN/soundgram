(function ( $ ) {
	var EmptyLine = "<Music>";
	function sortOnKeys(dict) {
		var sorted = [];
		for(var key in dict) sorted[sorted.length] = key;
		sorted.sort();
		var tempDict = {};
		for(var i = 0; i < sorted.length; i++) tempDict[sorted[i]] = dict[sorted[i]];
		return tempDict;
	}
	function breakData(data){
		var lines = data.split("\n");
		var result = {};
		for (var i = 0; i < lines.length; i++){
			var timepoints = [];
			while(lines[i].match(/^\[.*?\]/) != null){
				var match = lines[i].match(/^\[.*?\]/)[0];
				if (match.match(/^\[(\d+)\:(\d+)\.(\d+)\]/)){
					var timetag = match.match(/^\[(\d+)\:(\d+)\.(\d+)\]/);
					time = timetag[1] * 60000 + timetag[2] * 1000 + timetag[3] * 10;
					timepoints.push(time);
				}
				lines[i] = lines[i].replace(/^\[.*?\]/,'');
			}
			for (var j = 0; j < timepoints.length; j++)	result[timepoints[j]] = lines[i];
		}
		return sortOnKeys(result);
	}
	
    $.fn.loadLrc = function(obj, file) {
		var audio = $(this);
		var i = 0;
		$.get(file,function(data){
			var lyrics = breakData(data);
			var len = $(obj).length;
			var keys = [], vals = [];
			for (p in lyrics){
				keys.push(p);
				if (lyrics[p].replace(/\s/g,'') == "")	lyrics[p] = EmptyLine;
				vals.push(lyrics[p]);
			}
			$(obj).text('');
			$(audio).unbind('timeupdate');
			$(audio).bind('timeupdate', function(T){
				var time = $(audio)[0].currentTime * 1000;
				var i = 0,c = 0;
				for(; time > keys[i]; i++);	i--;
				for(; i < keys.length; i++)
					if (c < $(obj).length){
						if (vals[i] != $($(obj)[c]).text()) $($(obj)[c]).text(vals[i]);
						c++;
					}
				if (c < $(obj).length){
					for(; c < $(obj).length; c++)
						$($(obj)[c]).text('');
				}
			});
		})
        return this;
    };
}( jQuery ));