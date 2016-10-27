window.onload = function() {
	var sort_table = {
		bindEvent:function( target,event,fn,arg ) {
			target.forEach(function( el,i ) {
				el.addEventListener( event, fn.bind(null,arg) );
			});
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
		acFn:function( target,nodeArr ) {
			nodeArr.forEach(function( el,i ) {
				target.appendChild(el);
			});
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
		}
	};
	var data1 = sort_table.randomScore( ["小明","小红","小亮"] );
	var cloneData1 = [].concat([].slice.call(data1));
	sort_table.acFn( document.querySelector('tbody'),[].slice.call(data1) );
	sort_table.bindEvent( document.querySelectorAll('.upArrow'),"click",sort_table.sortUp,cloneData1 );
	sort_table.bindEvent( document.querySelectorAll('.downArrow'),"click",sort_table.sortDown,cloneData1 );
};