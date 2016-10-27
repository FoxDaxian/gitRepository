window.onload = function() {
	var changeSize = document.querySelector('#changeSize');
	var surfaced = document.querySelector('.surfaced');
	var button = document.querySelector('button');
	var shade_ui = document.querySelector('.shade_ui');
	var h1 = document.querySelector('h1');
	var last_x,last_y;
	var now_x,now_y;
	var drag_x,drag_y;
	var now_w,now_h;
	var last_w,last_h;
	button.addEventListener('click', function(e) {
		surfaced.style.top = 0;
		surfaced.style.left = 0;
		shade_ui.style.display = "block";
		document.body.onmousewheel = function() {
			return false;
		};
	});
	shade_ui.addEventListener('click', function(e) {
		if(e.target.className === "shade_ui"){
			this.style.display = "none";
		}
	});
	/**
	 * 用来绑定事件的封装
	 * @param  {Object} down_target 鼠标按下目标
	 * @param  {function} down_fn     鼠标按下执行的函数
	 * @param  {Object} move_target 鼠标移动目标
	 * @param  {function} move_fn     鼠标移动执行的函数
	 * @param  {Object} up_target   鼠标抬起目标
	 * @param  {function} up_fn       鼠标抬起函数
	 * @return {nothing}             无返回值
	 */
	function package(down_target,down_fn,move_target,move_fn,up_target,up_fn) {
		down_target.addEventListener('mousedown', down_fn);
		move_target.addEventListener('mousemove', move_fn);
		up_target.addEventListener('mouseup', up_fn);
	}




	function dragdown(e) {
		last_x = e.pageX;
		last_y = e.pageY;
		surfaced.setAttribute("dragable",true);
	}
	function dragmove(e) {
		if(surfaced.getAttribute("dragable") ==="true"){
			var X,Y;
			X = e.pageX - last_x;
			Y = e.pageY - last_y;
			if(now_x){
				X = X + now_x;
			}
			if(now_y){
				Y = Y + now_y;
			}
			surfaced.style.left = X + "px";
			surfaced.style.top = Y + "px";
		}
	}
	function dragup(e) {
		now_x = surfaced.offsetLeft;
		now_y = surfaced.offsetTop;
		surfaced.setAttribute("dragable",false);
	}
	package(h1,dragdown,window,dragmove,window,dragup);




	function change_size_d(e) {
		drag_x = e.pageX;
		drag_y = e.pageY;
		last_w = surfaced.offsetWidth;
		last_h = surfaced.offsetHeight;
		changeSize.setAttribute("dragable",true);
	}
	function change_size_m(e) {
		if(changeSize.getAttribute("dragable") ==="true"){
			var W,H;
			W = e.pageX - drag_x;
			H = e.pageY - drag_y;
			if(now_w){
				W += now_w;
			}else{
				W += last_w;
			}
			if(now_h){
				H += now_h;
			}else{
				H += last_h;
			}
			console.log(W);
			console.log(H);
			surfaced.style.width = W + "px";
			surfaced.style.height = H + "px";
		}
	}
	function change_size_u(e) {
		now_w = surfaced.offsetWidth;
		now_h = surfaced.offsetHeight;
		changeSize.setAttribute("dragable",false);
	}
	package(changeSize,change_size_d,window,change_size_m,window,change_size_u);
};