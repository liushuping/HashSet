var hash = require('string-hash');

module.exports = function HashSet() {
    var length = 0,
        self = this,
        map = Object.create(null);

    // defines the length property as read-only
    Object.defineProperty(this, 'length', {
        get: function() {
            return length;
        }
    });

    // defines the values property as read-only
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

    // exporting public methods
    this.contains = contains;
    this.equals = equals;
    this.add = add;
    this.remove = remove;
    this.isSubSetOf = isSubSetOf;
    this.isSuperSetOf = isSuperSetOf;
    this.unionWith = unionWith;
    this.intersectWith = intersectWith;

    // helper functions
    function contains(val) {
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

    function remove(val) {
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

    function isSubSetOf(hashset) {
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

    function isSuperSetOf(hashset) {
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

    function unionWith(hashset) {
        var values = hashset.values;
        values.forEach(function(v) {
            self.add(v);
        });
    }

    function equals(hashset) {
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

    function intersectWith(hashset) {
        if (length === 0) {
            return;
        }

        var value;
        var values = self.values;
        for (var i = 0; i < values.length; ++i) {
            value = values[i];
            if (!hashset.contains(value)) {
                self.remove(value);
            }
        }
    }
}