var McvOptions = {
    showCaptionWhenPlay: true,
    showCaptionWhenPause: false
};

/* Menucool Video Plugin v2014.9.16. Copyright www.menucool.com */
var mcVc = function(d, c) {
        if (McvOptions.showCaptionWhenPlay || c === 2 && !McvOptions.showCaptionWhenPause) return;
        for (var b = document.getElementById(d).getElementsByTagName("div"), a = 0; a < b.length; a++)
            if (b[a].className == "mc-caption-bg" || b[a].className == "mc-caption-bg2") b[a].style.visibility = c ? "visible" : "hidden"
    },
    McVideo = function() {
        var a = [],
            b = function(b, e) {
                if (!b.vPlayer)
                    for (var c = 0; c < a.length; c++) {
                        var d = new a[c](b, e);
                        if (typeof d.play !== "undefined") {
                            b.vPlayer = d;
                            break
                        }
                    }
            };
        return {
            plugin: function(b) {
                a.push(b)
            },
            register: function(c, a) {
                b(c, a)
            },
            play: function(a, e, d, c) {
                if (a.vPlayer) {
                    var b = a.vPlayer.play(a, e, d, c);
                    if (b == 1) return 1
                }
                return 0
            },
            stop: function(b) {
                if (b.nodeName == "A") {
                    var a = b.getElementsByTagName("iframe");
                    if (a.length) {
                        a = a[0];
                        a.src = "";
                        setTimeout(function() {
                            var b = a.parentNode.parentNode.removeChild(a.parentNode);
                            b = null
                        }, 10)
                    }
                } else b.vPlayer && b.vPlayer.stop(b)
            }
        }
    }(),
    VimeoPlayer = function(b, a) {
        if (b.nodeName != "A" || b.getAttribute("href").toLowerCase().indexOf("vimeo.com") == -1) return null;
        var c = function() {
                var b;
                if (window.addEventListener) window.addEventListener("message", d, false);
                else window.attachEvent("onmessage", d, false);

                function d(b) {
                    try {
                        var a = JSON.parse(b.data);
                        switch (a.event) {
                            case "ready":
                                g();
                                break;
                            case "finish":
                                e();
                                break;
                            case "pause":
                                f()
                        }
                    } catch (b) {}
                }

                function c(e, a) {
                    var c = {
                        method: e
                    };
                    if (a !== undefined) c.value = a;
                    if (window.JSON) {
                        var d = b.contentWindow || b.contentDocument;
                        d.postMessage(window.JSON.stringify(c), b.getAttribute("src").split("?")[0])
                    }
                }

                function g() {
                    mcVc(a.Id, 0);
                    c("addEventListener", "finish");
                    c("addEventListener", "pause")
                }

                function e() {
                    mcVc(a.Id, 1);
                    var d = b.parentNode.parentNode.getAttribute("data-autonext");
                    if (d == "replay") c("play");
                    else d != "false" && a.To(1, 1)
                }

                function f() {
                    mcVc(a.Id, 2)
                }
                return {
                    a: function(a) {
                        b = a
                    }
                }
            },
            d = new c;

        function e(f, k, j, e) {
            var g = "&loop=0&autoplay=1&wmode=opaque&color=bbbbbb&" + (new Date).getTime(),
                c = f.getAttribute("href"),
                h = c.toLowerCase().indexOf("vimeo.com"),
                b = '<iframe id="mcVideo' + e + '" src="https://player.vimeo.com/video/' + c.substring(h + 10) + "?api=1&player_id=mcVideo" + e + g + '" webkitAllowFullScreen mozallowfullscreen allowFullScreen';
            b += ' frameborder="0" width="' + k + '" height="' + j + '"></iframe>';
            var a = document.createElement("div");
            a.innerHTML = b;
            var i = a.childNodes[0];
            d.a(i);
            f.appendChild(a);
            return 1
        }
        return {
            play: function(b, d, c, a) {
                return e(b, d, c, a)
            }
        }
    };
McVideo.plugin(VimeoPlayer);
var YoutubePlayer = function(b, a) {
    if (b.nodeName != "A" || b.getAttribute("href").toLowerCase().indexOf("youtube.com") == -1) return null;
    var c = function() {
            var e = document.createElement("script");
            e.src = location.protocol + "//www.youtube.com/player_api";
            var c = document.getElementsByTagName("script")[0];
            c.parentNode.insertBefore(e, c);
            var h, i, d = 0,
                b = function(a) {
                    if (typeof YT !== "undefined" && typeof YT.Player !== "undefined") h = new YT.Player(a, {
                        events: {
                            onReady: g,
                            onStateChange: f
                        }
                    });
                    else if (d < 30) {
                        setTimeout(function() {
                            b(a)
                        }, 50);
                        d++
                    }
                };

            function f(b) {
                if (b.data == 0) {
                    var d = document.getElementById("mcVideo" + a.Id),
                        c = d.parentNode.parentNode.getAttribute("data-autonext");
                    if (c == "replay") b.target.d();
                    else c != "false" && a.To(1, 1);
                    mcVc(a.Id, 1)
                }
                if (b.data == 1) mcVc(a.Id, 0);
                else b.data == 2 && mcVc(a.Id, 2)
            }

            function g() {}
            return {
                a: function(a) {
                    b(a)
                }
            }
        },
        d = new c;

    function e(e, j, i, c) {
    	//alert(e.getAttribute("href"))
        var f = "&loop=0&start=0&wmode=opaque&autohide=1&showinfo=0&iv_load_policy=3&modestbranding=1&showsearch=0",
            b = e.getAttribute("href"),
            h = b.toLowerCase().indexOf("v="),
            g = '<iframe id="mcVideo' + c + '" src=' + e.getAttribute("href") + "?enablejsapi=1&autoplay=1" + f + '" frameborder="0" width="' + j + '" height="' + i + '" allowfullscreen></iframe>',
            a = document.createElement("div");
        a.innerHTML = g;
        var k = a.childNodes[0];
        e.appendChild(a);
        d.a("mcVideo" + c);
        return 1
    }
    return {
        play: function(b, d, c, a) {
            return e(b, d, c, a)
        }
    }
};
McVideo.plugin(YoutubePlayer);
var McVAHelper = {
        b: function(c) {
            var a = c.parentNode.getElementsByTagName("div"),
                b = a.length;
            while (b--)
                if (a[b].className == "sliderInner") {
                    a[b].innerHTML = "";
                    break
                }
        },
        c: function() {
            var c = 50,
                b = navigator.userAgent,
                a;
            if ((a = b.indexOf("MSIE ")) != -1) c = parseInt(b.substring(a + 5, b.indexOf(".", a)));
            return c < 9
        },
        a: function(a, c, b) {
            if (a.addEventListener) a.addEventListener(c, b, false);
            else a.attachEvent && a.attachEvent("on" + c, b)
        },
        d: function(c, h, g, a, e) {
            if (a.style.display == "none") {
                if (this.c()) return 0;
                var b = a.getElementsByTagName("source"),
                    d = b.length,
                    f = 1;
                while (d--)
                    if (!b[d].getAttribute("src")) {
                        f = 0;
                        b[d].setAttribute("src", b[d].getAttribute("data-src"))
                    }
                a.style.display = "block";
                if (e == "image") a.style.background = c.parentNode.style.background;
                else c.parentNode.style.background = e;
                if (!(a.getAttribute("width") && a.offsetWidth < c.parentNode.offsetWidth)) {
                    a.style.width = h + "px";
                    a.style.height = g + "px"
                }
                this.b(c);
                !f && a.load();
                a.play()
            }
            return 1
        },
        e: function(d, c) {
            var b = function(a) {
                    if (a && a.stopPropagation) a.stopPropagation();
                    else wdl.event.cancelBubble = true
                },
                a = d.getElementsByTagName(c);
            if (a.length) {
                a = a[0];
                a.onclick = b;
                return a
            } else return null
        },
        f: function(a) {
            var b = a.parentNode.parentNode;
            if (a.getAttribute("width") && a.offsetWidth < b.offsetWidth) {
                a.style.top = parseInt((b.offsetHeight - a.offsetHeight) / 2) + "px";
                a.style.left = parseInt((b.offsetWidth - a.offsetWidth) / 2) + "px"
            }
        }
    },
    Html5VideoPlayer = function(b, d) {
        if (b.nodeName != "DIV" || !b.getElementsByTagName("video").length) return null;
        var a = McVAHelper.e(b, "video");
        if (a == null) return null;
        var c = a.getAttribute("data-autonext");
        if (c == "replay") McVAHelper.a(a, "ended", function() {
            a.play()
        });
        else if (c == "false") McVAHelper.a(a, "ended", function() {});
        else McVAHelper.a(a, "ended", function() {
            a.currentTime = 0;
            d.To(1, 1);
            a.style.display = "none"
        });
        McVAHelper.a(a, "loadedmetadata", function() {
            McVAHelper.f(a)
        });
        return {
            play: function(b, d, c) {
                return McVAHelper.d(b, d, c, a, "black")
            },
            stop: function(b) {
                a.currentTime = 0;
                a.pause();
                a.style.display = b.style.diaplay = "none"
            }
        }
    };
McVideo.plugin(Html5VideoPlayer);
var Html5AudioPlayer = function(b, d) {
    if (b.nodeName != "DIV" || !b.getElementsByTagName("audio").length) return null;
    var a = McVAHelper.e(b, "audio");
    if (a == null) return null;
    var c = a.getAttribute("data-autonext");
    if (c == "replay") McVAHelper.a(a, "ended", function() {
        a.play()
    });
    else if (c == "false") McVAHelper.a(a, "ended", function() {});
    else McVAHelper.a(a, "ended", function() {
        d.To(1, 1);
        a.style.display = "none"
    });
    return {
        play: function(b, d, c) {
            return McVAHelper.d(b, d, c, a, "image")
        },
        stop: function(b) {
            a.currentTime = 0;
            a.pause();
            a.style.display = b.style.diaplay = "none"
        }
    }
};
McVideo.plugin(Html5AudioPlayer)