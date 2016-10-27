window.onload = function() {
	(function() {
		var fsy_page_plugin = document.getElementById('fsy_page_plugin');
		if(!fsy_page_plugin){
			return false;
		}else{
			console.log("%c请在#fsy_page_plugin的标签上设置属性fsy\n格式为:fsy='pageSum:xx;pageNow:x;'\n其中的pageSum为总页数。pageNow为当前页数，请自行设置","color:#3299CC");
		}
		var a = fsy_page_plugin.getAttribute("fsy");
		var pageSum = parseInt(a.split(";").join("").match(/pageSum:[\d]+/g).join("").split(":")[1]);
		var pageNow = parseInt(a.split(";").join("").match(/pageNow:[\d]+/g).join("").split(":")[1]);
		if(pageSum < pageNow){
			console.log("%c总页数应该比当前页数大!","color:red");
		}
		var last_num = null;
		var pages = document.createElement("div");
		//上一页按钮
		var prev_page = document.createElement("span");
		prev_page.className = "l_btn";
		prev_page.innerHTML = "&lt;&lt;上一页";
		//下一页按钮
		var next_page = document.createElement("span");
		next_page.className = "r_btn";
		next_page.innerHTML = "下一页&gt;&gt;";
		//...
		var points = document.createElement("a");
		points.innerHTML = "...";
		//...前面的
		var prev_points = document.createElement("a");
		prev_points.innerHTML = "...";
		//第一页
		var first_page = document.createElement("a");
		first_page.className = "page";
		first_page.innerHTML = "第1页";
		//最后一页
		var last_page = document.createElement("a");
		last_page.className = "page";
		last_page.innerHTML = "第" + pageSum + "页";
		//主要方法
		function main(start,end) {
			for(var i = start; i < end; i++){
				var page = document.createElement("a");
				page.className = "page";
				page.innerHTML = "第" + (i + 1) + "页";
				pages.appendChild(page);
				if(pageNow === (i + 1)){
					page.className += " pageNow";
				}
			}
		}
		function page_init() {			pages.innerHTML = "";
			fsy_page_plugin.innerHTML = "";
			if(pageSum < 8 && pageSum > 0){
				var page_last = document.createElement("a");
				page_last.className = "page";
				page_last.innerHTML = "第" + pageSum + "页";
				main(0,pageSum);
			}else if(pageSum >= 8){
				if(pageNow < 6){
					if(pageSum > 9){
						main(0,7);
						pages.appendChild(points);
						pages.appendChild(last_page);
					}else if(pageSum == 8 || pageSum == 9){
						main(0,pageSum);
					}
				}else if(pageNow >= 6 && pageNow != pageSum){
					if(pageSum > 9){
						pages.appendChild(first_page);
						pages.appendChild(prev_points);
						if((pageSum - pageNow) > 4){
							main((pageNow - 3),(pageNow + 2));
							pages.appendChild(points);
							pages.appendChild(last_page);
						}else{
							last_num == null ? (last_num = pageSum - 7) : last_num = last_num;
							main(last_num,pageSum);
						}
					}else if(pageSum == 8 || pageSum == 9){
						main(0,pageSum);
					}
				}else if(pageNow == pageSum){
					pages.appendChild(first_page);
					pages.appendChild(points);
					main( (pageSum - 7),pageSum); 
				}
			}else{
				alert('不能为负数');
			}
			fsy_page_plugin.appendChild(prev_page);
			fsy_page_plugin.appendChild(pages);
			fsy_page_plugin.appendChild(next_page);
			var page = document.querySelectorAll(".page");
			for(var i = 0; i < page.length; i++){
				(function(x) {
					page[x].onclick = function() {
						var click_index = parseInt(this.innerHTML.match(/\d/g).join(""), 10);
						pageNow = click_index;
						page_init();		
					};
				})(i);
			}
		}
		page_init();
		//切换按钮
		var r_btn = document.querySelector(".r_btn");
		var l_btn = document.querySelector(".l_btn");
		r_btn.onclick = function() {
			if(pageNow + 1 == pageSum){
				this.classList.remove("btn_hover");
			}
			if(pageNow == pageSum){
				return false;
			}
			pageNow++;
			page_init();
		};
		r_btn.onmouseover = function() {
			if(pageNow != pageSum){
				this.classList.add("btn_hover");
			}
		};
		r_btn.onmouseout = function() {
			this.classList.remove("btn_hover");
		};
		l_btn.onclick = function() {
			if(pageNow - 1 == 1){
				this.classList.remove("btn_hover");
			}
			if(pageNow == 1){
				return false;
			}
			pageNow--;
			page_init();
		};
		l_btn.onmouseover = function() {
			if(pageNow != 1){
				this.classList.add("btn_hover");
			}
		};
		l_btn.onmouseout = function() {
			this.classList.remove("btn_hover");
		};
	})();
};