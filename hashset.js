function HashSet(init) {
	var length = 0,
		self = this,
		map = Object.create(null);

	Object.defineProperty(this, 'length', {
		get: function() {
			return length;
		}
	});

	Object.defineProperty(this, 'values', {
		get: function() {
			return Object.keys(map);
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

	this.contains = function(val) {
		return !!map[val];
	};

	this.add = function(val) {
		if (!map[val]) {
			length++;
		}

		map[val] = 1;
	};

	this.remove = function(val) {
		if (!!map[val]) {
			length--;
		}

		map[val] = undefined;
	};

	this.isSubSetOf = function(hashset) {
		if (length < 1) {
			return true;
		}

		if (hashset.length < 1) {
			return false;
		}

		var values = self.values;
		for (var i in values) {
			if (!hashset.contains(values[i])) {
				return false;
			}
		}

		return true;
	}

	this.isSuperSetOf = function(hashset) {
		if (hashset.length === 0) {
			return true;
		}

		if (this.length < hashset.length) {
			return false;
		}

		var values = hashset.values;
		for (var i in values) {
			if (!self.contains(values[i])) {
				return false;
			}
		}

		return true;
	}

	this.unionWith = function(hashset) {
		var values = hashset.values;
		values.forEach(function(v) {
			self.add(v);
		});
	}

	this.equals = function(hashset) {
		if (self.length !== hashset.length) {
			return false;
		}

		var values = hashset.values;
		for (var i in values) {
			if (!self.contains(values[i])) {
				return false;
			}
		}

		return true;
	};
}

module.exports = HashSet;