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
	var background_layer = document.createElement("div");
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
				n[i].src = drop_name + ".png"
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
					mode = 1;
					break;
				case 1:
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

	var m = window[drop_name];

	background_layer.style.height = viewHeight;
	background_layer.style.width = viewWidth;
	body.appendChild(background_layer);

	m.init();

	m.addControlLayer();
})();