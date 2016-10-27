(function() {
	window.onload = function() {
		var api_input = document.querySelector("#aqi-input");
		var button = document.querySelector("#button");
		var aqi_display = document.querySelector("#aqi-display");
		console.log(button);
		button.onclick = function() {
			aqi_display.innerHTML = api_input.value;
		};
		api_input.onkeypress = function(e) {
			var ev = e || window.event;
			if(ev.keyCode === 13){
				aqi_display.innerHTML = api_input.value;
			}
		};
	};
})();