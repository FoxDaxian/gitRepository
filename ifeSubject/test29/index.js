window.onload = function() {
	var test = document.querySelector('[type="button"]');
	var text = document.querySelector('[type="text"');
	var div = document.querySelector('div');
	test.onclick = function() {
		var sum_length = 0;
		//匹配中文和中文字符
		var chinese_arr = text.value.trim().match(/[^\u0000-\u00FF]/g);
		var num_arr = text.value.trim().match(/[\u0000-\u00FF]/g);
		if(chinese_arr){
			sum_length = chinese_arr.length * 2;
		}
		if(num_arr){
			sum_length += num_arr.length;
		}
		if(sum_length >= 4 && sum_length <= 16){
			text.style.borderColor = "green";
			div.style.color = "green";
			div.innerHTML = "名字格式正确"
		}else{
			if(sum_length === 0){
				div.innerHTML = "姓名不能为空";
			}else{
				div.innerHTML = "错了";
			}
			text.style.borderColor = "red";
			div.style.color = "red";
		}
		sum_length = 0;
	};
};