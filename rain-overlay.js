var background_layer = document.createElement("div");
var leavesEnabled = false;

(function() {
	var t = (function() {
		var z = navigator.appVersion.toLowerCase();
		z = (z.indexOf("msie") > -1) ? parseInt(z.replace(/.*msie[ ]/, "").match(/^[0-9]+/)) : 0;
		return {
			ltIE6: z <= 6 && z != 0,
			ltIE7: z <= 7 && z != 0,
			ltIE8: z <= 8 && z != 0,
			ltIE9: z <= 9 && z != 0,
			ie: z != 0,
			firefox: window.globalStorage,
			opera: window.opera,
			webkit: !document.uniqueID && !window.opera && !window.globalStorage && window.localStorage,
			mobile: /android|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
		}
	})();
	var drop_amount = 50;
	var u = 2;
	var s = 15;
	var q = 3;
	var w = 1;
	var v = 0;
	var body = document.body;
	var drop_name = "raindrop";
	var e = new Date().getTime();
	var d = 10;
	var f = 15;
	var l = 50;
	var z_index_base = 1000;
	var a = false;
	var scene_elements = new Array();
	var n = new Array();
	var x = 0;
	var start_coordinates = {
		x: 0,
		y: 0
	};
	var viewHeight = 478;
	var viewWidth = 720;
	var mode = 0;
	window[drop_name] = {
		init: function() {
			for (i = 0; i < drop_amount; i++) {

				var raindrop_wrapper = document.createElement("div");
				raindrop_wrapper.style.position = "fixed";
				raindrop_wrapper.style.overflow = "hidden";
				// raindrop_wrapper.style.visibility = "hidden";
				raindrop_wrapper.style.top = 0;
				raindrop_wrapper.style.left = 0;
				raindrop_wrapper.style.zIndex = z_index_base + i;
				raindrop_wrapper.style.width = 3;
				raindrop_wrapper.style.height = 36;

				var raindrop_image = document.createElement("img");
				raindrop_image.style.border = "0";

				raindrop_wrapper.appendChild(raindrop_image);
				background_layer.appendChild(raindrop_wrapper);
				scene_elements[i] = {
					obj: raindrop_wrapper,
					img: raindrop_image,
					action: 0,
					from: start_coordinates,
					to: start_coordinates,
					begin: 0,
					duration: 0
				}
			}
			for (i = 0; i < u; i++) {
				n[i] = new Image();
				n[i].src = "images/" + drop_name + ".png"
			}
			m.action();
			x = setInterval(m.action, d)
		},
		action: function() {
			if (!a) {
				for (C = 0; C < u; C++) {
					if (n[C].height == 0) {
						return
					}
				}
				a = true
			}
			var A = {
				height: viewHeight,
				width: viewWidth,
				top: 0,
				bottom: viewHeight
			};
			for (var C = 0; C < drop_amount; C++) {
				switch (scene_elements[C].action) {
					case 0:
						if (m.getRandomNum(l) == 0) {
							var B = n[m.getRandomNum(u)];
							scene_elements[C].img.src = B.src;
							var z = m.getRandomNum(A.width - B.width);
							scene_elements[C].from = {
								x: z,
								y: 0
							};
							scene_elements[C].to = {
								x: z,
								y: A.height
							};
							scene_elements[C].begin = new Date() - 0;
							scene_elements[C].duration = A.height * f / s;
							if (q > 0) {
								scene_elements[C].duration *= (1 + (0.1 * (m.getRandomNum(2) == 0 ? 1 : -1) * m.getRandomNum(q)))
							}
							scene_elements[C].action = 1;
							m.move(scene_elements[C].obj, scene_elements[C].from);
							m.setVisible(scene_elements[C].obj)
						}
						break;
					case 1:
						var D = new Date() - scene_elements[C].begin;
						if (D < scene_elements[C].duration) {
							m.move(scene_elements[C].obj, m.easingPos(D, scene_elements[C].from, scene_elements[C].to, scene_elements[C].duration))
						} else {
							m.setHidden(scene_elements[C].obj);
							scene_elements[C].action = 0
						}
						break
				}
			}
		},
		getRandomNum: function(z) {
			return Math.floor(Math.random() * z)
		},
		getViewHeight: function() {
			return viewHeight
		},
		getViewWidth: function() {
			return viewWidth
		},
		getViewTop: function() {
			if (window.scrollY) {
				return window.scrollY
			}
			if (window.pageYOffset) {
				return window.pageYOffset
			}
			if (document.documentElement && document.documentElement.scrollTop) {
				return document.documentElement.scrollTop
			} else {
				if (document.body && document.body.scrollTop) {
					return document.body.scrollTop
				}
			}
			return 0
		},
		getViewBottom: function() {
			return m.getViewTop() + viewHeight
		},
		getViewLeft: function() {
			if (window.scrollX) {
				return window.scrollX
			}
			if (window.pageXOffset) {
				return window.pageXOffset
			}
			if (document.documentElement && document.documentElement.scrollLeft) {
				return document.documentElement.scrollLeft
			} else {
				if (document.body && document.body.scrollLeft) {
					return document.body.scrollLeft
				}
			}
			return 0
		},
		getViewRight: function() {
			return m.getViewLeft() + m.getViewWidth()
		},
		easing: function(A, C, B, z) {
			return (B - C) * A / z + C
		},
		easingPos: function(A, C, B, z) {
			return {
				x: m.easing(A, C.x, B.x, z),
				y: m.easing(A, C.y, B.y, z)
			}
		},
		move: function(z, A) {
			z.style.top = A.y + "px";
			z.style.left = A.x + "px"
		},
		setHidden: function(z) {
			z.style.visibility = "hidden"
		},
		setVisible: function(z) {
			z.style.visibility = "visible"
		},
		clearView: function() {
			background_layer.innerHTML = "";
		},
		switchMode: function() {
			switch(mode) {
				case 0:
					m.clearView();
					leavesEnabled = true;
					september_21();
					mode = 1;
					break;
				case 1:
					leavesEnabled = false;
					m.clearView();
					m.init();
					mode = 0;
					break;
			}
		},
		addControlLayer: function() {
			var control_wrapper = document.createElement("div");
			control_wrapper.style.position = "relative";
			control_wrapper.style.top = viewHeight;
			control_wrapper.style.left = 0;
			control_wrapper.style.zIndex = z_index_base + drop_amount + 1;

			var switchModeButton = document.createElement("button");
			switchModeButton.onclick = m.switchMode;

			var switchModeText = document.createTextNode("Switch mode");
			control_wrapper.className = "button_layer";

			switchModeButton.appendChild(switchModeText);
			control_wrapper.appendChild(switchModeButton);
			body.appendChild(control_wrapper);
		}
	};

// <![CDATA[
var speed=40; // lower number for faster
var leaves=20; // number of leaves falling at a time
var untidy=4; // how often do you want the leaves tidied up (high number is less often)

/****************************\
*Falling Autumn Leaves Effect*
*  (c)2013 mf2fm web-design  *
*  http://www.mf2fm.com/rv   *
* DO NOT EDIT BELOW THIS BOX *
\****************************/

var boddie;
var dx=new Array();
var xp=new Array();
var yp=new Array();
var am=new Array();
var dy=new Array();
var le=new Array();
var swide=viewWidth;
var shigh=viewHeight;
var sleft=0;
var starty=0;
var offset=0;
var tidying=0;
var deeex=0;
var has_focus=true;
var ie_version=(navigator.appVersion.indexOf("MSIE")!=-1)?parseFloat(navigator.appVersion.split("MSIE")[1]):false;
var plow=document.createElement("img");
plow.src='images/plow.png';
var leafy=new Array();
var leaf_image=new Array();
leaf_image[0]='images/leaf0.png';
leaf_image[1]='images/leaf1.png';
leaf_image[2]='images/leaf2.png';

// function addLoadEvent(funky) {
//   var oldonload=window.onload;
//   if (typeof(oldonload)!='function') window.onload=funky;
//   else window.onload=function() {
//     if (oldonload) oldonload();
//     funky();
//   }
// }

// addLoadEvent(september_21);

function september_21() { if (document.getElementById) {
  var i;
  if (ie_version) {
    document.onfocusin=function(){has_focus=true;};
    document.onfocusout=function(){has_focus=false;};
  } 
  else {
    window.onfocus=function(){has_focus=true;};
    window.onblur=function(){has_focus=false;};
  }
  window.onscroll=set_scroll;
  window.onresize=set_width;
  // document.onmousemove=mouse;
  boddie=background_layer;
  // boddie.style.position="fixed";
  // boddie.style.bottom="0px";
  // boddie.style.left="0px";
  // boddie.style.width="100%";
  // boddie.style.overflow="visible";
  // boddie.style.backgroundColor="transparent";
  // boddie.style.pointerEvents="none";
  // boddie.style.zIndex="0";
  // document.body.insertBefore(boddie, document.body.firstChild); 
  set_width();
  plow.style.position="absolute";
  plow.style.overflow="hidden";
  plow.style.zIndex=9999;
  plow.style.bottom="0px";
  plow.style.left="-144px";
  background_layer.appendChild(plow);
  for (i=0; i<leaves; i++) start_leaf(Math.random()*shigh*3/4);
  offset=0;
  setInterval(autumn_leaves, speed);
}}

function start_leaf(whyp) {
  starty++;
  offset++;
  var f, size;
  size=start_fall(starty, whyp);
  f=document.createElement("img");
  f.src=leaf_image[starty%leaf_image.length];
  f.width=size;
  f.style.height="auto";
  f.style.position="absolute";
  f.style.zIndex=1000+starty;
  f.style.top=yp[starty]+"px";
  f.style.left=xp[starty]+"px";
  leafy[starty]=f;
  background_layer.appendChild(f);
}
  
function start_fall(i, whyp) {
  var size=24-Math.floor(12*Math.random());
  dx[i]=Math.random();
  am[i]=3+Math.random()*8;
  dy[i]=1+Math.random()*2;
  xp[i]=Math.random()*(swide-size);
  yp[i]=whyp-size;
  le[i]='falling';
  return size;
}

function set_width() {
 //  var sw, sh;
 //  if (typeof(window.innerWidth)=='number' && window.innerWidth) {
 //    sw=window.innerWidth;
 //    sh=window.innerHeight;
 //  }
 //  else if (document.compatMode=="CSS1Compat" && document.documentElement && document.documentElement.clientWidth) {
 //    sw=document.documentElement.clientWidth;
 //    sh=document.documentElement.clientHeight; 
 //  }
 //  else {
 //    sw=document.body.clientWidth;
	// sh=document.body.clientHeight;
 //  }
 //  if (sw && sh && has_focus) {
 //    swide=sw;
 //    shigh=sh;
 //  }
  // boddie.style.height=shigh+"px";
}

function autumn_leaves() {
	if (!leavesEnabled) {
		return;
	}

  var i;
  var c=0;
  for (i=0; i<starty; i++) {
    if (leafy[i] && le[i]!='tidying') {
		if (yp[i]>shigh || xp[i]>swide || xp[i]<-leafy[i].width) {
		  if (offset>0) offset--;
		  boddie.removeChild(leafy[i]);
		  leafy[i]=false;
		}
		else if (yp[i]+untidy*offset/leaves<shigh-leafy[i].height/2) {
		  yp[i]+=dy[i];
		  dx[i]+=0.025+Math.random()/10;
		  xp[i]+=deeex;
		  leafy[i].style.top=(yp[i]-am[i]/2*Math.abs(Math.sin(dx[i])))+"px";
		  leafy[i].style.left=(xp[i]+am[i]*Math.sin(dx[i]))+"px";
		}
		else if (le[i]=='falling') le[i]='landed';
	}
	if (leafy[i] && le[i]=='falling') c++;
  }
  if (c<leaves) start_leaf(0);
  if (offset>untidy*leaves && !tidying && Math.random()<.05) tidy_leaves();
}

function tidy_leaves() {
  var i;
  tidying=true;
  for (i=swide; i>=-146; i-=2) setTimeout('plough('+i+')', speed*(swide-i));
  setTimeout('tidying=false; offset=0;', speed*(swide-i));
}

function plough(x) {
  var i, p;
  plow.style.left=x+"px";
  for (i=0; i<starty; i++) {
    if (leafy[i] && le[i]!='falling') {
	  p=xp[i]+leafy[i].width+am[i]*Math.sin(dx[i])-dy[i];
	  if (p<0) {
	    boddie.removeChild(leafy[i]);
		leafy[i]=false;
	  }
	  else if (p>x && p<x+3) {
	    le[i]='tidying';
	    xp[i]-=2;
	    leafy[i].style.left=(xp[i]+am[i]*Math.sin(dx[i]))+"px";
	    if (Math.random()<.1) {
		  yp[i]-=1;
		  leafy[i].style.top=(yp[i]-am[i]/2*Math.abs(Math.sin(dx[i])))+"px";
	    }
	  }
	  else if (p>x+144 && yp[i]<shigh-leafy[i].height/2) {
  	    yp[i]+=dy[i];
		dx[i]+=0.02+Math.random()/10;
		leafy[i].style.top=(yp[i]-am[i]/2*Math.abs(Math.sin(dx[i])))+"px";
		leafy[i].style.left=(xp[i]+am[i]*Math.sin(dx[i]))+"px";
	  }
	}
  }
}

function set_scroll() {
  if (typeof(self.pageXOffset)=='number' && self.pageXoffset) sleft=self.pageXOffset;
  else if (document.body && document.body.scrollLeft) sleft=document.body.scrollLeft;
  else if (document.documentElement && document.documentElement.scrollLeft) sleft=document.documentElement.scrollLeft;
  else sleft=0;
}

function mouse(e) {
  var x;
  if (e) x=e.pageX;
  else {
	x=event.x;
    set_scroll();
    x+=sleft;
  }
  deeex=has_focus?Math.floor(-1.5+4*(x-sleft)/swide):0;
}

	var m = window[drop_name];

	background_layer.style.height = viewHeight;
	background_layer.style.width = viewWidth;
	body.appendChild(background_layer);

	m.init();

	m.addControlLayer();
})();