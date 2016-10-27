window.onload = function() {
	var text = document.querySelector('[type="text"]');
	var little_block =document.querySelector('.little_block');
	var i = 0;
	var transition_onoff = false;
	var posX_i = 5;
	var posY_i = 5;
	function judge_rotate(key) {
		var rotate_angle = little_block.style.transform.match(/[-]*\d+/)[0] % 360;
		if(key === "left"){
			switch(rotate_angle){
				case 0:
				case -0:
				little_block.style.transform = "rotate(-90deg)";
				break;
				case 90:
				case -90:
				little_block.style.transform = "rotate(-90deg)";
				break;
				case 180:
				case -180:
				little_block.style.transform = "rotate(-90deg)";
				break;
			}
		}else if(key === "right"){
			switch(rotate_angle){
				case 0:
				case -0:
				little_block.style.transform = "rotate(90deg)";
				break;
				case -90:
				little_block.style.transform = "rotate(90deg)";
				break;
				case 180:
				case -180:
				little_block.style.transform = "rotate(90deg)";
				break;
			}
		}else if(key === "top"){
			switch(rotate_angle){
				case 90:
				case -90:
				little_block.style.transform = "rotate(0deg)";
				break;
				case 180:
				case -180:
				little_block.style.transform = "rotate(0deg)";
				break;
			}
		}else if(key === "bottom"){
			switch(rotate_angle){
				case 90:
				case -90:
				little_block.style.transform = "rotate(180deg)";
				break;
				case 0:
				case -0:
				little_block.style.transform = "rotate(180deg)";
				break;
			}
		}
	}
	little_block.addEventListener('webkitTransitionEnd', function(e) {
		transition_onoff = false;
	});
	document.querySelector('[type="button"]').onclick = function() {
		var target = text.value;
		if(target === "l"){
			if(posX_i === 0){
				return;
			}
			if(!transition_onoff){
				little_block.style.left = little_block.offsetLeft - 50 + "px";
				posX_i--;
			}else{
				return;
			}
			transition_onoff = true;
		}
		if(target === "r"){
			if(posX_i === 9){
				return;
			}
			if(!transition_onoff){
				little_block.style.left = little_block.offsetLeft + 50 + "px";
				posX_i++;
			}else{
				return;
			}
			transition_onoff = true;
		}
		if(target === "t"){
			if(posY_i === 0){
				return;
			}
			if(!transition_onoff){
				little_block.style.top = little_block.offsetTop - 50 + "px";
				posY_i--;
			}else{
				return;
			}
			transition_onoff = true;
		}
		if(target === "b"){
			if(posY_i === 9){
				return;
			}
			if(!transition_onoff){
				little_block.style.top = little_block.offsetTop + 50 + "px";
				posY_i++;
			}else{
				return;
			}
			transition_onoff = true;
		}
		if(target === "ll"){
			if(posX_i === 0){
				return;
			}
			if(!transition_onoff){
				judge_rotate("left");
				little_block.style.left = little_block.offsetLeft - 50 + "px";
				posX_i--;
			}else{
				return;
			}
			transition_onoff = true;
		}
		if(target === "rr"){
			if(posX_i === 9){
				return;
			}
			if(!transition_onoff){
				judge_rotate("right");
				little_block.style.left = little_block.offsetLeft + 50 + "px";
				posX_i++;
			}else{
				return;
			}
			transition_onoff = true;
		}
		if(target === "tt"){
			if(posY_i === 0){
				return;
			}
			if(!transition_onoff){
				judge_rotate("top");
				little_block.style.top = little_block.offsetTop - 50 + "px";
				posY_i--;
			}else{
				return;
			}
			transition_onoff = true;
		}
		if(target === "bb"){
			if(posY_i === 9){
				return;
			}
			if(!transition_onoff){
				judge_rotate("bottom");
				little_block.style.top = little_block.offsetTop + 50 + "px";
				posY_i++;
			}else{
				return;
			}
			transition_onoff = true;
		}
	};
};