window.onload= function() {
	(function() {
		var fn = function( element,column ) {
			if( element !== null ){
				this.el = element;
				this.col = typeof column === "number" ? column : 4;
				this.celDiv();
			}else{
				throw new Error("没有找到元素");
			}
		};
		fn.prototype.celDiv = function() {
			var i = 0;
			for( ; i < this.col; i++ ){
				var d = document.createElement("div");
				d.style.width = (100 / this.col) + "%";
				d.classList.add("box");
				this.el.appendChild(d);
			}
		};
		fn.prototype.addImg = function(imgJson) {
			if( {}.toString.call(imgJson) !== "[object Array]" ){
				return;
			}
			var i = 0,
			len = imgJson.length,
			_this = this;
			(function f() {
				(function(i) {
					if( !(i < len) ){
						return false;
					}
					var img = new Image();
					img.src = imgJson[i];
					var time =  setInterval(function() {
						if( img.complete ){
							_this.el.children[_this.getIndex()].appendChild(img);
							clearInterval(time);
							if( i < len){
								f();
							}
						}
					}, 0);
				})(i);
				if( i < len ){
					i += 1;
				}
			})();
		};
		fn.prototype.getIndex = function() {
			var divs = this.el.children,
			len = divs.length,
			i = 0,
			minH = this.el.children[0].offsetHeight,
			index = 0;
			for( ; i < len; i++ ){
				if( this.el.children[i].offsetHeight < minH ){
					minH = this.el.children[i].offsetHeight;
					index = i;
				}
			}
			return index;
		};
		fn.prototype.scroll = function(imgs) {
			var _this = this;
			window.onscroll = function(e) {
				var st = (document.documentElement.scrollTop - document.body.scrollTop) > 0 ?document.documentElement.scrollTop : document.body.scrollTop,
				sh = (document.documentElement.scrollHeight - document.body.scrollHeight ) > 0 ? document.documentElement.scrollHeight : document.body.scrollHeight;
				if( st + document.documentElement.clientHeight >= sh - 300 ){
					_this.addImg(imgs);
				}
			};
		};
		fn.prototype.canClick = function() {
			this.el.addEventListener('click', function(e) {
				if( e.target.nodeName.toLowerCase()  === "img"){
					var div = document.createElement("div"),
					img = document.createElement("img");
					img.src = e.target.src;
					img.classList.add("fixImg");
					div.classList.add("mask");
					div.appendChild(img);
					div.addEventListener('click', function(e) {
						this.parentNode.removeChild(this);
					});
					document.body.appendChild(div);
				}
			});
		};
		this.$ = fn;
	})();
	var mine = new $(document.querySelector('.wrap'),6);
	function celImgArr(num) {
		var i = 0,
		imgs = [];
		for( ; i < num; i++ ){
			imgs[i] = "../images/img" + Math.ceil(Math.random()*12) + ".jpg";
		}
		return imgs;
	}
	mine.addImg(celImgArr(50));
	//要不要滚动加载啊
	mine.scroll(celImgArr(20));
	//要不要点击方法图片啊
	mine.canClick();
};