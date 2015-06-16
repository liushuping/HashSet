function HashSet(init) {
	this.map = Object.create(null);
	if (toString.call(init) == '[object Array]') {
		var map = this.map;
		init.forEach(function(v) { map[v] = 1; });
	} else {
		this.map[init] = 1;
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