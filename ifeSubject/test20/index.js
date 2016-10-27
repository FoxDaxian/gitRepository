window.onload = function() {
	var insert = document.querySelector('[value="插入"]');
	var query = document.querySelector('[value="查询"]');
	var textarea = document.querySelector('textarea');
	var text = document.querySelector('[type="text"]');
	var container = document.querySelector('.container');
	var innerHTML;
	var el_arr = [];
	textarea.focus();
	insert.addEventListener('click', function(e) {
		if(textarea.value !== ""){
			var arr = textarea.value.trim().split(/[^a-zA-Z\d\u4e00-\u9fa5]+/).filter(function(a,b,c) {
				return a !== "";
			});
			el_arr = el_arr.concat(arr);
			render();
		}else{
			alert('空');
		}
	});
	query.addEventListener('click', function(e) {
		if(text.value !== ""){
			var test_key = text.value.trim();
			render(test_key);
		}else{
			alert('空');
		}
	});
	function render(str) {
		container.innerHTML = el_arr.map(function(el) {
			if(str){
				el = el.replace(new RegExp(str,"g"),"<b>" + str + "</b>");
			}
			return "<span>" + el + "</span>";
		}).join("");
	}
};