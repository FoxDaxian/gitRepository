window.onload = function() {
	(function() {
		var sort_table = {
			bindEvent:function( target,event,fn,arg ) {
				target.length > 0 ? target.forEach(function( el,i ) {
					el.addEventListener( event, fn.bind(null,arg) );
				}) : target.addEventListener( event, fn.bind(null,arg) );
			},
			randomScore:function( nameArr ) {
				if({}.toString.call( nameArr ) !== "[object Array]"){
					return false;
				}
				var count = nameArr.length,
				i = 0,
				tbody = document.createElement( "tbody" );
				for( ; i < count; i++ ){
					var tr = document.createElement( "tr" ),
					j = 0,
					sumScore = 0,
					score;
					for( ; j < 5; j++ ){
						var td = document.createElement("td");
						if( j === 0 ){
							td.innerHTML = nameArr[i];
							tr.appendChild( td );
						}else if( j === 4 ){
							td.innerHTML = sumScore;
							tr.appendChild( td );
						}else{
							score = Math.ceil( Math.random() * 100 );
							sumScore += score;
							td.innerHTML = score;
							tr.appendChild( td );
						}
					}
					tbody.appendChild( tr );
				}
				return tbody.children;
			},
			acFn:function( target,nodeArr,freeze ) {
				freeze = freeze || false;
				nodeArr.forEach(function( el,i ) {
					target.appendChild(el);
				});
				freeze ? this.bindEvent( window,"scroll",sort_table.freezeTh,document.querySelector('table') ) : null;
			},
			sortUp:function( nodeArr,e ) {
				var ev = e || window.enent;
				var list = ev.target.parentNode.parentNode.children,
				len = list.length,
				i = 0,
				index;
				for( ; i < len; i++ ){
					if( list[i] == ev.target.parentNode){
						index = i;
					}
				}
				sort_table.acFn( document.querySelector('tbody'),nodeArr.sort(function(a,b) {
					return parseInt(a.children[index].innerHTML) - parseInt(b.children[index].innerHTML);
				}) );
			},
			sortDown:function( nodeArr,e ) {
				var ev = e || window.enent;
				var list = ev.target.parentNode.parentNode.children,
				len = list.length,
				i = 0,
				index;
				for( ; i < len; i++ ){
					if( list[i] == ev.target.parentNode){
						index = i;
					}
				}
				sort_table.acFn( document.querySelector('tbody'),nodeArr.sort(function(a,b) {
					return parseInt(b.children[index].innerHTML) - parseInt(a.children[index].innerHTML);
				}) );
			},
			freezeTh:function(target) {
				var targetOst = target.offsetTop;
				var windowPyo = window.pageYOffset;
				(windowPyo >= targetOst && windowPyo <= targetOst + target.clientHeight) ? 
				!target.firstElementChild.firstElementChild.classList.contains('freeze') ? 
				target.firstElementChild.firstElementChild.classList.add('freeze') : null  :
				target.firstElementChild.firstElementChild.classList.contains('freeze') ?
				target.firstElementChild.firstElementChild.classList.remove('freeze') : null
			}
		};
		var data1 = sort_table.randomScore( ["小明","小红","小亮","张三","李四","陈珂","律","卡巴内瑞","safe","react","ng"] );
		var cloneData1 = [].concat([].slice.call(data1));
		sort_table.acFn( document.querySelector('tbody'),[].slice.call(data1),true );
		sort_table.bindEvent( document.querySelectorAll('.upArrow'),"click",sort_table.sortUp,cloneData1 );
		sort_table.bindEvent( document.querySelectorAll('.downArrow'),"click",sort_table.sortDown,cloneData1 );
	})();
};