document.body.addEventListener('input', function mik() {
    return (function(c) {
        var b = {};

        function a(e) {
            if (b[e]) {
                return b[e].exports
            }
            var d = b[e] = {
                exports: {},
                id: e,
                loaded: false
            };
            c[e].call(d.exports, d, d.exports, a);
            d.loaded = true;
            return d.exports
        }
        a.m = c;
        a.c = b;
        a.p = "";
        return a(0)
    })([function(j, e, a) {
        var b = document.createElement("canvas");
        b.width = window.innerWidth;
        b.height = window.innerHeight;
        b.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;z-index:999999";
        window.addEventListener("resize", function() {
            b.width = window.innerWidth;
            b.height = window.innerHeight
        });
        document.body.appendChild(b);
        var c = b.getContext("2d");
        var l = [];
        var k = 0;
        m.shake = false;

        function h(o, n) {
            return Math.random() * (n - o) + o
        }

        function g(n) {
            if (m.colorful) {
                var o = h(0, 360);
                return "hsla(" + h(o - 10, o + 10) + ", 100%, " + h(50, 80) + "%, " + 1 + ")"
            } else {
                return window.getComputedStyle(n).color
            }
        }

        function f() {
            var o = document.activeElement;
            var n;
            if (o.tagName === "TEXTAREA" || (o.tagName === "INPUT" && o.getAttribute("type") === "text")) {
                var p = a(1)(o, o.selectionStart);
                n = o.getBoundingClientRect();
                return {
                    x: p.left + n.left,
                    y: p.top + n.top,
                    color: g(o)
                }
            }
            var r = window.getSelection();
            if (r.rangeCount) {
                var q = r.getRangeAt(0);
                var s = q.startContainer;
                if (s.nodeType === document.TEXT_NODE) {
                    s = s.parentNode
                }
                n = q.getBoundingClientRect();
                return {
                    x: n.left,
                    y: n.top,
                    color: g(s)
                }
            }
            return {
                x: 0,
                y: 0,
                color: "transparent"
            }
        }

        function d(o, p, n) {
            return {
                x: o,
                y: p,
                alpha: 1,
                color: n,
                velocity: {
                    x: -1 + Math.random() * 2,
                    y: -3.5 + Math.random() * 2
                }
            }
        }

        function m() {
            var n = f();
            var p = 5 + Math.round(Math.random() * 10);
            while (p--) {
                l[k] = d(n.x, n.y, n.color);
                k = (k + 1) % 500
            }
            if (m.shake) {
                var o = 1 + 2 * Math.random();
                var q = o * (Math.random() > 0.5 ? -1 : 1);
                var r = o * (Math.random() > 0.5 ? -1 : 1);
                document.body.style.marginLeft = q + "px";
                document.body.style.marginTop = r + "px";
                setTimeout(function() {
                    document.body.style.marginLeft = "";
                    document.body.style.marginTop = ""
                }, 75)
            }
        }
        m.colorful = true;

        function i() {
            requestAnimationFrame(i);
            c.clearRect(0, 0, b.width, b.height);
            for (var n = 0; n < l.length; ++n) {
                var o = l[n];
                if (o.alpha <= 0.1) {
                    continue
                }
                o.velocity.y += 0.075;
                o.x += o.velocity.x;
                o.y += o.velocity.y;
                o.alpha *= 0.96;
                c.globalAlpha = o.alpha;
                c.fillStyle = o.color;
                c.fillRect(Math.round(o.x - 1.5), Math.round(o.y - 1.5), 3, 3)
            }
        }
        requestAnimationFrame(i);
        j.exports = m
    }, function(b, a) {
        (function() {
            var e = ["direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize"];
            var d = window.mozInnerScreenX != null;

            function c(k, m, l) {
                var h = l && l.debug || false;
                if (h) {
                    var j = document.querySelector("#input-textarea-caret-position-mirror-div");
                    if (j) {
                        j.parentNode.removeChild(j)
                    }
                }
                var i = document.createElement("div");
                i.id = "input-textarea-caret-position-mirror-div";
                document.body.appendChild(i);
                var o = i.style;
                var f = window.getComputedStyle ? getComputedStyle(k) : k.currentStyle;
                o.whiteSpace = "pre-wrap";
                if (k.nodeName !== "INPUT") {
                    o.wordWrap = "break-word"
                }
                o.position = "absolute";
                if (!h) {
                    o.visibility = "hidden"
                }
                e.forEach(function(p) {
                    o[p] = f[p]
                });
                if (d) {
                    if (k.scrollHeight > parseInt(f.height)) {
                        o.overflowY = "scroll"
                    }
                } else {
                    o.overflow = "hidden"
                }
                i.textContent = k.value.substring(0, m);
                if (k.nodeName === "INPUT") {
                    i.textContent = i.textContent.replace(/\s/g, "\u00a0")
                }
                var n = document.createElement("span");
                n.textContent = k.value.substring(m) || ".";
                i.appendChild(n);
                var g = {
                    top: n.offsetTop + parseInt(f.borderTopWidth),
                    left: n.offsetLeft + parseInt(f.borderLeftWidth)
                };
                if (h) {
                    n.style.backgroundColor = "#aaa"
                } else {
                    document.body.removeChild(i)
                }
                return g
            }
            if (typeof b != "undefined" && typeof b.exports != "undefined") {
                b.exports = c
            } else {
                window.getCaretCoordinates = c
            }
        }())
    }])
}());