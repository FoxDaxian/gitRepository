window.onload = function() {
	var texts =  document.querySelectorAll('input');
	var ps = document.querySelectorAll('p');
	var btn = document.querySelector('button');
	var last_password;
	var if_true = [
	{text:false},
	{text:false},
	{text:false},
	{text:false},
	{text:false}
	];
	function green(target) {
		target.style.borderColor = "green";
		target.style.boxShadow = "0 0 2px green";
		target.nextElementSibling.style.color = "green";
		target.nextElementSibling.innerHTML = "OK";
	}
	function red(target) {
		target.style.borderColor = "red";
		target.style.boxShadow = "0 0 2px red";
		target.nextElementSibling.style.color = "red";
		target.nextElementSibling.innerHTML = "ERROR";
	}
	function test_text(index,el) {
		switch(index){
			case 0:
			var sum_length = 0;
			var chinese_arr = el.value.trim().match(/[^\u0000-\u00FF]/g);
			var num_arr = el.value.trim().match(/[\u0000-\u00FF]/g);
			if(chinese_arr){
				sum_length = chinese_arr.length * 2;
			}
			if(num_arr){
				sum_length += num_arr.length;
			}
			if(sum_length >= 4 && sum_length <= 16){
				green(el);
				if_true[0].text = true;
			}else{
				red(el);
				if_true[0].text = false;
			}
			break;
			case 1:
			if(/[^\u0000-\u00FF]|[\s+]/g.test(el.value) || (el.value.length < 10 || el.value.length > 16)){
				red(el);
				if_true[1].text = false;
			}else{
				green(el);
				last_password = el.value;
				if_true[1].text = true;
			}
			break;
			case 2:
			if(el.value === last_password){
				green(el);
				if_true[2].text = true;
			}else{
				red(el);
				if_true[2].text = false;
			}
			break;
			case 3:
			if(/^[a-zA-Z0-9_\.\-]+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(el.value)){
				green(el);
				if_true[3].text = true;
			}else{
				red(el);
				if_true[3].text = false;
			}
			break;
			case 4:
			if(/^1[\d]{10}$/.test(el.value)){
				green(el);
				if_true[4].text = true;
			}else{
				red(el);
				if_true[4].text = false;
			}
			break;
		}
	}
	texts.forEach(function(el,i) {
		el.onfocus = function() {
			if(window.getComputedStyle(this).borderColor.toString() === "rgb(128, 128, 128)"){
				this.style.borderColor = "#306FB0";
				this.style.boxShadow = "0 0 2px #306FB0";
			}
		};
		el.onblur = function() {
			test_text(i,el);
		};
	});
	btn.onclick = function() {
		var result = if_true.every(function(el) {
			return el.text === true;
		});
		if(result){
			alert('注册成功');
		}else{
			alert('注册失败，请检查信息');
		}
	};
};