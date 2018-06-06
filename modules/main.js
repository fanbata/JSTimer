import {TIMER_MANAGER} from "./manager.js";

document.addEventListener('DOMContentLoaded', function() {
    //Event listeners for UI elements.//

    //add button
    document.getElementById('add').addEventListener('click', function() {
        if (document.getElementById('add-prompt').className !== 'add-prompt-move') {
            document.getElementById('add-prompt').className += 'add-prompt-move';
        }
    });

    //cancel button in prompt
    document.getElementById('prompt-cancel').addEventListener('click', function() {
        document.getElementById('add-prompt').className = '';
    });

    //add timer button in prompt
    document.getElementById('add-prompt-complete').addEventListener('click', function() {
        if (document.getElementById('empty').className !== 'none') {
            document.getElementById('empty').className = 'none';
        }
        document.getElementById('add-prompt').className = '';
		var name = document.getElementById('add-name').value;
		var ms = getTime();
		TIMER_MANAGER.add(ms, name);
		clearInput();
    });
	
	function clearInput() {
		document.getElementById('hour').value = '';
		document.getElementById('minute').value = '';
		document.getElementById('add-name').value = '';
	};

	function getTime() {
		var date = new Date();
		var currentSec = date.getSeconds();
		var currentMin = date.getMinutes();
		var currentHours = date.getHours();

		var hours = document.getElementById('hour').value;
		var minutes = document.getElementById('minute').value;
		hours = parseInt(hours);
		minutes = parseInt(minutes);
		if (hours === 12) {
			hours = 0;
		}
		if (document.querySelector('.time-radio:checked+label').innerHTML === 'pm') {
			hours = parseInt(hours + 12);
		}

		var currentTime = ((currentHours * 60 * 60) + (currentMin * 60) + currentSec) * 1000;
		var ms = ( (hours * 60 * 60) + (minutes * 60) ) * 1000;

		if (currentHours > hours) {
			ms = (24 * 60 * 60 * 1000) - currentTime + ms;
		} else {
			ms = ms - currentTime;
		}
		return ms;
	};
});
