window.onload= function() {
	(function() {
		var fn = function( element,column ) {
			if( element !== null ){
				this.el = element;
				this.col = typeof column === "number" ? column : 4;
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
			j = 0,
			imgs = [],
			len = imgJson.length;
			var _this = this;
			for( ; i < len; i++ ){
				var img = new Image();
				img.src = imgJson[i];
				(function(i, img){
					img.onload = function() {
						j++;
						imgs[i] = img;
						if (j === len) {
							_this.init(imgs);
						}
					};
				})(i, img);
			}
		};
		fn.prototype.init = function(imgs) {
			for(var i = 0,len = imgs.length; i<len; i++) {
				var index = this.getIndex();
				this.el.children[index].appendChild(imgs[i]);
			}
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
		this.$ = fn;
	})();
	var mine = new $(document.querySelector('.wrap'),4);
	mine.celDiv();
	function celImgArr(num) {
		var i = 0,
		imgs = [];
		for( ; i < num; i++ ){
			imgs[i] = "http://placehold.it/" + (Math.ceil(Math.random()*300) + 100) +"x" + (Math.ceil(Math.random()*250) + 100) + "/" + "ff60" + i % 10  +"f/fff";
		}
		return imgs;
	}
	mine.addImg(celImgArr(50));
};