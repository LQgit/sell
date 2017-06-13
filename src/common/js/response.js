;(function (doc, win) {
	var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
	  var clientWidth = docEl.clientWidth;
	  if (!clientWidth) return;
	  if (clientWidth > 540) {
	  	docEl.style.fontSize =144+'px';
		}else if(clientWidth <320){
			docEl.style.fontSize =86+'px';
		}else{
			docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
	  	}
	  };

if (!doc.addEventListener) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DoMContentLoaded', recalc, false);
})(document, window);



