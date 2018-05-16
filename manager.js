var TimerManager = {
    timers: {},
    interval: undefined,
    newid: 0,
    add: function(begin) {
        var timer = this.createTimer(begin);
        timer.start();
        this.timers[timer.getID()] = timer;
        if (typeof this.interval === 'undefined') {
            this.interval = setInterval(this.updateTimers.bind(this), 200);
        }
    },
    remove: function(id) {
        if (Object.keys(this.timers).length > 0) {
            delete this.timers[id];
        } else {
            this.newid = 0;
        }
    },
    clear: function() {
        clearInterval(this.interval);
        this.interval = undefined;
        this.timers = {};
    },
    createTimer: function(begin) {
        var timer = new Timer(begin);
        timer.setID(this.newid);
        this.newid++;
        
        var container = document.getElementById('timerContainer');

        var div = document.createElement('div');
        div.className = 'timer';
        div.id = timer.getID();
    
        var h1 = document.createElement('h1');
        h1.className = 'timehead';
        h1.innerHTML = timer.getID() + '-timer';

        var p = document.createElement('p');
        p.className = 'currtime';
        p.innerHTML = '' + this.convertToSeconds(timer.getCurrent());

        var that = this;
        var remove = document.createElement('button');
        remove.className = 'remove';
        remove.innerHTML = 'remove';
        remove.addEventListener('click', function() {
            that.remove(this.parentNode.id);
            this.parentNode.remove();
        });

        var pause = document.createElement('button');
        pause.className = 'pause';
        pause.innerHTML = 'pause';
        pause.addEventListener('click', function() {
            if (this.className === 'pause') {
                that.setTimer('pause', this.parentNode.id);
                this.className = 'start';
                this.innerHTML = 'start';
            } else if (this.className === 'start') {
                that.setTimer('start', this.parentNode.id);
                this.className = 'pause';
                this.innerHTML = 'pause';
            }
        });
    
        div.appendChild(h1);
        div.appendChild(p);
        div.appendChild(pause);
        div.appendChild(remove);
        container.appendChild(div);
        return timer;
    },
    setTimer: function(modifier, id) {
        if (modifier === 'start') {
            this.timers[id].start();
        } else if (modifier === 'pause') {
            this.timers[id].pause();
        } else {
            return;
        }
    },
    updateTimers: function() {
        for (var key in this.timers) {
            if (this.timers.hasOwnProperty(key)) {
                this.timers[key].update();
                if (this.timers[key].isComplete()) {
                    this.completeTimer(this.timers[key]);
                }
                var timer = this.timers[key];
                var ele = document.getElementById(timer.getID());
                ele.querySelector('.currtime').innerHTML = this.convertToSeconds(timer.getCurrent());
            }
        }
    },
    completeTimer: function(timer) {
        return;
    },
    convertToSeconds: function(ms) {
        return Math.floor(ms / 1000);
    },
    convertToMinutes: function(sec) {
        return Math.floor(sec / 60);
    },
    convertToHours: function(min) {
        return Math.floor(min / 60);
    }
};