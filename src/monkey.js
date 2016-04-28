Array.prototype.findByValue = function (valueName, value) {

    for (let i = 0; i < this.length; i++) {
        let elem = this[i];

        let currentValue = elem[valueName];
        if (currentValue === value) {
            return elem;
        }
    }
};

Array.prototype.getIndexByValue = function (valueName, value) {

    for (let i = 0; i < this.length; i++) {
        let elem = this[i];

        let currentValue = elem[valueName];
        if (currentValue === value) {
            return i;
        }
    }
};

