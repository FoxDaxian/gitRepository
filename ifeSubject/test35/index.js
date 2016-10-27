window.onload = function() {
	function control_block(target) {
		this.max_X = 500;
		this.min_X = 50;
		this.max_Y = 500;
		this.min_Y = 50;
		this.x_pos = 0;
		this.y_pos = 0;
		this.target = document.querySelector(target);
		var _this = this;
		var textarea = document.querySelector('#textarea');
		var ul = document.querySelector("ul");
		var go = document.querySelector('[value="GO"]');
		textarea.focus();
		var refresh = document.querySelector('[value="Refresh"]'); 
		refresh.onclick = function() {
			textarea.value = "";
			ul.innerHTML = "";
		};
		textarea.onscroll = function(e) {
			ul.style.top = -textarea.scrollTop + "px";
		};
		textarea.onkeyup = function() {
			ul.style.top = -textarea.scrollTop + "px";
			_this.control_panel(ul);
		};
		go.onclick = function() {
			_this.send_order();
		};
	}
	//控制面板
	control_block.prototype.control_panel = function(el_wrap) {
		el_wrap.innerHTML = "";
		var arr = [];
		var _this = this;
		this.textarea_data = textarea.value.split(/\n/g);
		var line_number = this.textarea_data.length;
		for(var i = 0; i < line_number; i++){
			arr.push(i);
		}
		arr.forEach(function(el,i) {
			el_wrap.appendChild(_this.create_li(i));
		});
	};
	control_block.prototype.create_li = function(content) {
		var li = document.createElement("li");
		li.innerHTML = content;
		return li;
	};
	//判断方向，参数暂时没用到
	control_block.prototype.judge_direction = function(dir_now) {
		var direction = dir_now || this.target.style.transform.match(/\-?\d+/)[0] % 360;
		switch(direction){
			case 0:
			case -0:
			return "top";
			break;
			case 90:
			case -270:
			return "right";
			break;
			case 180:
			case -180:
			return "bottom";
			break;
			case 270:
			case -90:
			return "left";
			break;
		}
	};
	//动画执行的switch
	control_block.prototype.switch_go = function(target,step_num,if_nodir,order_dir) {
		var contition = this.judge_direction();
		if(if_nodir){
			contition = order_dir;
		}
		switch(contition){
			case "left":
			case "LEF":
			this.x_pos -= step_num / 50;
			if(this.x_pos <= 0){
				target.style.left = this.min_X + "px";
				this.x_pos  = 0;
				return;
			}
			target.style.left = target.offsetLeft - step_num + "px";
			break;
			case "right":
			case "RIG":
			this.x_pos += step_num / 50;
			if(this.x_pos >= 10){
				this.x_pos  = 10;
				target.style.left = this.max_X + "px";
				return;
			}
			target.style.left = target.offsetLeft + step_num + "px";
			break;
			case "top":
			case "TOP":
			this.y_pos -= step_num / 50;
			if(this.y_pos <= 0){
				this.y_pos  = 0;
				target.style.top = this.min_Y + "px";
				return;
			}
			target.style.top = target.offsetTop - step_num + "px";
			break;
			case "bottom":
			case "BOT":
			this.y_pos += step_num / 50;
			if(this.y_pos >= 10){
				this.y_pos  = 10;
				target.style.top = this.max_Y + "px";
				return;
			}
			target.style.top = target.offsetTop + step_num + "px";
			break;
		}
	};
	/*
	改变方向逻辑
	第二个参数是否为布尔值
	*/
	control_block.prototype.change_direction = function(dir_now,dir_target) {
		var deg_now = parseInt(this.target.style.transform.match(/\-?\d+/g)[0]);
		if({}.toString.call(dir_target) === "[object Boolean]"){
			if(dir_now === "right"){
				this.target.style.transform = "rotate(" + (deg_now + 90) + "deg)";
			}
			if(dir_now === "left"){
				this.target.style.transform = "rotate(" + (deg_now - 90) + "deg)";
			}
			if(dir_now === "back"){
				this.target.style.transform = "rotate(" + (deg_now + 180) + "deg)";
			}
			return;
		}
		if(dir_target === "top"){
			if(dir_now === "top"){
				return;
			}else if(dir_now === "bottom"){
				this.target.style.transform = "rotate(" + (deg_now + 180) + "deg)";
			}else if(dir_now === "left"){
				this.target.style.transform = "rotate(" + (deg_now + 90) + "deg)";
			}else if(dir_now === "right"){
				this.target.style.transform = "rotate(" + (deg_now - 90) + "deg)";
			}
		}else if(dir_target === "bottom"){
			if(dir_now === "bottom"){
				return;
			}else if(dir_now === "top"){
				this.target.style.transform = "rotate(" + (deg_now + 180) + "deg)";
			}else if(dir_now === "left"){
				this.target.style.transform = "rotate(" + (deg_now - 90) + "deg)";
			}else if(dir_now === "right"){
				this.target.style.transform = "rotate(" + (deg_now + 90) + "deg)";
			}
		}else if(dir_target === "left"){
			if(dir_now === "left"){
				return;
			}else if(dir_now === "top"){
				this.target.style.transform = "rotate(" + (deg_now - 90) + "deg)";
			}else if(dir_now === "bottom"){
				this.target.style.transform = "rotate(" + (deg_now + 90) + "deg)";
			}else if(dir_now === "right"){
				this.target.style.transform = "rotate(" + (deg_now + 180) + "deg)";
			}
		}else if(dir_target === "right"){
			if(dir_now === "right"){
				return;
			}else if(dir_now === "top"){
				this.target.style.transform = "rotate(" + (deg_now + 90) + "deg)";
			}else if(dir_now === "bottom"){
				this.target.style.transform = "rotate(" + (deg_now - 90) + "deg)";
			}else if(dir_now === "left"){
				this.target.style.transform = "rotate(" + (deg_now + 180) + "deg)";
			}
		}
	};
	//得到步数
	control_block.prototype.getNum = function(before_num) {
		return !isNaN(parseInt(before_num.split(" ")[before_num.split(" ").length - 1])) ? parseInt(before_num.split(" ")[before_num.split(" ").length - 1]) * 50 : 50;
	};
	//判断口令
	control_block.prototype.judge_order = function(search_key,i) {
		var num = null;
		var ul = document.querySelector('ul');
		ul.children[i].style.color = "blue";
		if(/^GO\s\d$|^GO$/.test(search_key)){
			num = this.getNum(search_key);
			this.switch_go(this.target,num);
		}else if(/^TUN LEF$/.test(search_key)){
			this.change_direction("left",true);
		}else if(/^TUN RIG$/.test(search_key)){
			this.change_direction("right",true);
		}else if(/^TUN BAC$/.test(search_key)){
			this.change_direction("back",true);
		}else if(/^TRA LEF\s\d$|^TRA LEF$/.test(search_key)){
			this.switch_go(this.target,this.getNum(search_key),true,search_key.split(" ")[1]);
		}else if(/^TRA RIG\s\d$|^TRA RIG$/.test(search_key)){
			this.switch_go(this.target,this.getNum(search_key),true,search_key.split(" ")[1]);
		}else if(/^TRA BOT\s\d$|^TRA BOT$/.test(search_key)){
			this.switch_go(this.target,this.getNum(search_key),true,search_key.split(" ")[1]);
		}else if(/^TRA TOP\s\d$|^TRA TOP$/.test(search_key)){
			this.switch_go(this.target,this.getNum(search_key),true,search_key.split(" ")[1]);
		}else if(/^MOV LEF\s\d$|^MOV LEF$/.test(search_key)){
			this.change_direction(this.judge_direction(),"left");
			this.switch_go(this.target,this.getNum(search_key));
		}else if(/^MOV RIG\s\d$|^MOV RIG$/.test(search_key)){
			this.change_direction(this.judge_direction(),"right");
			this.switch_go(this.target,this.getNum(search_key));
		}else if(/^MOV BOT\s\d$|^MOV BOT$/.test(search_key)){
			this.change_direction(this.judge_direction(),"bottom");
			this.switch_go(this.target,this.getNum(search_key));
		}else if(/^MOV TOP\s\d$|^MOV TOP$/.test(search_key)){
			this.change_direction(this.judge_direction(),"top");
			this.switch_go(this.target,this.getNum(search_key));
		}else{
			//错误变红
			ul.children[i].style.color = "red";
		}
	};
	//指令开始
	control_block.prototype.move = function(order) {
		var move_this = this;
		var arr = [];
		order.forEach(function(el,i) {
			var json = {
				order:el,
				num:i
			};
			arr.push(json);
		});
		function doIt() {
			if(arr.length > 0){
				move_this.judge_order(arr[0].order,arr[0].num);
				arr.shift();
			}
			if(arr.length > 0){
				setTimeout(function() {
						doIt();
				}, 600);
			}
		}
		doIt();
	};
	control_block.prototype.send_order = function() {
		this.move(this.textarea_data);
	};
	var object = new control_block(".little_block");
};