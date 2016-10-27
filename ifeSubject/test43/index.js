window.onload = function() {
	(function() {
		var fn = function( target,imgJson,w,h ) {
			var json;
			if( target.length === 0 ){
				return false;
			}
			if( typeof imgJson === "object" ){
				json = imgJson;
			}else if( typeof imgJson === "number" ){
				json = arguments[4];
			}else{
				return false;
			}
			var multi = (target.length !== 0 && target.length > 1) ? true : false;
			var arr = [].slice.call( target );
			arr.forEach(function(el,i) {
				[].slice.call(el.children).forEach(function(elem,i) {
					elem.style.backgroundImage = json["img" + (i + 1)];
				});
				el.style.width = w + "px";
				el.style.height = h + "px";
			});
			if( multi ){
				arr.forEach( function( el,i ) {
					el.classList.add("multi" +( i + 1));
					if( i === 4 ){
						el.children[3].style.height = el.children[3].offsetWidth + "px";
						el.children[4].style.height = el.offsetHeight - el.children[3].offsetWidth + "px";
					}
				} );
			}else{
				typeof imgJson === "number" ? target[0].classList.add( "multi" + imgJson ) : target[0].classList.add( "multi1" );
				if( imgJson === 5 ){
					target[0].children[3].style.height = target[0].children[3].offsetWidth + "px";
					target[0].children[4].style.height = target[0].offsetHeight - target[0].children[4].offsetWidth + "px";
				}
			}
		};
		this.$ = fn;
	})();
	$(document.querySelectorAll('.wrap'),5,400,500,{img1:"../images/ln100%.gif",img2:"../images/mi.jpg",img3:"../images/ln100%.gif",img4:"../images/mi.jpg",img5:"../images/mi.jpg"});
};