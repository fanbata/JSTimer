/*

A manager to keep track of timers.
Adds, removes, and updates timers while also maintaining the HTML elements.

This uses the Singleton pattern as there is no need for multiple Managers.

*/

import Timer from "./timer.js";

export const TIMER_MANAGER = {
    timers: {},
    newid: 0,

    add: function(begin, name) {
        var timer = this.createTimer(begin, name);
        timer.start();
        this.timers[timer.id] = timer;
    },

    remove: function(id) {
        if (Object.keys(this.timers).length > 0) {
            clearInterval(this.timers[id].interval);
            delete this.timers[id];
        } else {
            this.newid = 0;
        }
    },

    clear: function() {
        
    },

    createTimer: function(begin, name) {
        var that = this;
        var timer = new Timer(begin);
        timer.id = that.newid;
        var updateCallback = function(timer) {
            that.updateTimer(timer);
        };
        timer.interval = setInterval(timer.update.bind(timer, updateCallback), 200);
        that.newid++;
        
        var container = document.getElementById('timerContainer');

        var div = document.createElement('div');
        div.className = 'timer';
        div.id = timer.id;
    
        var h1 = document.createElement('h1');
        h1.className = 'timehead';
        if (name.length > 0) {
            h1.innerHTML = name;
        } else {
            h1.innerHTML = timer.id + '-timer';
        }

        var p = document.createElement('p');
        p.className = 'currtime';
        var seconds = that.convertToSeconds(timer.current);
        var hours = 0;
        var minutes = 0;
        if ( (seconds / 3600) > 0) {
            hours = Math.floor((seconds / 3600));
            seconds = seconds % 3600;
        }
        if ( (seconds / 60) > 0) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
        }
        
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        p.innerHTML = hours + ' : ' + minutes + ' : ' + seconds;

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

    updateTimer: function(timer) {
        var ele = document.getElementById(timer.id);
        var seconds = this.convertToSeconds(timer.current);
        var hours = 0;
        var minutes = 0;
        if ( (seconds / 3600) > 0) {
            hours = Math.floor((seconds / 3600));
            seconds = seconds % 3600;
        }
        if ( (seconds / 60) > 0) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
        }
        
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        ele.querySelector('.currtime').innerHTML = hours + ' : ' + minutes + ' : ' + seconds;
    },

    convertToSeconds: function(ms) {
        return Math.floor(ms / 1000);
    },
    
    convertToMinutes: function(sec) {
        return Math.floor(sec / 60);
    },
    
    convertToHours: function(min) {
        return Math.floor(min / 60);
    },
};