window.onload = function() {
	var text = document.querySelector('[type="text"]');
	var little_block =document.querySelector('.little_block');
	var i = 0;
	var transition_onoff = false;
	var posX_i = 5;
	var posY_i = 5;
	little_block.addEventListener('webkitTransitionEnd', function(e) {
		transition_onoff = false;
	});
	document.querySelector('[type="button"]').onclick = function() {
		var target = text.value;
		if(target === "go"){
			if(transition_onoff === true){
				return;
			}
			transition_onoff = true;
			switch( i % 4 ){
				//上
				case 0:
				if(posY_i === 0){
					return;
				}
				little_block.style.top = little_block.offsetTop - 50 + "px";
				posY_i--;
				break;
				//右
				case 1:
				case -3:
				if(posX_i === 9){
					return;
				}
				little_block.style.left = little_block.offsetLeft + 50 + "px";
				posX_i++;
				break;
				// 下
				case 2:
				case -2:
				if(posY_i === 9){
					return;
				}
				little_block.style.top = little_block.offsetTop + 50 + "px";
				posY_i++;
				break;
				// 左
				case 3:
				case -1:
				if(posX_i === 0){
					return;
				}
				little_block.style.left = little_block.offsetLeft - 50 + "px";
				posX_i--;
				break;
			}
		}else if(target === "turn left"){
			i--;
			little_block.style.transform = "rotate(" + (90 * i) + "deg)";
		}else if(target === "turn right"){
			i++;
			little_block.style.transform = "rotate(" + (90 * i) + "deg)";
		}else if(target === "turn back"){
			i += 2;
			little_block.style.transform = "rotate(" + (90 * i) + "deg)";
		}
	};
};