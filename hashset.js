function HashSet(init) {
	this.map = Object.create(null);
	var map = this.map;
	var length = 0 ;
	
	Object.defineProperty(this, 'length', {
		get: function() {
			return length;
		}
	});

	if (toString.call(init) == '[object Array]') {
		init.forEach(function(v) {
			map[v] = 1;
			length++;
		});
	} else if (arguments.length > 1) {
		[].forEach.call(arguments, function(v) {
			map[v] = 1;
			length++;
		});
	} else if (arguments.length === 1) {
		map[init] = 1;
		length = 1;
	}
}

HashSet.prototype.contains = function(val) {
	return !!this.map[val];
};

HashSet.prototype.add = function(val) {
	this.map[val] = 1;
};

HashSet.prototype.remove = function(val) {
	this.map[val] = undefined;
};

module.exports = HashSet;