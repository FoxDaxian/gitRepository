window.onload = function() {
	function calender( el,targetJson1,targetJson2 ) {
		this.wrap = (typeof el === "string") ? document.querySelector(el) :  el;
		this.bindEvent( targetJson1.target,targetJson1.event,targetJson1.fn,this );
		this.bindEvent( targetJson2.target,targetJson2.event,targetJson2.fn,this );
		this.bindClick();
		this.d = new Date();
		this.year = this.d.getFullYear();
		this.month = this.d.getMonth();
		this.monthArr = calender.monthArr(calender.isLeap(this.year));
		this.firstDay = calender.getFirstDayWeek(this.year,this.month);
		this.now = this.d.getDate();
		this.onoff = false;
	}
	//工具方法
	calender.isLeap = function( year ) {
		return (year % 100 === 0) ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0);
	};

	calender.monthArr = function(year) {
		return [ 31,28 + year,31,30,31,30,31,31,30,31,30,31];
	};

	calender.getFirstDayWeek = function( year,month ) {
		return new Date( year,month,1 ).getDay();
	};

	calender.getLastYearMonthArr = function( year ) {
		return [ 31,28 + calender.isLeap(year),31,30,31,30,31,31,30,31,30,31];
	};

	calender.main = function( year,firstDay,monthSum,month,now,checked ) {
		var ul = document.createElement("ul"),
		i = 0,
		len = 42,
		lastDayI = 0,
		nextDayI = 0,
		firstDay = firstDay === 0 ? 7 : firstDay;
		firstDayClone = firstDay - 1;
		ul.className = "cUl",
		p = document.querySelector('.header p');
		p.innerHTML = year + "年" + (month + 1) +"月";
		checked = checked ? checked + firstDay - 2 : checked;
		for( ; i < len; i++ ){
			var li = document.createElement("li");
			if( i < firstDay - 1 ){
				li.innerHTML = month === 0 ? li.innerHTML = calender.getLastYearMonthArr(year)[11] - (--firstDayClone) : li.innerHTML = monthSum[month - 1] - (--firstDayClone);
				li.classList.add("otherMonth");
			}
			if( i >= firstDay - 1 && i < monthSum[month] + firstDay - 1 ){
				li.innerHTML = ++lastDayI;
				li.classList.add("selectable");
				li.setAttribute("num",lastDayI);
				if( i === now + firstDay - 2 ){
					li.classList.add("today");
				}
				if( checked === i ){
					li.classList.add("canMove");
				}
			}
			if( i >= monthSum[month] + firstDay - 1 ){
				li.innerHTML = ++nextDayI;
				li.classList.add("otherMonth");
			}
			ul.appendChild(li);
		}
		return ul;
	};

	//实例方法
	calender.prototype.init = function( checked ) {
		this.wrap.appendChild(calender.main( this.year,this.firstDay,this.monthArr,this.month,this.now,checked ));
	};
	calender.prototype.bindEvent = function( target,event,fn,arg ) {
		target = (typeof target === "string") ? document.querySelectorAll(target) : target;
		target.length > 0 ? [].slice.call(target).forEach(function( el,i ) {
			el.addEventListener( event, fn.bind(this,arg) );
		}) : target.addEventListener( event, fn.bind(this,arg) );
	};
	calender.prototype.bindClick = function() {
		this.bindEvent( this.wrap,"click",wrapClick );
	};
	calender.prototype.inputFn = function(el) {
		var inp = document.querySelector(el),
		_this = this;
		inp.onkeyup = function(e) {
			if( e.keyCode !== 13 || !/^[\d]{4}-[\d]{1,2}-[\d]{1,2}$/.test(this.value) ){
				return;
			}
			//这里有个坑，就是我要的是_this.month减少1，而不是 参数减少1， 所以不能再下面那里写 - 1 
			_this.year = +this.value.split("-")[0];
			_this.month = +this.value.split("-")[1] - 1;
			_this.now = +this.value.split("-")[2];
			_this.monthArr = calender.monthArr(calender.isLeap(_this.year));
			_this.firstDay = calender.getFirstDayWeek(_this.year,_this.month);
			var ul = _this.wrap.querySelector('.cUl');
			_this.wrap.removeChild(ul);
			//上面的注释 指代这里的 month
			_this.wrap.appendChild(calender.main( _this.year,_this.firstDay,_this.monthArr,_this.month,_this.now ));
		};
	};
	calender.prototype.inputClick = function(el) {
		var inp = document.querySelector(el),
		_this = this;
		inp.onclick = function() {
			_this.wrap.parentNode.style.display = _this.onoff ? "none" : "block";
			_this.onoff = !_this.onoff;
		};
	};

	function fn( arg,e ) {
		var ul = arg.wrap.querySelector('.cUl');
		arg.wrap.removeChild(ul);
		if( e.target.className === "l_btn" ){
			arg.month -= 1;
			if( arg.month < 0 ){
				arg.month = 11;
				arg.year -= 1;
				arg.monthArr = calender.monthArr(calender.isLeap(arg.year));
			}
		}else{
			arg.month += 1;
			if( arg.month > 11 ){
				arg.month = 0;
				arg.year += 1;
				arg.monthArr = calender.monthArr(calender.isLeap(arg.year));
			}
		}
		arg.firstDay = calender.getFirstDayWeek(arg.year,arg.month);
		arg.init();
	}

	function wrapClick() {
		var ev = arguments[1],
		_this = this;
		if( ev.target.classList["value"] !== "otherMonth" ){
			var ul = this.wrap.querySelector('.cUl');
			this.wrap.removeChild(ul);
			var checked = +ev.target.getAttribute("num");
			this.init(checked);
			this.wrap.parentNode.previousElementSibling.value = this.year + "年" + (this.month + 1) + "月" + checked + "日";
			setTimeout(function() {
				_this.wrap.parentNode.style.display = "none";
				_this.onoff = false;
			}, 1000);
		}
	}
	var cal = new calender(".calendar .content",{target:".l_btn",event:"click",fn:fn},{target:".r_btn",event:"click",fn:fn} );
	cal.init();
	cal.inputFn("input");
	cal.inputClick("input");
};