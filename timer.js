var Timer = function(limit) {
    //initial time
    this.initial = Date.now();
    this.current = limit;
    this.limit = limit;
    this.offset = 0;
    this.old = 0;
    //0 = paused, 1 = active, 2 = inactive
    this.state = 0;
    this.id = undefined;
};

Timer.prototype.update = function() {
    if (this.state > 0) {
        this.current = this.limit - (Date.now() - this.initial) + this.offset;
        if (this.current < 0) {
            this.current = 0;
            this.state = -1;
        }
    } else if (this.state === 0) {
        this.offset = Date.now() - this.old;
    } else {
        return;
    }
};

Timer.prototype.isComplete = function() {
    return this.state < 1;
};

Timer.prototype.setID = function(id) {
    this.id = id;
};

Timer.prototype.getID = function() {
    return this.id;
};

Timer.prototype.getCurrent = function() {
    return this.current;
};

Timer.prototype.start = function() {
    this.state = 1;

    //add the offset to the limit so that
    //we do not have to keep track of an ever-growing offset.
    this.limit += this.offset;
    this.offset = 0;
};

Timer.prototype.pause = function() {
    this.state = 0;
    this.old = Date.now();
};