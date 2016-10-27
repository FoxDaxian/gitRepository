window.onload = function() {
	var last_select = document.querySelector('#bj');
	var last_form = document.querySelector('.in_form');
	document.querySelector('#city').onchange = function() {
		if(last_select){
			last_select.style.display = "none";
		}
		document.querySelector('#' + this.value).style.display = "inline";
		last_select = document.querySelector('#' + this.value);
	};
	document.querySelectorAll('[type="radio"]').forEach(function(el,i) {
		el.onclick = function() {
			if(last_form){
				last_form.style.display = "none";
			}
			document.querySelector('.' + this.getAttribute("fsy")).style.display = "block";
			last_form = document.querySelector('.' + this.getAttribute("fsy"));
		};
	});
};