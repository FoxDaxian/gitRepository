window.onload = function() {
	function control_block(target) {
		var _this = this;
		this.time = 800;
		this.if_animating = false;
		//最大最小
		this.max_X = 500;
		this.min_X = 50;
		this.max_Y = 500;
		this.min_Y = 50;
		//边界条件
		this.x_pos = 0;
		this.y_pos = 0;
		//数组中是否含有小方块
		this.has_little_block = true;
		//随机造墙数组里面的使用过的数组
		this.last_arr = [];
		//所有的棋子的DIV的数组
		this.chess_pieces_arr = [].slice.call(document.querySelector('.chessboard').querySelectorAll('div:not(.noborder)'));
		this.chess_pieces_arr.shift();
		//二维数组 用来存储每个格子位置的信息
		this.pos_two_arr = [];
		this.chess_pieces_arr.forEach(function(el,i) {
			_this.pos_two_arr.push([el.offsetLeft,el.offsetTop]);
		});
		this.toAbsolute();
		this.target = document.querySelector(target);
		this.build_random_wall = document.querySelector('[value="build wall"]');
		var textarea = document.querySelector('#textarea');
		var ul = document.querySelector("ul");
		var go = document.querySelector('[value="GO"]');
		textarea.focus();
		var refresh = document.querySelector('[value="Refresh"]'); 
		//闲七杂八的事件
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
		//随机造墙
		this.build_random_wall.onclick = function() {
			_this.randomBuild_random_wall(1,_this.target);
		};
		//这里开始执行
		go.onclick = function() {
			if(_this.if_animating === true){
				return;
			}
			_this.send_order(textarea.value.split(/\n/g));
		};
	}
	//布局转换
	control_block.prototype.toAbsolute = function() {
		var divs = [].slice.call(document.querySelector('.chessboard').querySelectorAll('div'));
		divs.shift();
		var pos_arr = [];
		divs.forEach(function(el,i) {
			pos_arr.push([el.offsetLeft,el.offsetTop]);
		});
		divs.forEach(function(el,i) {
			el.style.left = pos_arr[i][0] + "px";
			el.style.top = pos_arr[i][1] + "px";
		});
		divs.forEach(function(el,i) {
			el.style.position = "absolute";
		});
	};
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
		var chess_pieceses = [].slice.call(document.querySelectorAll('.chessboard div:not(.noborder)'));
		chess_pieceses.shift();
		var _this = this;
		var contition = this.judge_direction();
		if(if_nodir){
			contition = order_dir;
		}
		switch(contition){
			case "left":
			case "LEF":
			for(var i = 1; i <= (step_num/50); i++){
				if(!chess_pieceses[this.get_little_block_information(this.target,this) - i]){
					i--;
					break;	
				}
				if(chess_pieceses[this.get_little_block_information(this.target,this) - i].style.background){
					step_num = (i - 1) * 50;
					break;
				}
			}
			this.if_animating = true;
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
			for(var i = 1; i <= (step_num/50); i++){
				if(!chess_pieceses[this.get_little_block_information(this.target,this) + i]){
					i--;
					break;	
				}
				if(chess_pieceses[this.get_little_block_information(this.target,this) + i].style.background){
					step_num = (i - 1) * 50;
					break;
				}
			}
			this.if_animating = true;
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
			for(var i = 1; i <= (step_num/50); i++){
				if(!chess_pieceses[this.get_little_block_information(this.target,this) - (10 * i)]){
					i--;
					break;	
				}
				if(chess_pieceses[this.get_little_block_information(this.target,this) - (10 * i)].style.background){
					step_num = (i - 1) * 50;
					break;
				}
			}
			this.if_animating = true;
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
			for(var i = 1; i <= (step_num/50); i++){
				if(!chess_pieceses[this.get_little_block_information(this.target,this) + (10 * i)]){
					i--;
					break;
				}
				if(chess_pieceses[this.get_little_block_information(this.target,this) + (10 * i)].style.background){
					step_num = (i - 1) * 50;
					break;
				}
			}
			this.if_animating = true;
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
	/**
	 * 改变方向逻辑函数
	 * @param  {string} dir_now    当前小方块方向
	 * @param  {string/boolean} dir_target 小方块目标方向或者是布尔值
	 * @return {nothing}            没有返回值
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
		var _this = this;
		var num = null;
		var ul = document.querySelector('ul');
		if(ul.children[i]){
			ul.children[i].style.color = "green";
		}
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
		}else if(/^BUILD$/.test(search_key)){
			this.build_wall(this.target);
		}else if(/^BRU\s#[\da-fA-F]{3,6}$/.test(search_key)){
			this.brush_wall(this.target,search_key);
		}else if(/^MOV TO \d\,\d$/.test(search_key)){
			this.move_to(this.get_coordinate(this.target,search_key).little_block_pos,this.get_coordinate(this.target,search_key).target_pos);
		}else{
			//错误变红
			ul.children[i].style.color = "red";
		}
	};
	/**
	 * 获取目标坐标和小方块坐标
	 * @return {json} 返回两对坐标
	 */
	 control_block.prototype.get_coordinate = function(target,order) {
	 	var chess_pieceses = [].slice.call(document.querySelectorAll('.chessboard div:not(.noborder)'));
	 	chess_pieceses.shift();
	 	var twoArr_XY = {};
	 	var twoArr_Y = 0;
	 	var x = order.split(" ")[2].split(",")[0];
	 	var y = order.split(" ")[2].split(",")[1];
	 	chess_pieceses.forEach(function(el,i) {
	 		twoArr_XY[twoArr_Y + "," + i % 10] = el;
	 		if(i % 10 === 9){
	 			twoArr_Y++;
	 		}
	 	});
		//获取目标坐标和小方块坐标
		try{
			var target_pos_X = twoArr_XY[(y - 1) + "," + (x - 1)].offsetLeft;
			var target_pos_Y = twoArr_XY[(y - 1) + "," + (x - 1)].offsetTop;
		}catch(e){
			console.log(e);
		}
		var little_block_pos_X = this.target.offsetLeft;
		var little_block_pos_Y = this.target.offsetTop;
		return {
			target_pos:[target_pos_X,target_pos_Y],
			little_block_pos:[little_block_pos_X,little_block_pos_Y]
		};
	};
	//执行move_to
	control_block.prototype.move_to = function(little_block_pos,target_pos) {
		var _this = this;
		var chess_pieceses = [].slice.call(document.querySelectorAll('.chessboard div:not(.noborder)'));
		chess_pieceses.shift();
		if(target_pos[0] > little_block_pos[0]){
			_this.change_direction(_this.judge_direction(),"right");
			for(var i = 1; i <= (target_pos[0]/50); i++){
				if(!chess_pieceses[this.get_little_block_information(this.target,this) + i]){
					i--;
					break;
				}
				if(chess_pieceses[this.get_little_block_information(this.target,this) + i].style.background){
					target_pos[0] = i * 50;
					break;
				}
			}
		}else if(target_pos[0] < little_block_pos[0]){
			_this.change_direction(_this.judge_direction(),"left");
			for(var i = 1; i <= (target_pos[0]/50); i++){
				if(!chess_pieceses[this.get_little_block_information(this.target,this) - i]){
					i--;
					break;
				}
				if(chess_pieceses[this.get_little_block_information(this.target,this) - i].style.background){
					target_pos[0] = i * 50;
					break;
				}
			}
		}
		this.x_pos  = target_pos[0] / 50;
		this.target.style.left = target_pos[0] + "px";
		function move_X() {
			if(target_pos[1] > little_block_pos[1]){
				_this.change_direction(_this.judge_direction(),"bottom");
				for(var i = 1; i <= (target_pos[1]/50); i++){
					if(!chess_pieceses[_this.get_little_block_information(_this.target,_this) + (i * 10)]){
						i--;
						break;
					}
					if(chess_pieceses[_this.get_little_block_information(_this.target,_this) + (i * 10)].style.background){
						target_pos[1] = i * 50;
						break;
					}
				}
			}else if(target_pos[1] < little_block_pos[1]){
				_this.change_direction(_this.judge_direction(),"top");
				for(var i = 1; i <= (target_pos[1]/50); i++){
					if(!chess_pieceses[_this.get_little_block_information(_this.target,_this) - (i * 10)]){
						i--;
						break;
					}
					if(chess_pieceses[_this.get_little_block_information(_this.target,_this) - (i * 10)].style.background){
						target_pos[1] = i * 50;
						break;
					}
				}
			}
			this.y_pos  = target_pos[1] / 50;
			_this.target.style.top = target_pos[1] + "px";
		}
		setTimeout(function() {
			move_X();
		}, _this.time / 2);
	};
	//指令开始
	control_block.prototype.move = function(order) {
		if(!order[0]){
			return;
		}
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
				if(arr.length > 0){
					setTimeout(function() {
						doIt();
					}, move_this.time);
				}else{
					move_this.if_animating = false;
				}
			}
		}
		doIt();
	};
	//发送指令
	control_block.prototype.send_order = function(data) {
		this.move(data);
	};
	//获取当前小方块在数组中的位置
	control_block.prototype.get_little_block_information = function(target,_this) {
		var pos;
		var now_pos_arr = [target.offsetLeft,target.offsetTop];
		this.pos_two_arr.forEach(function(el,i) {
			if(el[0] === now_pos_arr[0] && el[1] === now_pos_arr[1]){
				pos = _this.pos_two_arr.indexOf(el);
			}
		});
		return pos;
	};
	//随机修墙
	control_block.prototype.randomBuild_random_wall = function(num,target) {
		var _this = this;
		var pos = this.get_little_block_information(target,_this);
		//获取当前little_block的在数组中的位置
		//去掉当前小方块的数组
		if(this.has_little_block){
			this.chess_pieces_arr.splice(pos,1);
			this.has_little_block = false;
		}
		var random_arr = this.random_pos(num,this.chess_pieces_arr.length);
		if(random_arr){
			random_arr.forEach(function(el,i) {
				_this.chess_pieces_arr[el].style.background = "black";
			});
		}
	};
	//获取随机造墙的数组
	control_block.prototype.random_pos = function(num,sum) {
		if(sum === this.last_arr.length){
			return;
		}
		var random_five_arr = [];
		if(sum - this.last_arr.length < num){
			num = sum - this.last_arr.length;
		}
		for(var i = 0; i < num; i++){
			var random_num = Math.floor(Math.random()*sum);
			if(random_five_arr.indexOf(random_num) === -1){
				if(this.last_arr.length > 0){
					if(this.last_arr.indexOf(random_num) === -1){
						random_five_arr.push(random_num);
					}else{
						i--;
						continue;
					}
				}else{
					random_five_arr.push(random_num);
				}
			}else{
				i--;
			}
		}
		this.last_arr = this.last_arr.concat(random_five_arr);
		return random_five_arr;
	};
	//BUILD造墙
	control_block.prototype.build_wall = function(target) {
		var _this = this;
		var pos = this.get_little_block_information(target,_this);
		this.judgeDir_toBuild(pos);
	};
	/**
	 * 判断方向去造墙
	 * @param  {number} block_pos 小方块的当前位置
	 * @return {nothing}           无返回值
	 */
	 control_block.prototype.judgeDir_toBuild = function(block_pos) {
	 	switch(this.judge_direction()){
	 		case "left":
	 		try{
	 			if(!this.chess_pieces_arr[block_pos - 1].style.background){
	 				this.chess_pieces_arr[block_pos - 1].style.background = "black";
	 				this.chess_pieces_arr[block_pos - 1].setAttribute("hasWall","true");
	 			}else{
	 				console.error("已经有墙了");
	 			}
	 		}catch(e){
	 			console.log(e);
	 		}
	 		break;
	 		case "right":
	 		try{
	 			if(!this.chess_pieces_arr[block_pos + 1].style.background){
	 				this.chess_pieces_arr[block_pos + 1].style.background = "black";
	 				this.chess_pieces_arr[block_pos + 1].setAttribute("hasWall","true");
	 			}else{
	 				console.error("已经有墙了");
	 			}
	 		}catch(e){
	 			console.log(e);
	 		}
	 		break;
	 		case "top":
	 		try{
	 			if(!this.chess_pieces_arr[block_pos - 10].style.background){
	 				this.chess_pieces_arr[block_pos - 10].style.background = "black";
	 				this.chess_pieces_arr[block_pos - 10].setAttribute("hasWall","true");
	 			}else{
	 				console.error("已经有墙了");
	 			}
	 		}catch(e){
	 			console.log(e);
	 		}
	 		break;
	 		case "bottom":
	 		try{
	 			if(!this.chess_pieces_arr[block_pos + 10].style.background){
	 				this.chess_pieces_arr[block_pos + 10].style.background = "black";
	 				this.chess_pieces_arr[block_pos + 10].setAttribute("hasWall","true");
	 			}else{
	 				console.error("已经有墙了");
	 			}
	 		}catch(e){
	 			console.log(e);
	 		}
	 		break;
	 	}
	 };
	 control_block.prototype.brush_wall = function(target,search_key) {
	 	var color = search_key.split(" ")[1];
	 	var _this = this;
	 	var pos = this.get_little_block_information(target,_this)
	 	this.judgeDir_toBrush(pos,color);
	 };
	/**
	 * 判断方向去粉刷墙
	 * @param  {number} block_pos 小方块的当前位置
	 * @return {nothing}           无返回值
	 */
	 control_block.prototype.judgeDir_toBrush = function(block_pos,color) {
	 	switch(this.judge_direction()){
	 		case "left":
	 		try{
	 			if(this.chess_pieces_arr[block_pos - 1].style.background){
	 				this.chess_pieces_arr[block_pos - 1].style.background = color;
	 			}else{
	 				console.error("没有墙，不能粉刷");
	 			}
	 		}catch(e){
	 			console.log(e);
	 		}
	 		break;
	 		case "right":
	 		try{
	 			if(this.chess_pieces_arr[block_pos + 1].style.background){
	 				this.chess_pieces_arr[block_pos + 1].style.background = color;
	 			}else{
	 				console.error("没有墙，不能粉刷");
	 			}
	 		}catch(e){
	 			console.log(e);
	 		}
	 		break;
	 		case "top":
	 		try{
	 			if(this.chess_pieces_arr[block_pos - 10].style.background){
	 				this.chess_pieces_arr[block_pos - 10].style.background = color;
	 			}else{
	 				console.error("没有墙，不能粉刷");
	 			}
	 		}catch(e){
	 			console.log(e);
	 		}
	 		break;
	 		case "bottom":
	 		try{
	 			if(this.chess_pieces_arr[block_pos + 10].style.background){
	 				this.chess_pieces_arr[block_pos + 10].style.background = color;
	 			}else{
	 				console.error("没有墙，不能粉刷");
	 			}
	 		}catch(e){
	 			console.log(e);
	 		}
	 		break;
	 	}
	 };
	 var object = new control_block(".little_block");
	};