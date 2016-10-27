window.onload = function() {
	var launchs = document.querySelectorAll('[value="launch"]');
	var flys = document.querySelectorAll('[value="fly"]');
	var stops = document.querySelectorAll('[value="stop"]');
	var destorys = document.querySelectorAll('[value="destory"]');
	var universe = document.querySelector('#universe');
	var ships = {
		ship1:{
			index:1,
			if_in:false,
			energy:100,
			state:"stop",
			timer:null,
			rotate:0,
			translate:"translate(calc(50vw - 50%),calc(190px - 50%))",
			speed:10,
			energy_timer:null
		},
		ship2:{
			index:2,
			if_in:false,
			energy:100,
			state:"stop",
			timer:null,
			rotate:0,
			translate:"translate(calc(50vw - 50%),calc(150px - 50%))",
			speed:10,
			energy_timer:null
		},
		ship3:{
			index:3,
			if_in:false,
			energy:100,
			state:"stop",
			timer:null,
			rotate:0,
			translate:"translate(calc(50vw - 50%),calc(110px - 50%))",
			speed:10,
			energy_timer:null
		},
		ship4:{
			index:4,
			if_in:false,
			energy:100,
			state:"stop",
			timer:null,
			rotate:0,
			translate:"translate(calc(50vw - 50%),calc(70px - 50%))",
			speed:10,
			energy_timer:null
		}
	};
	function create_ship(index) {
		var div = document.createElement("div");
		div.style.transform =  ships["ship" + index].translate + "rotate(" + ships["ship" + index].rotate + "deg)";
		div.className = "ship" + index;
		div.innerHTML = "灵能" + ships["ship" + index].energy + "%";
		return div;
	}
	launchs.forEach(function(el,i) {
		el.onclick = function() {
			if(!ships["ship" + (i + 1)].if_in){
				universe.appendChild(create_ship(ships["ship" + (i + 1)].index));
				ships["ship" + (i + 1)].if_in = true;
			}
		};
	});
	destorys.forEach(function(el,i) {
		el.onclick = function() {
			if(ships["ship" + (i + 1)].if_in){
				clearInterval(ships["ship" + (i + 1)].timer);
				clearInterval(ships["ship" + (i + 1)].energy_timer);
				var div = document.querySelector('.ship' + (i + 1));
				div.parentNode.removeChild(div);
				ships["ship" + (i + 1)].rotate = 0;
				ships["ship" + (i + 1)].energy = 100;
				ships["ship" + (i + 1)].if_in = false;
				ships["ship" + (i + 1)].state = "stop";
			}
		};
	});
	flys.forEach(function(el,i) {
		el.onclick = function() {
			clearInterval(ships["ship" + (i + 1)].energy_timer);
			if(ships["ship" + (i + 1)].state === "stop" && ships["ship" + (i + 1)].if_in){
				ships["ship" + (i + 1)].state = "flying";
				ships["ship" + (i + 1)].timer = setInterval(function() {
					ships["ship" + (i + 1)].rotate += ships["ship" + (i + 1)].speed;
					document.querySelector('.ship' + ships["ship" + (i + 1)].index).style.transform =  ships["ship" + (i + 1)].translate + "rotate(" + ships["ship" + (i + 1)].rotate + "deg)";
					ships["ship" + (i + 1)].energy -= 2;
					document.querySelector('.ship' + ships["ship" + (i + 1)].index).innerHTML = "灵能" + ships["ship" + (i + 1)].energy +"%";
					if(ships["ship" + (i + 1)].energy === 0){
						ships["ship" + (i + 1)].energy_timer = setInterval(function() {
							ships["ship" + (i + 1)].energy += 2;
							document.querySelector('.ship' + ships["ship" + (i + 1)].index).innerHTML = "灵能" + ships["ship" + (i + 1)].energy +"%";
							if(ships["ship" + (i + 1)].energy === 100 ){
								clearInterval(ships["ship" + (i + 1)].energy_timer);
							}
						}, 300);
						ships["ship" + (i + 1)].state = "stop";
						clearInterval(ships["ship" + (i + 1)].timer);
					}
				}, 300);
			}
		};
	});
	stops.forEach(function(el,i) {
		el.onclick = function() {
			if(ships["ship" + (i + 1)].state === "flying"){
				clearInterval(ships["ship" + (i + 1)].timer);
				ships["ship" + (i + 1)].state = "stop";
				ships["ship" + (i + 1)].energy_timer = setInterval(function() {
					if(ships["ship" + (i + 1)].energy < 100 ){
						ships["ship" + (i + 1)].energy += 2;
						document.querySelector('.ship' + ships["ship" + (i + 1)].index).innerHTML = "灵能" + ships["ship" + (i + 1)].energy +"%";	
					}
					if(ships["ship" + (i + 1)].energy === 100 ){
						clearInterval(ships["ship" + (i + 1)].energy_timer);
					}
				}, 300);
			}
		};
	});
};