window.onload = function() {
	var lis;
	var add_btn;
	var del_btn;
	var wrap = document.querySelector('ul');
	var text = document.querySelector('[type="text"]');
	var search = document.querySelector('[value="搜索"]');
	var clear = document.querySelector('[value="清除"]');
	function get_el() {
		lis = document.querySelectorAll('li');
		add_btn = document.querySelectorAll('.add');
		del_btn = document.querySelectorAll('.del');
	}
	function draw() {
		lis = document.querySelectorAll('li');
		lis.forEach(function(el) {
			if(el.children.length > 1){
				el.children[0].classList.add("triangle");
			}else{
				el.children[0].classList.remove("triangle");
			}
			if(el.children[0].parentNode.parentNode.parentNode.nodeName.toLowerCase() !== "li"){
				if(el.children[0].children.length === 1){
					var add_icon = document.createElement("img");
					add_icon.className = "add";
					add_icon.src = "imgs/add.png";
					el.children[0].appendChild(add_icon);
				}
			}else{
				if(el.children[0].children.length === 1){
					var add_icon = document.createElement("img");
					add_icon.className = "add";
					add_icon.src = "imgs/add.png";
					var del_icon = document.createElement("img");
					del_icon.className = "del";
					del_icon.src = "imgs/delete.png";
					el.children[0].appendChild(add_icon);
					el.children[0].appendChild(del_icon);
				}
			}
			el.children[0].children[0].onclick =function(e) {
				if(el.children[0].nextElementSibling){
					var display_swirch = window.getComputedStyle(el.children[0].nextElementSibling).display === "block";
					if(display_swirch){	
						el.children[0].nextElementSibling.style.display = "none";
						el.children[0].classList.add("triangle_left");
					}else{
						el.children[0].nextElementSibling.style.display = "block";
						el.children[0].classList.remove("triangle_left");
					}
				}
			};
		});
		add_btn = document.querySelectorAll('.add');
		del_btn = document.querySelectorAll('.del');
	}
	function bind_imgBtn() {
		add_btn.forEach(function(el) {
			el.onclick = function(e) {
				var insert_text = prompt("请输入要增加的游戏名/分类");
				if(!insert_text){
					return;
				}
				if(el.parentNode.nextElementSibling){
					var li = document.createElement("li");
					var div = document.createElement("div");
					var span = document.createElement("span");
					span.innerHTML = insert_text;
					var add_img = document.createElement("img");
					add_img.className = "add";
					add_img.src = "imgs/add.png";
					var del_img = document.createElement("img");
					del_img.className = "del";
					del_img.src = "imgs/delete.png";
					div.appendChild(span);
					div.appendChild(add_img);
					div.appendChild(del_img);
					li.appendChild(div);
					el.parentNode.nextElementSibling.appendChild(li);
				}else{
					var ul = document.createElement("ul");
					var li = document.createElement("li");
					var div = document.createElement("div");
					var span = document.createElement("span");
					span.innerHTML = insert_text;
					var add_img = document.createElement("img");
					add_img.className = "add";
					add_img.src = "imgs/add.png";
					var del_img = document.createElement("img");
					del_img.className = "del";
					del_img.src = "imgs/delete.png";
					div.appendChild(span);
					div.appendChild(add_img);
					div.appendChild(del_img);
					li.appendChild(div);
					ul.appendChild(li);
					el.parentNode.parentNode.appendChild(ul);
				}
				get_el();
				draw();
				bind_imgBtn();
			};
		});
		del_btn.forEach(function(el) {
			el.onclick = function() {
				var ul = el.parentNode.parentNode.parentNode;
				el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
				if(ul.children.length === 0){
					ul.parentNode.removeChild(ul);
				}
				get_el();
				draw();
				bind_imgBtn();
			};
		});
	}
	function tree_search() {
		search.addEventListener('click', function(e) {
			if(text.value){
				sort_search(text.value);
			}else{
				alert('请输入检索值');
			}
		});
		clear.addEventListener('click', function(e) {
			document.querySelectorAll('span').forEach(function(el) {
				el.style.color = "#000";
			});
			text.value = "";
			text.focus();
		});
	}
	draw();
	bind_imgBtn();
	tree_search();
	var arr = [];
	var last_arr = [];
	function sort_search(search) {
		if(last_arr.length){
			last_arr.forEach(function(el) {
				el.style.color = "#000";
			});
			last_arr.length = 0;
		}
		var i = 0;
		arr.length = 0;
		function sort(node) {
			if(node){
				arr.push(node);
				for(var i = 0; i < node.children.length; i++){
					sort(node.children[i]);
				}
			}
		}
		sort(wrap);
		arr.forEach(function(el) {
			if(el.nodeName.toLowerCase() === "span" && el.innerHTML === search){
				i++;
				last_arr.push(el);
				el.style.color = "red";
			}
		});
		if(i !== 0){
			alert('搜索到' + i + "条");
		}else{
			alert('没有找到有效信息');
		}
	}
};