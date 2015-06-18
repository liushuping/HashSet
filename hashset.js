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
		map[val] = 1;
	};

	this.remove = function(val) {
		map[val] = undefined;
	};

	this.isSubSetOf = function(hashset) {
		if (length < 1) {
			return true;
		}

		if (hashset.length < 1) {
			return false;
		}

		var values = this.values;
		values.forEach(function(v) {
			if (!hashset.contains(v)) {
				return false;
			}
		});

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
		values.forEach(function(v) {
			if (!self.contains(v)) {
				return false;
			}
		});

		return true;
	}
}

module.exports = HashSet;