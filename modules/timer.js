/*

Timer. 
Counts down from given time.
Has start, pause, and reset (to be implemented).

This uses a prototypical constructor pattern
as there is potential for a large number of 
Timer objects. Thus, it's better to use prototypes as
literal objects would make a copy of functions for each Timer.

*/

export default class Timer  {
    constructor(limit) {
        //initial time
        this.initial = Date.now();
        this.current = limit;
        this.limit = limit;
        this.offset = 0;
        this.old = 0;
        //0 = paused, 1 = active, 2 = inactive
        this.state = 0;
        this.interval = undefined;
        this.id = undefined;
        this.audio = new Audio('twomp.mp3');
    }

    update(updateCallback) {
        if (this.state > 0) {
            this.current = this.limit - (Date.now() - this.initial) + this.offset;
            if (this.current < 0) {
                this.current = 0;
                this.complete();
            }
            updateCallback(this);
        } else if (this.state === 0) {
            this.offset = Date.now() - this.old;
        } else {
            return;
        }
    }
    
    complete() {
        
        return;
    }
    
    set id(id) {
        this._id = id;
    }
    
    get id() {
        return this._id;
    }

    set current(current) {
        this._current = current;
    }

    get current() {
        return this._current;
    }
    
    set interval(interval) {
        this._interval = interval;
    }
    
    get interval() {
        return this._interval;
    }
    
    start() {
        this.state = 1;
    
        //add the offset to the limit so that
        //we do not have to keep track of an ever-growing offset.
        this.limit += this.offset;
        this.offset = 0;
    }
    
    pause() {
        this.state = 0;
        this.old = Date.now();
    }
}

