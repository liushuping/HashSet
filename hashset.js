var hash = require('string-hash');

function HashSet() {
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
            var subkeys;
            var values = [];
            var keys = Object.keys(map);
            keys.forEach(function(key) {
                subkeys = Object.keys(map[key]);
                subkeys.forEach(function(subkey) {
                    values.push(map[key][subkey]);
                });
            });

            return values;
        }
    });

    [].forEach.call(arguments, function(v) {
        add(v);
    });

    this.contains = function(val) {
        var type = toString.call(val);
        if (map[type] === undefined) {
            return false;
        }

        var key = hash('' + val);
        return map[type][key] !== undefined;
    };

    function add(val) {
        var type = toString.call(val);
        if (map[type] === undefined) {
            map[type] = Object.create(null);
        }

        var key = hash('' + val);
        if (map[type][key] === undefined) {
            map[type][key] = val;
            length++;
        }
    };

    this.add = add;

    this.remove = function(val) {
        var type = toString.call(val);
        if (map[type] === undefined) {
            return;
        }

        var key = hash('' + val);
        if (map[type][key] !== undefined) {
            map[type][key] = undefined;
            length--;
        }
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