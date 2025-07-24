(() => {
    var fo = Object.create;
    var jt = Object.defineProperty;
    var Qo = Object.getOwnPropertyDescriptor;
    var bo = Object.getOwnPropertyNames;
    var go = Object.getPrototypeOf,
        Bo = Object.prototype.hasOwnProperty;
    var Fo = (o, t, e) => t in o ? jt(o, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : o[t] = e;
    var Et = (o => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(o, {
        get: (t, e) => (typeof require < "u" ? require : t)[e]
    }) : o)(function(o) {
        if (typeof require < "u") return require.apply(this, arguments);
        throw Error('Dynamic require of "' + o + '" is not supported')
    });
    var qn = (o, t) => () => (t || o((t = {
            exports: {}
        }).exports, t), t.exports),
        J = (o, t) => {
            for (var e in t) jt(o, e, {
                get: t[e],
                enumerable: !0
            })
        },
        Uo = (o, t, e, n) => {
            if (t && typeof t == "object" || typeof t == "function")
                for (let i of bo(t)) !Bo.call(o, i) && i !== e && jt(o, i, {
                    get: () => t[i],
                    enumerable: !(n = Qo(t, i)) || n.enumerable
                });
            return o
        };
    var Pt = (o, t, e) => (e = o != null ? fo(go(o)) : {}, Uo(t || !o || !o.__esModule ? jt(e, "default", {
        value: o,
        enumerable: !0
    }) : e, o));
    var V = (o, t, e) => (Fo(o, typeof t != "symbol" ? t + "" : t, e), e);
    var Ze = qn(Ve => {
        (function() {
            "use strict";
            var o = function() {
                this.init()
            };
            o.prototype = {
                init: function() {
                    var s = this || t;
                    return s._counter = 1e3, s._html5AudioPool = [], s.html5PoolSize = 10, s._codecs = {}, s._howls = [], s._muted = !1, s._volume = 1, s._canPlayEvent = "canplaythrough", s._navigator = typeof window < "u" && window.navigator ? window.navigator : null, s.masterGain = null, s.noAudio = !1, s.usingWebAudio = !0, s.autoSuspend = !0, s.ctx = null, s.autoUnlock = !0, s._setup(), s
                },
                volume: function(s) {
                    var r = this || t;
                    if (s = parseFloat(s), r.ctx || m(), typeof s < "u" && s >= 0 && s <= 1) {
                        if (r._volume = s, r._muted) return r;
                        r.usingWebAudio && r.masterGain.gain.setValueAtTime(s, t.ctx.currentTime);
                        for (var d = 0; d < r._howls.length; d++)
                            if (!r._howls[d]._webAudio)
                                for (var u = r._howls[d]._getSoundIds(), p = 0; p < u.length; p++) {
                                    var f = r._howls[d]._soundById(u[p]);
                                    f && f._node && (f._node.volume = f._volume * s)
                                }
                        return r
                    }
                    return r._volume
                },
                mute: function(s) {
                    var r = this || t;
                    r.ctx || m(), r._muted = s, r.usingWebAudio && r.masterGain.gain.setValueAtTime(s ? 0 : r._volume, t.ctx.currentTime);
                    for (var d = 0; d < r._howls.length; d++)
                        if (!r._howls[d]._webAudio)
                            for (var u = r._howls[d]._getSoundIds(), p = 0; p < u.length; p++) {
                                var f = r._howls[d]._soundById(u[p]);
                                f && f._node && (f._node.muted = s ? !0 : f._muted)
                            }
                    return r
                },
                stop: function() {
                    for (var s = this || t, r = 0; r < s._howls.length; r++) s._howls[r].stop();
                    return s
                },
                unload: function() {
                    for (var s = this || t, r = s._howls.length - 1; r >= 0; r--) s._howls[r].unload();
                    return s.usingWebAudio && s.ctx && typeof s.ctx.close < "u" && (s.ctx.close(), s.ctx = null, m()), s
                },
                codecs: function(s) {
                    return (this || t)._codecs[s.replace(/^x-/, "")]
                },
                _setup: function() {
                    var s = this || t;
                    if (s.state = s.ctx && s.ctx.state || "suspended", s._autoSuspend(), !s.usingWebAudio)
                        if (typeof Audio < "u") try {
                            var r = new Audio;
                            typeof r.oncanplaythrough > "u" && (s._canPlayEvent = "canplay")
                        } catch {
                            s.noAudio = !0
                        } else s.noAudio = !0;
                    try {
                        var r = new Audio;
                        r.muted && (s.noAudio = !0)
                    } catch {}
                    return s.noAudio || s._setupCodecs(), s
                },
                _setupCodecs: function() {
                    var s = this || t,
                        r = null;
                    try {
                        r = typeof Audio < "u" ? new Audio : null
                    } catch {
                        return s
                    }
                    if (!r || typeof r.canPlayType != "function") return s;
                    var d = r.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                        u = s._navigator ? s._navigator.userAgent : "",
                        p = u.match(/OPR\/(\d+)/g),
                        f = p && parseInt(p[0].split("/")[1], 10) < 33,
                        Q = u.indexOf("Safari") !== -1 && u.indexOf("Chrome") === -1,
                        b = u.match(/Version\/(.*?) /),
                        g = Q && b && parseInt(b[1], 10) < 15;
                    return s._codecs = {
                        mp3: !!(!f && (d || r.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                        mpeg: !!d,
                        opus: !!r.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                        ogg: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        oga: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        wav: !!(r.canPlayType('audio/wav; codecs="1"') || r.canPlayType("audio/wav")).replace(/^no$/, ""),
                        aac: !!r.canPlayType("audio/aac;").replace(/^no$/, ""),
                        caf: !!r.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                        m4a: !!(r.canPlayType("audio/x-m4a;") || r.canPlayType("audio/m4a;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        m4b: !!(r.canPlayType("audio/x-m4b;") || r.canPlayType("audio/m4b;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        mp4: !!(r.canPlayType("audio/x-mp4;") || r.canPlayType("audio/mp4;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        weba: !!(!g && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                        webm: !!(!g && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                        dolby: !!r.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                        flac: !!(r.canPlayType("audio/x-flac;") || r.canPlayType("audio/flac;")).replace(/^no$/, "")
                    }, s
                },
                _unlockAudio: function() {
                    var s = this || t;
                    if (!(s._audioUnlocked || !s.ctx)) {
                        s._audioUnlocked = !1, s.autoUnlock = !1, !s._mobileUnloaded && s.ctx.sampleRate !== 44100 && (s._mobileUnloaded = !0, s.unload()), s._scratchBuffer = s.ctx.createBuffer(1, 1, 22050);
                        var r = function(d) {
                            for (; s._html5AudioPool.length < s.html5PoolSize;) try {
                                var u = new Audio;
                                u._unlocked = !0, s._releaseHtml5Audio(u)
                            } catch {
                                s.noAudio = !0;
                                break
                            }
                            for (var p = 0; p < s._howls.length; p++)
                                if (!s._howls[p]._webAudio)
                                    for (var f = s._howls[p]._getSoundIds(), Q = 0; Q < f.length; Q++) {
                                        var b = s._howls[p]._soundById(f[Q]);
                                        b && b._node && !b._node._unlocked && (b._node._unlocked = !0, b._node.load())
                                    }
                            s._autoResume();
                            var g = s.ctx.createBufferSource();
                            g.buffer = s._scratchBuffer, g.connect(s.ctx.destination), typeof g.start > "u" ? g.noteOn(0) : g.start(0), typeof s.ctx.resume == "function" && s.ctx.resume(), g.onended = function() {
                                g.disconnect(0), s._audioUnlocked = !0, document.removeEventListener("touchstart", r, !0), document.removeEventListener("touchend", r, !0), document.removeEventListener("click", r, !0), document.removeEventListener("keydown", r, !0);
                                for (var F = 0; F < s._howls.length; F++) s._howls[F]._emit("unlock")
                            }
                        };
                        return document.addEventListener("touchstart", r, !0), document.addEventListener("touchend", r, !0), document.addEventListener("click", r, !0), document.addEventListener("keydown", r, !0), s
                    }
                },
                _obtainHtml5Audio: function() {
                    var s = this || t;
                    if (s._html5AudioPool.length) return s._html5AudioPool.pop();
                    var r = new Audio().play();
                    return r && typeof Promise < "u" && (r instanceof Promise || typeof r.then == "function") && r.catch(function() {
                        console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
                    }), new Audio
                },
                _releaseHtml5Audio: function(s) {
                    var r = this || t;
                    return s._unlocked && r._html5AudioPool.push(s), r
                },
                _autoSuspend: function() {
                    var s = this;
                    if (!(!s.autoSuspend || !s.ctx || typeof s.ctx.suspend > "u" || !t.usingWebAudio)) {
                        for (var r = 0; r < s._howls.length; r++)
                            if (s._howls[r]._webAudio) {
                                for (var d = 0; d < s._howls[r]._sounds.length; d++)
                                    if (!s._howls[r]._sounds[d]._paused) return s
                            } return s._suspendTimer && clearTimeout(s._suspendTimer), s._suspendTimer = setTimeout(function() {
                            if (s.autoSuspend) {
                                s._suspendTimer = null, s.state = "suspending";
                                var u = function() {
                                    s.state = "suspended", s._resumeAfterSuspend && (delete s._resumeAfterSuspend, s._autoResume())
                                };
                                s.ctx.suspend().then(u, u)
                            }
                        }, 3e4), s
                    }
                },
                _autoResume: function() {
                    var s = this;
                    if (!(!s.ctx || typeof s.ctx.resume > "u" || !t.usingWebAudio)) return s.state === "running" && s.ctx.state !== "interrupted" && s._suspendTimer ? (clearTimeout(s._suspendTimer), s._suspendTimer = null) : s.state === "suspended" || s.state === "running" && s.ctx.state === "interrupted" ? (s.ctx.resume().then(function() {
                        s.state = "running";
                        for (var r = 0; r < s._howls.length; r++) s._howls[r]._emit("resume")
                    }), s._suspendTimer && (clearTimeout(s._suspendTimer), s._suspendTimer = null)) : s.state === "suspending" && (s._resumeAfterSuspend = !0), s
                }
            };
            var t = new o,
                e = function(s) {
                    var r = this;
                    if (!s.src || s.src.length === 0) {
                        console.error("An array of source files must be passed with any new Howl.");
                        return
                    }
                    r.init(s)
                };
            e.prototype = {
                init: function(s) {
                    var r = this;
                    return t.ctx || m(), r._autoplay = s.autoplay || !1, r._format = typeof s.format != "string" ? s.format : [s.format], r._html5 = s.html5 || !1, r._muted = s.mute || !1, r._loop = s.loop || !1, r._pool = s.pool || 5, r._preload = typeof s.preload == "boolean" || s.preload === "metadata" ? s.preload : !0, r._rate = s.rate || 1, r._sprite = s.sprite || {}, r._src = typeof s.src != "string" ? s.src : [s.src], r._volume = s.volume !== void 0 ? s.volume : 1, r._xhr = {
                        method: s.xhr && s.xhr.method ? s.xhr.method : "GET",
                        headers: s.xhr && s.xhr.headers ? s.xhr.headers : null,
                        withCredentials: s.xhr && s.xhr.withCredentials ? s.xhr.withCredentials : !1
                    }, r._duration = 0, r._state = "unloaded", r._sounds = [], r._endTimers = {}, r._queue = [], r._playLock = !1, r._onend = s.onend ? [{
                        fn: s.onend
                    }] : [], r._onfade = s.onfade ? [{
                        fn: s.onfade
                    }] : [], r._onload = s.onload ? [{
                        fn: s.onload
                    }] : [], r._onloaderror = s.onloaderror ? [{
                        fn: s.onloaderror
                    }] : [], r._onplayerror = s.onplayerror ? [{
                        fn: s.onplayerror
                    }] : [], r._onpause = s.onpause ? [{
                        fn: s.onpause
                    }] : [], r._onplay = s.onplay ? [{
                        fn: s.onplay
                    }] : [], r._onstop = s.onstop ? [{
                        fn: s.onstop
                    }] : [], r._onmute = s.onmute ? [{
                        fn: s.onmute
                    }] : [], r._onvolume = s.onvolume ? [{
                        fn: s.onvolume
                    }] : [], r._onrate = s.onrate ? [{
                        fn: s.onrate
                    }] : [], r._onseek = s.onseek ? [{
                        fn: s.onseek
                    }] : [], r._onunlock = s.onunlock ? [{
                        fn: s.onunlock
                    }] : [], r._onresume = [], r._webAudio = t.usingWebAudio && !r._html5, typeof t.ctx < "u" && t.ctx && t.autoUnlock && t._unlockAudio(), t._howls.push(r), r._autoplay && r._queue.push({
                        event: "play",
                        action: function() {
                            r.play()
                        }
                    }), r._preload && r._preload !== "none" && r.load(), r
                },
                load: function() {
                    var s = this,
                        r = null;
                    if (t.noAudio) {
                        s._emit("loaderror", null, "No audio support.");
                        return
                    }
                    typeof s._src == "string" && (s._src = [s._src]);
                    for (var d = 0; d < s._src.length; d++) {
                        var u, p;
                        if (s._format && s._format[d]) u = s._format[d];
                        else {
                            if (p = s._src[d], typeof p != "string") {
                                s._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                                continue
                            }
                            u = /^data:audio\/([^;,]+);/i.exec(p), u || (u = /\.([^.]+)$/.exec(p.split("?", 1)[0])), u && (u = u[1].toLowerCase())
                        }
                        if (u || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), u && t.codecs(u)) {
                            r = s._src[d];
                            break
                        }
                    }
                    if (!r) {
                        s._emit("loaderror", null, "No codec support for selected audio sources.");
                        return
                    }
                    return s._src = r, s._state = "loading", window.location.protocol === "https:" && r.slice(0, 5) === "http:" && (s._html5 = !0, s._webAudio = !1), new n(s), s._webAudio && a(s), s
                },
                play: function(s, r) {
                    var d = this,
                        u = null;
                    if (typeof s == "number") u = s, s = null;
                    else {
                        if (typeof s == "string" && d._state === "loaded" && !d._sprite[s]) return null;
                        if (typeof s > "u" && (s = "__default", !d._playLock)) {
                            for (var p = 0, f = 0; f < d._sounds.length; f++) d._sounds[f]._paused && !d._sounds[f]._ended && (p++, u = d._sounds[f]._id);
                            p === 1 ? s = null : u = null
                        }
                    }
                    var Q = u ? d._soundById(u) : d._inactiveSound();
                    if (!Q) return null;
                    if (u && !s && (s = Q._sprite || "__default"), d._state !== "loaded") {
                        Q._sprite = s, Q._ended = !1;
                        var b = Q._id;
                        return d._queue.push({
                            event: "play",
                            action: function() {
                                d.play(b)
                            }
                        }), b
                    }
                    if (u && !Q._paused) return r || d._loadQueue("play"), Q._id;
                    d._webAudio && t._autoResume();
                    var g = Math.max(0, Q._seek > 0 ? Q._seek : d._sprite[s][0] / 1e3),
                        F = Math.max(0, (d._sprite[s][0] + d._sprite[s][1]) / 1e3 - g),
                        x = F * 1e3 / Math.abs(Q._rate),
                        E = d._sprite[s][0] / 1e3,
                        W = (d._sprite[s][0] + d._sprite[s][1]) / 1e3;
                    Q._sprite = s, Q._ended = !1;
                    var y = function() {
                        Q._paused = !1, Q._seek = g, Q._start = E, Q._stop = W, Q._loop = !!(Q._loop || d._sprite[s][2])
                    };
                    if (g >= W) {
                        d._ended(Q);
                        return
                    }
                    var w = Q._node;
                    if (d._webAudio) {
                        var S = function() {
                            d._playLock = !1, y(), d._refreshBuffer(Q);
                            var L = Q._muted || d._muted ? 0 : Q._volume;
                            w.gain.setValueAtTime(L, t.ctx.currentTime), Q._playStart = t.ctx.currentTime, typeof w.bufferSource.start > "u" ? Q._loop ? w.bufferSource.noteGrainOn(0, g, 86400) : w.bufferSource.noteGrainOn(0, g, F) : Q._loop ? w.bufferSource.start(0, g, 86400) : w.bufferSource.start(0, g, F), x !== 1 / 0 && (d._endTimers[Q._id] = setTimeout(d._ended.bind(d, Q), x)), r || setTimeout(function() {
                                d._emit("play", Q._id), d._loadQueue()
                            }, 0)
                        };
                        t.state === "running" && t.ctx.state !== "interrupted" ? S() : (d._playLock = !0, d.once("resume", S), d._clearTimer(Q._id))
                    } else {
                        var U = function() {
                            w.currentTime = g, w.muted = Q._muted || d._muted || t._muted || w.muted, w.volume = Q._volume * t.volume(), w.playbackRate = Q._rate;
                            try {
                                var L = w.play();
                                if (L && typeof Promise < "u" && (L instanceof Promise || typeof L.then == "function") ? (d._playLock = !0, y(), L.then(function() {
                                        d._playLock = !1, w._unlocked = !0, r ? d._loadQueue() : d._emit("play", Q._id)
                                    }).catch(function() {
                                        d._playLock = !1, d._emit("playerror", Q._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), Q._ended = !0, Q._paused = !0
                                    })) : r || (d._playLock = !1, y(), d._emit("play", Q._id)), w.playbackRate = Q._rate, w.paused) {
                                    d._emit("playerror", Q._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                    return
                                }
                                s !== "__default" || Q._loop ? d._endTimers[Q._id] = setTimeout(d._ended.bind(d, Q), x) : (d._endTimers[Q._id] = function() {
                                    d._ended(Q), w.removeEventListener("ended", d._endTimers[Q._id], !1)
                                }, w.addEventListener("ended", d._endTimers[Q._id], !1))
                            } catch (Y) {
                                d._emit("playerror", Q._id, Y)
                            }
                        };
                        w.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (w.src = d._src, w.load());
                        var k = window && window.ejecta || !w.readyState && t._navigator.isCocoonJS;
                        if (w.readyState >= 3 || k) U();
                        else {
                            d._playLock = !0, d._state = "loading";
                            var T = function() {
                                d._state = "loaded", U(), w.removeEventListener(t._canPlayEvent, T, !1)
                            };
                            w.addEventListener(t._canPlayEvent, T, !1), d._clearTimer(Q._id)
                        }
                    }
                    return Q._id
                },
                pause: function(s) {
                    var r = this;
                    if (r._state !== "loaded" || r._playLock) return r._queue.push({
                        event: "pause",
                        action: function() {
                            r.pause(s)
                        }
                    }), r;
                    for (var d = r._getSoundIds(s), u = 0; u < d.length; u++) {
                        r._clearTimer(d[u]);
                        var p = r._soundById(d[u]);
                        if (p && !p._paused && (p._seek = r.seek(d[u]), p._rateSeek = 0, p._paused = !0, r._stopFade(d[u]), p._node))
                            if (r._webAudio) {
                                if (!p._node.bufferSource) continue;
                                typeof p._node.bufferSource.stop > "u" ? p._node.bufferSource.noteOff(0) : p._node.bufferSource.stop(0), r._cleanBuffer(p._node)
                            } else(!isNaN(p._node.duration) || p._node.duration === 1 / 0) && p._node.pause();
                        arguments[1] || r._emit("pause", p ? p._id : null)
                    }
                    return r
                },
                stop: function(s, r) {
                    var d = this;
                    if (d._state !== "loaded" || d._playLock) return d._queue.push({
                        event: "stop",
                        action: function() {
                            d.stop(s)
                        }
                    }), d;
                    for (var u = d._getSoundIds(s), p = 0; p < u.length; p++) {
                        d._clearTimer(u[p]);
                        var f = d._soundById(u[p]);
                        f && (f._seek = f._start || 0, f._rateSeek = 0, f._paused = !0, f._ended = !0, d._stopFade(u[p]), f._node && (d._webAudio ? f._node.bufferSource && (typeof f._node.bufferSource.stop > "u" ? f._node.bufferSource.noteOff(0) : f._node.bufferSource.stop(0), d._cleanBuffer(f._node)) : (!isNaN(f._node.duration) || f._node.duration === 1 / 0) && (f._node.currentTime = f._start || 0, f._node.pause(), f._node.duration === 1 / 0 && d._clearSound(f._node))), r || d._emit("stop", f._id))
                    }
                    return d
                },
                mute: function(s, r) {
                    var d = this;
                    if (d._state !== "loaded" || d._playLock) return d._queue.push({
                        event: "mute",
                        action: function() {
                            d.mute(s, r)
                        }
                    }), d;
                    if (typeof r > "u")
                        if (typeof s == "boolean") d._muted = s;
                        else return d._muted;
                    for (var u = d._getSoundIds(r), p = 0; p < u.length; p++) {
                        var f = d._soundById(u[p]);
                        f && (f._muted = s, f._interval && d._stopFade(f._id), d._webAudio && f._node ? f._node.gain.setValueAtTime(s ? 0 : f._volume, t.ctx.currentTime) : f._node && (f._node.muted = t._muted ? !0 : s), d._emit("mute", f._id))
                    }
                    return d
                },
                volume: function() {
                    var s = this,
                        r = arguments,
                        d, u;
                    if (r.length === 0) return s._volume;
                    if (r.length === 1 || r.length === 2 && typeof r[1] > "u") {
                        var p = s._getSoundIds(),
                            f = p.indexOf(r[0]);
                        f >= 0 ? u = parseInt(r[0], 10) : d = parseFloat(r[0])
                    } else r.length >= 2 && (d = parseFloat(r[0]), u = parseInt(r[1], 10));
                    var Q;
                    if (typeof d < "u" && d >= 0 && d <= 1) {
                        if (s._state !== "loaded" || s._playLock) return s._queue.push({
                            event: "volume",
                            action: function() {
                                s.volume.apply(s, r)
                            }
                        }), s;
                        typeof u > "u" && (s._volume = d), u = s._getSoundIds(u);
                        for (var b = 0; b < u.length; b++) Q = s._soundById(u[b]), Q && (Q._volume = d, r[2] || s._stopFade(u[b]), s._webAudio && Q._node && !Q._muted ? Q._node.gain.setValueAtTime(d, t.ctx.currentTime) : Q._node && !Q._muted && (Q._node.volume = d * t.volume()), s._emit("volume", Q._id))
                    } else return Q = u ? s._soundById(u) : s._sounds[0], Q ? Q._volume : 0;
                    return s
                },
                fade: function(s, r, d, u) {
                    var p = this;
                    if (p._state !== "loaded" || p._playLock) return p._queue.push({
                        event: "fade",
                        action: function() {
                            p.fade(s, r, d, u)
                        }
                    }), p;
                    s = Math.min(Math.max(0, parseFloat(s)), 1), r = Math.min(Math.max(0, parseFloat(r)), 1), d = parseFloat(d), p.volume(s, u);
                    for (var f = p._getSoundIds(u), Q = 0; Q < f.length; Q++) {
                        var b = p._soundById(f[Q]);
                        if (b) {
                            if (u || p._stopFade(f[Q]), p._webAudio && !b._muted) {
                                var g = t.ctx.currentTime,
                                    F = g + d / 1e3;
                                b._volume = s, b._node.gain.setValueAtTime(s, g), b._node.gain.linearRampToValueAtTime(r, F)
                            }
                            p._startFadeInterval(b, s, r, d, f[Q], typeof u > "u")
                        }
                    }
                    return p
                },
                _startFadeInterval: function(s, r, d, u, p, f) {
                    var Q = this,
                        b = r,
                        g = d - r,
                        F = Math.abs(g / .01),
                        x = Math.max(4, F > 0 ? u / F : u),
                        E = Date.now();
                    s._fadeTo = d, s._interval = setInterval(function() {
                        var W = (Date.now() - E) / u;
                        E = Date.now(), b += g * W, b = Math.round(b * 100) / 100, g < 0 ? b = Math.max(d, b) : b = Math.min(d, b), Q._webAudio ? s._volume = b : Q.volume(b, s._id, !0), f && (Q._volume = b), (d < r && b <= d || d > r && b >= d) && (clearInterval(s._interval), s._interval = null, s._fadeTo = null, Q.volume(d, s._id), Q._emit("fade", s._id))
                    }, x)
                },
                _stopFade: function(s) {
                    var r = this,
                        d = r._soundById(s);
                    return d && d._interval && (r._webAudio && d._node.gain.cancelScheduledValues(t.ctx.currentTime), clearInterval(d._interval), d._interval = null, r.volume(d._fadeTo, s), d._fadeTo = null, r._emit("fade", s)), r
                },
                loop: function() {
                    var s = this,
                        r = arguments,
                        d, u, p;
                    if (r.length === 0) return s._loop;
                    if (r.length === 1)
                        if (typeof r[0] == "boolean") d = r[0], s._loop = d;
                        else return p = s._soundById(parseInt(r[0], 10)), p ? p._loop : !1;
                    else r.length === 2 && (d = r[0], u = parseInt(r[1], 10));
                    for (var f = s._getSoundIds(u), Q = 0; Q < f.length; Q++) p = s._soundById(f[Q]), p && (p._loop = d, s._webAudio && p._node && p._node.bufferSource && (p._node.bufferSource.loop = d, d && (p._node.bufferSource.loopStart = p._start || 0, p._node.bufferSource.loopEnd = p._stop, s.playing(f[Q]) && (s.pause(f[Q], !0), s.play(f[Q], !0)))));
                    return s
                },
                rate: function() {
                    var s = this,
                        r = arguments,
                        d, u;
                    if (r.length === 0) u = s._sounds[0]._id;
                    else if (r.length === 1) {
                        var p = s._getSoundIds(),
                            f = p.indexOf(r[0]);
                        f >= 0 ? u = parseInt(r[0], 10) : d = parseFloat(r[0])
                    } else r.length === 2 && (d = parseFloat(r[0]), u = parseInt(r[1], 10));
                    var Q;
                    if (typeof d == "number") {
                        if (s._state !== "loaded" || s._playLock) return s._queue.push({
                            event: "rate",
                            action: function() {
                                s.rate.apply(s, r)
                            }
                        }), s;
                        typeof u > "u" && (s._rate = d), u = s._getSoundIds(u);
                        for (var b = 0; b < u.length; b++)
                            if (Q = s._soundById(u[b]), Q) {
                                s.playing(u[b]) && (Q._rateSeek = s.seek(u[b]), Q._playStart = s._webAudio ? t.ctx.currentTime : Q._playStart), Q._rate = d, s._webAudio && Q._node && Q._node.bufferSource ? Q._node.bufferSource.playbackRate.setValueAtTime(d, t.ctx.currentTime) : Q._node && (Q._node.playbackRate = d);
                                var g = s.seek(u[b]),
                                    F = (s._sprite[Q._sprite][0] + s._sprite[Q._sprite][1]) / 1e3 - g,
                                    x = F * 1e3 / Math.abs(Q._rate);
                                (s._endTimers[u[b]] || !Q._paused) && (s._clearTimer(u[b]), s._endTimers[u[b]] = setTimeout(s._ended.bind(s, Q), x)), s._emit("rate", Q._id)
                            }
                    } else return Q = s._soundById(u), Q ? Q._rate : s._rate;
                    return s
                },
                seek: function() {
                    var s = this,
                        r = arguments,
                        d, u;
                    if (r.length === 0) s._sounds.length && (u = s._sounds[0]._id);
                    else if (r.length === 1) {
                        var p = s._getSoundIds(),
                            f = p.indexOf(r[0]);
                        f >= 0 ? u = parseInt(r[0], 10) : s._sounds.length && (u = s._sounds[0]._id, d = parseFloat(r[0]))
                    } else r.length === 2 && (d = parseFloat(r[0]), u = parseInt(r[1], 10));
                    if (typeof u > "u") return 0;
                    if (typeof d == "number" && (s._state !== "loaded" || s._playLock)) return s._queue.push({
                        event: "seek",
                        action: function() {
                            s.seek.apply(s, r)
                        }
                    }), s;
                    var Q = s._soundById(u);
                    if (Q)
                        if (typeof d == "number" && d >= 0) {
                            var b = s.playing(u);
                            b && s.pause(u, !0), Q._seek = d, Q._ended = !1, s._clearTimer(u), !s._webAudio && Q._node && !isNaN(Q._node.duration) && (Q._node.currentTime = d);
                            var g = function() {
                                b && s.play(u, !0), s._emit("seek", u)
                            };
                            if (b && !s._webAudio) {
                                var F = function() {
                                    s._playLock ? setTimeout(F, 0) : g()
                                };
                                setTimeout(F, 0)
                            } else g()
                        } else if (s._webAudio) {
                        var x = s.playing(u) ? t.ctx.currentTime - Q._playStart : 0,
                            E = Q._rateSeek ? Q._rateSeek - Q._seek : 0;
                        return Q._seek + (E + x * Math.abs(Q._rate))
                    } else return Q._node.currentTime;
                    return s
                },
                playing: function(s) {
                    var r = this;
                    if (typeof s == "number") {
                        var d = r._soundById(s);
                        return d ? !d._paused : !1
                    }
                    for (var u = 0; u < r._sounds.length; u++)
                        if (!r._sounds[u]._paused) return !0;
                    return !1
                },
                duration: function(s) {
                    var r = this,
                        d = r._duration,
                        u = r._soundById(s);
                    return u && (d = r._sprite[u._sprite][1] / 1e3), d
                },
                state: function() {
                    return this._state
                },
                unload: function() {
                    for (var s = this, r = s._sounds, d = 0; d < r.length; d++) r[d]._paused || s.stop(r[d]._id), s._webAudio || (s._clearSound(r[d]._node), r[d]._node.removeEventListener("error", r[d]._errorFn, !1), r[d]._node.removeEventListener(t._canPlayEvent, r[d]._loadFn, !1), r[d]._node.removeEventListener("ended", r[d]._endFn, !1), t._releaseHtml5Audio(r[d]._node)), delete r[d]._node, s._clearTimer(r[d]._id);
                    var u = t._howls.indexOf(s);
                    u >= 0 && t._howls.splice(u, 1);
                    var p = !0;
                    for (d = 0; d < t._howls.length; d++)
                        if (t._howls[d]._src === s._src || s._src.indexOf(t._howls[d]._src) >= 0) {
                            p = !1;
                            break
                        } return i && p && delete i[s._src], t.noAudio = !1, s._state = "unloaded", s._sounds = [], s = null, null
                },
                on: function(s, r, d, u) {
                    var p = this,
                        f = p["_on" + s];
                    return typeof r == "function" && f.push(u ? {
                        id: d,
                        fn: r,
                        once: u
                    } : {
                        id: d,
                        fn: r
                    }), p
                },
                off: function(s, r, d) {
                    var u = this,
                        p = u["_on" + s],
                        f = 0;
                    if (typeof r == "number" && (d = r, r = null), r || d)
                        for (f = 0; f < p.length; f++) {
                            var Q = d === p[f].id;
                            if (r === p[f].fn && Q || !r && Q) {
                                p.splice(f, 1);
                                break
                            }
                        } else if (s) u["_on" + s] = [];
                        else {
                            var b = Object.keys(u);
                            for (f = 0; f < b.length; f++) b[f].indexOf("_on") === 0 && Array.isArray(u[b[f]]) && (u[b[f]] = [])
                        } return u
                },
                once: function(s, r, d) {
                    var u = this;
                    return u.on(s, r, d, 1), u
                },
                _emit: function(s, r, d) {
                    for (var u = this, p = u["_on" + s], f = p.length - 1; f >= 0; f--)(!p[f].id || p[f].id === r || s === "load") && (setTimeout(function(Q) {
                        Q.call(this, r, d)
                    }.bind(u, p[f].fn), 0), p[f].once && u.off(s, p[f].fn, p[f].id));
                    return u._loadQueue(s), u
                },
                _loadQueue: function(s) {
                    var r = this;
                    if (r._queue.length > 0) {
                        var d = r._queue[0];
                        d.event === s && (r._queue.shift(), r._loadQueue()), s || d.action()
                    }
                    return r
                },
                _ended: function(s) {
                    var r = this,
                        d = s._sprite;
                    if (!r._webAudio && s._node && !s._node.paused && !s._node.ended && s._node.currentTime < s._stop) return setTimeout(r._ended.bind(r, s), 100), r;
                    var u = !!(s._loop || r._sprite[d][2]);
                    if (r._emit("end", s._id), !r._webAudio && u && r.stop(s._id, !0).play(s._id), r._webAudio && u) {
                        r._emit("play", s._id), s._seek = s._start || 0, s._rateSeek = 0, s._playStart = t.ctx.currentTime;
                        var p = (s._stop - s._start) * 1e3 / Math.abs(s._rate);
                        r._endTimers[s._id] = setTimeout(r._ended.bind(r, s), p)
                    }
                    return r._webAudio && !u && (s._paused = !0, s._ended = !0, s._seek = s._start || 0, s._rateSeek = 0, r._clearTimer(s._id), r._cleanBuffer(s._node), t._autoSuspend()), !r._webAudio && !u && r.stop(s._id, !0), r
                },
                _clearTimer: function(s) {
                    var r = this;
                    if (r._endTimers[s]) {
                        if (typeof r._endTimers[s] != "function") clearTimeout(r._endTimers[s]);
                        else {
                            var d = r._soundById(s);
                            d && d._node && d._node.removeEventListener("ended", r._endTimers[s], !1)
                        }
                        delete r._endTimers[s]
                    }
                    return r
                },
                _soundById: function(s) {
                    for (var r = this, d = 0; d < r._sounds.length; d++)
                        if (s === r._sounds[d]._id) return r._sounds[d];
                    return null
                },
                _inactiveSound: function() {
                    var s = this;
                    s._drain();
                    for (var r = 0; r < s._sounds.length; r++)
                        if (s._sounds[r]._ended) return s._sounds[r].reset();
                    return new n(s)
                },
                _drain: function() {
                    var s = this,
                        r = s._pool,
                        d = 0,
                        u = 0;
                    if (!(s._sounds.length < r)) {
                        for (u = 0; u < s._sounds.length; u++) s._sounds[u]._ended && d++;
                        for (u = s._sounds.length - 1; u >= 0; u--) {
                            if (d <= r) return;
                            s._sounds[u]._ended && (s._webAudio && s._sounds[u]._node && s._sounds[u]._node.disconnect(0), s._sounds.splice(u, 1), d--)
                        }
                    }
                },
                _getSoundIds: function(s) {
                    var r = this;
                    if (typeof s > "u") {
                        for (var d = [], u = 0; u < r._sounds.length; u++) d.push(r._sounds[u]._id);
                        return d
                    } else return [s]
                },
                _refreshBuffer: function(s) {
                    var r = this;
                    return s._node.bufferSource = t.ctx.createBufferSource(), s._node.bufferSource.buffer = i[r._src], s._panner ? s._node.bufferSource.connect(s._panner) : s._node.bufferSource.connect(s._node), s._node.bufferSource.loop = s._loop, s._loop && (s._node.bufferSource.loopStart = s._start || 0, s._node.bufferSource.loopEnd = s._stop || 0), s._node.bufferSource.playbackRate.setValueAtTime(s._rate, t.ctx.currentTime), r
                },
                _cleanBuffer: function(s) {
                    var r = this,
                        d = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0;
                    if (!s.bufferSource) return r;
                    if (t._scratchBuffer && s.bufferSource && (s.bufferSource.onended = null, s.bufferSource.disconnect(0), d)) try {
                        s.bufferSource.buffer = t._scratchBuffer
                    } catch {}
                    return s.bufferSource = null, r
                },
                _clearSound: function(s) {
                    var r = /MSIE |Trident\//.test(t._navigator && t._navigator.userAgent);
                    r || (s.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
                }
            };
            var n = function(s) {
                this._parent = s, this.init()
            };
            n.prototype = {
                init: function() {
                    var s = this,
                        r = s._parent;
                    return s._muted = r._muted, s._loop = r._loop, s._volume = r._volume, s._rate = r._rate, s._seek = 0, s._paused = !0, s._ended = !0, s._sprite = "__default", s._id = ++t._counter, r._sounds.push(s), s.create(), s
                },
                create: function() {
                    var s = this,
                        r = s._parent,
                        d = t._muted || s._muted || s._parent._muted ? 0 : s._volume;
                    return r._webAudio ? (s._node = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), s._node.gain.setValueAtTime(d, t.ctx.currentTime), s._node.paused = !0, s._node.connect(t.masterGain)) : t.noAudio || (s._node = t._obtainHtml5Audio(), s._errorFn = s._errorListener.bind(s), s._node.addEventListener("error", s._errorFn, !1), s._loadFn = s._loadListener.bind(s), s._node.addEventListener(t._canPlayEvent, s._loadFn, !1), s._endFn = s._endListener.bind(s), s._node.addEventListener("ended", s._endFn, !1), s._node.src = r._src, s._node.preload = r._preload === !0 ? "auto" : r._preload, s._node.volume = d * t.volume(), s._node.load()), s
                },
                reset: function() {
                    var s = this,
                        r = s._parent;
                    return s._muted = r._muted, s._loop = r._loop, s._volume = r._volume, s._rate = r._rate, s._seek = 0, s._rateSeek = 0, s._paused = !0, s._ended = !0, s._sprite = "__default", s._id = ++t._counter, s
                },
                _errorListener: function() {
                    var s = this;
                    s._parent._emit("loaderror", s._id, s._node.error ? s._node.error.code : 0), s._node.removeEventListener("error", s._errorFn, !1)
                },
                _loadListener: function() {
                    var s = this,
                        r = s._parent;
                    r._duration = Math.ceil(s._node.duration * 10) / 10, Object.keys(r._sprite).length === 0 && (r._sprite = {
                        __default: [0, r._duration * 1e3]
                    }), r._state !== "loaded" && (r._state = "loaded", r._emit("load"), r._loadQueue()), s._node.removeEventListener(t._canPlayEvent, s._loadFn, !1)
                },
                _endListener: function() {
                    var s = this,
                        r = s._parent;
                    r._duration === 1 / 0 && (r._duration = Math.ceil(s._node.duration * 10) / 10, r._sprite.__default[1] === 1 / 0 && (r._sprite.__default[1] = r._duration * 1e3), r._ended(s)), s._node.removeEventListener("ended", s._endFn, !1)
                }
            };
            var i = {},
                a = function(s) {
                    var r = s._src;
                    if (i[r]) {
                        s._duration = i[r].duration, h(s);
                        return
                    }
                    if (/^data:[^;]+;base64,/.test(r)) {
                        for (var d = atob(r.split(",")[1]), u = new Uint8Array(d.length), p = 0; p < d.length; ++p) u[p] = d.charCodeAt(p);
                        c(u.buffer, s)
                    } else {
                        var f = new XMLHttpRequest;
                        f.open(s._xhr.method, r, !0), f.withCredentials = s._xhr.withCredentials, f.responseType = "arraybuffer", s._xhr.headers && Object.keys(s._xhr.headers).forEach(function(Q) {
                            f.setRequestHeader(Q, s._xhr.headers[Q])
                        }), f.onload = function() {
                            var Q = (f.status + "")[0];
                            if (Q !== "0" && Q !== "2" && Q !== "3") {
                                s._emit("loaderror", null, "Failed loading audio file with status: " + f.status + ".");
                                return
                            }
                            c(f.response, s)
                        }, f.onerror = function() {
                            s._webAudio && (s._html5 = !0, s._webAudio = !1, s._sounds = [], delete i[r], s.load())
                        }, l(f)
                    }
                },
                l = function(s) {
                    try {
                        s.send()
                    } catch {
                        s.onerror()
                    }
                },
                c = function(s, r) {
                    var d = function() {
                            r._emit("loaderror", null, "Decoding audio data failed.")
                        },
                        u = function(p) {
                            p && r._sounds.length > 0 ? (i[r._src] = p, h(r, p)) : d()
                        };
                    typeof Promise < "u" && t.ctx.decodeAudioData.length === 1 ? t.ctx.decodeAudioData(s).then(u).catch(d) : t.ctx.decodeAudioData(s, u, d)
                },
                h = function(s, r) {
                    r && !s._duration && (s._duration = r.duration), Object.keys(s._sprite).length === 0 && (s._sprite = {
                        __default: [0, s._duration * 1e3]
                    }), s._state !== "loaded" && (s._state = "loaded", s._emit("load"), s._loadQueue())
                },
                m = function() {
                    if (t.usingWebAudio) {
                        try {
                            typeof AudioContext < "u" ? t.ctx = new AudioContext : typeof webkitAudioContext < "u" ? t.ctx = new webkitAudioContext : t.usingWebAudio = !1
                        } catch {
                            t.usingWebAudio = !1
                        }
                        t.ctx || (t.usingWebAudio = !1);
                        var s = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform),
                            r = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                            d = r ? parseInt(r[1], 10) : null;
                        if (s && d && d < 9) {
                            var u = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
                            t._navigator && !u && (t.usingWebAudio = !1)
                        }
                        t.usingWebAudio && (t.masterGain = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), t.masterGain.gain.setValueAtTime(t._muted ? 0 : t._volume, t.ctx.currentTime), t.masterGain.connect(t.ctx.destination)), t._setup()
                    }
                };
            typeof define == "function" && define.amd && define([], function() {
                return {
                    Howler: t,
                    Howl: e
                }
            }), typeof Ve < "u" && (Ve.Howler = t, Ve.Howl = e), typeof global < "u" ? (global.HowlerGlobal = o, global.Howler = t, global.Howl = e, global.Sound = n) : typeof window < "u" && (window.HowlerGlobal = o, window.Howler = t, window.Howl = e, window.Sound = n)
        })();
        (function() {
            "use strict";
            HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function(t) {
                var e = this;
                if (!e.ctx || !e.ctx.listener) return e;
                for (var n = e._howls.length - 1; n >= 0; n--) e._howls[n].stereo(t);
                return e
            }, HowlerGlobal.prototype.pos = function(t, e, n) {
                var i = this;
                if (!i.ctx || !i.ctx.listener) return i;
                if (e = typeof e != "number" ? i._pos[1] : e, n = typeof n != "number" ? i._pos[2] : n, typeof t == "number") i._pos = [t, e, n], typeof i.ctx.listener.positionX < "u" ? (i.ctx.listener.positionX.setTargetAtTime(i._pos[0], Howler.ctx.currentTime, .1), i.ctx.listener.positionY.setTargetAtTime(i._pos[1], Howler.ctx.currentTime, .1), i.ctx.listener.positionZ.setTargetAtTime(i._pos[2], Howler.ctx.currentTime, .1)) : i.ctx.listener.setPosition(i._pos[0], i._pos[1], i._pos[2]);
                else return i._pos;
                return i
            }, HowlerGlobal.prototype.orientation = function(t, e, n, i, a, l) {
                var c = this;
                if (!c.ctx || !c.ctx.listener) return c;
                var h = c._orientation;
                if (e = typeof e != "number" ? h[1] : e, n = typeof n != "number" ? h[2] : n, i = typeof i != "number" ? h[3] : i, a = typeof a != "number" ? h[4] : a, l = typeof l != "number" ? h[5] : l, typeof t == "number") c._orientation = [t, e, n, i, a, l], typeof c.ctx.listener.forwardX < "u" ? (c.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, .1), c.ctx.listener.forwardY.setTargetAtTime(e, Howler.ctx.currentTime, .1), c.ctx.listener.forwardZ.setTargetAtTime(n, Howler.ctx.currentTime, .1), c.ctx.listener.upX.setTargetAtTime(i, Howler.ctx.currentTime, .1), c.ctx.listener.upY.setTargetAtTime(a, Howler.ctx.currentTime, .1), c.ctx.listener.upZ.setTargetAtTime(l, Howler.ctx.currentTime, .1)) : c.ctx.listener.setOrientation(t, e, n, i, a, l);
                else return h;
                return c
            }, Howl.prototype.init = function(t) {
                return function(e) {
                    var n = this;
                    return n._orientation = e.orientation || [1, 0, 0], n._stereo = e.stereo || null, n._pos = e.pos || null, n._pannerAttr = {
                        coneInnerAngle: typeof e.coneInnerAngle < "u" ? e.coneInnerAngle : 360,
                        coneOuterAngle: typeof e.coneOuterAngle < "u" ? e.coneOuterAngle : 360,
                        coneOuterGain: typeof e.coneOuterGain < "u" ? e.coneOuterGain : 0,
                        distanceModel: typeof e.distanceModel < "u" ? e.distanceModel : "inverse",
                        maxDistance: typeof e.maxDistance < "u" ? e.maxDistance : 1e4,
                        panningModel: typeof e.panningModel < "u" ? e.panningModel : "HRTF",
                        refDistance: typeof e.refDistance < "u" ? e.refDistance : 1,
                        rolloffFactor: typeof e.rolloffFactor < "u" ? e.rolloffFactor : 1
                    }, n._onstereo = e.onstereo ? [{
                        fn: e.onstereo
                    }] : [], n._onpos = e.onpos ? [{
                        fn: e.onpos
                    }] : [], n._onorientation = e.onorientation ? [{
                        fn: e.onorientation
                    }] : [], t.call(this, e)
                }
            }(Howl.prototype.init), Howl.prototype.stereo = function(t, e) {
                var n = this;
                if (!n._webAudio) return n;
                if (n._state !== "loaded") return n._queue.push({
                    event: "stereo",
                    action: function() {
                        n.stereo(t, e)
                    }
                }), n;
                var i = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
                if (typeof e > "u")
                    if (typeof t == "number") n._stereo = t, n._pos = [t, 0, 0];
                    else return n._stereo;
                for (var a = n._getSoundIds(e), l = 0; l < a.length; l++) {
                    var c = n._soundById(a[l]);
                    if (c)
                        if (typeof t == "number") c._stereo = t, c._pos = [t, 0, 0], c._node && (c._pannerAttr.panningModel = "equalpower", (!c._panner || !c._panner.pan) && o(c, i), i === "spatial" ? typeof c._panner.positionX < "u" ? (c._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), c._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), c._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : c._panner.setPosition(t, 0, 0) : c._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)), n._emit("stereo", c._id);
                        else return c._stereo
                }
                return n
            }, Howl.prototype.pos = function(t, e, n, i) {
                var a = this;
                if (!a._webAudio) return a;
                if (a._state !== "loaded") return a._queue.push({
                    event: "pos",
                    action: function() {
                        a.pos(t, e, n, i)
                    }
                }), a;
                if (e = typeof e != "number" ? 0 : e, n = typeof n != "number" ? -.5 : n, typeof i > "u")
                    if (typeof t == "number") a._pos = [t, e, n];
                    else return a._pos;
                for (var l = a._getSoundIds(i), c = 0; c < l.length; c++) {
                    var h = a._soundById(l[c]);
                    if (h)
                        if (typeof t == "number") h._pos = [t, e, n], h._node && ((!h._panner || h._panner.pan) && o(h, "spatial"), typeof h._panner.positionX < "u" ? (h._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), h._panner.positionY.setValueAtTime(e, Howler.ctx.currentTime), h._panner.positionZ.setValueAtTime(n, Howler.ctx.currentTime)) : h._panner.setPosition(t, e, n)), a._emit("pos", h._id);
                        else return h._pos
                }
                return a
            }, Howl.prototype.orientation = function(t, e, n, i) {
                var a = this;
                if (!a._webAudio) return a;
                if (a._state !== "loaded") return a._queue.push({
                    event: "orientation",
                    action: function() {
                        a.orientation(t, e, n, i)
                    }
                }), a;
                if (e = typeof e != "number" ? a._orientation[1] : e, n = typeof n != "number" ? a._orientation[2] : n, typeof i > "u")
                    if (typeof t == "number") a._orientation = [t, e, n];
                    else return a._orientation;
                for (var l = a._getSoundIds(i), c = 0; c < l.length; c++) {
                    var h = a._soundById(l[c]);
                    if (h)
                        if (typeof t == "number") h._orientation = [t, e, n], h._node && (h._panner || (h._pos || (h._pos = a._pos || [0, 0, -.5]), o(h, "spatial")), typeof h._panner.orientationX < "u" ? (h._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), h._panner.orientationY.setValueAtTime(e, Howler.ctx.currentTime), h._panner.orientationZ.setValueAtTime(n, Howler.ctx.currentTime)) : h._panner.setOrientation(t, e, n)), a._emit("orientation", h._id);
                        else return h._orientation
                }
                return a
            }, Howl.prototype.pannerAttr = function() {
                var t = this,
                    e = arguments,
                    n, i, a;
                if (!t._webAudio) return t;
                if (e.length === 0) return t._pannerAttr;
                if (e.length === 1)
                    if (typeof e[0] == "object") n = e[0], typeof i > "u" && (n.pannerAttr || (n.pannerAttr = {
                        coneInnerAngle: n.coneInnerAngle,
                        coneOuterAngle: n.coneOuterAngle,
                        coneOuterGain: n.coneOuterGain,
                        distanceModel: n.distanceModel,
                        maxDistance: n.maxDistance,
                        refDistance: n.refDistance,
                        rolloffFactor: n.rolloffFactor,
                        panningModel: n.panningModel
                    }), t._pannerAttr = {
                        coneInnerAngle: typeof n.pannerAttr.coneInnerAngle < "u" ? n.pannerAttr.coneInnerAngle : t._coneInnerAngle,
                        coneOuterAngle: typeof n.pannerAttr.coneOuterAngle < "u" ? n.pannerAttr.coneOuterAngle : t._coneOuterAngle,
                        coneOuterGain: typeof n.pannerAttr.coneOuterGain < "u" ? n.pannerAttr.coneOuterGain : t._coneOuterGain,
                        distanceModel: typeof n.pannerAttr.distanceModel < "u" ? n.pannerAttr.distanceModel : t._distanceModel,
                        maxDistance: typeof n.pannerAttr.maxDistance < "u" ? n.pannerAttr.maxDistance : t._maxDistance,
                        refDistance: typeof n.pannerAttr.refDistance < "u" ? n.pannerAttr.refDistance : t._refDistance,
                        rolloffFactor: typeof n.pannerAttr.rolloffFactor < "u" ? n.pannerAttr.rolloffFactor : t._rolloffFactor,
                        panningModel: typeof n.pannerAttr.panningModel < "u" ? n.pannerAttr.panningModel : t._panningModel
                    });
                    else return a = t._soundById(parseInt(e[0], 10)), a ? a._pannerAttr : t._pannerAttr;
                else e.length === 2 && (n = e[0], i = parseInt(e[1], 10));
                for (var l = t._getSoundIds(i), c = 0; c < l.length; c++)
                    if (a = t._soundById(l[c]), a) {
                        var h = a._pannerAttr;
                        h = {
                            coneInnerAngle: typeof n.coneInnerAngle < "u" ? n.coneInnerAngle : h.coneInnerAngle,
                            coneOuterAngle: typeof n.coneOuterAngle < "u" ? n.coneOuterAngle : h.coneOuterAngle,
                            coneOuterGain: typeof n.coneOuterGain < "u" ? n.coneOuterGain : h.coneOuterGain,
                            distanceModel: typeof n.distanceModel < "u" ? n.distanceModel : h.distanceModel,
                            maxDistance: typeof n.maxDistance < "u" ? n.maxDistance : h.maxDistance,
                            refDistance: typeof n.refDistance < "u" ? n.refDistance : h.refDistance,
                            rolloffFactor: typeof n.rolloffFactor < "u" ? n.rolloffFactor : h.rolloffFactor,
                            panningModel: typeof n.panningModel < "u" ? n.panningModel : h.panningModel
                        };
                        var m = a._panner;
                        m || (a._pos || (a._pos = t._pos || [0, 0, -.5]), o(a, "spatial"), m = a._panner), m.coneInnerAngle = h.coneInnerAngle, m.coneOuterAngle = h.coneOuterAngle, m.coneOuterGain = h.coneOuterGain, m.distanceModel = h.distanceModel, m.maxDistance = h.maxDistance, m.refDistance = h.refDistance, m.rolloffFactor = h.rolloffFactor, m.panningModel = h.panningModel
                    } return t
            }, Sound.prototype.init = function(t) {
                return function() {
                    var e = this,
                        n = e._parent;
                    e._orientation = n._orientation, e._stereo = n._stereo, e._pos = n._pos, e._pannerAttr = n._pannerAttr, t.call(this), e._stereo ? n.stereo(e._stereo) : e._pos && n.pos(e._pos[0], e._pos[1], e._pos[2], e._id)
                }
            }(Sound.prototype.init), Sound.prototype.reset = function(t) {
                return function() {
                    var e = this,
                        n = e._parent;
                    return e._orientation = n._orientation, e._stereo = n._stereo, e._pos = n._pos, e._pannerAttr = n._pannerAttr, e._stereo ? n.stereo(e._stereo) : e._pos ? n.pos(e._pos[0], e._pos[1], e._pos[2], e._id) : e._panner && (e._panner.disconnect(0), e._panner = void 0, n._refreshBuffer(e)), t.call(this)
                }
            }(Sound.prototype.reset);
            var o = function(t, e) {
                e = e || "spatial", e === "spatial" ? (t._panner = Howler.ctx.createPanner(), t._panner.coneInnerAngle = t._pannerAttr.coneInnerAngle, t._panner.coneOuterAngle = t._pannerAttr.coneOuterAngle, t._panner.coneOuterGain = t._pannerAttr.coneOuterGain, t._panner.distanceModel = t._pannerAttr.distanceModel, t._panner.maxDistance = t._pannerAttr.maxDistance, t._panner.refDistance = t._pannerAttr.refDistance, t._panner.rolloffFactor = t._pannerAttr.rolloffFactor, t._panner.panningModel = t._pannerAttr.panningModel, typeof t._panner.positionX < "u" ? (t._panner.positionX.setValueAtTime(t._pos[0], Howler.ctx.currentTime), t._panner.positionY.setValueAtTime(t._pos[1], Howler.ctx.currentTime), t._panner.positionZ.setValueAtTime(t._pos[2], Howler.ctx.currentTime)) : t._panner.setPosition(t._pos[0], t._pos[1], t._pos[2]), typeof t._panner.orientationX < "u" ? (t._panner.orientationX.setValueAtTime(t._orientation[0], Howler.ctx.currentTime), t._panner.orientationY.setValueAtTime(t._orientation[1], Howler.ctx.currentTime), t._panner.orientationZ.setValueAtTime(t._orientation[2], Howler.ctx.currentTime)) : t._panner.setOrientation(t._orientation[0], t._orientation[1], t._orientation[2])) : (t._panner = Howler.ctx.createStereoPanner(), t._panner.pan.setValueAtTime(t._stereo, Howler.ctx.currentTime)), t._panner.connect(t._node), t._paused || t._parent.pause(t._id, !0).play(t._id, !0)
            }
        })()
    });
    var lo = qn((ro, zn) => {
        (function(o) {
            typeof ro == "object" && typeof zn < "u" ? zn.exports = o() : typeof define == "function" && define.amd ? define([], o) : (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this).basicScroll = o()
        })(function() {
            return function o(t, e, n) {
                function i(c, h) {
                    if (!e[c]) {
                        if (!t[c]) {
                            var m = typeof Et == "function" && Et;
                            if (!h && m) return m(c, !0);
                            if (a) return a(c, !0);
                            var s = new Error("Cannot find module '" + c + "'");
                            throw s.code = "MODULE_NOT_FOUND", s
                        }
                        var r = e[c] = {
                            exports: {}
                        };
                        t[c][0].call(r.exports, function(d) {
                            return i(t[c][1][d] || d)
                        }, r, r.exports, o, t, e, n)
                    }
                    return e[c].exports
                }
                for (var a = typeof Et == "function" && Et, l = 0; l < n.length; l++) i(n[l]);
                return i
            }({
                1: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = 2.5949095;
                        return (n *= 2) < 1 ? n * n * ((i + 1) * n - i) * .5 : .5 * ((n -= 2) * n * ((i + 1) * n + i) + 2)
                    }
                }, {}],
                2: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = 1.70158;
                        return n * n * ((i + 1) * n - i)
                    }
                }, {}],
                3: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = 1.70158;
                        return --n * n * ((i + 1) * n + i) + 1
                    }
                }, {}],
                4: [function(o, t, e) {
                    var n = o("./bounce-out");
                    t.exports = function(i) {
                        return i < .5 ? .5 * (1 - n(1 - 2 * i)) : .5 * n(2 * i - 1) + .5
                    }
                }, {
                    "./bounce-out": 6
                }],
                5: [function(o, t, e) {
                    var n = o("./bounce-out");
                    t.exports = function(i) {
                        return 1 - n(1 - i)
                    }
                }, {
                    "./bounce-out": 6
                }],
                6: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = n * n;
                        return n < 4 / 11 ? 7.5625 * i : n < 8 / 11 ? 9.075 * i - 9.9 * n + 3.4 : n < .9 ? 4356 / 361 * i - 35442 / 1805 * n + 16061 / 1805 : 10.8 * n * n - 20.52 * n + 10.72
                    }
                }, {}],
                7: [function(o, t, e) {
                    t.exports = function(n) {
                        return (n *= 2) < 1 ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
                    }
                }, {}],
                8: [function(o, t, e) {
                    t.exports = function(n) {
                        return 1 - Math.sqrt(1 - n * n)
                    }
                }, {}],
                9: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.sqrt(1 - --n * n)
                    }
                }, {}],
                10: [function(o, t, e) {
                    t.exports = function(n) {
                        return n < .5 ? 4 * n * n * n : .5 * Math.pow(2 * n - 2, 3) + 1
                    }
                }, {}],
                11: [function(o, t, e) {
                    t.exports = function(n) {
                        return n * n * n
                    }
                }, {}],
                12: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = n - 1;
                        return i * i * i + 1
                    }
                }, {}],
                13: [function(o, t, e) {
                    t.exports = function(n) {
                        return n < .5 ? .5 * Math.sin(13 * Math.PI / 2 * 2 * n) * Math.pow(2, 10 * (2 * n - 1)) : .5 * Math.sin(-13 * Math.PI / 2 * (2 * n - 1 + 1)) * Math.pow(2, -10 * (2 * n - 1)) + 1
                    }
                }, {}],
                14: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.sin(13 * n * Math.PI / 2) * Math.pow(2, 10 * (n - 1))
                    }
                }, {}],
                15: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.sin(-13 * (n + 1) * Math.PI / 2) * Math.pow(2, -10 * n) + 1
                    }
                }, {}],
                16: [function(o, t, e) {
                    t.exports = function(n) {
                        return n === 0 || n === 1 ? n : n < .5 ? .5 * Math.pow(2, 20 * n - 10) : -.5 * Math.pow(2, 10 - 20 * n) + 1
                    }
                }, {}],
                17: [function(o, t, e) {
                    t.exports = function(n) {
                        return n === 0 ? n : Math.pow(2, 10 * (n - 1))
                    }
                }, {}],
                18: [function(o, t, e) {
                    t.exports = function(n) {
                        return n === 1 ? n : 1 - Math.pow(2, -10 * n)
                    }
                }, {}],
                19: [function(o, t, e) {
                    t.exports = {
                        backInOut: o("./back-in-out"),
                        backIn: o("./back-in"),
                        backOut: o("./back-out"),
                        bounceInOut: o("./bounce-in-out"),
                        bounceIn: o("./bounce-in"),
                        bounceOut: o("./bounce-out"),
                        circInOut: o("./circ-in-out"),
                        circIn: o("./circ-in"),
                        circOut: o("./circ-out"),
                        cubicInOut: o("./cubic-in-out"),
                        cubicIn: o("./cubic-in"),
                        cubicOut: o("./cubic-out"),
                        elasticInOut: o("./elastic-in-out"),
                        elasticIn: o("./elastic-in"),
                        elasticOut: o("./elastic-out"),
                        expoInOut: o("./expo-in-out"),
                        expoIn: o("./expo-in"),
                        expoOut: o("./expo-out"),
                        linear: o("./linear"),
                        quadInOut: o("./quad-in-out"),
                        quadIn: o("./quad-in"),
                        quadOut: o("./quad-out"),
                        quartInOut: o("./quart-in-out"),
                        quartIn: o("./quart-in"),
                        quartOut: o("./quart-out"),
                        quintInOut: o("./quint-in-out"),
                        quintIn: o("./quint-in"),
                        quintOut: o("./quint-out"),
                        sineInOut: o("./sine-in-out"),
                        sineIn: o("./sine-in"),
                        sineOut: o("./sine-out")
                    }
                }, {
                    "./back-in": 2,
                    "./back-in-out": 1,
                    "./back-out": 3,
                    "./bounce-in": 5,
                    "./bounce-in-out": 4,
                    "./bounce-out": 6,
                    "./circ-in": 8,
                    "./circ-in-out": 7,
                    "./circ-out": 9,
                    "./cubic-in": 11,
                    "./cubic-in-out": 10,
                    "./cubic-out": 12,
                    "./elastic-in": 14,
                    "./elastic-in-out": 13,
                    "./elastic-out": 15,
                    "./expo-in": 17,
                    "./expo-in-out": 16,
                    "./expo-out": 18,
                    "./linear": 20,
                    "./quad-in": 22,
                    "./quad-in-out": 21,
                    "./quad-out": 23,
                    "./quart-in": 25,
                    "./quart-in-out": 24,
                    "./quart-out": 26,
                    "./quint-in": 28,
                    "./quint-in-out": 27,
                    "./quint-out": 29,
                    "./sine-in": 31,
                    "./sine-in-out": 30,
                    "./sine-out": 32
                }],
                20: [function(o, t, e) {
                    t.exports = function(n) {
                        return n
                    }
                }, {}],
                21: [function(o, t, e) {
                    t.exports = function(n) {
                        return (n /= .5) < 1 ? .5 * n * n : -.5 * (--n * (n - 2) - 1)
                    }
                }, {}],
                22: [function(o, t, e) {
                    t.exports = function(n) {
                        return n * n
                    }
                }, {}],
                23: [function(o, t, e) {
                    t.exports = function(n) {
                        return -n * (n - 2)
                    }
                }, {}],
                24: [function(o, t, e) {
                    t.exports = function(n) {
                        return n < .5 ? 8 * Math.pow(n, 4) : -8 * Math.pow(n - 1, 4) + 1
                    }
                }, {}],
                25: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.pow(n, 4)
                    }
                }, {}],
                26: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.pow(n - 1, 3) * (1 - n) + 1
                    }
                }, {}],
                27: [function(o, t, e) {
                    t.exports = function(n) {
                        return (n *= 2) < 1 ? .5 * n * n * n * n * n : .5 * ((n -= 2) * n * n * n * n + 2)
                    }
                }, {}],
                28: [function(o, t, e) {
                    t.exports = function(n) {
                        return n * n * n * n * n
                    }
                }, {}],
                29: [function(o, t, e) {
                    t.exports = function(n) {
                        return --n * n * n * n * n + 1
                    }
                }, {}],
                30: [function(o, t, e) {
                    t.exports = function(n) {
                        return -.5 * (Math.cos(Math.PI * n) - 1)
                    }
                }, {}],
                31: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = Math.cos(n * Math.PI * .5);
                        return Math.abs(i) < 1e-14 ? 1 : 1 - i
                    }
                }, {}],
                32: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.sin(n * Math.PI / 2)
                    }
                }, {}],
                33: [function(o, t, e) {
                    t.exports = function(n, i) {
                        i || (i = [0, ""]), n = String(n);
                        var a = parseFloat(n, 10);
                        return i[0] = a, i[1] = n.match(/[\d.\-\+]*\s*(.*)/)[1] || "", i
                    }
                }, {}],
                34: [function(o, t, e) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), e.create = void 0;
                    var n = a(o("parse-unit")),
                        i = a(o("eases"));

                    function a(E) {
                        return E && E.__esModule ? E : {
                            default: E
                        }
                    }

                    function l(E) {
                        return (l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(W) {
                            return typeof W
                        } : function(W) {
                            return W && typeof Symbol == "function" && W.constructor === Symbol && W !== Symbol.prototype ? "symbol" : typeof W
                        })(E)
                    }
                    var c, h, m, s = [],
                        r = typeof window < "u",
                        d = function() {
                            return (document.scrollingElement || document.documentElement).scrollTop
                        },
                        u = function() {
                            return window.innerHeight || window.outerHeight
                        },
                        p = function(E) {
                            return isNaN((0, n.default)(E)[0]) === !1
                        },
                        f = function(E) {
                            var W = (0, n.default)(E);
                            return {
                                value: W[0],
                                unit: W[1]
                            }
                        },
                        Q = function(E) {
                            return String(E).match(/^[a-z]+-[a-z]+$/) !== null
                        },
                        b = function(E, W) {
                            return E === !0 ? W.elem : E instanceof HTMLElement ? W.direct : W.global
                        },
                        g = function(E, W) {
                            var y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : d(),
                                w = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : u(),
                                S = W.getBoundingClientRect(),
                                U = E.match(/^[a-z]+/)[0],
                                k = E.match(/[a-z]+$/)[0],
                                T = 0;
                            return k === "top" && (T -= 0), k === "middle" && (T -= w / 2), k === "bottom" && (T -= w), U === "top" && (T += S.top + y), U === "middle" && (T += S.top + y + S.height / 2), U === "bottom" && (T += S.top + y + S.height), "".concat(T, "px")
                        },
                        F = function(E) {
                            var W = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : d(),
                                y = E.getData(),
                                w = y.to.value - y.from.value,
                                S = W - y.from.value,
                                U = S / (w / 100),
                                k = Math.min(Math.max(U, 0), 100),
                                T = b(y.direct, {
                                    global: document.documentElement,
                                    elem: y.elem,
                                    direct: y.direct
                                }),
                                L = Object.keys(y.props).reduce(function(Jt, zt) {
                                    var lt = y.props[zt],
                                        Ht = lt.from.unit || lt.to.unit,
                                        ho = lt.from.value - lt.to.value,
                                        uo = lt.timing(k / 100),
                                        mo = lt.from.value - ho * uo,
                                        po = Math.round(1e4 * mo) / 1e4;
                                    return Jt[zt] = po + Ht, Jt
                                }, {}),
                                Y = U >= 0 && U <= 100,
                                Se = U < 0 || U > 100;
                            return Y === !0 && y.inside(E, U, L), Se === !0 && y.outside(E, U, L), {
                                elem: T,
                                props: L
                            }
                        },
                        x = function(E, W) {
                            Object.keys(W).forEach(function(y) {
                                return function(w, S) {
                                    w.style.setProperty(S.key, S.value)
                                }(E, {
                                    key: y,
                                    value: W[y]
                                })
                            })
                        };
                    e.create = function(E) {
                        var W = null,
                            y = !1,
                            w = {
                                isActive: function() {
                                    return y
                                },
                                getData: function() {
                                    return W
                                },
                                calculate: function() {
                                    W = function() {
                                        var U = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                                        if ((U = Object.assign({}, U)).inside == null && (U.inside = function() {}), U.outside == null && (U.outside = function() {}), U.direct == null && (U.direct = !1), U.track == null && (U.track = !0), U.props == null && (U.props = {}), U.from == null) throw new Error("Missing property `from`");
                                        if (U.to == null) throw new Error("Missing property `to`");
                                        if (typeof U.inside != "function") throw new Error("Property `inside` must be undefined or a function");
                                        if (typeof U.outside != "function") throw new Error("Property `outside` must be undefined or a function");
                                        if (typeof U.direct != "boolean" && U.direct instanceof HTMLElement == 0) throw new Error("Property `direct` must be undefined, a boolean or a DOM element/node");
                                        if (U.direct === !0 && U.elem == null) throw new Error("Property `elem` is required when `direct` is true");
                                        if (typeof U.track != "boolean") throw new Error("Property `track` must be undefined or a boolean");
                                        if (l(U.props) !== "object") throw new Error("Property `props` must be undefined or an object");
                                        if (U.elem == null) {
                                            if (p(U.from) === !1) throw new Error("Property `from` must be a absolute value when no `elem` has been provided");
                                            if (p(U.to) === !1) throw new Error("Property `to` must be a absolute value when no `elem` has been provided")
                                        } else Q(U.from) === !0 && (U.from = g(U.from, U.elem)), Q(U.to) === !0 && (U.to = g(U.to, U.elem));
                                        return U.from = f(U.from), U.to = f(U.to), U.props = Object.keys(U.props).reduce(function(k, T) {
                                            var L = Object.assign({}, U.props[T]);
                                            if (p(L.from) === !1) throw new Error("Property `from` of prop must be a absolute value");
                                            if (p(L.to) === !1) throw new Error("Property `from` of prop must be a absolute value");
                                            if (L.from = f(L.from), L.to = f(L.to), L.timing == null && (L.timing = i.default.linear), typeof L.timing != "string" && typeof L.timing != "function") throw new Error("Property `timing` of prop must be undefined, a string or a function");
                                            if (typeof L.timing == "string" && i.default[L.timing] == null) throw new Error("Unknown timing for property `timing` of prop");
                                            return typeof L.timing == "string" && (L.timing = i.default[L.timing]), k[T] = L, k
                                        }, {}), U
                                    }(E)
                                },
                                update: function() {
                                    var U = F(w),
                                        k = U.elem,
                                        T = U.props;
                                    return x(k, T), T
                                },
                                start: function() {
                                    y = !0
                                },
                                stop: function() {
                                    y = !1
                                },
                                destroy: function() {
                                    s[S] = void 0
                                }
                            },
                            S = s.push(w) - 1;
                        return w.calculate(), w
                    }, r === !0 ? (function E(W, y) {
                        var w = function() {
                                requestAnimationFrame(function() {
                                    return E(W, y)
                                })
                            },
                            S = function(k) {
                                return k.filter(function(T) {
                                    return T != null && T.isActive()
                                })
                            }(s);
                        if (S.length === 0) return w();
                        var U = d();
                        if (y === U) return w();
                        y = U, S.map(function(k) {
                            return F(k, U)
                        }).forEach(function(k) {
                            var T = k.elem,
                                L = k.props;
                            return x(T, L)
                        }), w()
                    }(), window.addEventListener("resize", (c = function() {
                        (function(E) {
                            return E.filter(function(W) {
                                return W != null && W.getData().track
                            })
                        })(s).forEach(function(E) {
                            E.calculate(), E.update()
                        })
                    }, h = 50, m = null, function() {
                        for (var E = arguments.length, W = new Array(E), y = 0; y < E; y++) W[y] = arguments[y];
                        clearTimeout(m), m = setTimeout(function() {
                            return c.apply(void 0, W)
                        }, h)
                    }))) : console.warn("basicScroll is not executing because you are using it in an environment without a `window` object")
                }, {
                    eases: 19,
                    "parse-unit": 33
                }]
            }, {}, [34])(34)
        })
    });
    var Ge = class {
        constructor(t, e, n) {
            this.eventTarget = t, this.eventName = e, this.eventOptions = n, this.unorderedBindings = new Set
        }
        connect() {
            this.eventTarget.addEventListener(this.eventName, this, this.eventOptions)
        }
        disconnect() {
            this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions)
        }
        bindingConnected(t) {
            this.unorderedBindings.add(t)
        }
        bindingDisconnected(t) {
            this.unorderedBindings.delete(t)
        }
        handleEvent(t) {
            let e = vo(t);
            for (let n of this.bindings) {
                if (e.immediatePropagationStopped) break;
                n.handleEvent(e)
            }
        }
        hasBindings() {
            return this.unorderedBindings.size > 0
        }
        get bindings() {
            return Array.from(this.unorderedBindings).sort((t, e) => {
                let n = t.index,
                    i = e.index;
                return n < i ? -1 : n > i ? 1 : 0
            })
        }
    };

    function vo(o) {
        if ("immediatePropagationStopped" in o) return o;
        {
            let {
                stopImmediatePropagation: t
            } = o;
            return Object.assign(o, {
                immediatePropagationStopped: !1,
                stopImmediatePropagation() {
                    this.immediatePropagationStopped = !0, t.call(this)
                }
            })
        }
    }
    var De = class {
            constructor(t) {
                this.application = t, this.eventListenerMaps = new Map, this.started = !1
            }
            start() {
                this.started || (this.started = !0, this.eventListeners.forEach(t => t.connect()))
            }
            stop() {
                this.started && (this.started = !1, this.eventListeners.forEach(t => t.disconnect()))
            }
            get eventListeners() {
                return Array.from(this.eventListenerMaps.values()).reduce((t, e) => t.concat(Array.from(e.values())), [])
            }
            bindingConnected(t) {
                this.fetchEventListenerForBinding(t).bindingConnected(t)
            }
            bindingDisconnected(t, e = !1) {
                this.fetchEventListenerForBinding(t).bindingDisconnected(t), e && this.clearEventListenersForBinding(t)
            }
            handleError(t, e, n = {}) {
                this.application.handleError(t, `Error ${e}`, n)
            }
            clearEventListenersForBinding(t) {
                let e = this.fetchEventListenerForBinding(t);
                e.hasBindings() || (e.disconnect(), this.removeMappedEventListenerFor(t))
            }
            removeMappedEventListenerFor(t) {
                let {
                    eventTarget: e,
                    eventName: n,
                    eventOptions: i
                } = t, a = this.fetchEventListenerMapForEventTarget(e), l = this.cacheKey(n, i);
                a.delete(l), a.size == 0 && this.eventListenerMaps.delete(e)
            }
            fetchEventListenerForBinding(t) {
                let {
                    eventTarget: e,
                    eventName: n,
                    eventOptions: i
                } = t;
                return this.fetchEventListener(e, n, i)
            }
            fetchEventListener(t, e, n) {
                let i = this.fetchEventListenerMapForEventTarget(t),
                    a = this.cacheKey(e, n),
                    l = i.get(a);
                return l || (l = this.createEventListener(t, e, n), i.set(a, l)), l
            }
            createEventListener(t, e, n) {
                let i = new Ge(t, e, n);
                return this.started && i.connect(), i
            }
            fetchEventListenerMapForEventTarget(t) {
                let e = this.eventListenerMaps.get(t);
                return e || (e = new Map, this.eventListenerMaps.set(t, e)), e
            }
            cacheKey(t, e) {
                let n = [t];
                return Object.keys(e).sort().forEach(i => {
                    n.push(`${e[i]?"":"!"}${i}`)
                }), n.join(":")
            }
        },
        yo = {
            stop({
                event: o,
                value: t
            }) {
                return t && o.stopPropagation(), !0
            },
            prevent({
                event: o,
                value: t
            }) {
                return t && o.preventDefault(), !0
            },
            self({
                event: o,
                value: t,
                element: e
            }) {
                return t ? e === o.target : !0
            }
        },
        Eo = /^(?:(?:([^.]+?)\+)?(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;

    function xo(o) {
        let e = o.trim().match(Eo) || [],
            n = e[2],
            i = e[3];
        return i && !["keydown", "keyup", "keypress"].includes(n) && (n += `.${i}`, i = ""), {
            eventTarget: wo(e[4]),
            eventName: n,
            eventOptions: e[7] ? Wo(e[7]) : {},
            identifier: e[5],
            methodName: e[6],
            keyFilter: e[1] || i
        }
    }

    function wo(o) {
        if (o == "window") return window;
        if (o == "document") return document
    }

    function Wo(o) {
        return o.split(":").reduce((t, e) => Object.assign(t, {
            [e.replace(/^!/, "")]: !/^!/.test(e)
        }), {})
    }

    function Lo(o) {
        if (o == window) return "window";
        if (o == document) return "document"
    }

    function ln(o) {
        return o.replace(/(?:[_-])([a-z0-9])/g, (t, e) => e.toUpperCase())
    }

    function Ie(o) {
        return ln(o.replace(/--/g, "-").replace(/__/g, "_"))
    }

    function wt(o) {
        return o.charAt(0).toUpperCase() + o.slice(1)
    }

    function ci(o) {
        return o.replace(/([A-Z])/g, (t, e) => `-${e.toLowerCase()}`)
    }

    function Ro(o) {
        return o.match(/[^\s]+/g) || []
    }

    function ti(o) {
        return o != null
    }

    function _e(o, t) {
        return Object.prototype.hasOwnProperty.call(o, t)
    }
    var ei = ["meta", "ctrl", "alt", "shift"],
        Ne = class {
            constructor(t, e, n, i) {
                this.element = t, this.index = e, this.eventTarget = n.eventTarget || t, this.eventName = n.eventName || Vo(t) || Kt("missing event name"), this.eventOptions = n.eventOptions || {}, this.identifier = n.identifier || Kt("missing identifier"), this.methodName = n.methodName || Kt("missing method name"), this.keyFilter = n.keyFilter || "", this.schema = i
            }
            static forToken(t, e) {
                return new this(t.element, t.index, xo(t.content), e)
            }
            toString() {
                let t = this.keyFilter ? `.${this.keyFilter}` : "",
                    e = this.eventTargetName ? `@${this.eventTargetName}` : "";
                return `${this.eventName}${t}${e}->${this.identifier}#${this.methodName}`
            }
            shouldIgnoreKeyboardEvent(t) {
                if (!this.keyFilter) return !1;
                let e = this.keyFilter.split("+");
                if (this.keyFilterDissatisfied(t, e)) return !0;
                let n = e.filter(i => !ei.includes(i))[0];
                return n ? (_e(this.keyMappings, n) || Kt(`contains unknown key filter: ${this.keyFilter}`), this.keyMappings[n].toLowerCase() !== t.key.toLowerCase()) : !1
            }
            shouldIgnoreMouseEvent(t) {
                if (!this.keyFilter) return !1;
                let e = [this.keyFilter];
                return !!this.keyFilterDissatisfied(t, e)
            }
            get params() {
                let t = {},
                    e = new RegExp(`^data-${this.identifier}-(.+)-param$`, "i");
                for (let {
                        name: n,
                        value: i
                    }
                    of Array.from(this.element.attributes)) {
                    let a = n.match(e),
                        l = a && a[1];
                    l && (t[ln(l)] = Zo(i))
                }
                return t
            }
            get eventTargetName() {
                return Lo(this.eventTarget)
            }
            get keyMappings() {
                return this.schema.keyMappings
            }
            keyFilterDissatisfied(t, e) {
                let [n, i, a, l] = ei.map(c => e.includes(c));
                return t.metaKey !== n || t.ctrlKey !== i || t.altKey !== a || t.shiftKey !== l
            }
        },
        ni = {
            a: () => "click",
            button: () => "click",
            form: () => "submit",
            details: () => "toggle",
            input: o => o.getAttribute("type") == "submit" ? "click" : "input",
            select: () => "change",
            textarea: () => "input"
        };

    function Vo(o) {
        let t = o.tagName.toLowerCase();
        if (t in ni) return ni[t](o)
    }

    function Kt(o) {
        throw new Error(o)
    }

    function Zo(o) {
        try {
            return JSON.parse(o)
        } catch {
            return o
        }
    }
    var Ae = class {
            constructor(t, e) {
                this.context = t, this.action = e
            }
            get index() {
                return this.action.index
            }
            get eventTarget() {
                return this.action.eventTarget
            }
            get eventOptions() {
                return this.action.eventOptions
            }
            get identifier() {
                return this.context.identifier
            }
            handleEvent(t) {
                let e = this.prepareActionEvent(t);
                this.willBeInvokedByEvent(t) && this.applyEventModifiers(e) && this.invokeWithEvent(e)
            }
            get eventName() {
                return this.action.eventName
            }
            get method() {
                let t = this.controller[this.methodName];
                if (typeof t == "function") return t;
                throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`)
            }
            applyEventModifiers(t) {
                let {
                    element: e
                } = this.action, {
                    actionDescriptorFilters: n
                } = this.context.application, {
                    controller: i
                } = this.context, a = !0;
                for (let [l, c] of Object.entries(this.eventOptions))
                    if (l in n) {
                        let h = n[l];
                        a = a && h({
                            name: l,
                            value: c,
                            event: t,
                            element: e,
                            controller: i
                        })
                    } else continue;
                return a
            }
            prepareActionEvent(t) {
                return Object.assign(t, {
                    params: this.action.params
                })
            }
            invokeWithEvent(t) {
                let {
                    target: e,
                    currentTarget: n
                } = t;
                try {
                    this.method.call(this.controller, t), this.context.logDebugActivity(this.methodName, {
                        event: t,
                        target: e,
                        currentTarget: n,
                        action: this.methodName
                    })
                } catch (i) {
                    let {
                        identifier: a,
                        controller: l,
                        element: c,
                        index: h
                    } = this, m = {
                        identifier: a,
                        controller: l,
                        element: c,
                        index: h,
                        event: t
                    };
                    this.context.handleError(i, `invoking action "${this.action}"`, m)
                }
            }
            willBeInvokedByEvent(t) {
                let e = t.target;
                return t instanceof KeyboardEvent && this.action.shouldIgnoreKeyboardEvent(t) || t instanceof MouseEvent && this.action.shouldIgnoreMouseEvent(t) ? !1 : this.element === e ? !0 : e instanceof Element && this.element.contains(e) ? this.scope.containsElement(e) : this.scope.containsElement(this.action.element)
            }
            get controller() {
                return this.context.controller
            }
            get methodName() {
                return this.action.methodName
            }
            get element() {
                return this.scope.element
            }
            get scope() {
                return this.context.scope
            }
        },
        $t = class {
            constructor(t, e) {
                this.mutationObserverInit = {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                }, this.element = t, this.started = !1, this.delegate = e, this.elements = new Set, this.mutationObserver = new MutationObserver(n => this.processMutations(n))
            }
            start() {
                this.started || (this.started = !0, this.mutationObserver.observe(this.element, this.mutationObserverInit), this.refresh())
            }
            pause(t) {
                this.started && (this.mutationObserver.disconnect(), this.started = !1), t(), this.started || (this.mutationObserver.observe(this.element, this.mutationObserverInit), this.started = !0)
            }
            stop() {
                this.started && (this.mutationObserver.takeRecords(), this.mutationObserver.disconnect(), this.started = !1)
            }
            refresh() {
                if (this.started) {
                    let t = new Set(this.matchElementsInTree());
                    for (let e of Array.from(this.elements)) t.has(e) || this.removeElement(e);
                    for (let e of Array.from(t)) this.addElement(e)
                }
            }
            processMutations(t) {
                if (this.started)
                    for (let e of t) this.processMutation(e)
            }
            processMutation(t) {
                t.type == "attributes" ? this.processAttributeChange(t.target, t.attributeName) : t.type == "childList" && (this.processRemovedNodes(t.removedNodes), this.processAddedNodes(t.addedNodes))
            }
            processAttributeChange(t, e) {
                this.elements.has(t) ? this.delegate.elementAttributeChanged && this.matchElement(t) ? this.delegate.elementAttributeChanged(t, e) : this.removeElement(t) : this.matchElement(t) && this.addElement(t)
            }
            processRemovedNodes(t) {
                for (let e of Array.from(t)) {
                    let n = this.elementFromNode(e);
                    n && this.processTree(n, this.removeElement)
                }
            }
            processAddedNodes(t) {
                for (let e of Array.from(t)) {
                    let n = this.elementFromNode(e);
                    n && this.elementIsActive(n) && this.processTree(n, this.addElement)
                }
            }
            matchElement(t) {
                return this.delegate.matchElement(t)
            }
            matchElementsInTree(t = this.element) {
                return this.delegate.matchElementsInTree(t)
            }
            processTree(t, e) {
                for (let n of this.matchElementsInTree(t)) e.call(this, n)
            }
            elementFromNode(t) {
                if (t.nodeType == Node.ELEMENT_NODE) return t
            }
            elementIsActive(t) {
                return t.isConnected != this.element.isConnected ? !1 : this.element.contains(t)
            }
            addElement(t) {
                this.elements.has(t) || this.elementIsActive(t) && (this.elements.add(t), this.delegate.elementMatched && this.delegate.elementMatched(t))
            }
            removeElement(t) {
                this.elements.has(t) && (this.elements.delete(t), this.delegate.elementUnmatched && this.delegate.elementUnmatched(t))
            }
        },
        qt = class {
            constructor(t, e, n) {
                this.attributeName = e, this.delegate = n, this.elementObserver = new $t(t, this)
            }
            get element() {
                return this.elementObserver.element
            }
            get selector() {
                return `[${this.attributeName}]`
            }
            start() {
                this.elementObserver.start()
            }
            pause(t) {
                this.elementObserver.pause(t)
            }
            stop() {
                this.elementObserver.stop()
            }
            refresh() {
                this.elementObserver.refresh()
            }
            get started() {
                return this.elementObserver.started
            }
            matchElement(t) {
                return t.hasAttribute(this.attributeName)
            }
            matchElementsInTree(t) {
                let e = this.matchElement(t) ? [t] : [],
                    n = Array.from(t.querySelectorAll(this.selector));
                return e.concat(n)
            }
            elementMatched(t) {
                this.delegate.elementMatchedAttribute && this.delegate.elementMatchedAttribute(t, this.attributeName)
            }
            elementUnmatched(t) {
                this.delegate.elementUnmatchedAttribute && this.delegate.elementUnmatchedAttribute(t, this.attributeName)
            }
            elementAttributeChanged(t, e) {
                this.delegate.elementAttributeValueChanged && this.attributeName == e && this.delegate.elementAttributeValueChanged(t, e)
            }
        };

    function Oo(o, t, e) {
        di(o, t).add(e)
    }

    function To(o, t, e) {
        di(o, t).delete(e), Co(o, t)
    }

    function di(o, t) {
        let e = o.get(t);
        return e || (e = new Set, o.set(t, e)), e
    }

    function Co(o, t) {
        let e = o.get(t);
        e != null && e.size == 0 && o.delete(t)
    }
    var it = class {
        constructor() {
            this.valuesByKey = new Map
        }
        get keys() {
            return Array.from(this.valuesByKey.keys())
        }
        get values() {
            return Array.from(this.valuesByKey.values()).reduce((e, n) => e.concat(Array.from(n)), [])
        }
        get size() {
            return Array.from(this.valuesByKey.values()).reduce((e, n) => e + n.size, 0)
        }
        add(t, e) {
            Oo(this.valuesByKey, t, e)
        }
        delete(t, e) {
            To(this.valuesByKey, t, e)
        }
        has(t, e) {
            let n = this.valuesByKey.get(t);
            return n != null && n.has(e)
        }
        hasKey(t) {
            return this.valuesByKey.has(t)
        }
        hasValue(t) {
            return Array.from(this.valuesByKey.values()).some(n => n.has(t))
        }
        getValuesForKey(t) {
            let e = this.valuesByKey.get(t);
            return e ? Array.from(e) : []
        }
        getKeysForValue(t) {
            return Array.from(this.valuesByKey).filter(([e, n]) => n.has(t)).map(([e, n]) => e)
        }
    };
    var Xe = class {
            constructor(t, e, n, i) {
                this._selector = e, this.details = i, this.elementObserver = new $t(t, this), this.delegate = n, this.matchesByElement = new it
            }
            get started() {
                return this.elementObserver.started
            }
            get selector() {
                return this._selector
            }
            set selector(t) {
                this._selector = t, this.refresh()
            }
            start() {
                this.elementObserver.start()
            }
            pause(t) {
                this.elementObserver.pause(t)
            }
            stop() {
                this.elementObserver.stop()
            }
            refresh() {
                this.elementObserver.refresh()
            }
            get element() {
                return this.elementObserver.element
            }
            matchElement(t) {
                let {
                    selector: e
                } = this;
                if (e) {
                    let n = t.matches(e);
                    return this.delegate.selectorMatchElement ? n && this.delegate.selectorMatchElement(t, this.details) : n
                } else return !1
            }
            matchElementsInTree(t) {
                let {
                    selector: e
                } = this;
                if (e) {
                    let n = this.matchElement(t) ? [t] : [],
                        i = Array.from(t.querySelectorAll(e)).filter(a => this.matchElement(a));
                    return n.concat(i)
                } else return []
            }
            elementMatched(t) {
                let {
                    selector: e
                } = this;
                e && this.selectorMatched(t, e)
            }
            elementUnmatched(t) {
                let e = this.matchesByElement.getKeysForValue(t);
                for (let n of e) this.selectorUnmatched(t, n)
            }
            elementAttributeChanged(t, e) {
                let {
                    selector: n
                } = this;
                if (n) {
                    let i = this.matchElement(t),
                        a = this.matchesByElement.has(n, t);
                    i && !a ? this.selectorMatched(t, n) : !i && a && this.selectorUnmatched(t, n)
                }
            }
            selectorMatched(t, e) {
                this.delegate.selectorMatched(t, e, this.details), this.matchesByElement.add(e, t)
            }
            selectorUnmatched(t, e) {
                this.delegate.selectorUnmatched(t, e, this.details), this.matchesByElement.delete(e, t)
            }
        },
        Ye = class {
            constructor(t, e) {
                this.element = t, this.delegate = e, this.started = !1, this.stringMap = new Map, this.mutationObserver = new MutationObserver(n => this.processMutations(n))
            }
            start() {
                this.started || (this.started = !0, this.mutationObserver.observe(this.element, {
                    attributes: !0,
                    attributeOldValue: !0
                }), this.refresh())
            }
            stop() {
                this.started && (this.mutationObserver.takeRecords(), this.mutationObserver.disconnect(), this.started = !1)
            }
            refresh() {
                if (this.started)
                    for (let t of this.knownAttributeNames) this.refreshAttribute(t, null)
            }
            processMutations(t) {
                if (this.started)
                    for (let e of t) this.processMutation(e)
            }
            processMutation(t) {
                let e = t.attributeName;
                e && this.refreshAttribute(e, t.oldValue)
            }
            refreshAttribute(t, e) {
                let n = this.delegate.getStringMapKeyForAttribute(t);
                if (n != null) {
                    this.stringMap.has(t) || this.stringMapKeyAdded(n, t);
                    let i = this.element.getAttribute(t);
                    if (this.stringMap.get(t) != i && this.stringMapValueChanged(i, n, e), i == null) {
                        let a = this.stringMap.get(t);
                        this.stringMap.delete(t), a && this.stringMapKeyRemoved(n, t, a)
                    } else this.stringMap.set(t, i)
                }
            }
            stringMapKeyAdded(t, e) {
                this.delegate.stringMapKeyAdded && this.delegate.stringMapKeyAdded(t, e)
            }
            stringMapValueChanged(t, e, n) {
                this.delegate.stringMapValueChanged && this.delegate.stringMapValueChanged(t, e, n)
            }
            stringMapKeyRemoved(t, e, n) {
                this.delegate.stringMapKeyRemoved && this.delegate.stringMapKeyRemoved(t, e, n)
            }
            get knownAttributeNames() {
                return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)))
            }
            get currentAttributeNames() {
                return Array.from(this.element.attributes).map(t => t.name)
            }
            get recordedAttributeNames() {
                return Array.from(this.stringMap.keys())
            }
        },
        te = class {
            constructor(t, e, n) {
                this.attributeObserver = new qt(t, e, this), this.delegate = n, this.tokensByElement = new it
            }
            get started() {
                return this.attributeObserver.started
            }
            start() {
                this.attributeObserver.start()
            }
            pause(t) {
                this.attributeObserver.pause(t)
            }
            stop() {
                this.attributeObserver.stop()
            }
            refresh() {
                this.attributeObserver.refresh()
            }
            get element() {
                return this.attributeObserver.element
            }
            get attributeName() {
                return this.attributeObserver.attributeName
            }
            elementMatchedAttribute(t) {
                this.tokensMatched(this.readTokensForElement(t))
            }
            elementAttributeValueChanged(t) {
                let [e, n] = this.refreshTokensForElement(t);
                this.tokensUnmatched(e), this.tokensMatched(n)
            }
            elementUnmatchedAttribute(t) {
                this.tokensUnmatched(this.tokensByElement.getValuesForKey(t))
            }
            tokensMatched(t) {
                t.forEach(e => this.tokenMatched(e))
            }
            tokensUnmatched(t) {
                t.forEach(e => this.tokenUnmatched(e))
            }
            tokenMatched(t) {
                this.delegate.tokenMatched(t), this.tokensByElement.add(t.element, t)
            }
            tokenUnmatched(t) {
                this.delegate.tokenUnmatched(t), this.tokensByElement.delete(t.element, t)
            }
            refreshTokensForElement(t) {
                let e = this.tokensByElement.getValuesForKey(t),
                    n = this.readTokensForElement(t),
                    i = ko(e, n).findIndex(([a, l]) => !So(a, l));
                return i == -1 ? [
                    [],
                    []
                ] : [e.slice(i), n.slice(i)]
            }
            readTokensForElement(t) {
                let e = this.attributeName,
                    n = t.getAttribute(e) || "";
                return Mo(n, t, e)
            }
        };

    function Mo(o, t, e) {
        return o.trim().split(/\s+/).filter(n => n.length).map((n, i) => ({
            element: t,
            attributeName: e,
            content: n,
            index: i
        }))
    }

    function ko(o, t) {
        let e = Math.max(o.length, t.length);
        return Array.from({
            length: e
        }, (n, i) => [o[i], t[i]])
    }

    function So(o, t) {
        return o && t && o.index == t.index && o.content == t.content
    }
    var ee = class {
            constructor(t, e, n) {
                this.tokenListObserver = new te(t, e, this), this.delegate = n, this.parseResultsByToken = new WeakMap, this.valuesByTokenByElement = new WeakMap
            }
            get started() {
                return this.tokenListObserver.started
            }
            start() {
                this.tokenListObserver.start()
            }
            stop() {
                this.tokenListObserver.stop()
            }
            refresh() {
                this.tokenListObserver.refresh()
            }
            get element() {
                return this.tokenListObserver.element
            }
            get attributeName() {
                return this.tokenListObserver.attributeName
            }
            tokenMatched(t) {
                let {
                    element: e
                } = t, {
                    value: n
                } = this.fetchParseResultForToken(t);
                n && (this.fetchValuesByTokenForElement(e).set(t, n), this.delegate.elementMatchedValue(e, n))
            }
            tokenUnmatched(t) {
                let {
                    element: e
                } = t, {
                    value: n
                } = this.fetchParseResultForToken(t);
                n && (this.fetchValuesByTokenForElement(e).delete(t), this.delegate.elementUnmatchedValue(e, n))
            }
            fetchParseResultForToken(t) {
                let e = this.parseResultsByToken.get(t);
                return e || (e = this.parseToken(t), this.parseResultsByToken.set(t, e)), e
            }
            fetchValuesByTokenForElement(t) {
                let e = this.valuesByTokenByElement.get(t);
                return e || (e = new Map, this.valuesByTokenByElement.set(t, e)), e
            }
            parseToken(t) {
                try {
                    return {
                        value: this.delegate.parseValueForToken(t)
                    }
                } catch (e) {
                    return {
                        error: e
                    }
                }
            }
        },
        Je = class {
            constructor(t, e) {
                this.context = t, this.delegate = e, this.bindingsByAction = new Map
            }
            start() {
                this.valueListObserver || (this.valueListObserver = new ee(this.element, this.actionAttribute, this), this.valueListObserver.start())
            }
            stop() {
                this.valueListObserver && (this.valueListObserver.stop(), delete this.valueListObserver, this.disconnectAllActions())
            }
            get element() {
                return this.context.element
            }
            get identifier() {
                return this.context.identifier
            }
            get actionAttribute() {
                return this.schema.actionAttribute
            }
            get schema() {
                return this.context.schema
            }
            get bindings() {
                return Array.from(this.bindingsByAction.values())
            }
            connectAction(t) {
                let e = new Ae(this.context, t);
                this.bindingsByAction.set(t, e), this.delegate.bindingConnected(e)
            }
            disconnectAction(t) {
                let e = this.bindingsByAction.get(t);
                e && (this.bindingsByAction.delete(t), this.delegate.bindingDisconnected(e))
            }
            disconnectAllActions() {
                this.bindings.forEach(t => this.delegate.bindingDisconnected(t, !0)), this.bindingsByAction.clear()
            }
            parseValueForToken(t) {
                let e = Ne.forToken(t, this.schema);
                if (e.identifier == this.identifier) return e
            }
            elementMatchedValue(t, e) {
                this.connectAction(e)
            }
            elementUnmatchedValue(t, e) {
                this.disconnectAction(e)
            }
        },
        ze = class {
            constructor(t, e) {
                this.context = t, this.receiver = e, this.stringMapObserver = new Ye(this.element, this), this.valueDescriptorMap = this.controller.valueDescriptorMap
            }
            start() {
                this.stringMapObserver.start(), this.invokeChangedCallbacksForDefaultValues()
            }
            stop() {
                this.stringMapObserver.stop()
            }
            get element() {
                return this.context.element
            }
            get controller() {
                return this.context.controller
            }
            getStringMapKeyForAttribute(t) {
                if (t in this.valueDescriptorMap) return this.valueDescriptorMap[t].name
            }
            stringMapKeyAdded(t, e) {
                let n = this.valueDescriptorMap[e];
                this.hasValue(t) || this.invokeChangedCallback(t, n.writer(this.receiver[t]), n.writer(n.defaultValue))
            }
            stringMapValueChanged(t, e, n) {
                let i = this.valueDescriptorNameMap[e];
                t !== null && (n === null && (n = i.writer(i.defaultValue)), this.invokeChangedCallback(e, t, n))
            }
            stringMapKeyRemoved(t, e, n) {
                let i = this.valueDescriptorNameMap[t];
                this.hasValue(t) ? this.invokeChangedCallback(t, i.writer(this.receiver[t]), n) : this.invokeChangedCallback(t, i.writer(i.defaultValue), n)
            }
            invokeChangedCallbacksForDefaultValues() {
                for (let {
                        key: t,
                        name: e,
                        defaultValue: n,
                        writer: i
                    }
                    of this.valueDescriptors) n != null && !this.controller.data.has(t) && this.invokeChangedCallback(e, i(n), void 0)
            }
            invokeChangedCallback(t, e, n) {
                let i = `${t}Changed`,
                    a = this.receiver[i];
                if (typeof a == "function") {
                    let l = this.valueDescriptorNameMap[t];
                    try {
                        let c = l.reader(e),
                            h = n;
                        n && (h = l.reader(n)), a.call(this.receiver, c, h)
                    } catch (c) {
                        throw c instanceof TypeError && (c.message = `Stimulus Value "${this.context.identifier}.${l.name}" - ${c.message}`), c
                    }
                }
            }
            get valueDescriptors() {
                let {
                    valueDescriptorMap: t
                } = this;
                return Object.keys(t).map(e => t[e])
            }
            get valueDescriptorNameMap() {
                let t = {};
                return Object.keys(this.valueDescriptorMap).forEach(e => {
                    let n = this.valueDescriptorMap[e];
                    t[n.name] = n
                }), t
            }
            hasValue(t) {
                let e = this.valueDescriptorNameMap[t],
                    n = `has${wt(e.name)}`;
                return this.receiver[n]
            }
        },
        He = class {
            constructor(t, e) {
                this.context = t, this.delegate = e, this.targetsByName = new it
            }
            start() {
                this.tokenListObserver || (this.tokenListObserver = new te(this.element, this.attributeName, this), this.tokenListObserver.start())
            }
            stop() {
                this.tokenListObserver && (this.disconnectAllTargets(), this.tokenListObserver.stop(), delete this.tokenListObserver)
            }
            tokenMatched({
                element: t,
                content: e
            }) {
                this.scope.containsElement(t) && this.connectTarget(t, e)
            }
            tokenUnmatched({
                element: t,
                content: e
            }) {
                this.disconnectTarget(t, e)
            }
            connectTarget(t, e) {
                var n;
                this.targetsByName.has(e, t) || (this.targetsByName.add(e, t), (n = this.tokenListObserver) === null || n === void 0 || n.pause(() => this.delegate.targetConnected(t, e)))
            }
            disconnectTarget(t, e) {
                var n;
                this.targetsByName.has(e, t) && (this.targetsByName.delete(e, t), (n = this.tokenListObserver) === null || n === void 0 || n.pause(() => this.delegate.targetDisconnected(t, e)))
            }
            disconnectAllTargets() {
                for (let t of this.targetsByName.keys)
                    for (let e of this.targetsByName.getValuesForKey(t)) this.disconnectTarget(e, t)
            }
            get attributeName() {
                return `data-${this.context.identifier}-target`
            }
            get element() {
                return this.context.element
            }
            get scope() {
                return this.context.scope
            }
        };

    function Wt(o, t) {
        let e = hi(o);
        return Array.from(e.reduce((n, i) => (Do(i, t).forEach(a => n.add(a)), n), new Set))
    }

    function Go(o, t) {
        return hi(o).reduce((n, i) => (n.push(...Io(i, t)), n), [])
    }

    function hi(o) {
        let t = [];
        for (; o;) t.push(o), o = Object.getPrototypeOf(o);
        return t.reverse()
    }

    function Do(o, t) {
        let e = o[t];
        return Array.isArray(e) ? e : []
    }

    function Io(o, t) {
        let e = o[t];
        return e ? Object.keys(e).map(n => [n, e[n]]) : []
    }
    var je = class {
            constructor(t, e) {
                this.started = !1, this.context = t, this.delegate = e, this.outletsByName = new it, this.outletElementsByName = new it, this.selectorObserverMap = new Map, this.attributeObserverMap = new Map
            }
            start() {
                this.started || (this.outletDefinitions.forEach(t => {
                    this.setupSelectorObserverForOutlet(t), this.setupAttributeObserverForOutlet(t)
                }), this.started = !0, this.dependentContexts.forEach(t => t.refresh()))
            }
            refresh() {
                this.selectorObserverMap.forEach(t => t.refresh()), this.attributeObserverMap.forEach(t => t.refresh())
            }
            stop() {
                this.started && (this.started = !1, this.disconnectAllOutlets(), this.stopSelectorObservers(), this.stopAttributeObservers())
            }
            stopSelectorObservers() {
                this.selectorObserverMap.size > 0 && (this.selectorObserverMap.forEach(t => t.stop()), this.selectorObserverMap.clear())
            }
            stopAttributeObservers() {
                this.attributeObserverMap.size > 0 && (this.attributeObserverMap.forEach(t => t.stop()), this.attributeObserverMap.clear())
            }
            selectorMatched(t, e, {
                outletName: n
            }) {
                let i = this.getOutlet(t, n);
                i && this.connectOutlet(i, t, n)
            }
            selectorUnmatched(t, e, {
                outletName: n
            }) {
                let i = this.getOutletFromMap(t, n);
                i && this.disconnectOutlet(i, t, n)
            }
            selectorMatchElement(t, {
                outletName: e
            }) {
                let n = this.selector(e),
                    i = this.hasOutlet(t, e),
                    a = t.matches(`[${this.schema.controllerAttribute}~=${e}]`);
                return n ? i && a && t.matches(n) : !1
            }
            elementMatchedAttribute(t, e) {
                let n = this.getOutletNameFromOutletAttributeName(e);
                n && this.updateSelectorObserverForOutlet(n)
            }
            elementAttributeValueChanged(t, e) {
                let n = this.getOutletNameFromOutletAttributeName(e);
                n && this.updateSelectorObserverForOutlet(n)
            }
            elementUnmatchedAttribute(t, e) {
                let n = this.getOutletNameFromOutletAttributeName(e);
                n && this.updateSelectorObserverForOutlet(n)
            }
            connectOutlet(t, e, n) {
                var i;
                this.outletElementsByName.has(n, e) || (this.outletsByName.add(n, t), this.outletElementsByName.add(n, e), (i = this.selectorObserverMap.get(n)) === null || i === void 0 || i.pause(() => this.delegate.outletConnected(t, e, n)))
            }
            disconnectOutlet(t, e, n) {
                var i;
                this.outletElementsByName.has(n, e) && (this.outletsByName.delete(n, t), this.outletElementsByName.delete(n, e), (i = this.selectorObserverMap.get(n)) === null || i === void 0 || i.pause(() => this.delegate.outletDisconnected(t, e, n)))
            }
            disconnectAllOutlets() {
                for (let t of this.outletElementsByName.keys)
                    for (let e of this.outletElementsByName.getValuesForKey(t))
                        for (let n of this.outletsByName.getValuesForKey(t)) this.disconnectOutlet(n, e, t)
            }
            updateSelectorObserverForOutlet(t) {
                let e = this.selectorObserverMap.get(t);
                e && (e.selector = this.selector(t))
            }
            setupSelectorObserverForOutlet(t) {
                let e = this.selector(t),
                    n = new Xe(document.body, e, this, {
                        outletName: t
                    });
                this.selectorObserverMap.set(t, n), n.start()
            }
            setupAttributeObserverForOutlet(t) {
                let e = this.attributeNameForOutletName(t),
                    n = new qt(this.scope.element, e, this);
                this.attributeObserverMap.set(t, n), n.start()
            }
            selector(t) {
                return this.scope.outlets.getSelectorForOutletName(t)
            }
            attributeNameForOutletName(t) {
                return this.scope.schema.outletAttributeForScope(this.identifier, t)
            }
            getOutletNameFromOutletAttributeName(t) {
                return this.outletDefinitions.find(e => this.attributeNameForOutletName(e) === t)
            }
            get outletDependencies() {
                let t = new it;
                return this.router.modules.forEach(e => {
                    let n = e.definition.controllerConstructor;
                    Wt(n, "outlets").forEach(a => t.add(a, e.identifier))
                }), t
            }
            get outletDefinitions() {
                return this.outletDependencies.getKeysForValue(this.identifier)
            }
            get dependentControllerIdentifiers() {
                return this.outletDependencies.getValuesForKey(this.identifier)
            }
            get dependentContexts() {
                let t = this.dependentControllerIdentifiers;
                return this.router.contexts.filter(e => t.includes(e.identifier))
            }
            hasOutlet(t, e) {
                return !!this.getOutlet(t, e) || !!this.getOutletFromMap(t, e)
            }
            getOutlet(t, e) {
                return this.application.getControllerForElementAndIdentifier(t, e)
            }
            getOutletFromMap(t, e) {
                return this.outletsByName.getValuesForKey(e).find(n => n.element === t)
            }
            get scope() {
                return this.context.scope
            }
            get schema() {
                return this.context.schema
            }
            get identifier() {
                return this.context.identifier
            }
            get application() {
                return this.context.application
            }
            get router() {
                return this.application.router
            }
        },
        Pe = class {
            constructor(t, e) {
                this.logDebugActivity = (n, i = {}) => {
                    let {
                        identifier: a,
                        controller: l,
                        element: c
                    } = this;
                    i = Object.assign({
                        identifier: a,
                        controller: l,
                        element: c
                    }, i), this.application.logDebugActivity(this.identifier, n, i)
                }, this.module = t, this.scope = e, this.controller = new t.controllerConstructor(this), this.bindingObserver = new Je(this, this.dispatcher), this.valueObserver = new ze(this, this.controller), this.targetObserver = new He(this, this), this.outletObserver = new je(this, this);
                try {
                    this.controller.initialize(), this.logDebugActivity("initialize")
                } catch (n) {
                    this.handleError(n, "initializing controller")
                }
            }
            connect() {
                this.bindingObserver.start(), this.valueObserver.start(), this.targetObserver.start(), this.outletObserver.start();
                try {
                    this.controller.connect(), this.logDebugActivity("connect")
                } catch (t) {
                    this.handleError(t, "connecting controller")
                }
            }
            refresh() {
                this.outletObserver.refresh()
            }
            disconnect() {
                try {
                    this.controller.disconnect(), this.logDebugActivity("disconnect")
                } catch (t) {
                    this.handleError(t, "disconnecting controller")
                }
                this.outletObserver.stop(), this.targetObserver.stop(), this.valueObserver.stop(), this.bindingObserver.stop()
            }
            get application() {
                return this.module.application
            }
            get identifier() {
                return this.module.identifier
            }
            get schema() {
                return this.application.schema
            }
            get dispatcher() {
                return this.application.dispatcher
            }
            get element() {
                return this.scope.element
            }
            get parentElement() {
                return this.element.parentElement
            }
            handleError(t, e, n = {}) {
                let {
                    identifier: i,
                    controller: a,
                    element: l
                } = this;
                n = Object.assign({
                    identifier: i,
                    controller: a,
                    element: l
                }, n), this.application.handleError(t, `Error ${e}`, n)
            }
            targetConnected(t, e) {
                this.invokeControllerMethod(`${e}TargetConnected`, t)
            }
            targetDisconnected(t, e) {
                this.invokeControllerMethod(`${e}TargetDisconnected`, t)
            }
            outletConnected(t, e, n) {
                this.invokeControllerMethod(`${Ie(n)}OutletConnected`, t, e)
            }
            outletDisconnected(t, e, n) {
                this.invokeControllerMethod(`${Ie(n)}OutletDisconnected`, t, e)
            }
            invokeControllerMethod(t, ...e) {
                let n = this.controller;
                typeof n[t] == "function" && n[t](...e)
            }
        };

    function _o(o) {
        return No(o, Ao(o))
    }

    function No(o, t) {
        let e = zo(o),
            n = Xo(o.prototype, t);
        return Object.defineProperties(e.prototype, n), e
    }

    function Ao(o) {
        return Wt(o, "blessings").reduce((e, n) => {
            let i = n(o);
            for (let a in i) {
                let l = e[a] || {};
                e[a] = Object.assign(l, i[a])
            }
            return e
        }, {})
    }

    function Xo(o, t) {
        return Jo(t).reduce((e, n) => {
            let i = Yo(o, t, n);
            return i && Object.assign(e, {
                [n]: i
            }), e
        }, {})
    }

    function Yo(o, t, e) {
        let n = Object.getOwnPropertyDescriptor(o, e);
        if (!(n && "value" in n)) {
            let a = Object.getOwnPropertyDescriptor(t, e).value;
            return n && (a.get = n.get || a.get, a.set = n.set || a.set), a
        }
    }
    var Jo = typeof Object.getOwnPropertySymbols == "function" ? o => [...Object.getOwnPropertyNames(o), ...Object.getOwnPropertySymbols(o)] : Object.getOwnPropertyNames,
        zo = (() => {
            function o(e) {
                function n() {
                    return Reflect.construct(e, arguments, new.target)
                }
                return n.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: n
                    }
                }), Reflect.setPrototypeOf(n, e), n
            }

            function t() {
                let n = o(function() {
                    this.a.call(this)
                });
                return n.prototype.a = function() {}, new n
            }
            try {
                return t(), o
            } catch {
                return n => class extends n {}
            }
        })();

    function Ho(o) {
        return {
            identifier: o.identifier,
            controllerConstructor: _o(o.controllerConstructor)
        }
    }
    var Ke = class {
            constructor(t, e) {
                this.application = t, this.definition = Ho(e), this.contextsByScope = new WeakMap, this.connectedContexts = new Set
            }
            get identifier() {
                return this.definition.identifier
            }
            get controllerConstructor() {
                return this.definition.controllerConstructor
            }
            get contexts() {
                return Array.from(this.connectedContexts)
            }
            connectContextForScope(t) {
                let e = this.fetchContextForScope(t);
                this.connectedContexts.add(e), e.connect()
            }
            disconnectContextForScope(t) {
                let e = this.contextsByScope.get(t);
                e && (this.connectedContexts.delete(e), e.disconnect())
            }
            fetchContextForScope(t) {
                let e = this.contextsByScope.get(t);
                return e || (e = new Pe(this, t), this.contextsByScope.set(t, e)), e
            }
        },
        $e = class {
            constructor(t) {
                this.scope = t
            }
            has(t) {
                return this.data.has(this.getDataKey(t))
            }
            get(t) {
                return this.getAll(t)[0]
            }
            getAll(t) {
                let e = this.data.get(this.getDataKey(t)) || "";
                return Ro(e)
            }
            getAttributeName(t) {
                return this.data.getAttributeNameForKey(this.getDataKey(t))
            }
            getDataKey(t) {
                return `${t}-class`
            }
            get data() {
                return this.scope.data
            }
        },
        qe = class {
            constructor(t) {
                this.scope = t
            }
            get element() {
                return this.scope.element
            }
            get identifier() {
                return this.scope.identifier
            }
            get(t) {
                let e = this.getAttributeNameForKey(t);
                return this.element.getAttribute(e)
            }
            set(t, e) {
                let n = this.getAttributeNameForKey(t);
                return this.element.setAttribute(n, e), this.get(t)
            }
            has(t) {
                let e = this.getAttributeNameForKey(t);
                return this.element.hasAttribute(e)
            }
            delete(t) {
                if (this.has(t)) {
                    let e = this.getAttributeNameForKey(t);
                    return this.element.removeAttribute(e), !0
                } else return !1
            }
            getAttributeNameForKey(t) {
                return `data-${this.identifier}-${ci(t)}`
            }
        },
        tn = class {
            constructor(t) {
                this.warnedKeysByObject = new WeakMap, this.logger = t
            }
            warn(t, e, n) {
                let i = this.warnedKeysByObject.get(t);
                i || (i = new Set, this.warnedKeysByObject.set(t, i)), i.has(e) || (i.add(e), this.logger.warn(n, t))
            }
        };

    function en(o, t) {
        return `[${o}~="${t}"]`
    }
    var nn = class {
            constructor(t) {
                this.scope = t
            }
            get element() {
                return this.scope.element
            }
            get identifier() {
                return this.scope.identifier
            }
            get schema() {
                return this.scope.schema
            }
            has(t) {
                return this.find(t) != null
            }
            find(...t) {
                return t.reduce((e, n) => e || this.findTarget(n) || this.findLegacyTarget(n), void 0)
            }
            findAll(...t) {
                return t.reduce((e, n) => [...e, ...this.findAllTargets(n), ...this.findAllLegacyTargets(n)], [])
            }
            findTarget(t) {
                let e = this.getSelectorForTargetName(t);
                return this.scope.findElement(e)
            }
            findAllTargets(t) {
                let e = this.getSelectorForTargetName(t);
                return this.scope.findAllElements(e)
            }
            getSelectorForTargetName(t) {
                let e = this.schema.targetAttributeForScope(this.identifier);
                return en(e, t)
            }
            findLegacyTarget(t) {
                let e = this.getLegacySelectorForTargetName(t);
                return this.deprecate(this.scope.findElement(e), t)
            }
            findAllLegacyTargets(t) {
                let e = this.getLegacySelectorForTargetName(t);
                return this.scope.findAllElements(e).map(n => this.deprecate(n, t))
            }
            getLegacySelectorForTargetName(t) {
                let e = `${this.identifier}.${t}`;
                return en(this.schema.targetAttribute, e)
            }
            deprecate(t, e) {
                if (t) {
                    let {
                        identifier: n
                    } = this, i = this.schema.targetAttribute, a = this.schema.targetAttributeForScope(n);
                    this.guide.warn(t, `target:${e}`, `Please replace ${i}="${n}.${e}" with ${a}="${e}". The ${i} attribute is deprecated and will be removed in a future version of Stimulus.`)
                }
                return t
            }
            get guide() {
                return this.scope.guide
            }
        },
        on = class {
            constructor(t, e) {
                this.scope = t, this.controllerElement = e
            }
            get element() {
                return this.scope.element
            }
            get identifier() {
                return this.scope.identifier
            }
            get schema() {
                return this.scope.schema
            }
            has(t) {
                return this.find(t) != null
            }
            find(...t) {
                return t.reduce((e, n) => e || this.findOutlet(n), void 0)
            }
            findAll(...t) {
                return t.reduce((e, n) => [...e, ...this.findAllOutlets(n)], [])
            }
            getSelectorForOutletName(t) {
                let e = this.schema.outletAttributeForScope(this.identifier, t);
                return this.controllerElement.getAttribute(e)
            }
            findOutlet(t) {
                let e = this.getSelectorForOutletName(t);
                if (e) return this.findElement(e, t)
            }
            findAllOutlets(t) {
                let e = this.getSelectorForOutletName(t);
                return e ? this.findAllElements(e, t) : []
            }
            findElement(t, e) {
                return this.scope.queryElements(t).filter(i => this.matchesElement(i, t, e))[0]
            }
            findAllElements(t, e) {
                return this.scope.queryElements(t).filter(i => this.matchesElement(i, t, e))
            }
            matchesElement(t, e, n) {
                let i = t.getAttribute(this.scope.schema.controllerAttribute) || "";
                return t.matches(e) && i.split(" ").includes(n)
            }
        },
        sn = class o {
            constructor(t, e, n, i) {
                this.targets = new nn(this), this.classes = new $e(this), this.data = new qe(this), this.containsElement = a => a.closest(this.controllerSelector) === this.element, this.schema = t, this.element = e, this.identifier = n, this.guide = new tn(i), this.outlets = new on(this.documentScope, e)
            }
            findElement(t) {
                return this.element.matches(t) ? this.element : this.queryElements(t).find(this.containsElement)
            }
            findAllElements(t) {
                return [...this.element.matches(t) ? [this.element] : [], ...this.queryElements(t).filter(this.containsElement)]
            }
            queryElements(t) {
                return Array.from(this.element.querySelectorAll(t))
            }
            get controllerSelector() {
                return en(this.schema.controllerAttribute, this.identifier)
            }
            get isDocumentScope() {
                return this.element === document.documentElement
            }
            get documentScope() {
                return this.isDocumentScope ? this : new o(this.schema, document.documentElement, this.identifier, this.guide.logger)
            }
        },
        an = class {
            constructor(t, e, n) {
                this.element = t, this.schema = e, this.delegate = n, this.valueListObserver = new ee(this.element, this.controllerAttribute, this), this.scopesByIdentifierByElement = new WeakMap, this.scopeReferenceCounts = new WeakMap
            }
            start() {
                this.valueListObserver.start()
            }
            stop() {
                this.valueListObserver.stop()
            }
            get controllerAttribute() {
                return this.schema.controllerAttribute
            }
            parseValueForToken(t) {
                let {
                    element: e,
                    content: n
                } = t;
                return this.parseValueForElementAndIdentifier(e, n)
            }
            parseValueForElementAndIdentifier(t, e) {
                let n = this.fetchScopesByIdentifierForElement(t),
                    i = n.get(e);
                return i || (i = this.delegate.createScopeForElementAndIdentifier(t, e), n.set(e, i)), i
            }
            elementMatchedValue(t, e) {
                let n = (this.scopeReferenceCounts.get(e) || 0) + 1;
                this.scopeReferenceCounts.set(e, n), n == 1 && this.delegate.scopeConnected(e)
            }
            elementUnmatchedValue(t, e) {
                let n = this.scopeReferenceCounts.get(e);
                n && (this.scopeReferenceCounts.set(e, n - 1), n == 1 && this.delegate.scopeDisconnected(e))
            }
            fetchScopesByIdentifierForElement(t) {
                let e = this.scopesByIdentifierByElement.get(t);
                return e || (e = new Map, this.scopesByIdentifierByElement.set(t, e)), e
            }
        },
        rn = class {
            constructor(t) {
                this.application = t, this.scopeObserver = new an(this.element, this.schema, this), this.scopesByIdentifier = new it, this.modulesByIdentifier = new Map
            }
            get element() {
                return this.application.element
            }
            get schema() {
                return this.application.schema
            }
            get logger() {
                return this.application.logger
            }
            get controllerAttribute() {
                return this.schema.controllerAttribute
            }
            get modules() {
                return Array.from(this.modulesByIdentifier.values())
            }
            get contexts() {
                return this.modules.reduce((t, e) => t.concat(e.contexts), [])
            }
            start() {
                this.scopeObserver.start()
            }
            stop() {
                this.scopeObserver.stop()
            }
            loadDefinition(t) {
                this.unloadIdentifier(t.identifier);
                let e = new Ke(this.application, t);
                this.connectModule(e);
                let n = t.controllerConstructor.afterLoad;
                n && n.call(t.controllerConstructor, t.identifier, this.application)
            }
            unloadIdentifier(t) {
                let e = this.modulesByIdentifier.get(t);
                e && this.disconnectModule(e)
            }
            getContextForElementAndIdentifier(t, e) {
                let n = this.modulesByIdentifier.get(e);
                if (n) return n.contexts.find(i => i.element == t)
            }
            proposeToConnectScopeForElementAndIdentifier(t, e) {
                let n = this.scopeObserver.parseValueForElementAndIdentifier(t, e);
                n ? this.scopeObserver.elementMatchedValue(n.element, n) : console.error(`Couldn't find or create scope for identifier: "${e}" and element:`, t)
            }
            handleError(t, e, n) {
                this.application.handleError(t, e, n)
            }
            createScopeForElementAndIdentifier(t, e) {
                return new sn(this.schema, t, e, this.logger)
            }
            scopeConnected(t) {
                this.scopesByIdentifier.add(t.identifier, t);
                let e = this.modulesByIdentifier.get(t.identifier);
                e && e.connectContextForScope(t)
            }
            scopeDisconnected(t) {
                this.scopesByIdentifier.delete(t.identifier, t);
                let e = this.modulesByIdentifier.get(t.identifier);
                e && e.disconnectContextForScope(t)
            }
            connectModule(t) {
                this.modulesByIdentifier.set(t.identifier, t), this.scopesByIdentifier.getValuesForKey(t.identifier).forEach(n => t.connectContextForScope(n))
            }
            disconnectModule(t) {
                this.modulesByIdentifier.delete(t.identifier), this.scopesByIdentifier.getValuesForKey(t.identifier).forEach(n => t.disconnectContextForScope(n))
            }
        },
        jo = {
            controllerAttribute: "data-controller",
            actionAttribute: "data-action",
            targetAttribute: "data-target",
            targetAttributeForScope: o => `data-${o}-target`,
            outletAttributeForScope: (o, t) => `data-${o}-${t}-outlet`,
            keyMappings: Object.assign(Object.assign({
                enter: "Enter",
                tab: "Tab",
                esc: "Escape",
                space: " ",
                up: "ArrowUp",
                down: "ArrowDown",
                left: "ArrowLeft",
                right: "ArrowRight",
                home: "Home",
                end: "End",
                page_up: "PageUp",
                page_down: "PageDown"
            }, ii("abcdefghijklmnopqrstuvwxyz".split("").map(o => [o, o]))), ii("0123456789".split("").map(o => [o, o])))
        };

    function ii(o) {
        return o.reduce((t, [e, n]) => Object.assign(Object.assign({}, t), {
            [e]: n
        }), {})
    }
    var ne = class {
        constructor(t = document.documentElement, e = jo) {
            this.logger = console, this.debug = !1, this.logDebugActivity = (n, i, a = {}) => {
                this.debug && this.logFormattedMessage(n, i, a)
            }, this.element = t, this.schema = e, this.dispatcher = new De(this), this.router = new rn(this), this.actionDescriptorFilters = Object.assign({}, yo)
        }
        static start(t, e) {
            let n = new this(t, e);
            return n.start(), n
        }
        async start() {
            await Po(), this.logDebugActivity("application", "starting"), this.dispatcher.start(), this.router.start(), this.logDebugActivity("application", "start")
        }
        stop() {
            this.logDebugActivity("application", "stopping"), this.dispatcher.stop(), this.router.stop(), this.logDebugActivity("application", "stop")
        }
        register(t, e) {
            this.load({
                identifier: t,
                controllerConstructor: e
            })
        }
        registerActionOption(t, e) {
            this.actionDescriptorFilters[t] = e
        }
        load(t, ...e) {
            (Array.isArray(t) ? t : [t, ...e]).forEach(i => {
                i.controllerConstructor.shouldLoad && this.router.loadDefinition(i)
            })
        }
        unload(t, ...e) {
            (Array.isArray(t) ? t : [t, ...e]).forEach(i => this.router.unloadIdentifier(i))
        }
        get controllers() {
            return this.router.contexts.map(t => t.controller)
        }
        getControllerForElementAndIdentifier(t, e) {
            let n = this.router.getContextForElementAndIdentifier(t, e);
            return n ? n.controller : null
        }
        handleError(t, e, n) {
            var i;
            this.logger.error(`%s

%o

%o`, e, t, n), (i = window.onerror) === null || i === void 0 || i.call(window, e, "", 0, 0, t)
        }
        logFormattedMessage(t, e, n = {}) {
            n = Object.assign({
                application: this
            }, n), this.logger.groupCollapsed(`${t} #${e}`), this.logger.log("details:", Object.assign({}, n)), this.logger.groupEnd()
        }
    };

    function Po() {
        return new Promise(o => {
            document.readyState == "loading" ? document.addEventListener("DOMContentLoaded", () => o()) : o()
        })
    }

    function Ko(o) {
        return Wt(o, "classes").reduce((e, n) => Object.assign(e, $o(n)), {})
    }

    function $o(o) {
        return {
            [`${o}Class`]: {
                get() {
                    let {
                        classes: t
                    } = this;
                    if (t.has(o)) return t.get(o);
                    {
                        let e = t.getAttributeName(o);
                        throw new Error(`Missing attribute "${e}"`)
                    }
                }
            },
            [`${o}Classes`]: {
                get() {
                    return this.classes.getAll(o)
                }
            },
            [`has${wt(o)}Class`]: {
                get() {
                    return this.classes.has(o)
                }
            }
        }
    }

    function qo(o) {
        return Wt(o, "outlets").reduce((e, n) => Object.assign(e, ts(n)), {})
    }

    function oi(o, t, e) {
        return o.application.getControllerForElementAndIdentifier(t, e)
    }

    function si(o, t, e) {
        let n = oi(o, t, e);
        if (n || (o.application.router.proposeToConnectScopeForElementAndIdentifier(t, e), n = oi(o, t, e), n)) return n
    }

    function ts(o) {
        let t = Ie(o);
        return {
            [`${t}Outlet`]: {
                get() {
                    let e = this.outlets.find(o),
                        n = this.outlets.getSelectorForOutletName(o);
                    if (e) {
                        let i = si(this, e, o);
                        if (i) return i;
                        throw new Error(`The provided outlet element is missing an outlet controller "${o}" instance for host controller "${this.identifier}"`)
                    }
                    throw new Error(`Missing outlet element "${o}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${n}".`)
                }
            },
            [`${t}Outlets`]: {
                get() {
                    let e = this.outlets.findAll(o);
                    return e.length > 0 ? e.map(n => {
                        let i = si(this, n, o);
                        if (i) return i;
                        console.warn(`The provided outlet element is missing an outlet controller "${o}" instance for host controller "${this.identifier}"`, n)
                    }).filter(n => n) : []
                }
            },
            [`${t}OutletElement`]: {
                get() {
                    let e = this.outlets.find(o),
                        n = this.outlets.getSelectorForOutletName(o);
                    if (e) return e;
                    throw new Error(`Missing outlet element "${o}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${n}".`)
                }
            },
            [`${t}OutletElements`]: {
                get() {
                    return this.outlets.findAll(o)
                }
            },
            [`has${wt(t)}Outlet`]: {
                get() {
                    return this.outlets.has(o)
                }
            }
        }
    }

    function es(o) {
        return Wt(o, "targets").reduce((e, n) => Object.assign(e, ns(n)), {})
    }

    function ns(o) {
        return {
            [`${o}Target`]: {
                get() {
                    let t = this.targets.find(o);
                    if (t) return t;
                    throw new Error(`Missing target element "${o}" for "${this.identifier}" controller`)
                }
            },
            [`${o}Targets`]: {
                get() {
                    return this.targets.findAll(o)
                }
            },
            [`has${wt(o)}Target`]: {
                get() {
                    return this.targets.has(o)
                }
            }
        }
    }

    function is(o) {
        let t = Go(o, "values"),
            e = {
                valueDescriptorMap: {
                    get() {
                        return t.reduce((n, i) => {
                            let a = ui(i, this.identifier),
                                l = this.data.getAttributeNameForKey(a.key);
                            return Object.assign(n, {
                                [l]: a
                            })
                        }, {})
                    }
                }
            };
        return t.reduce((n, i) => Object.assign(n, os(i)), e)
    }

    function os(o, t) {
        let e = ui(o, t),
            {
                key: n,
                name: i,
                reader: a,
                writer: l
            } = e;
        return {
            [i]: {
                get() {
                    let c = this.data.get(n);
                    return c !== null ? a(c) : e.defaultValue
                },
                set(c) {
                    c === void 0 ? this.data.delete(n) : this.data.set(n, l(c))
                }
            },
            [`has${wt(i)}`]: {
                get() {
                    return this.data.has(n) || e.hasCustomDefaultValue
                }
            }
        }
    }

    function ui([o, t], e) {
        return ls({
            controller: e,
            token: o,
            typeDefinition: t
        })
    }

    function ie(o) {
        switch (o) {
            case Array:
                return "array";
            case Boolean:
                return "boolean";
            case Number:
                return "number";
            case Object:
                return "object";
            case String:
                return "string"
        }
    }

    function xt(o) {
        switch (typeof o) {
            case "boolean":
                return "boolean";
            case "number":
                return "number";
            case "string":
                return "string"
        }
        if (Array.isArray(o)) return "array";
        if (Object.prototype.toString.call(o) === "[object Object]") return "object"
    }

    function ss(o) {
        let {
            controller: t,
            token: e,
            typeObject: n
        } = o, i = ti(n.type), a = ti(n.default), l = i && a, c = i && !a, h = !i && a, m = ie(n.type), s = xt(o.typeObject.default);
        if (c) return m;
        if (h) return s;
        if (m !== s) {
            let r = t ? `${t}.${e}` : e;
            throw new Error(`The specified default value for the Stimulus Value "${r}" must match the defined type "${m}". The provided default value of "${n.default}" is of type "${s}".`)
        }
        if (l) return m
    }

    function as(o) {
        let {
            controller: t,
            token: e,
            typeDefinition: n
        } = o, a = ss({
            controller: t,
            token: e,
            typeObject: n
        }), l = xt(n), c = ie(n), h = a || l || c;
        if (h) return h;
        let m = t ? `${t}.${n}` : e;
        throw new Error(`Unknown value type "${m}" for "${e}" value`)
    }

    function rs(o) {
        let t = ie(o);
        if (t) return ai[t];
        let e = _e(o, "default"),
            n = _e(o, "type"),
            i = o;
        if (e) return i.default;
        if (n) {
            let {
                type: a
            } = i, l = ie(a);
            if (l) return ai[l]
        }
        return o
    }

    function ls(o) {
        let {
            token: t,
            typeDefinition: e
        } = o, n = `${ci(t)}-value`, i = as(o);
        return {
            type: i,
            key: n,
            name: ln(n),
            get defaultValue() {
                return rs(e)
            },
            get hasCustomDefaultValue() {
                return xt(e) !== void 0
            },
            reader: cs[i],
            writer: ri[i] || ri.default
        }
    }
    var ai = {
            get array() {
                return []
            },
            boolean: !1,
            number: 0,
            get object() {
                return {}
            },
            string: ""
        },
        cs = {
            array(o) {
                let t = JSON.parse(o);
                if (!Array.isArray(t)) throw new TypeError(`expected value of type "array" but instead got value "${o}" of type "${xt(t)}"`);
                return t
            },
            boolean(o) {
                return !(o == "0" || String(o).toLowerCase() == "false")
            },
            number(o) {
                return Number(o.replace(/_/g, ""))
            },
            object(o) {
                let t = JSON.parse(o);
                if (t === null || typeof t != "object" || Array.isArray(t)) throw new TypeError(`expected value of type "object" but instead got value "${o}" of type "${xt(t)}"`);
                return t
            },
            string(o) {
                return o
            }
        },
        ri = {
            default: ds,
            array: li,
            object: li
        };

    function li(o) {
        return JSON.stringify(o)
    }

    function ds(o) {
        return `${o}`
    }
    var R = class {
        constructor(t) {
            this.context = t
        }
        static get shouldLoad() {
            return !0
        }
        static afterLoad(t, e) {}
        get application() {
            return this.context.application
        }
        get scope() {
            return this.context.scope
        }
        get element() {
            return this.scope.element
        }
        get identifier() {
            return this.scope.identifier
        }
        get targets() {
            return this.scope.targets
        }
        get outlets() {
            return this.scope.outlets
        }
        get classes() {
            return this.scope.classes
        }
        get data() {
            return this.scope.data
        }
        initialize() {}
        connect() {}
        disconnect() {}
        dispatch(t, {
            target: e = this.element,
            detail: n = {},
            prefix: i = this.identifier,
            bubbles: a = !0,
            cancelable: l = !0
        } = {}) {
            let c = i ? `${i}:${t}` : t,
                h = new CustomEvent(c, {
                    detail: n,
                    bubbles: a,
                    cancelable: l
                });
            return e.dispatchEvent(h), h
        }
    };
    R.blessings = [Ko, es, is, qo];
    R.targets = [];
    R.outlets = [];
    R.values = {};
    var B = (o, t = 1e4) => (o = parseFloat(o + "") || 0, Math.round((o + Number.EPSILON) * t) / t),
        xn = function(o) {
            if (!(o && o instanceof Element && o.offsetParent)) return !1;
            let t = o.scrollHeight > o.clientHeight,
                e = window.getComputedStyle(o).overflowY,
                n = e.indexOf("hidden") !== -1,
                i = e.indexOf("visible") !== -1;
            return t && !n && !i
        },
        Qe = function(o, t = void 0) {
            return !(!o || o === document.body || t && o === t) && (xn(o) ? o : Qe(o.parentElement, t))
        },
        tt = function(o) {
            var t = new DOMParser().parseFromString(o, "text/html").body;
            if (t.childElementCount > 1) {
                for (var e = document.createElement("div"); t.firstChild;) e.appendChild(t.firstChild);
                return e
            }
            return t.firstChild
        },
        Rn = o => `${o||""}`.split(" ").filter(t => !!t),
        et = (o, t, e) => {
            o && Rn(t).forEach(n => {
                o.classList.toggle(n, e || !1)
            })
        },
        dt = class {
            constructor(t) {
                Object.defineProperty(this, "pageX", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "pageY", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "clientX", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "clientY", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "id", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "time", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "nativePointer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, this.time = Date.now()
            }
        },
        bt = {
            passive: !1
        },
        wn = class {
            constructor(t, {
                start: e = () => !0,
                move: n = () => {},
                end: i = () => {}
            }) {
                Object.defineProperty(this, "element", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "startCallback", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "moveCallback", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "endCallback", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "currentPointers", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "startPointers", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), this.element = t, this.startCallback = e, this.moveCallback = n, this.endCallback = i;
                for (let a of ["onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur"]) this[a] = this[a].bind(this);
                this.element.addEventListener("mousedown", this.onPointerStart, bt), this.element.addEventListener("touchstart", this.onTouchStart, bt), this.element.addEventListener("touchmove", this.onMove, bt), this.element.addEventListener("touchend", this.onTouchEnd), this.element.addEventListener("touchcancel", this.onTouchEnd)
            }
            onPointerStart(t) {
                if (!t.buttons || t.button !== 0) return;
                let e = new dt(t);
                this.currentPointers.some(n => n.id === e.id) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur))
            }
            onTouchStart(t) {
                for (let e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new dt(e), t);
                window.addEventListener("blur", this.onWindowBlur)
            }
            onMove(t) {
                let e = this.currentPointers.slice(),
                    n = "changedTouches" in t ? Array.from(t.changedTouches || []).map(a => new dt(a)) : [new dt(t)],
                    i = [];
                for (let a of n) {
                    let l = this.currentPointers.findIndex(c => c.id === a.id);
                    l < 0 || (i.push(a), this.currentPointers[l] = a)
                }
                i.length && this.moveCallback(t, this.currentPointers.slice(), e)
            }
            onPointerEnd(t) {
                t.buttons > 0 && t.button !== 0 || (this.triggerPointerEnd(t, new dt(t)), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur))
            }
            onTouchEnd(t) {
                for (let e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new dt(e))
            }
            triggerPointerStart(t, e) {
                return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), this.startPointers.push(t), !0)
            }
            triggerPointerEnd(t, e) {
                let n = this.currentPointers.findIndex(i => i.id === e.id);
                n < 0 || (this.currentPointers.splice(n, 1), this.startPointers.splice(n, 1), this.endCallback(t, e, this.currentPointers.slice()))
            }
            onWindowBlur() {
                this.clear()
            }
            clear() {
                for (; this.currentPointers.length;) {
                    let t = this.currentPointers[this.currentPointers.length - 1];
                    this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), this.endCallback(new Event("touchend", {
                        bubbles: !0,
                        cancelable: !0,
                        clientX: t.clientX,
                        clientY: t.clientY
                    }), t, this.currentPointers.slice())
                }
            }
            stop() {
                this.element.removeEventListener("mousedown", this.onPointerStart, bt), this.element.removeEventListener("touchstart", this.onTouchStart, bt), this.element.removeEventListener("touchmove", this.onMove, bt), this.element.removeEventListener("touchend", this.onTouchEnd), this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur)
            }
        };

    function mi(o, t) {
        return t ? Math.sqrt(Math.pow(t.clientX - o.clientX, 2) + Math.pow(t.clientY - o.clientY, 2)) : 0
    }

    function pi(o, t) {
        return t ? {
            clientX: (o.clientX + t.clientX) / 2,
            clientY: (o.clientY + t.clientY) / 2
        } : o
    }
    var Wn = o => typeof o == "object" && o !== null && o.constructor === Object && Object.prototype.toString.call(o) === "[object Object]",
        A = (o, ...t) => {
            let e = t.length;
            for (let n = 0; n < e; n++) {
                let i = t[n] || {};
                Object.entries(i).forEach(([a, l]) => {
                    let c = Array.isArray(l) ? [] : {};
                    o[a] || Object.assign(o, {
                        [a]: c
                    }), Wn(l) ? Object.assign(o[a], A(c, l)) : Array.isArray(l) ? Object.assign(o, {
                        [a]: [...l]
                    }) : Object.assign(o, {
                        [a]: l
                    })
                })
            }
            return o
        },
        cn = function(o, t) {
            return o.split(".").reduce((e, n) => typeof e == "object" ? e[n] : void 0, t)
        },
        yt = class {
            constructor(t = {}) {
                Object.defineProperty(this, "options", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t
                }), Object.defineProperty(this, "events", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: new Map
                }), this.setOptions(t);
                for (let e of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) e.startsWith("on") && typeof this[e] == "function" && (this[e] = this[e].bind(this))
            }
            setOptions(t) {
                this.options = t ? A({}, this.constructor.defaults, t) : {};
                for (let [e, n] of Object.entries(this.option("on") || {})) this.on(e, n)
            }
            option(t, ...e) {
                let n = cn(t, this.options);
                return n && typeof n == "function" && (n = n.call(this, this, ...e)), n
            }
            optionFor(t, e, n, ...i) {
                let a = cn(e, t);
                var l;
                typeof(l = a) != "string" || isNaN(l) || isNaN(parseFloat(l)) || (a = parseFloat(a)), a === "true" && (a = !0), a === "false" && (a = !1), a && typeof a == "function" && (a = a.call(this, this, t, ...i));
                let c = cn(e, this.options);
                return c && typeof c == "function" ? a = c.call(this, this, t, ...i, a) : a === void 0 && (a = c), a === void 0 ? n : a
            }
            cn(t) {
                let e = this.options.classes;
                return e && e[t] || ""
            }
            localize(t, e = []) {
                t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (n, i, a) => {
                    let l = "";
                    return a ? l = this.option(`${i[0]+i.toLowerCase().substring(1)}.l10n.${a}`) : i && (l = this.option(`l10n.${i}`)), l || (l = n), l
                });
                for (let n = 0; n < e.length; n++) t = t.split(e[n][0]).join(e[n][1]);
                return t = t.replace(/\{\{(.*?)\}\}/g, (n, i) => i)
            }
            on(t, e) {
                let n = [];
                typeof t == "string" ? n = t.split(" ") : Array.isArray(t) && (n = t), this.events || (this.events = new Map), n.forEach(i => {
                    let a = this.events.get(i);
                    a || (this.events.set(i, []), a = []), a.includes(e) || a.push(e), this.events.set(i, a)
                })
            }
            off(t, e) {
                let n = [];
                typeof t == "string" ? n = t.split(" ") : Array.isArray(t) && (n = t), n.forEach(i => {
                    let a = this.events.get(i);
                    if (Array.isArray(a)) {
                        let l = a.indexOf(e);
                        l > -1 && a.splice(l, 1)
                    }
                })
            }
            emit(t, ...e) {
                [...this.events.get(t) || []].forEach(n => n(this, ...e)), t !== "*" && this.emit("*", t, ...e)
            }
        };
    Object.defineProperty(yt, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.36"
    }), Object.defineProperty(yt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    var Ot = class extends yt {
            constructor(t = {}) {
                super(t), Object.defineProperty(this, "plugins", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                })
            }
            attachPlugins(t = {}) {
                let e = new Map;
                for (let [n, i] of Object.entries(t)) {
                    let a = this.option(n),
                        l = this.plugins[n];
                    l || a === !1 ? l && a === !1 && (l.detach(), delete this.plugins[n]) : e.set(n, new i(this, a || {}))
                }
                for (let [n, i] of e) this.plugins[n] = i, i.attach()
            }
            detachPlugins(t) {
                t = t || Object.keys(this.plugins);
                for (let e of t) {
                    let n = this.plugins[e];
                    n && n.detach(), delete this.plugins[e]
                }
                return this.emit("detachPlugins"), this
            }
        },
        O;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Error = 1] = "Error", o[o.Ready = 2] = "Ready", o[o.Panning = 3] = "Panning", o[o.Mousemove = 4] = "Mousemove", o[o.Destroy = 5] = "Destroy"
    })(O || (O = {}));
    var ot = ["a", "b", "c", "d", "e", "f"],
        Ni = {
            PANUP: "Move up",
            PANDOWN: "Move down",
            PANLEFT: "Move left",
            PANRIGHT: "Move right",
            ZOOMIN: "Zoom in",
            ZOOMOUT: "Zoom out",
            TOGGLEZOOM: "Toggle zoom level",
            TOGGLE1TO1: "Toggle zoom level",
            ITERATEZOOM: "Toggle zoom level",
            ROTATECCW: "Rotate counterclockwise",
            ROTATECW: "Rotate clockwise",
            FLIPX: "Flip horizontally",
            FLIPY: "Flip vertically",
            FITX: "Fit horizontally",
            FITY: "Fit vertically",
            RESET: "Reset",
            TOGGLEFS: "Toggle fullscreen"
        },
        hs = {
            content: null,
            width: "auto",
            height: "auto",
            panMode: "drag",
            touch: !0,
            dragMinThreshold: 3,
            lockAxis: !1,
            mouseMoveFactor: 1,
            mouseMoveFriction: .12,
            zoom: !0,
            pinchToZoom: !0,
            panOnlyZoomed: "auto",
            minScale: 1,
            maxScale: 2,
            friction: .25,
            dragFriction: .35,
            decelFriction: .05,
            click: "toggleZoom",
            dblClick: !1,
            wheel: "zoom",
            wheelLimit: 7,
            spinner: !0,
            bounds: "auto",
            infinite: !1,
            rubberband: !0,
            bounce: !0,
            maxVelocity: 75,
            transformParent: !1,
            classes: {
                content: "f-panzoom__content",
                isLoading: "is-loading",
                canZoomIn: "can-zoom_in",
                canZoomOut: "can-zoom_out",
                isDraggable: "is-draggable",
                isDragging: "is-dragging",
                inFullscreen: "in-fullscreen",
                htmlHasFullscreen: "with-panzoom-in-fullscreen"
            },
            l10n: Ni
        },
        fi = '<circle cx="25" cy="25" r="20"></circle>',
        Vn = '<div class="f-spinner"><svg viewBox="0 0 50 50">' + fi + fi + "</svg></div>",
        N = o => o && o !== null && o instanceof Element && "nodeType" in o,
        Z = (o, t) => {
            o && Rn(t).forEach(e => {
                o.classList.remove(e)
            })
        },
        v = (o, t) => {
            o && Rn(t).forEach(e => {
                o.classList.add(e)
            })
        },
        oe = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: 0,
            f: 0
        },
        us = 1e5,
        se = 1e4,
        z = "mousemove",
        Qi = "drag",
        bi = "content",
        H = "auto",
        dn = null,
        hn = null,
        Qt = class o extends Ot {
            get fits() {
                return this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1
            }
            get isTouchDevice() {
                return hn === null && (hn = window.matchMedia("(hover: none)").matches), hn
            }
            get isMobile() {
                return dn === null && (dn = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), dn
            }
            get panMode() {
                return this.options.panMode !== z || this.isTouchDevice ? Qi : z
            }
            get panOnlyZoomed() {
                let t = this.options.panOnlyZoomed;
                return t === H ? this.isTouchDevice : t
            }
            get isInfinite() {
                return this.option("infinite")
            }
            get angle() {
                return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0
            }
            get targetAngle() {
                return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0
            }
            get scale() {
                let {
                    a: t,
                    b: e
                } = this.current;
                return Math.sqrt(t * t + e * e) || 1
            }
            get targetScale() {
                let {
                    a: t,
                    b: e
                } = this.target;
                return Math.sqrt(t * t + e * e) || 1
            }
            get minScale() {
                return this.option("minScale") || 1
            }
            get fullScale() {
                let {
                    contentRect: t
                } = this;
                return t.fullWidth / t.fitWidth || 1
            }
            get maxScale() {
                return this.fullScale * (this.option("maxScale") || 1) || 1
            }
            get coverScale() {
                let {
                    containerRect: t,
                    contentRect: e
                } = this, n = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
                return Math.min(this.fullScale, n)
            }
            get isScaling() {
                return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting
            }
            get isContentLoading() {
                let t = this.content;
                return !!(t && t instanceof HTMLImageElement) && !t.complete
            }
            get isResting() {
                if (this.isBouncingX || this.isBouncingY) return !1;
                for (let t of ot) {
                    let e = t == "e" || t === "f" ? 1e-4 : 1e-5;
                    if (Math.abs(this.target[t] - this.current[t]) > e) return !1
                }
                return !(!this.ignoreBounds && !this.checkBounds().inBounds)
            }
            constructor(t, e = {}, n = {}) {
                var i;
                if (super(e), Object.defineProperty(this, "pointerTracker", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "resizeObserver", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "updateTimer", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "clickTimer", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "rAF", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "isTicking", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: !1
                    }), Object.defineProperty(this, "ignoreBounds", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: !1
                    }), Object.defineProperty(this, "isBouncingX", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: !1
                    }), Object.defineProperty(this, "isBouncingY", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: !1
                    }), Object.defineProperty(this, "clicks", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: 0
                    }), Object.defineProperty(this, "trackingPoints", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: []
                    }), Object.defineProperty(this, "pwt", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: 0
                    }), Object.defineProperty(this, "cwd", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: 0
                    }), Object.defineProperty(this, "pmme", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: void 0
                    }), Object.defineProperty(this, "friction", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: 0
                    }), Object.defineProperty(this, "state", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: O.Init
                    }), Object.defineProperty(this, "isDragging", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: !1
                    }), Object.defineProperty(this, "container", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: void 0
                    }), Object.defineProperty(this, "content", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: void 0
                    }), Object.defineProperty(this, "spinner", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "containerRect", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: {
                            width: 0,
                            height: 0,
                            innerWidth: 0,
                            innerHeight: 0
                        }
                    }), Object.defineProperty(this, "contentRect", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            fullWidth: 0,
                            fullHeight: 0,
                            fitWidth: 0,
                            fitHeight: 0,
                            width: 0,
                            height: 0
                        }
                    }), Object.defineProperty(this, "dragStart", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: {
                            x: 0,
                            y: 0,
                            top: 0,
                            left: 0,
                            time: 0
                        }
                    }), Object.defineProperty(this, "dragOffset", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: {
                            x: 0,
                            y: 0,
                            time: 0
                        }
                    }), Object.defineProperty(this, "current", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: Object.assign({}, oe)
                    }), Object.defineProperty(this, "target", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: Object.assign({}, oe)
                    }), Object.defineProperty(this, "velocity", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: {
                            a: 0,
                            b: 0,
                            c: 0,
                            d: 0,
                            e: 0,
                            f: 0
                        }
                    }), Object.defineProperty(this, "lockedAxis", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: !1
                    }), !t) throw new Error("Container Element Not Found");
                this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, o.Plugins), n)), this.emit("attachPlugins"), this.emit("init");
                let a = this.content;
                if (a.addEventListener("load", this.onLoad), a.addEventListener("error", this.onError), this.isContentLoading) {
                    if (this.option("spinner")) {
                        t.classList.add(this.cn("isLoading"));
                        let l = tt(Vn);
                        !t.contains(a) || a.parentElement instanceof HTMLPictureElement ? this.spinner = t.appendChild(l) : this.spinner = ((i = a.parentElement) === null || i === void 0 ? void 0 : i.insertBefore(l, a)) || null
                    }
                    this.emit("beforeLoad")
                } else queueMicrotask(() => {
                    this.enable()
                })
            }
            initContent() {
                let {
                    container: t
                } = this, e = this.cn(bi), n = this.option(bi) || t.querySelector(`.${e}`);
                if (n || (n = t.querySelector("img,picture") || t.firstElementChild, n && v(n, e)), n instanceof HTMLPictureElement && (n = n.querySelector("img")), !n) throw new Error("No content found");
                this.content = n
            }
            onLoad() {
                let {
                    spinner: t,
                    container: e,
                    state: n
                } = this;
                t && (t.remove(), this.spinner = null), this.option("spinner") && e.classList.remove(this.cn("isLoading")), this.emit("afterLoad"), n === O.Init ? this.enable() : this.updateMetrics()
            }
            onError() {
                this.state !== O.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), this.stop(), this.detachEvents(), this.state = O.Error, this.emit("error"))
            }
            getNextScale(t) {
                let {
                    fullScale: e,
                    targetScale: n,
                    coverScale: i,
                    maxScale: a,
                    minScale: l
                } = this, c = l;
                switch (t) {
                    case "toggleMax":
                        c = n - l < .5 * (a - l) ? a : l;
                        break;
                    case "toggleCover":
                        c = n - l < .5 * (i - l) ? i : l;
                        break;
                    case "toggleZoom":
                        c = n - l < .5 * (e - l) ? e : l;
                        break;
                    case "iterateZoom":
                        let h = [1, e, a].sort((s, r) => s - r),
                            m = h.findIndex(s => s > n + 1e-5);
                        c = h[m] || 1
                }
                return c
            }
            attachObserver() {
                var t;
                let e = () => {
                    let {
                        container: n,
                        containerRect: i
                    } = this;
                    return Math.abs(i.width - n.getBoundingClientRect().width) > .1 || Math.abs(i.height - n.getBoundingClientRect().height) > .1
                };
                this.resizeObserver || window.ResizeObserver === void 0 || (this.resizeObserver = new ResizeObserver(() => {
                    this.updateTimer || (e() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout(() => {
                        e() && this.onResize(), this.updateTimer = null
                    }, 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null))
                })), (t = this.resizeObserver) === null || t === void 0 || t.observe(this.container)
            }
            detachObserver() {
                var t;
                (t = this.resizeObserver) === null || t === void 0 || t.disconnect()
            }
            attachEvents() {
                let {
                    container: t
                } = this;
                t.addEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !1
                }), t.addEventListener("wheel", this.onWheel, {
                    passive: !1
                }), this.pointerTracker = new wn(t, {
                    start: this.onPointerDown,
                    move: this.onPointerMove,
                    end: this.onPointerUp
                }), document.addEventListener(z, this.onMouseMove)
            }
            detachEvents() {
                var t;
                let {
                    container: e
                } = this;
                e.removeEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !1
                }), e.removeEventListener("wheel", this.onWheel, {
                    passive: !1
                }), (t = this.pointerTracker) === null || t === void 0 || t.stop(), this.pointerTracker = null, document.removeEventListener(z, this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, !0), this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null)
            }
            animate() {
                this.setTargetForce();
                let t = this.friction,
                    e = this.option("maxVelocity");
                for (let n of ot) t ? (this.velocity[n] *= 1 - t, e && !this.isScaling && (this.velocity[n] = Math.max(Math.min(this.velocity[n], e), -1 * e)), this.current[n] += this.velocity[n]) : this.current[n] = this.target[n];
                this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame(() => this.animate()) : this.stop("current")
            }
            setTargetForce() {
                for (let t of ot) t === "e" && this.isBouncingX || t === "f" && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]))
            }
            checkBounds(t = 0, e = 0) {
                let {
                    current: n
                } = this, i = n.e + t, a = n.f + e, l = this.getBounds(), {
                    x: c,
                    y: h
                } = l, m = c.min, s = c.max, r = h.min, d = h.max, u = 0, p = 0;
                return m !== 1 / 0 && i < m ? u = m - i : s !== 1 / 0 && i > s && (u = s - i), r !== 1 / 0 && a < r ? p = r - a : d !== 1 / 0 && a > d && (p = d - a), Math.abs(u) < 1e-4 && (u = 0), Math.abs(p) < 1e-4 && (p = 0), Object.assign(Object.assign({}, l), {
                    xDiff: u,
                    yDiff: p,
                    inBounds: !u && !p
                })
            }
            clampTargetBounds() {
                let {
                    target: t
                } = this, {
                    x: e,
                    y: n
                } = this.getBounds();
                e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), n.min !== 1 / 0 && (t.f = Math.max(t.f, n.min)), n.max !== 1 / 0 && (t.f = Math.min(t.f, n.max))
            }
            calculateContentDim(t = this.current) {
                let {
                    content: e,
                    contentRect: n
                } = this, {
                    fitWidth: i,
                    fitHeight: a,
                    fullWidth: l,
                    fullHeight: c
                } = n, h = l, m = c;
                if (this.option("zoom") || this.angle !== 0) {
                    let s = !(e instanceof HTMLImageElement) && (window.getComputedStyle(e).maxWidth === "none" || window.getComputedStyle(e).maxHeight === "none"),
                        r = s ? l : i,
                        d = s ? c : a,
                        u = this.getMatrix(t),
                        p = new DOMPoint(0, 0).matrixTransform(u),
                        f = new DOMPoint(0 + r, 0).matrixTransform(u),
                        Q = new DOMPoint(0 + r, 0 + d).matrixTransform(u),
                        b = new DOMPoint(0, 0 + d).matrixTransform(u),
                        g = Math.abs(Q.x - p.x),
                        F = Math.abs(Q.y - p.y),
                        x = Math.abs(b.x - f.x),
                        E = Math.abs(b.y - f.y);
                    h = Math.max(g, x), m = Math.max(F, E)
                }
                return {
                    contentWidth: h,
                    contentHeight: m
                }
            }
            setEdgeForce() {
                if (this.ignoreBounds || this.isDragging || this.panMode === z || this.targetScale < this.scale) return this.isBouncingX = !1, void(this.isBouncingY = !1);
                let {
                    target: t
                } = this, {
                    x: e,
                    y: n,
                    xDiff: i,
                    yDiff: a
                } = this.checkBounds(), l = this.option("maxVelocity"), c = this.velocity.e, h = this.velocity.f;
                i !== 0 ? (this.isBouncingX = !0, i * c <= 0 ? c += .14 * i : (c = .14 * i, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), l && (c = Math.max(Math.min(c, l), -1 * l))) : this.isBouncingX = !1, a !== 0 ? (this.isBouncingY = !0, a * h <= 0 ? h += .14 * a : (h = .14 * a, n.min !== 1 / 0 && (this.target.f = Math.max(t.f, n.min)), n.max !== 1 / 0 && (this.target.f = Math.min(t.f, n.max))), l && (h = Math.max(Math.min(h, l), -1 * l))) : this.isBouncingY = !1, this.isBouncingX && (this.velocity.e = c), this.isBouncingY && (this.velocity.f = h)
            }
            enable() {
                let {
                    content: t
                } = this, e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
                for (let n of ot) this.current[n] = this.target[n] = e[n];
                this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = O.Ready, this.emit("ready")
            }
            onClick(t) {
                var e;
                t.type === "click" && t.detail === 0 && (this.dragOffset.x = 0, this.dragOffset.y = 0), this.isDragging && ((e = this.pointerTracker) === null || e === void 0 || e.clear(), this.trackingPoints = [], this.startDecelAnim());
                let n = t.target;
                if (!n || t.defaultPrevented) return;
                if (n.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
                if ((() => {
                        let u = window.getSelection();
                        return u && u.type === "Range"
                    })() && !n.closest("button")) return;
                let i = n.closest("[data-panzoom-action]"),
                    a = n.closest("[data-panzoom-change]"),
                    l = i || a,
                    c = l && N(l) ? l.dataset : null;
                if (c) {
                    let u = c.panzoomChange,
                        p = c.panzoomAction;
                    if ((u || p) && t.preventDefault(), u) {
                        let f = {};
                        try {
                            f = JSON.parse(u)
                        } catch {
                            console && console.warn("The given data was not valid JSON")
                        }
                        return void this.applyChange(f)
                    }
                    if (p) return void(this[p] && this[p]())
                }
                if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), void t.stopPropagation();
                if (n.closest("[data-fancybox]")) return;
                let h = this.content.getBoundingClientRect(),
                    m = this.dragStart;
                if (m.time && !this.canZoomOut() && (Math.abs(h.x - m.x) > 2 || Math.abs(h.y - m.y) > 2)) return;
                this.dragStart.time = 0;
                let s = u => {
                        this.option("zoom", t) && u && typeof u == "string" && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(u) && typeof this[u] == "function" && (t.preventDefault(), this[u]({
                            event: t
                        }))
                    },
                    r = this.option("click", t),
                    d = this.option("dblClick", t);
                d ? (this.clicks++, this.clicks == 1 && (this.clickTimer = setTimeout(() => {
                    this.clicks === 1 ? (this.emit("click", t), !t.defaultPrevented && r && s(r)) : (this.emit("dblClick", t), t.defaultPrevented || s(d)), this.clicks = 0, this.clickTimer = null
                }, 350))) : (this.emit("click", t), !t.defaultPrevented && r && s(r))
            }
            addTrackingPoint(t) {
                let e = this.trackingPoints.filter(n => n.time > Date.now() - 100);
                e.push(t), this.trackingPoints = e
            }
            onPointerDown(t, e, n) {
                var i;
                if (this.option("touch", t) === !1) return !1;
                this.pwt = 0, this.dragOffset = {
                    x: 0,
                    y: 0,
                    time: 0
                }, this.trackingPoints = [];
                let a = this.content.getBoundingClientRect();
                if (this.dragStart = {
                        x: a.x,
                        y: a.y,
                        top: a.top,
                        left: a.left,
                        time: Date.now()
                    }, this.clickTimer) return !1;
                if (this.panMode === z && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), !1;
                let l = t.composedPath()[0];
                if (!n.length) {
                    if (["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME"].includes(l.nodeName) || l.closest("[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]")) return !1;
                    (i = window.getSelection()) === null || i === void 0 || i.removeAllRanges()
                }
                if (t.type === "mousedown")["A", "BUTTON"].includes(l.nodeName) || t.preventDefault();
                else if (Math.abs(this.velocity.a) > .3) return !1;
                return this.target.e = this.current.e, this.target.f = this.current.f, this.stop(), this.isDragging || (this.isDragging = !0, this.addTrackingPoint(e), this.emit("touchStart", t)), !0
            }
            onPointerMove(t, e, n) {
                if (this.option("touch", t) === !1 || !this.isDragging || e.length < 2 && this.panOnlyZoomed && B(this.targetScale) <= B(this.minScale) || (this.emit("touchMove", t), t.defaultPrevented)) return;
                this.addTrackingPoint(e[0]);
                let {
                    content: i
                } = this, a = pi(n[0], n[1]), l = pi(e[0], e[1]), c = 0, h = 0;
                if (e.length > 1) {
                    let F = i.getBoundingClientRect();
                    c = a.clientX - F.left - .5 * F.width, h = a.clientY - F.top - .5 * F.height
                }
                let m = mi(n[0], n[1]),
                    s = mi(e[0], e[1]),
                    r = m ? s / m : 1,
                    d = l.clientX - a.clientX,
                    u = l.clientY - a.clientY;
                this.dragOffset.x += d, this.dragOffset.y += u, this.dragOffset.time = Date.now() - this.dragStart.time;
                let p = B(this.targetScale) === B(this.minScale) && this.option("lockAxis");
                if (p && !this.lockedAxis)
                    if (p === "xy" || p === "y" || t.type === "touchmove") {
                        if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void t.preventDefault();
                        let F = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
                        this.lockedAxis = F > 45 && F < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, d = 0, u = 0
                    } else this.lockedAxis = p;
                if (Qe(t.target, this.content) && (p = "x", this.dragOffset.y = 0), p && p !== "xy" && this.lockedAxis !== p && B(this.targetScale) === B(this.minScale)) return;
                t.cancelable && t.preventDefault(), this.container.classList.add(this.cn("isDragging"));
                let f = this.checkBounds(d, u);
                this.option("rubberband") ? (this.isInfinite !== "x" && (f.xDiff > 0 && d < 0 || f.xDiff < 0 && d > 0) && (d *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * f.xDiff))), this.isInfinite !== "y" && (f.yDiff > 0 && u < 0 || f.yDiff < 0 && u > 0) && (u *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * f.yDiff)))) : (f.xDiff && (d = 0), f.yDiff && (u = 0));
                let Q = this.targetScale,
                    b = this.minScale,
                    g = this.maxScale;
                Q < .5 * b && (r = Math.max(r, b)), Q > 1.5 * g && (r = Math.min(r, g)), this.lockedAxis === "y" && B(Q) === B(b) && (d = 0), this.lockedAxis === "x" && B(Q) === B(b) && (u = 0), this.applyChange({
                    originX: c,
                    originY: h,
                    panX: d,
                    panY: u,
                    scale: r,
                    friction: this.option("dragFriction"),
                    ignoreBounds: !0
                })
            }
            onPointerUp(t, e, n) {
                if (n.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void(this.trackingPoints = []);
                this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e), this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), Qe(t.target, this.content) && this.lockedAxis === "y" && (this.trackingPoints = []), this.emit("touchEnd", t), this.isDragging = !1, this.lockedAxis = !1, this.state !== O.Destroy && (t.defaultPrevented || this.startDecelAnim()))
            }
            startDecelAnim() {
                var t;
                let e = this.isScaling;
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
                for (let F of ot) this.velocity[F] = 0;
                this.target.e = this.current.e, this.target.f = this.current.f, Z(this.container, "is-scaling"), Z(this.container, "is-animating"), this.isTicking = !1;
                let {
                    trackingPoints: n
                } = this, i = n[0], a = n[n.length - 1], l = 0, c = 0, h = 0;
                a && i && (l = a.clientX - i.clientX, c = a.clientY - i.clientY, h = a.time - i.time);
                let m = ((t = window.visualViewport) === null || t === void 0 ? void 0 : t.scale) || 1;
                m !== 1 && (l *= m, c *= m);
                let s = 0,
                    r = 0,
                    d = 0,
                    u = 0,
                    p = this.option("decelFriction"),
                    f = this.targetScale;
                if (h > 0) {
                    d = Math.abs(l) > 3 ? l / (h / 30) : 0, u = Math.abs(c) > 3 ? c / (h / 30) : 0;
                    let F = this.option("maxVelocity");
                    F && (d = Math.max(Math.min(d, F), -1 * F), u = Math.max(Math.min(u, F), -1 * F))
                }
                d && (s = d / (1 / (1 - p) - 1)), u && (r = u / (1 / (1 - p) - 1)), (this.option("lockAxis") === "y" || this.option("lockAxis") === "xy" && this.lockedAxis === "y" && B(f) === this.minScale) && (s = d = 0), (this.option("lockAxis") === "x" || this.option("lockAxis") === "xy" && this.lockedAxis === "x" && B(f) === this.minScale) && (r = u = 0);
                let Q = this.dragOffset.x,
                    b = this.dragOffset.y,
                    g = this.option("dragMinThreshold") || 0;
                Math.abs(Q) < g && Math.abs(b) < g && (s = r = 0, d = u = 0), (this.option("zoom") && (f < this.minScale - 1e-5 || f > this.maxScale + 1e-5) || e && !s && !r) && (p = .35), this.applyChange({
                    panX: s,
                    panY: r,
                    friction: p
                }), this.emit("decel", d, u, Q, b)
            }
            onWheel(t) {
                var e = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function(a, l) {
                    return Math.abs(l) > Math.abs(a) ? l : a
                });
                let n = Math.max(-1, Math.min(1, e));
                if (this.emit("wheel", t, n), this.panMode === z || t.defaultPrevented) return;
                let i = this.option("wheel");
                i === "pan" ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
                    panX: 2 * -t.deltaX,
                    panY: 2 * -t.deltaY,
                    bounce: !1
                })) : i === "zoom" && this.option("zoom") !== !1 && this.zoomWithWheel(t)
            }
            onMouseMove(t) {
                this.panWithMouse(t)
            }
            onKeydown(t) {
                t.key === "Escape" && this.toggleFS()
            }
            onResize() {
                this.updateMetrics(), this.checkBounds().inBounds || this.requestTick()
            }
            setTransform() {
                this.emit("beforeTransform");
                let {
                    current: t,
                    target: e,
                    content: n,
                    contentRect: i
                } = this, a = Object.assign({}, oe);
                for (let Q of ot) {
                    let b = Q == "e" || Q === "f" ? se : us;
                    a[Q] = B(t[Q], b), Math.abs(e[Q] - t[Q]) < (Q == "e" || Q === "f" ? .51 : .001) && (t[Q] = e[Q])
                }
                let {
                    a: l,
                    b: c,
                    c: h,
                    d: m,
                    e: s,
                    f: r
                } = a, d = `matrix(${l}, ${c}, ${h}, ${m}, ${s}, ${r})`, u = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n;
                if (this.option("transformParent") && (u = u.parentElement || u), u.style.transform === d) return;
                u.style.transform = d;
                let {
                    contentWidth: p,
                    contentHeight: f
                } = this.calculateContentDim();
                i.width = p, i.height = f, this.emit("afterTransform")
            }
            updateMetrics(t = !1) {
                var e;
                if (!this || this.state === O.Destroy || this.isContentLoading) return;
                let n = Math.max(1, ((e = window.visualViewport) === null || e === void 0 ? void 0 : e.scale) || 1),
                    {
                        container: i,
                        content: a
                    } = this,
                    l = a instanceof HTMLImageElement,
                    c = i.getBoundingClientRect(),
                    h = getComputedStyle(this.container),
                    m = c.width * n,
                    s = c.height * n,
                    r = parseFloat(h.paddingTop) + parseFloat(h.paddingBottom),
                    d = m - (parseFloat(h.paddingLeft) + parseFloat(h.paddingRight)),
                    u = s - r;
                this.containerRect = {
                    width: m,
                    height: s,
                    innerWidth: d,
                    innerHeight: u
                };
                let p = parseFloat(a.dataset.width || "") || (L => {
                        let Y = 0;
                        return Y = L instanceof HTMLImageElement ? L.naturalWidth : L instanceof SVGElement ? L.width.baseVal.value : Math.max(L.offsetWidth, L.scrollWidth), Y || 0
                    })(a),
                    f = parseFloat(a.dataset.height || "") || (L => {
                        let Y = 0;
                        return Y = L instanceof HTMLImageElement ? L.naturalHeight : L instanceof SVGElement ? L.height.baseVal.value : Math.max(L.offsetHeight, L.scrollHeight), Y || 0
                    })(a),
                    Q = this.option("width", p) || H,
                    b = this.option("height", f) || H,
                    g = Q === H,
                    F = b === H;
                typeof Q != "number" && (Q = p), typeof b != "number" && (b = f), g && (Q = p * (b / f)), F && (b = f / (p / Q));
                let x = a.parentElement instanceof HTMLPictureElement ? a.parentElement : a;
                this.option("transformParent") && (x = x.parentElement || x);
                let E = x.getAttribute("style") || "";
                x.style.setProperty("transform", "none", "important"), l && (x.style.width = "", x.style.height = ""), x.offsetHeight;
                let W = a.getBoundingClientRect(),
                    y = W.width * n,
                    w = W.height * n,
                    S = y,
                    U = w;
                y = Math.min(y, Q), w = Math.min(w, b), l ? {
                    width: y,
                    height: w
                } = ((L, Y, Se, Jt) => {
                    let zt = Se / L,
                        lt = Jt / Y,
                        Ht = Math.min(zt, lt);
                    return {
                        width: L *= Ht,
                        height: Y *= Ht
                    }
                })(Q, b, y, w) : (y = Math.min(y, Q), w = Math.min(w, b));
                let k = .5 * (U - w),
                    T = .5 * (S - y);
                this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
                    top: W.top - c.top + k,
                    bottom: c.bottom - W.bottom + k,
                    left: W.left - c.left + T,
                    right: c.right - W.right + T,
                    fitWidth: y,
                    fitHeight: w,
                    width: y,
                    height: w,
                    fullWidth: Q,
                    fullHeight: b
                }), x.style.cssText = E, l && (x.style.width = `${y}px`, x.style.height = `${w}px`), this.setTransform(), t !== !0 && this.emit("refresh"), this.ignoreBounds || (B(this.targetScale) < B(this.minScale) ? this.zoomTo(this.minScale, {
                    friction: 0
                }) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {
                    friction: 0
                }) : this.state === O.Init || this.checkBounds().inBounds || this.requestTick()), this.updateControls()
            }
            calculateBounds() {
                let {
                    contentWidth: t,
                    contentHeight: e
                } = this.calculateContentDim(this.target), {
                    targetScale: n,
                    lockedAxis: i
                } = this, {
                    fitWidth: a,
                    fitHeight: l
                } = this.contentRect, c = 0, h = 0, m = 0, s = 0, r = this.option("infinite");
                if (r === !0 || i && r === i) c = -1 / 0, m = 1 / 0, h = -1 / 0, s = 1 / 0;
                else {
                    let {
                        containerRect: d,
                        contentRect: u
                    } = this, p = B(a * n, se), f = B(l * n, se), {
                        innerWidth: Q,
                        innerHeight: b
                    } = d;
                    if (d.width === p && (Q = d.width), d.width === f && (b = d.height), t > Q) {
                        m = .5 * (t - Q), c = -1 * m;
                        let g = .5 * (u.right - u.left);
                        c += g, m += g
                    }
                    if (a > Q && t < Q && (c -= .5 * (a - Q), m -= .5 * (a - Q)), e > b) {
                        s = .5 * (e - b), h = -1 * s;
                        let g = .5 * (u.bottom - u.top);
                        h += g, s += g
                    }
                    l > b && e < b && (c -= .5 * (l - b), m -= .5 * (l - b))
                }
                return {
                    x: {
                        min: c,
                        max: m
                    },
                    y: {
                        min: h,
                        max: s
                    }
                }
            }
            getBounds() {
                let t = this.option("bounds");
                return t !== H ? t : this.calculateBounds()
            }
            updateControls() {
                let t = this,
                    e = t.container,
                    {
                        panMode: n,
                        contentRect: i,
                        targetScale: a,
                        minScale: l
                    } = t,
                    c = l,
                    h = t.option("click") || !1;
                h && (c = t.getNextScale(h));
                let m = t.canZoomIn(),
                    s = t.canZoomOut(),
                    r = n === Qi && !!this.option("touch"),
                    d = s && r;
                if (r && (B(a) < B(l) && !this.panOnlyZoomed && (d = !0), (B(i.width, 1) > B(i.fitWidth, 1) || B(i.height, 1) > B(i.fitHeight, 1)) && (d = !0)), B(i.width * a, 1) < B(i.fitWidth, 1) && (d = !1), n === z && (d = !1), et(e, this.cn("isDraggable"), d), !this.option("zoom")) return;
                let u = m && B(c) > B(a),
                    p = !u && !d && s && B(c) < B(a);
                et(e, this.cn("canZoomIn"), u), et(e, this.cn("canZoomOut"), p);
                for (let f of e.querySelectorAll("[data-panzoom-action]")) {
                    let Q = !1,
                        b = !1;
                    switch (f.dataset.panzoomAction) {
                        case "zoomIn":
                            m ? Q = !0 : b = !0;
                            break;
                        case "zoomOut":
                            s ? Q = !0 : b = !0;
                            break;
                        case "toggleZoom":
                        case "iterateZoom":
                            m || s ? Q = !0 : b = !0;
                            let g = f.querySelector("g");
                            g && (g.style.display = m ? "" : "none")
                    }
                    Q ? (f.removeAttribute("disabled"), f.removeAttribute("tabindex")) : b && (f.setAttribute("disabled", ""), f.setAttribute("tabindex", "-1"))
                }
            }
            panTo({
                x: t = this.target.e,
                y: e = this.target.f,
                scale: n = this.targetScale,
                friction: i = this.option("friction"),
                angle: a = 0,
                originX: l = 0,
                originY: c = 0,
                flipX: h = !1,
                flipY: m = !1,
                ignoreBounds: s = !1
            }) {
                this.state !== O.Destroy && this.applyChange({
                    panX: t - this.target.e,
                    panY: e - this.target.f,
                    scale: n / this.targetScale,
                    angle: a,
                    originX: l,
                    originY: c,
                    friction: i,
                    flipX: h,
                    flipY: m,
                    ignoreBounds: s
                })
            }
            applyChange({
                panX: t = 0,
                panY: e = 0,
                scale: n = 1,
                angle: i = 0,
                originX: a = -this.current.e,
                originY: l = -this.current.f,
                friction: c = this.option("friction"),
                flipX: h = !1,
                flipY: m = !1,
                ignoreBounds: s = !1,
                bounce: r = this.option("bounce")
            }) {
                let d = this.state;
                if (d === O.Destroy) return;
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.friction = c || 0, this.ignoreBounds = s;
                let {
                    current: u
                } = this, p = u.e, f = u.f, Q = this.getMatrix(this.target), b = new DOMMatrix().translate(p, f).translate(a, l).translate(t, e);
                if (this.option("zoom")) {
                    if (!s) {
                        let g = this.targetScale,
                            F = this.minScale,
                            x = this.maxScale;
                        g * n < F && (n = F / g), g * n > x && (n = x / g)
                    }
                    b = b.scale(n)
                }
                b = b.translate(-a, -l).translate(-p, -f).multiply(Q), i && (b = b.rotate(i)), h && (b = b.scale(-1, 1)), m && (b = b.scale(1, -1));
                for (let g of ot) g !== "e" && g !== "f" && (b[g] > this.minScale + 1e-5 || b[g] < this.minScale - 1e-5) ? this.target[g] = b[g] : this.target[g] = B(b[g], se);
                (this.targetScale < this.scale || Math.abs(n - 1) > .1 || this.panMode === z || r === !1) && !s && this.clampTargetBounds(), d === O.Init ? this.animate() : this.isResting || (this.state = O.Panning, this.requestTick())
            }
            stop(t = !1) {
                if (this.state === O.Init || this.state === O.Destroy) return;
                let e = this.isTicking;
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
                for (let n of ot) this.velocity[n] = 0, t === "current" ? this.current[n] = this.target[n] : t === "target" && (this.target[n] = this.current[n]);
                this.setTransform(), Z(this.container, "is-scaling"), Z(this.container, "is-animating"), this.isTicking = !1, this.state = O.Ready, e && (this.emit("endAnimation"), this.updateControls())
            }
            requestTick() {
                this.isTicking || (this.emit("startAnimation"), this.updateControls(), v(this.container, "is-animating"), this.isScaling && v(this.container, "is-scaling")), this.isTicking = !0, this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()))
            }
            panWithMouse(t, e = this.option("mouseMoveFriction")) {
                if (this.pmme = t, this.panMode !== z || !t || B(this.targetScale) <= B(this.minScale)) return;
                this.emit("mouseMove", t);
                let {
                    container: n,
                    containerRect: i,
                    contentRect: a
                } = this, l = i.width, c = i.height, h = n.getBoundingClientRect(), m = (t.clientX || 0) - h.left, s = (t.clientY || 0) - h.top, {
                    contentWidth: r,
                    contentHeight: d
                } = this.calculateContentDim(this.target), u = this.option("mouseMoveFactor");
                u > 1 && (r !== l && (r *= u), d !== c && (d *= u));
                let p = .5 * (r - l) - m / l * 100 / 100 * (r - l);
                p += .5 * (a.right - a.left);
                let f = .5 * (d - c) - s / c * 100 / 100 * (d - c);
                f += .5 * (a.bottom - a.top), this.applyChange({
                    panX: p - this.target.e,
                    panY: f - this.target.f,
                    friction: e
                })
            }
            zoomWithWheel(t) {
                if (this.state === O.Destroy || this.state === O.Init) return;
                let e = Date.now();
                if (e - this.pwt < 45) return void t.preventDefault();
                this.pwt = e;
                var n = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function(m, s) {
                    return Math.abs(s) > Math.abs(m) ? s : m
                });
                let i = Math.max(-1, Math.min(1, n)),
                    {
                        targetScale: a,
                        maxScale: l,
                        minScale: c
                    } = this,
                    h = a * (100 + 45 * i) / 100;
                B(h) < B(c) && B(a) <= B(c) ? (this.cwd += Math.abs(i), h = c) : B(h) > B(l) && B(a) >= B(l) ? (this.cwd += Math.abs(i), h = l) : (this.cwd = 0, h = Math.max(Math.min(h, l), c)), this.cwd > this.option("wheelLimit") || (t.preventDefault(), B(h) !== B(a) && this.zoomTo(h, {
                    event: t
                }))
            }
            canZoomIn() {
                return this.option("zoom") && (B(this.contentRect.width, 1) < B(this.contentRect.fitWidth, 1) || B(this.targetScale) < B(this.maxScale))
            }
            canZoomOut() {
                return this.option("zoom") && B(this.targetScale) > B(this.minScale)
            }
            zoomIn(t = 1.25, e) {
                this.zoomTo(this.targetScale * t, e)
            }
            zoomOut(t = .8, e) {
                this.zoomTo(this.targetScale * t, e)
            }
            zoomToFit(t) {
                this.zoomTo("fit", t)
            }
            zoomToCover(t) {
                this.zoomTo("cover", t)
            }
            zoomToFull(t) {
                this.zoomTo("full", t)
            }
            zoomToMax(t) {
                this.zoomTo("max", t)
            }
            toggleZoom(t) {
                this.zoomTo(this.getNextScale("toggleZoom"), t)
            }
            toggleMax(t) {
                this.zoomTo(this.getNextScale("toggleMax"), t)
            }
            toggleCover(t) {
                this.zoomTo(this.getNextScale("toggleCover"), t)
            }
            iterateZoom(t) {
                this.zoomTo("next", t)
            }
            zoomTo(t = 1, {
                friction: e = H,
                originX: n = H,
                originY: i = H,
                event: a
            } = {}) {
                if (this.isContentLoading || this.state === O.Destroy) return;
                let {
                    targetScale: l,
                    fullScale: c,
                    maxScale: h,
                    coverScale: m
                } = this;
                if (this.stop(), this.panMode === z && (a = this.pmme || a), a || n === H || i === H) {
                    let r = this.content.getBoundingClientRect(),
                        d = this.container.getBoundingClientRect(),
                        u = a ? a.clientX : d.left + .5 * d.width,
                        p = a ? a.clientY : d.top + .5 * d.height;
                    n = u - r.left - .5 * r.width, i = p - r.top - .5 * r.height
                }
                let s = 1;
                typeof t == "number" ? s = t : t === "full" ? s = c : t === "cover" ? s = m : t === "max" ? s = h : t === "fit" ? s = 1 : t === "next" && (s = this.getNextScale("iterateZoom")), s = s / l || 1, e = e === H ? s > 1 ? .15 : .25 : e, this.applyChange({
                    scale: s,
                    originX: n,
                    originY: i,
                    friction: e
                }), a && this.panMode === z && this.panWithMouse(a, e)
            }
            rotateCCW() {
                this.applyChange({
                    angle: -90
                })
            }
            rotateCW() {
                this.applyChange({
                    angle: 90
                })
            }
            flipX() {
                this.applyChange({
                    flipX: !0
                })
            }
            flipY() {
                this.applyChange({
                    flipY: !0
                })
            }
            fitX() {
                this.stop("target");
                let {
                    containerRect: t,
                    contentRect: e,
                    target: n
                } = this;
                this.applyChange({
                    panX: .5 * t.width - (e.left + .5 * e.fitWidth) - n.e,
                    panY: .5 * t.height - (e.top + .5 * e.fitHeight) - n.f,
                    scale: t.width / e.fitWidth / this.targetScale,
                    originX: 0,
                    originY: 0,
                    ignoreBounds: !0
                })
            }
            fitY() {
                this.stop("target");
                let {
                    containerRect: t,
                    contentRect: e,
                    target: n
                } = this;
                this.applyChange({
                    panX: .5 * t.width - (e.left + .5 * e.fitWidth) - n.e,
                    panY: .5 * t.innerHeight - (e.top + .5 * e.fitHeight) - n.f,
                    scale: t.height / e.fitHeight / this.targetScale,
                    originX: 0,
                    originY: 0,
                    ignoreBounds: !0
                })
            }
            toggleFS() {
                let {
                    container: t
                } = this, e = this.cn("inFullscreen"), n = this.cn("htmlHasFullscreen");
                t.classList.toggle(e);
                let i = t.classList.contains(e);
                i ? (document.documentElement.classList.add(n), document.addEventListener("keydown", this.onKeydown, !0)) : (document.documentElement.classList.remove(n), document.removeEventListener("keydown", this.onKeydown, !0)), this.updateMetrics(), this.emit(i ? "enterFS" : "exitFS")
            }
            getMatrix(t = this.current) {
                let {
                    a: e,
                    b: n,
                    c: i,
                    d: a,
                    e: l,
                    f: c
                } = t;
                return new DOMMatrix([e, n, i, a, l, c])
            }
            reset(t) {
                if (this.state !== O.Init && this.state !== O.Destroy) {
                    this.stop("current");
                    for (let e of ot) this.target[e] = oe[e];
                    this.target.a = this.minScale, this.target.d = this.minScale, this.clampTargetBounds(), this.isResting || (this.friction = t === void 0 ? this.option("friction") : t, this.state = O.Panning, this.requestTick())
                }
            }
            destroy() {
                this.stop(), this.state = O.Destroy, this.detachEvents(), this.detachObserver();
                let {
                    container: t,
                    content: e
                } = this, n = this.option("classes") || {};
                for (let i of Object.values(n)) t.classList.remove(i + "");
                e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), this.detachPlugins()
            }
        };
    Object.defineProperty(Qt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: hs
    }), Object.defineProperty(Qt, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    var gi = function(o, t) {
            let e = !0;
            return (...n) => {
                e && (e = !1, o(...n), setTimeout(() => {
                    e = !0
                }, t))
            }
        },
        Bi = (o, t) => {
            let e = [];
            return o.childNodes.forEach(n => {
                n.nodeType !== Node.ELEMENT_NODE || t && !n.matches(t) || e.push(n)
            }), e
        },
        ms = {
            viewport: null,
            track: null,
            enabled: !0,
            slides: [],
            axis: "x",
            transition: "fade",
            preload: 1,
            slidesPerPage: "auto",
            initialPage: 0,
            friction: .12,
            Panzoom: {
                decelFriction: .12
            },
            center: !0,
            infinite: !0,
            fill: !0,
            dragFree: !1,
            adaptiveHeight: !1,
            direction: "ltr",
            classes: {
                container: "f-carousel",
                viewport: "f-carousel__viewport",
                track: "f-carousel__track",
                slide: "f-carousel__slide",
                isLTR: "is-ltr",
                isRTL: "is-rtl",
                isHorizontal: "is-horizontal",
                isVertical: "is-vertical",
                inTransition: "in-transition",
                isSelected: "is-selected"
            },
            l10n: {
                NEXT: "Next slide",
                PREV: "Previous slide",
                GOTO: "Go to slide #%d"
            }
        },
        G;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Ready = 1] = "Ready", o[o.Destroy = 2] = "Destroy"
    })(G || (G = {}));
    var un = o => {
            if (typeof o == "string" || o instanceof HTMLElement) o = {
                html: o
            };
            else {
                let t = o.thumb;
                t !== void 0 && (typeof t == "string" && (o.thumbSrc = t), t instanceof HTMLImageElement && (o.thumbEl = t, o.thumbElSrc = t.src, o.thumbSrc = t.src), delete o.thumb)
            }
            return Object.assign({
                html: "",
                el: null,
                isDom: !1,
                class: "",
                customClass: "",
                index: -1,
                dim: 0,
                gap: 0,
                pos: 0,
                transition: !1
            }, o)
        },
        ps = (o = {}) => Object.assign({
            index: -1,
            slides: [],
            dim: 0,
            pos: -1
        }, o),
        X = class extends yt {
            constructor(t, e) {
                super(e), Object.defineProperty(this, "instance", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t
                })
            }
            attach() {}
            detach() {}
        },
        fs = {
            classes: {
                list: "f-carousel__dots",
                isDynamic: "is-dynamic",
                hasDots: "has-dots",
                dot: "f-carousel__dot",
                isBeforePrev: "is-before-prev",
                isPrev: "is-prev",
                isCurrent: "is-current",
                isNext: "is-next",
                isAfterNext: "is-after-next"
            },
            dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
            dynamicFrom: 11,
            maxCount: 1 / 0,
            minCount: 2
        },
        be = class extends X {
            constructor() {
                super(...arguments), Object.defineProperty(this, "isDynamic", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "list", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                })
            }
            onRefresh() {
                this.refresh()
            }
            build() {
                let t = this.list;
                if (!t) {
                    t = document.createElement("ul"), v(t, this.cn("list")), t.setAttribute("role", "tablist");
                    let e = this.instance.container;
                    e.appendChild(t), v(e, this.cn("hasDots")), this.list = t
                }
                return t
            }
            refresh() {
                var t;
                let e = this.instance.pages.length,
                    n = Math.min(2, this.option("minCount")),
                    i = Math.max(2e3, this.option("maxCount")),
                    a = this.option("dynamicFrom");
                if (e < n || e > i) return void this.cleanup();
                let l = typeof a == "number" && e > 5 && e >= a,
                    c = !this.list || this.isDynamic !== l || this.list.children.length !== e;
                c && this.cleanup();
                let h = this.build();
                if (et(h, this.cn("isDynamic"), !!l), c)
                    for (let r = 0; r < e; r++) h.append(this.createItem(r));
                let m, s = 0;
                for (let r of [...h.children]) {
                    let d = s === this.instance.page;
                    d && (m = r), et(r, this.cn("isCurrent"), d), (t = r.children[0]) === null || t === void 0 || t.setAttribute("aria-selected", d ? "true" : "false");
                    for (let u of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"]) Z(r, this.cn(u));
                    s++
                }
                if (m = m || h.firstChild, l && m) {
                    let r = m.previousElementSibling,
                        d = r && r.previousElementSibling;
                    v(r, this.cn("isPrev")), v(d, this.cn("isBeforePrev"));
                    let u = m.nextElementSibling,
                        p = u && u.nextElementSibling;
                    v(u, this.cn("isNext")), v(p, this.cn("isAfterNext"))
                }
                this.isDynamic = l
            }
            createItem(t = 0) {
                var e;
                let n = document.createElement("li");
                n.setAttribute("role", "presentation");
                let i = tt(this.instance.localize(this.option("dotTpl"), [
                    ["%d", t + 1]
                ]).replace(/\%i/g, t + ""));
                return n.appendChild(i), (e = n.children[0]) === null || e === void 0 || e.setAttribute("role", "tab"), n
            }
            cleanup() {
                this.list && (this.list.remove(), this.list = null), this.isDynamic = !1, Z(this.instance.container, this.cn("hasDots"))
            }
            attach() {
                this.instance.on(["refresh", "change"], this.onRefresh)
            }
            detach() {
                this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
            }
        };
    Object.defineProperty(be, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: fs
    });
    var ae = "disabled",
        re = "next",
        Fi = "prev",
        ge = class extends X {
            constructor() {
                super(...arguments), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "prev", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "next", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "isDom", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                })
            }
            onRefresh() {
                let t = this.instance,
                    e = t.pages.length,
                    n = t.page;
                if (e < 2) return void this.cleanup();
                this.build();
                let i = this.prev,
                    a = this.next;
                i && a && (i.removeAttribute(ae), a.removeAttribute(ae), t.isInfinite || (n <= 0 && i.setAttribute(ae, ""), n >= e - 1 && a.setAttribute(ae, "")))
            }
            addBtn(t) {
                var e;
                let n = this.instance,
                    i = document.createElement("button");
                i.setAttribute("tabindex", "0"), i.setAttribute("title", n.localize(`{{${t.toUpperCase()}}}`)), v(i, this.cn("button") + " " + this.cn(t === re ? "isNext" : "isPrev"));
                let a = n.isRTL ? t === re ? Fi : re : t;
                var l;
                return i.innerHTML = n.localize(this.option(`${a}Tpl`)), i.dataset[`carousel${l=t,l?l.match("^[a-z]")?l.charAt(0).toUpperCase()+l.substring(1):l:""}`] = "true", (e = this.container) === null || e === void 0 || e.appendChild(i), i
            }
            build() {
                let t = this.instance.container,
                    e = this.cn("container"),
                    {
                        container: n,
                        prev: i,
                        next: a
                    } = this;
                n || (n = t.querySelector("." + e), this.isDom = !!n), n || (n = document.createElement("div"), v(n, e), t.appendChild(n)), this.container = n, a || (a = n.querySelector("[data-carousel-next]")), a || (a = this.addBtn(re)), this.next = a, i || (i = n.querySelector("[data-carousel-prev]")), i || (i = this.addBtn(Fi)), this.prev = i
            }
            cleanup() {
                this.isDom || (this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove()), this.prev = null, this.next = null, this.container = null, this.isDom = !1
            }
            attach() {
                this.instance.on(["refresh", "change"], this.onRefresh)
            }
            detach() {
                this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
            }
        };
    Object.defineProperty(ge, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            classes: {
                container: "f-carousel__nav",
                button: "f-button",
                isNext: "is-next",
                isPrev: "is-prev"
            },
            nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
            prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
        }
    });
    var Be = class extends X {
        constructor() {
            super(...arguments), Object.defineProperty(this, "selectedIndex", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "target", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "nav", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            })
        }
        addAsTargetFor(t) {
            this.target = this.instance, this.nav = t, this.attachEvents()
        }
        addAsNavFor(t) {
            this.nav = this.instance, this.target = t, this.attachEvents()
        }
        attachEvents() {
            let {
                nav: t,
                target: e
            } = this;
            t && e && (t.options.initialSlide = e.options.initialPage, t.state === G.Ready ? this.onNavReady(t) : t.on("ready", this.onNavReady), e.state === G.Ready ? this.onTargetReady(e) : e.on("ready", this.onTargetReady))
        }
        onNavReady(t) {
            t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), t.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange()
        }
        onTargetReady(t) {
            t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), this.onTargetChange()
        }
        onNavClick(t, e, n) {
            this.onNavTouch(t, t.panzoom, n)
        }
        onNavTouch(t, e, n) {
            var i, a;
            if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
            let l = n.target,
                {
                    nav: c,
                    target: h
                } = this;
            if (!c || !h || !l) return;
            let m = l.closest("[data-index]");
            if (n.stopPropagation(), n.preventDefault(), !m) return;
            let s = parseInt(m.dataset.index || "", 10) || 0,
                r = h.getPageForSlide(s),
                d = c.getPageForSlide(s);
            c.slideTo(d), h.slideTo(r, {
                friction: ((a = (i = this.nav) === null || i === void 0 ? void 0 : i.plugins) === null || a === void 0 ? void 0 : a.Sync.option("friction")) || 0
            }), this.markSelectedSlide(s)
        }
        onNavCreateSlide(t, e) {
            e.index === this.selectedIndex && this.markSelectedSlide(e.index)
        }
        onTargetChange() {
            var t, e;
            let {
                target: n,
                nav: i
            } = this;
            if (!n || !i || i.state !== G.Ready || n.state !== G.Ready) return;
            let a = (e = (t = n.pages[n.page]) === null || t === void 0 ? void 0 : t.slides[0]) === null || e === void 0 ? void 0 : e.index,
                l = i.getPageForSlide(a);
            this.markSelectedSlide(a), i.slideTo(l, i.prevPage === null && n.prevPage === null ? {
                friction: 0
            } : void 0)
        }
        markSelectedSlide(t) {
            let e = this.nav;
            e && e.state === G.Ready && (this.selectedIndex = t, [...e.slides].map(n => {
                n.el && n.el.classList[n.index === t ? "add" : "remove"]("is-nav-selected")
            }))
        }
        attach() {
            let t = this,
                e = t.options.target,
                n = t.options.nav;
            e ? t.addAsNavFor(e) : n && t.addAsTargetFor(n)
        }
        detach() {
            let t = this,
                e = t.nav,
                n = t.target;
            e && (e.off("ready", t.onNavReady), e.off("createSlide", t.onNavCreateSlide), e.off("Panzoom.click", t.onNavClick), e.off("Panzoom.touchEnd", t.onNavTouch)), t.nav = null, n && (n.off("ready", t.onTargetReady), n.off("refresh", t.onTargetChange), n.off("change", t.onTargetChange)), t.target = null
        }
    };
    Object.defineProperty(Be, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            friction: .35
        }
    });
    var Qs = {
            Navigation: ge,
            Dots: be,
            Sync: Be
        },
        le = "animationend",
        Ui = "isSelected",
        ce = "slide",
        vt = class o extends Ot {
            get axis() {
                return this.isHorizontal ? "e" : "f"
            }
            get isEnabled() {
                return this.state === G.Ready
            }
            get isInfinite() {
                let t = !1,
                    {
                        contentDim: e,
                        viewportDim: n,
                        pages: i,
                        slides: a
                    } = this,
                    l = a[0];
                return i.length >= 2 && l && e + l.dim >= n && (t = this.option("infinite")), t
            }
            get isRTL() {
                return this.option("direction") === "rtl"
            }
            get isHorizontal() {
                return this.option("axis") === "x"
            }
            constructor(t, e = {}, n = {}) {
                if (super(), Object.defineProperty(this, "bp", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: ""
                    }), Object.defineProperty(this, "lp", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: 0
                    }), Object.defineProperty(this, "userOptions", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: {}
                    }), Object.defineProperty(this, "userPlugins", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: {}
                    }), Object.defineProperty(this, "state", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: G.Init
                    }), Object.defineProperty(this, "page", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: 0
                    }), Object.defineProperty(this, "prevPage", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "container", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: void 0
                    }), Object.defineProperty(this, "viewport", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "track", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "slides", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: []
                    }), Object.defineProperty(this, "pages", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: []
                    }), Object.defineProperty(this, "panzoom", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: null
                    }), Object.defineProperty(this, "inTransition", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: new Set
                    }), Object.defineProperty(this, "contentDim", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: 0
                    }), Object.defineProperty(this, "viewportDim", {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: 0
                    }), typeof t == "string" && (t = document.querySelector(t)), !t || !N(t)) throw new Error("No Element found");
                this.container = t, this.slideNext = gi(this.slideNext.bind(this), 150), this.slidePrev = gi(this.slidePrev.bind(this), 150), this.userOptions = e, this.userPlugins = n, queueMicrotask(() => {
                    this.processOptions()
                })
            }
            processOptions() {
                var t, e;
                let n = A({}, o.defaults, this.userOptions),
                    i = "",
                    a = n.breakpoints;
                if (a && Wn(a))
                    for (let [l, c] of Object.entries(a)) window.matchMedia(l).matches && Wn(c) && (i += l, A(n, c));
                i === this.bp && this.state !== G.Init || (this.bp = i, this.state === G.Ready && (n.initialSlide = ((e = (t = this.pages[this.page]) === null || t === void 0 ? void 0 : t.slides[0]) === null || e === void 0 ? void 0 : e.index) || 0), this.state !== G.Init && this.destroy(), super.setOptions(n), this.option("enabled") === !1 ? this.attachEvents() : setTimeout(() => {
                    this.init()
                }, 0))
            }
            init() {
                this.state = G.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, o.Plugins), this.userPlugins)), this.emit("attachPlugins"), this.initLayout(), this.initSlides(), this.updateMetrics(), this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = G.Ready, this.emit("ready")
            }
            initLayout() {
                let {
                    container: t
                } = this, e = this.option("classes");
                v(t, this.cn("container")), et(t, e.isLTR, !this.isRTL), et(t, e.isRTL, this.isRTL), et(t, e.isVertical, !this.isHorizontal), et(t, e.isHorizontal, this.isHorizontal);
                let n = this.option("viewport") || t.querySelector(`.${e.viewport}`);
                n || (n = document.createElement("div"), v(n, e.viewport), n.append(...Bi(t, `.${e.slide}`)), t.prepend(n)), n.addEventListener("scroll", this.onScroll);
                let i = this.option("track") || t.querySelector(`.${e.track}`);
                i || (i = document.createElement("div"), v(i, e.track), i.append(...Array.from(n.childNodes))), i.setAttribute("aria-live", "polite"), n.contains(i) || n.prepend(i), this.viewport = n, this.track = i, this.emit("initLayout")
            }
            initSlides() {
                let {
                    track: t
                } = this;
                if (!t) return;
                let e = [...this.slides],
                    n = [];
                [...Bi(t, `.${this.cn(ce)}`)].forEach(i => {
                    if (N(i)) {
                        let a = un({
                            el: i,
                            isDom: !0,
                            index: this.slides.length
                        });
                        n.push(a)
                    }
                });
                for (let i of [...this.option("slides", []) || [], ...e]) n.push(un(i));
                this.slides = n;
                for (let i = 0; i < this.slides.length; i++) this.slides[i].index = i;
                for (let i of n) this.emit("beforeInitSlide", i, i.index), this.emit("initSlide", i, i.index);
                this.emit("initSlides")
            }
            setInitialPage() {
                let t = this.option("initialSlide");
                this.page = typeof t == "number" ? this.getPageForSlide(t) : parseInt(this.option("initialPage", 0) + "", 10) || 0
            }
            setInitialPosition() {
                let {
                    track: t,
                    pages: e,
                    isHorizontal: n
                } = this;
                if (!t || !e.length) return;
                let i = this.page;
                e[i] || (this.page = i = 0);
                let a = (e[i].pos || 0) * (this.isRTL && n ? 1 : -1),
                    l = n ? `${a}px` : "0",
                    c = n ? "0" : `${a}px`;
                t.style.transform = `translate3d(${l}, ${c}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight()
            }
            initPanzoom() {
                this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
                let t = this.option("Panzoom") || {};
                this.panzoom = new Qt(this.viewport, A({}, {
                    content: this.track,
                    zoom: !1,
                    panOnlyZoomed: !1,
                    lockAxis: this.isHorizontal ? "x" : "y",
                    infinite: this.isInfinite,
                    click: !1,
                    dblClick: !1,
                    touch: e => !(this.pages.length < 2 && !e.options.infinite),
                    bounds: () => this.getBounds(),
                    maxVelocity: e => Math.abs(e.target[this.axis] - e.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
                }, t)), this.panzoom.on("*", (e, n, ...i) => {
                    this.emit(`Panzoom.${n}`, e, ...i)
                }), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation)
            }
            attachEvents() {
                let t = this.container;
                t && (t.addEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !1
                }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize)
            }
            createPages() {
                let t = [],
                    {
                        contentDim: e,
                        viewportDim: n
                    } = this,
                    i = this.option("slidesPerPage");
                i = (i === "auto" || e <= n) && this.option("fill") !== !1 ? 1 / 0 : parseFloat(i + "");
                let a = 0,
                    l = 0,
                    c = 0;
                for (let h of this.slides)(!t.length || l + h.dim - n > .05 || c >= i) && (t.push(ps()), a = t.length - 1, l = 0, c = 0), t[a].slides.push(h), l += h.dim + h.gap, c++;
                return t
            }
            processPages() {
                let t = this.pages,
                    {
                        contentDim: e,
                        viewportDim: n,
                        isInfinite: i
                    } = this,
                    a = this.option("center"),
                    l = this.option("fill"),
                    c = l && a && e > n && !i;
                if (t.forEach((s, r) => {
                        var d;
                        s.index = r, s.pos = ((d = s.slides[0]) === null || d === void 0 ? void 0 : d.pos) || 0, s.dim = 0;
                        for (let [u, p] of s.slides.entries()) s.dim += p.dim, u < s.slides.length - 1 && (s.dim += p.gap);
                        c && s.pos + .5 * s.dim < .5 * n ? s.pos = 0 : c && s.pos + .5 * s.dim >= e - .5 * n ? s.pos = e - n : a && (s.pos += -.5 * (n - s.dim))
                    }), t.forEach(s => {
                        l && !i && e > n && (s.pos = Math.max(s.pos, 0), s.pos = Math.min(s.pos, e - n)), s.pos = B(s.pos, 1e3), s.dim = B(s.dim, 1e3), Math.abs(s.pos) <= .1 && (s.pos = 0)
                    }), i) return t;
                let h = [],
                    m;
                return t.forEach(s => {
                    let r = Object.assign({}, s);
                    m && r.pos === m.pos ? (m.dim += r.dim, m.slides = [...m.slides, ...r.slides]) : (r.index = h.length, m = r, h.push(r))
                }), h
            }
            getPageFromIndex(t = 0) {
                let e = this.pages.length,
                    n;
                return t = parseInt((t || 0).toString()) || 0, n = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, e - 1), 0), n
            }
            getSlideMetrics(t) {
                var e, n;
                let i = this.isHorizontal ? "width" : "height",
                    a = 0,
                    l = 0,
                    c = t.el,
                    h = !(!c || c.parentNode);
                if (c ? a = parseFloat(c.dataset[i] || "") || 0 : (c = document.createElement("div"), c.style.visibility = "hidden", (this.track || document.body).prepend(c)), v(c, this.cn(ce) + " " + t.class + " " + t.customClass), a) c.style[i] = `${a}px`, c.style[i === "width" ? "height" : "width"] = "";
                else {
                    h && (this.track || document.body).prepend(c), a = c.getBoundingClientRect()[i] * Math.max(1, ((e = window.visualViewport) === null || e === void 0 ? void 0 : e.scale) || 1);
                    let s = c[this.isHorizontal ? "offsetWidth" : "offsetHeight"];
                    s - 1 > a && (a = s)
                }
                let m = getComputedStyle(c);
                return m.boxSizing === "content-box" && (this.isHorizontal ? (a += parseFloat(m.paddingLeft) || 0, a += parseFloat(m.paddingRight) || 0) : (a += parseFloat(m.paddingTop) || 0, a += parseFloat(m.paddingBottom) || 0)), l = parseFloat(m[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, h ? (n = c.parentElement) === null || n === void 0 || n.removeChild(c) : t.el || c.remove(), {
                    dim: B(a, 1e3),
                    gap: B(l, 1e3)
                }
            }
            getBounds() {
                let {
                    isInfinite: t,
                    isRTL: e,
                    isHorizontal: n,
                    pages: i
                } = this, a = {
                    min: 0,
                    max: 0
                };
                if (t) a = {
                    min: -1 / 0,
                    max: 1 / 0
                };
                else if (i.length) {
                    let l = i[0].pos,
                        c = i[i.length - 1].pos;
                    a = e && n ? {
                        min: l,
                        max: c
                    } : {
                        min: -1 * c,
                        max: -1 * l
                    }
                }
                return {
                    x: n ? a : {
                        min: 0,
                        max: 0
                    },
                    y: n ? {
                        min: 0,
                        max: 0
                    } : a
                }
            }
            repositionSlides() {
                let t, {
                        isHorizontal: e,
                        isRTL: n,
                        isInfinite: i,
                        viewport: a,
                        viewportDim: l,
                        contentDim: c,
                        page: h,
                        pages: m,
                        slides: s,
                        panzoom: r
                    } = this,
                    d = 0,
                    u = 0,
                    p = 0,
                    f = 0;
                r ? f = -1 * r.current[this.axis] : m[h] && (f = m[h].pos || 0), t = e ? n ? "right" : "left" : "top", n && e && (f *= -1);
                for (let F of s) {
                    let x = F.el;
                    x ? (t === "top" ? (x.style.right = "", x.style.left = "") : x.style.top = "", F.index !== d ? x.style[t] = u === 0 ? "" : `${B(u,1e3)}px` : x.style[t] = "", p += F.dim + F.gap, d++) : u += F.dim + F.gap
                }
                if (i && p && a) {
                    let F = getComputedStyle(a),
                        x = "padding",
                        E = e ? "Right" : "Bottom",
                        W = parseFloat(F[x + (e ? "Left" : "Top")]);
                    f -= W, l += W, l += parseFloat(F[x + E]);
                    for (let y of s) y.el && (B(y.pos) < B(l) && B(y.pos + y.dim + y.gap) < B(f) && B(f) > B(c - l) && (y.el.style[t] = `${B(u+p,1e3)}px`), B(y.pos + y.gap) >= B(c - l) && B(y.pos) > B(f + l) && B(f) < B(l) && (y.el.style[t] = `-${B(p,1e3)}px`))
                }
                let Q, b, g = [...this.inTransition];
                if (g.length > 1 && (Q = m[g[0]], b = m[g[1]]), Q && b) {
                    let F = 0;
                    for (let x of s) x.el ? this.inTransition.has(x.index) && Q.slides.indexOf(x) < 0 && (x.el.style[t] = `${B(F+(Q.pos-b.pos),1e3)}px`) : F += x.dim + x.gap
                }
            }
            createSlideEl(t) {
                let {
                    track: e,
                    slides: n
                } = this;
                if (!e || !t || t.el && t.el.parentNode) return;
                let i = t.el || document.createElement("div");
                v(i, this.cn(ce)), v(i, t.class), v(i, t.customClass);
                let a = t.html;
                a && (a instanceof HTMLElement ? i.appendChild(a) : i.innerHTML = t.html + "");
                let l = [];
                n.forEach((s, r) => {
                    s.el && l.push(r)
                });
                let c = t.index,
                    h = null;
                l.length && (h = n[l.reduce((s, r) => Math.abs(r - c) < Math.abs(s - c) ? r : s)]);
                let m = h && h.el && h.el.parentNode ? h.index < t.index ? h.el.nextSibling : h.el : null;
                e.insertBefore(i, e.contains(m) ? m : null), t.el = i, this.emit("createSlide", t)
            }
            removeSlideEl(t, e = !1) {
                let n = t?.el;
                if (!n || !n.parentNode) return;
                let i = this.cn(Ui);
                if (n.classList.contains(i) && (Z(n, i), this.emit("unselectSlide", t)), t.isDom && !e) return n.removeAttribute("aria-hidden"), n.removeAttribute("data-index"), void(n.style.left = "");
                this.emit("removeSlide", t);
                let a = new CustomEvent(le);
                n.dispatchEvent(a), t.el && (t.el.remove(), t.el = null)
            }
            transitionTo(t = 0, e = this.option("transition")) {
                var n, i, a, l;
                if (!e) return !1;
                let c = this.page,
                    {
                        pages: h,
                        panzoom: m
                    } = this;
                t = parseInt((t || 0).toString()) || 0;
                let s = this.getPageFromIndex(t);
                if (!m || !h[s] || h.length < 2 || Math.abs((((i = (n = h[c]) === null || n === void 0 ? void 0 : n.slides[0]) === null || i === void 0 ? void 0 : i.dim) || 0) - this.viewportDim) > 1) return !1;
                let r = t > c ? 1 : -1;
                this.isInfinite && (c === 0 && t === h.length - 1 && (r = -1), c === h.length - 1 && t === 0 && (r = 1));
                let d = h[s].pos * (this.isRTL ? 1 : -1);
                if (c === s && Math.abs(d - m.target[this.axis]) < 1) return !1;
                this.clearTransitions();
                let u = m.isResting;
                v(this.container, this.cn("inTransition"));
                let p = ((a = h[c]) === null || a === void 0 ? void 0 : a.slides[0]) || null,
                    f = ((l = h[s]) === null || l === void 0 ? void 0 : l.slides[0]) || null;
                this.inTransition.add(f.index), this.createSlideEl(f);
                let Q = p.el,
                    b = f.el;
                u || e === ce || (e = "fadeFast", Q = null);
                let g = this.isRTL ? "next" : "prev",
                    F = this.isRTL ? "prev" : "next";
                return Q && (this.inTransition.add(p.index), p.transition = e, Q.addEventListener(le, this.onAnimationEnd), Q.classList.add(`f-${e}Out`, `to-${r>0?F:g}`)), b && (f.transition = e, b.addEventListener(le, this.onAnimationEnd), b.classList.add(`f-${e}In`, `from-${r>0?g:F}`)), m.current[this.axis] = d, m.target[this.axis] = d, m.requestTick(), this.onChange(s), !0
            }
            manageSlideVisiblity() {
                let t = new Set,
                    e = new Set,
                    n = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
                for (let i of this.slides) n.has(i) ? t.add(i) : e.add(i);
                for (let i of this.inTransition) t.add(this.slides[i]);
                for (let i of t) this.createSlideEl(i), this.lazyLoadSlide(i);
                for (let i of e) t.has(i) || this.removeSlideEl(i);
                this.markSelectedSlides(), this.repositionSlides()
            }
            markSelectedSlides() {
                if (!this.pages[this.page] || !this.pages[this.page].slides) return;
                let t = "aria-hidden",
                    e = this.cn(Ui);
                if (e)
                    for (let n of this.slides) {
                        let i = n.el;
                        i && (i.dataset.index = `${n.index}`, i.classList.contains("f-thumbs__slide") ? this.getVisibleSlides(0).has(n) ? i.removeAttribute(t) : i.setAttribute(t, "true") : this.pages[this.page].slides.includes(n) ? (i.classList.contains(e) || (v(i, e), this.emit("selectSlide", n)), i.removeAttribute(t)) : (i.classList.contains(e) && (Z(i, e), this.emit("unselectSlide", n)), i.setAttribute(t, "true")))
                    }
            }
            flipInfiniteTrack() {
                let {
                    axis: t,
                    isHorizontal: e,
                    isInfinite: n,
                    isRTL: i,
                    viewportDim: a,
                    contentDim: l
                } = this, c = this.panzoom;
                if (!c || !n) return;
                let h = c.current[t],
                    m = c.target[t] - h,
                    s = 0,
                    r = .5 * a;
                i && e ? (h < -r && (s = -1, h += l), h > l - r && (s = 1, h -= l)) : (h > r && (s = 1, h -= l), h < -l + r && (s = -1, h += l)), s && (c.current[t] = h, c.target[t] = h + m)
            }
            lazyLoadImg(t, e) {
                let n = this,
                    i = "f-fadeIn",
                    a = "is-preloading",
                    l = !1,
                    c = null,
                    h = () => {
                        l || (l = !0, c && (c.remove(), c = null), Z(e, a), e.complete && (v(e, i), setTimeout(() => {
                            Z(e, i)
                        }, 350)), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && (n.updateMetrics(), n.setViewportHeight()), this.emit("load", t))
                    };
                v(e, a), e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, delete e.dataset.lazySrcset, e.addEventListener("error", () => {
                    h()
                }), e.addEventListener("load", () => {
                    h()
                }), setTimeout(() => {
                    let m = e.parentNode;
                    m && t.el && (e.complete ? h() : l || (c = tt(Vn), m.insertBefore(c, e)))
                }, 300)
            }
            lazyLoadSlide(t) {
                let e = t && t.el;
                if (!e) return;
                let n = new Set,
                    i = Array.from(e.querySelectorAll("[data-lazy-src],[data-lazy-srcset]"));
                e.dataset.lazySrc && i.push(e), i.map(a => {
                    a instanceof HTMLImageElement ? n.add(a) : a instanceof HTMLElement && a.dataset.lazySrc && (a.style.backgroundImage = `url('${a.dataset.lazySrc}')`, delete a.dataset.lazySrc)
                });
                for (let a of n) this.lazyLoadImg(t, a)
            }
            onAnimationEnd(t) {
                var e;
                let n = t.target,
                    i = n ? parseInt(n.dataset.index || "", 10) || 0 : -1,
                    a = this.slides[i],
                    l = t.animationName;
                if (!n || !a || !l) return;
                let c = !!this.inTransition.has(i) && a.transition;
                c && l.substring(0, c.length + 2) === `f-${c}` && this.inTransition.delete(i), this.inTransition.size || this.clearTransitions(), i === this.page && (!((e = this.panzoom) === null || e === void 0) && e.isResting) && this.emit("settle")
            }
            onDecel(t, e = 0, n = 0, i = 0, a = 0) {
                if (this.option("dragFree")) return void this.setPageFromPosition();
                let {
                    isRTL: l,
                    isHorizontal: c,
                    axis: h,
                    pages: m
                } = this, s = m.length, r = Math.abs(Math.atan2(n, e) / (Math.PI / 180)), d = 0;
                if (d = r > 45 && r < 135 ? c ? 0 : n : c ? e : 0, !s) return;
                let u = this.page,
                    p = l && c ? 1 : -1,
                    f = t.current[h] * p,
                    {
                        pageIndex: Q
                    } = this.getPageFromPosition(f);
                Math.abs(d) > 5 ? (m[u].dim < document.documentElement["client" + (this.isHorizontal ? "Width" : "Height")] - 1 && (u = Q), u = l && c ? d < 0 ? u - 1 : u + 1 : d < 0 ? u + 1 : u - 1) : u = i === 0 && a === 0 ? u : Q, this.slideTo(u, {
                    transition: !1,
                    friction: t.option("decelFriction")
                })
            }
            onClick(t) {
                let e = t.target,
                    n = e && N(e) ? e.dataset : null,
                    i, a;
                n && (n.carouselPage !== void 0 ? (a = "slideTo", i = n.carouselPage) : n.carouselNext !== void 0 ? a = "slideNext" : n.carouselPrev !== void 0 && (a = "slidePrev")), a ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[a](i)) : this.emit("click", t)
            }
            onSlideTo(t) {
                let e = t.detail || 0;
                this.slideTo(this.getPageForSlide(e), {
                    friction: 0
                })
            }
            onChange(t, e = 0) {
                let n = this.page;
                this.prevPage = n, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), t !== n && (this.markSelectedSlides(), this.emit("change", t, n, e))
            }
            onRefresh() {
                let t = this.contentDim,
                    e = this.viewportDim;
                this.updateMetrics(), this.contentDim === t && this.viewportDim === e || this.slideTo(this.page, {
                    friction: 0,
                    transition: !1
                })
            }
            onScroll() {
                var t;
                (t = this.viewport) === null || t === void 0 || t.scroll(0, 0)
            }
            onResize() {
                this.option("breakpoints") && this.processOptions()
            }
            onBeforeTransform(t) {
                this.lp !== t.current[this.axis] && (this.flipInfiniteTrack(), this.manageSlideVisiblity()), this.lp = t.current.e
            }
            onEndAnimation() {
                this.inTransition.size || this.emit("settle")
            }
            reInit(t = null, e = null) {
                this.destroy(), this.state = G.Init, this.prevPage = null, this.userOptions = t || this.userOptions, this.userPlugins = e || this.userPlugins, this.processOptions()
            }
            slideTo(t = 0, {
                friction: e = this.option("friction"),
                transition: n = this.option("transition")
            } = {}) {
                if (this.state === G.Destroy) return;
                t = parseInt((t || 0).toString()) || 0;
                let i = this.getPageFromIndex(t),
                    {
                        axis: a,
                        isHorizontal: l,
                        isRTL: c,
                        pages: h,
                        panzoom: m
                    } = this,
                    s = h.length,
                    r = c && l ? 1 : -1;
                if (!m || !s) return;
                if (this.page !== i) {
                    let u = new Event("beforeChange", {
                        bubbles: !0,
                        cancelable: !0
                    });
                    if (this.emit("beforeChange", u, t), u.defaultPrevented) return
                }
                if (this.transitionTo(t, n)) return;
                let d = h[i].pos;
                if (this.isInfinite) {
                    let u = this.contentDim,
                        p = m.target[a] * r;
                    s === 2 ? d += u * Math.floor(parseFloat(t + "") / 2) : d = [d, d - u, d + u].reduce(function(f, Q) {
                        return Math.abs(Q - p) < Math.abs(f - p) ? Q : f
                    })
                }
                d *= r, Math.abs(m.target[a] - d) < 1 || (m.panTo({
                    x: l ? d : 0,
                    y: l ? 0 : d,
                    friction: e
                }), this.onChange(i))
            }
            slideToClosest(t) {
                if (this.panzoom) {
                    let {
                        pageIndex: e
                    } = this.getPageFromPosition();
                    this.slideTo(e, t)
                }
            }
            slideNext() {
                this.slideTo(this.page + 1)
            }
            slidePrev() {
                this.slideTo(this.page - 1)
            }
            clearTransitions() {
                this.inTransition.clear(), Z(this.container, this.cn("inTransition"));
                let t = ["to-prev", "to-next", "from-prev", "from-next"];
                for (let e of this.slides) {
                    let n = e.el;
                    if (n) {
                        n.removeEventListener(le, this.onAnimationEnd), n.classList.remove(...t);
                        let i = e.transition;
                        i && n.classList.remove(`f-${i}Out`, `f-${i}In`)
                    }
                }
                this.manageSlideVisiblity()
            }
            addSlide(t, e) {
                var n, i, a, l;
                let c = this.panzoom,
                    h = ((n = this.pages[this.page]) === null || n === void 0 ? void 0 : n.pos) || 0,
                    m = ((i = this.pages[this.page]) === null || i === void 0 ? void 0 : i.dim) || 0,
                    s = this.contentDim < this.viewportDim,
                    r = Array.isArray(e) ? e : [e],
                    d = [];
                for (let u of r) d.push(un(u));
                this.slides.splice(t, 0, ...d);
                for (let u = 0; u < this.slides.length; u++) this.slides[u].index = u;
                for (let u of d) this.emit("beforeInitSlide", u, u.index);
                if (this.page >= t && (this.page += d.length), this.updateMetrics(), c) {
                    let u = ((a = this.pages[this.page]) === null || a === void 0 ? void 0 : a.pos) || 0,
                        p = ((l = this.pages[this.page]) === null || l === void 0 ? void 0 : l.dim) || 0,
                        f = this.pages.length || 1,
                        Q = this.isRTL ? m - p : p - m,
                        b = this.isRTL ? h - u : u - h;
                    s && f === 1 ? (t <= this.page && (c.current[this.axis] -= Q, c.target[this.axis] -= Q), c.panTo({
                        [this.isHorizontal ? "x" : "y"]: -1 * u
                    })) : b && t <= this.page && (c.target[this.axis] -= b, c.current[this.axis] -= b, c.requestTick())
                }
                for (let u of d) this.emit("initSlide", u, u.index)
            }
            prependSlide(t) {
                this.addSlide(0, t)
            }
            appendSlide(t) {
                this.addSlide(this.slides.length, t)
            }
            removeSlide(t) {
                let e = this.slides.length;
                t = (t % e + e) % e;
                let n = this.slides[t];
                if (n) {
                    this.removeSlideEl(n, !0), this.slides.splice(t, 1);
                    for (let i = 0; i < this.slides.length; i++) this.slides[i].index = i;
                    this.updateMetrics(), this.slideTo(this.page, {
                        friction: 0,
                        transition: !1
                    }), this.emit("destroySlide", n)
                }
            }
            updateMetrics() {
                let {
                    panzoom: t,
                    viewport: e,
                    track: n,
                    slides: i,
                    isHorizontal: a,
                    isInfinite: l
                } = this;
                if (!n) return;
                let c = a ? "width" : "height",
                    h = a ? "offsetWidth" : "offsetHeight";
                if (e) {
                    let r = Math.max(e[h], B(e.getBoundingClientRect()[c], 1e3)),
                        d = getComputedStyle(e),
                        u = "padding",
                        p = a ? "Right" : "Bottom";
                    r -= parseFloat(d[u + (a ? "Left" : "Top")]) + parseFloat(d[u + p]), this.viewportDim = r
                }
                let m, s = 0;
                for (let [r, d] of i.entries()) {
                    let u = 0,
                        p = 0;
                    !d.el && m ? (u = m.dim, p = m.gap) : ({
                        dim: u,
                        gap: p
                    } = this.getSlideMetrics(d), m = d), u = B(u, 1e3), p = B(p, 1e3), d.dim = u, d.gap = p, d.pos = s, s += u, (l || r < i.length - 1) && (s += p)
                }
                s = B(s, 1e3), this.contentDim = s, t && (t.contentRect[c] = s, t.contentRect[a ? "fullWidth" : "fullHeight"] = s), this.pages = this.createPages(), this.pages = this.processPages(), this.state === G.Init && this.setInitialPage(), this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), this.manageSlideVisiblity(), this.emit("refresh")
            }
            getProgress(t, e = !1, n = !1) {
                t === void 0 && (t = this.page);
                let i = this,
                    a = i.panzoom,
                    l = i.contentDim,
                    c = i.pages[t] || 0;
                if (!c || !a) return t > this.page ? -1 : 1;
                let h = -1 * a.current.e,
                    m = B((h - c.pos) / (1 * c.dim), 1e3),
                    s = m,
                    r = m;
                this.isInfinite && n !== !0 && (s = B((h - c.pos + l) / (1 * c.dim), 1e3), r = B((h - c.pos - l) / (1 * c.dim), 1e3));
                let d = [m, s, r].reduce(function(u, p) {
                    return Math.abs(p) < Math.abs(u) ? p : u
                });
                return e ? d : d > 1 ? 1 : d < -1 ? -1 : d
            }
            setViewportHeight() {
                let {
                    page: t,
                    pages: e,
                    viewport: n,
                    isHorizontal: i
                } = this;
                if (!n || !e[t]) return;
                let a = 0;
                i && this.track && (this.track.style.height = "auto", e[t].slides.forEach(l => {
                    l.el && (a = Math.max(a, l.el.offsetHeight))
                })), n.style.height = a ? `${a}px` : ""
            }
            getPageForSlide(t) {
                for (let e of this.pages)
                    for (let n of e.slides)
                        if (n.index === t) return e.index;
                return -1
            }
            getVisibleSlides(t = 0) {
                var e;
                let n = new Set,
                    {
                        panzoom: i,
                        contentDim: a,
                        viewportDim: l,
                        pages: c,
                        page: h
                    } = this;
                if (l) {
                    a = a + ((e = this.slides[this.slides.length - 1]) === null || e === void 0 ? void 0 : e.gap) || 0;
                    let m = 0;
                    m = i && i.state !== O.Init && i.state !== O.Destroy ? -1 * i.current[this.axis] : c[h] && c[h].pos || 0, this.isInfinite && (m -= Math.floor(m / a) * a), this.isRTL && this.isHorizontal && (m *= -1);
                    let s = m - l * t,
                        r = m + l * (t + 1),
                        d = this.isInfinite ? [-1, 0, 1] : [0];
                    for (let u of this.slides)
                        for (let p of d) {
                            let f = u.pos + p * a,
                                Q = f + u.dim + u.gap;
                            f < r && Q > s && n.add(u)
                        }
                }
                return n
            }
            getPageFromPosition(t) {
                let {
                    viewportDim: e,
                    contentDim: n,
                    slides: i,
                    pages: a,
                    panzoom: l
                } = this, c = a.length, h = i.length, m = i[0], s = i[h - 1], r = this.option("center"), d = 0, u = 0, p = 0, f = t === void 0 ? -1 * (l?.target[this.axis] || 0) : t;
                r && (f += .5 * e), this.isInfinite ? (f < m.pos - .5 * s.gap && (f -= n, p = -1), f > s.pos + s.dim + .5 * s.gap && (f -= n, p = 1)) : f = Math.max(m.pos || 0, Math.min(f, s.pos));
                let Q = s,
                    b = i.find(g => {
                        let F = g.pos - .5 * Q.gap,
                            x = g.pos + g.dim + .5 * g.gap;
                        return Q = g, f >= F && f < x
                    });
                return b || (b = s), u = this.getPageForSlide(b.index), d = u + p * c, {
                    page: d,
                    pageIndex: u
                }
            }
            setPageFromPosition() {
                let {
                    pageIndex: t
                } = this.getPageFromPosition();
                this.onChange(t)
            }
            destroy() {
                if ([G.Destroy].includes(this.state)) return;
                this.state = G.Destroy;
                let {
                    container: t,
                    viewport: e,
                    track: n,
                    slides: i,
                    panzoom: a
                } = this, l = this.option("classes");
                t.removeEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !1
                }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), a && (a.destroy(), this.panzoom = null), i && i.forEach(h => {
                    this.removeSlideEl(h)
                }), this.detachPlugins(), e && (e.removeEventListener("scroll", this.onScroll), e.offsetParent && n && n.offsetParent && e.replaceWith(...n.childNodes));
                for (let [h, m] of Object.entries(l)) h !== "container" && m && t.classList.remove(m);
                this.track = null, this.viewport = null, this.page = 0, this.slides = [];
                let c = this.events.get("ready");
                this.events = new Map, c && this.events.set("ready", c)
            }
        };
    Object.defineProperty(vt, "Panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Qt
    }), Object.defineProperty(vt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ms
    }), Object.defineProperty(vt, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Qs
    });
    var Ai = function(o) {
            if (!N(o)) return 0;
            let t = window.scrollY,
                e = window.innerHeight,
                n = t + e,
                i = o.getBoundingClientRect(),
                a = i.y + t,
                l = i.height,
                c = a + l;
            if (t > c || n < a) return 0;
            if (t < a && n > c || a < t && c > n) return 100;
            let h = l;
            a < t && (h -= t - a), c > n && (h -= c - n);
            let m = h / e * 100;
            return Math.round(m)
        },
        Zt = !(typeof window > "u" || !window.document || !window.document.createElement),
        mn, pn = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'].join(","),
        vi = o => {
            if (o && Zt) {
                mn === void 0 && document.createElement("div").focus({
                    get preventScroll() {
                        return mn = !0, !1
                    }
                });
                try {
                    if (mn) o.focus({
                        preventScroll: !0
                    });
                    else {
                        let t = window.scrollY || document.body.scrollTop,
                            e = window.scrollX || document.body.scrollLeft;
                        o.focus(), document.body.scrollTo({
                            top: t,
                            left: e,
                            behavior: "auto"
                        })
                    }
                } catch {}
            }
        },
        Xi = () => {
            let o = document,
                t, e = "",
                n = "",
                i = "";
            return o.fullscreenEnabled ? (e = "requestFullscreen", n = "exitFullscreen", i = "fullscreenElement") : o.webkitFullscreenEnabled && (e = "webkitRequestFullscreen", n = "webkitExitFullscreen", i = "webkitFullscreenElement"), e && (t = {
                request: function(a = o.documentElement) {
                    return e === "webkitRequestFullscreen" ? a[e](Element.ALLOW_KEYBOARD_INPUT) : a[e]()
                },
                exit: function() {
                    return o[i] && o[n]()
                },
                isFullscreen: function() {
                    return o[i]
                }
            }), t
        },
        Ln = {
            animated: !0,
            autoFocus: !0,
            backdropClick: "close",
            Carousel: {
                classes: {
                    container: "fancybox__carousel",
                    viewport: "fancybox__viewport",
                    track: "fancybox__track",
                    slide: "fancybox__slide"
                }
            },
            closeButton: "auto",
            closeExisting: !1,
            commonCaption: !1,
            compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
            contentClick: "toggleZoom",
            contentDblClick: !1,
            defaultType: "image",
            defaultDisplay: "flex",
            dragToClose: !0,
            Fullscreen: {
                autoStart: !1
            },
            groupAll: !1,
            groupAttr: "data-fancybox",
            hideClass: "f-fadeOut",
            hideScrollbar: !0,
            idle: 3500,
            keyboard: {
                Escape: "close",
                Delete: "close",
                Backspace: "close",
                PageUp: "next",
                PageDown: "prev",
                ArrowUp: "prev",
                ArrowDown: "next",
                ArrowRight: "next",
                ArrowLeft: "prev"
            },
            l10n: Object.assign(Object.assign({}, Ni), {
                CLOSE: "Close",
                NEXT: "Next",
                PREV: "Previous",
                MODAL: "You can close this modal content with the ESC key",
                ERROR: "Something Went Wrong, Please Try Again Later",
                IMAGE_ERROR: "Image Not Found",
                ELEMENT_NOT_FOUND: "HTML Element Not Found",
                AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
                AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
                IFRAME_ERROR: "Error Loading Page",
                TOGGLE_ZOOM: "Toggle zoom level",
                TOGGLE_THUMBS: "Toggle thumbnails",
                TOGGLE_SLIDESHOW: "Toggle slideshow",
                TOGGLE_FULLSCREEN: "Toggle full-screen mode",
                DOWNLOAD: "Download"
            }),
            parentEl: null,
            placeFocusBack: !0,
            showClass: "f-zoomInUp",
            startIndex: 0,
            tpl: {
                closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
                main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
    <div class="fancybox__backdrop"></div>
    <div class="fancybox__carousel"></div>
    <div class="fancybox__footer"></div>
  </div>`
            },
            trapFocus: !0,
            wheel: "zoom"
        },
        D, _;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Ready = 1] = "Ready", o[o.Closing = 2] = "Closing", o[o.CustomClosing = 3] = "CustomClosing", o[o.Destroy = 4] = "Destroy"
    })(D || (D = {})),
    function(o) {
        o[o.Loading = 0] = "Loading", o[o.Opening = 1] = "Opening", o[o.Ready = 2] = "Ready", o[o.Closing = 3] = "Closing"
    }(_ || (_ = {}));
    var yi = "",
        Vt = !1,
        de = !1,
        pt = null,
        Yi = () => {
            let o = "",
                t = "",
                e = K.getInstance();
            if (e) {
                let n = e.carousel,
                    i = e.getSlide();
                if (n && i) {
                    let a = i.slug || void 0,
                        l = i.triggerEl || void 0;
                    t = a || e.option("slug") || "", !t && l && l.dataset && (t = l.dataset.fancybox || ""), t && t !== "true" && (o = "#" + t + (!a && n.slides.length > 1 ? "-" + (i.index + 1) : ""))
                }
            }
            return {
                hash: o,
                slug: t,
                index: 1
            }
        },
        Fe = () => {
            let o = new URL(document.URL).hash,
                t = o.slice(1).split("-"),
                e = t[t.length - 1],
                n = e && /^\+?\d+$/.test(e) && parseInt(t.pop() || "1", 10) || 1;
            return {
                hash: o,
                slug: t.join("-"),
                index: n
            }
        },
        Ji = () => {
            let {
                slug: o,
                index: t
            } = Fe();
            if (!o) return;
            let e = document.querySelector(`[data-slug="${o}"]`);
            if (e && e.dispatchEvent(new CustomEvent("click", {
                    bubbles: !0,
                    cancelable: !0
                })), K.getInstance()) return;
            let n = document.querySelectorAll(`[data-fancybox="${o}"]`);
            n.length && (e = n[t - 1], e && e.dispatchEvent(new CustomEvent("click", {
                bubbles: !0,
                cancelable: !0
            })))
        },
        zi = () => {
            if (K.defaults.Hash === !1) return;
            let o = K.getInstance();
            if (o?.options.Hash === !1) return;
            let {
                slug: t,
                index: e
            } = Fe(), {
                slug: n
            } = Yi();
            o && (t === n ? o.jumpTo(e - 1) : (Vt = !0, o.close())), Ji()
        },
        Hi = () => {
            pt && clearTimeout(pt), queueMicrotask(() => {
                zi()
            })
        },
        Ei = () => {
            window.addEventListener("hashchange", Hi, !1), setTimeout(() => {
                zi()
            }, 500)
        };
    Zt && (/complete|interactive|loaded/.test(document.readyState) ? Ei() : document.addEventListener("DOMContentLoaded", Ei));
    var he = "is-zooming-in",
        Ue = class extends X {
            onCreateSlide(t, e, n) {
                let i = this.instance.optionFor(n, "src") || "";
                n.el && n.type === "image" && typeof i == "string" && this.setImage(n, i)
            }
            onRemoveSlide(t, e, n) {
                n.panzoom && n.panzoom.destroy(), n.panzoom = void 0, n.imageEl = void 0
            }
            onChange(t, e, n, i) {
                Z(this.instance.container, he);
                for (let a of e.slides) {
                    let l = a.panzoom;
                    l && a.index !== n && l.reset(.35)
                }
            }
            onClose() {
                var t;
                let e = this.instance,
                    n = e.container,
                    i = e.getSlide();
                if (!n || !n.parentElement || !i) return;
                let {
                    el: a,
                    contentEl: l,
                    panzoom: c,
                    thumbElSrc: h
                } = i;
                if (!a || !h || !l || !c || c.isContentLoading || c.state === O.Init || c.state === O.Destroy) return;
                c.updateMetrics();
                let m = this.getZoomInfo(i);
                if (!m) return;
                this.instance.state = D.CustomClosing, n.classList.remove(he), n.classList.add("is-zooming-out"), l.style.backgroundImage = `url('${h}')`;
                let s = n.getBoundingClientRect();
                (((t = window.visualViewport) === null || t === void 0 ? void 0 : t.scale) || 1) === 1 && Object.assign(n.style, {
                    position: "absolute",
                    top: `${n.offsetTop+window.scrollY}px`,
                    left: `${n.offsetLeft+window.scrollX}px`,
                    bottom: "auto",
                    right: "auto",
                    width: `${s.width}px`,
                    height: `${s.height}px`,
                    overflow: "hidden"
                });
                let {
                    x: r,
                    y: d,
                    scale: u,
                    opacity: p
                } = m;
                if (p) {
                    let f = ((Q, b, g, F) => {
                        let x = b - Q,
                            E = F - g;
                        return W => g + ((W - Q) / x * E || 0)
                    })(c.scale, u, 1, 0);
                    c.on("afterTransform", () => {
                        l.style.opacity = f(c.scale) + ""
                    })
                }
                c.on("endAnimation", () => {
                    e.destroy()
                }), c.target.a = u, c.target.b = 0, c.target.c = 0, c.target.d = u, c.panTo({
                    x: r,
                    y: d,
                    scale: u,
                    friction: p ? .2 : .33,
                    ignoreBounds: !0
                }), c.isResting && e.destroy()
            }
            setImage(t, e) {
                let n = this.instance;
                t.src = e, this.process(t, e).then(i => {
                    let {
                        contentEl: a,
                        imageEl: l,
                        thumbElSrc: c,
                        el: h
                    } = t;
                    if (n.isClosing() || !a || !l) return;
                    a.offsetHeight;
                    let m = !!n.isOpeningSlide(t) && this.getZoomInfo(t);
                    if (this.option("protected") && h) {
                        h.addEventListener("contextmenu", d => {
                            d.preventDefault()
                        });
                        let r = document.createElement("div");
                        v(r, "fancybox-protected"), a.appendChild(r)
                    }
                    if (c && m) {
                        let r = i.contentRect,
                            d = Math.max(r.fullWidth, r.fullHeight),
                            u = null;
                        !m.opacity && d > 1200 && (u = document.createElement("img"), v(u, "fancybox-ghost"), u.src = c, a.appendChild(u));
                        let p = () => {
                            u && (v(u, "f-fadeFastOut"), setTimeout(() => {
                                u && (u.remove(), u = null)
                            }, 200))
                        };
                        (s = c, new Promise((f, Q) => {
                            let b = new Image;
                            b.onload = f, b.onerror = Q, b.src = s
                        })).then(() => {
                            n.hideLoading(t), t.state = _.Opening, this.instance.emit("reveal", t), this.zoomIn(t).then(() => {
                                p(), this.instance.done(t)
                            }, () => {}), u && setTimeout(() => {
                                p()
                            }, d > 2500 ? 800 : 200)
                        }, () => {
                            n.hideLoading(t), n.revealContent(t)
                        })
                    } else {
                        let r = this.optionFor(t, "initialSize"),
                            d = this.optionFor(t, "zoom"),
                            u = {
                                event: n.prevMouseMoveEvent || n.options.event,
                                friction: d ? .12 : 0
                            },
                            p = n.optionFor(t, "showClass") || void 0,
                            f = !0;
                        n.isOpeningSlide(t) && (r === "full" ? i.zoomToFull(u) : r === "cover" ? i.zoomToCover(u) : r === "max" ? i.zoomToMax(u) : f = !1, i.stop("current")), f && p && (p = i.isDragging ? "f-fadeIn" : ""), n.hideLoading(t), n.revealContent(t, p)
                    }
                    var s
                }, () => {
                    n.setError(t, "{{IMAGE_ERROR}}")
                })
            }
            process(t, e) {
                return new Promise((n, i) => {
                    var a;
                    let l = this.instance,
                        c = t.el;
                    l.clearContent(t), l.showLoading(t);
                    let h = this.optionFor(t, "content");
                    if (typeof h == "string" && (h = tt(h)), !h || !N(h)) {
                        if (h = document.createElement("img"), h instanceof HTMLImageElement) {
                            let m = "",
                                s = t.caption;
                            m = typeof s == "string" && s ? s.replace(/<[^>]+>/gi, "").substring(0, 1e3) : `Image ${t.index+1} of ${((a=l.carousel)===null||a===void 0?void 0:a.pages.length)||1}`, h.src = e || "", h.alt = m, h.draggable = !1, t.srcset && h.setAttribute("srcset", t.srcset), this.instance.isOpeningSlide(t) && (h.fetchPriority = "high")
                        }
                        t.sizes && h.setAttribute("sizes", t.sizes)
                    }
                    v(h, "fancybox-image"), t.imageEl = h, l.setContent(t, h, !1), t.panzoom = new Qt(c, A({
                        transformParent: !0
                    }, this.option("Panzoom") || {}, {
                        content: h,
                        width: (m, s) => l.optionFor(t, "width", "auto", s) || "auto",
                        height: (m, s) => l.optionFor(t, "height", "auto", s) || "auto",
                        wheel: () => {
                            let m = l.option("wheel");
                            return (m === "zoom" || m == "pan") && m
                        },
                        click: (m, s) => {
                            var r, d;
                            if (l.isCompact || l.isClosing() || t.index !== ((r = l.getSlide()) === null || r === void 0 ? void 0 : r.index)) return !1;
                            if (s) {
                                let p = s.composedPath()[0];
                                if (["A", "BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].includes(p.nodeName)) return !1
                            }
                            let u = !s || s.target && ((d = t.contentEl) === null || d === void 0 ? void 0 : d.contains(s.target));
                            return l.option(u ? "contentClick" : "backdropClick") || !1
                        },
                        dblClick: () => l.isCompact ? "toggleZoom" : l.option("contentDblClick") || !1,
                        spinner: !1,
                        panOnlyZoomed: !0,
                        wheelLimit: 1 / 0,
                        on: {
                            ready: m => {
                                n(m)
                            },
                            error: () => {
                                i()
                            },
                            destroy: () => {
                                i()
                            }
                        }
                    }))
                })
            }
            zoomIn(t) {
                return new Promise((e, n) => {
                    let i = this.instance,
                        a = i.container,
                        {
                            panzoom: l,
                            contentEl: c,
                            el: h
                        } = t;
                    l && l.updateMetrics();
                    let m = this.getZoomInfo(t);
                    if (!(m && h && c && l && a)) return void n();
                    let {
                        x: s,
                        y: r,
                        scale: d,
                        opacity: u
                    } = m, p = () => {
                        t.state !== _.Closing && (u && (c.style.opacity = Math.max(Math.min(1, 1 - (1 - l.scale) / (1 - d)), 0) + ""), l.scale >= 1 && l.scale > l.targetScale - .1 && e(l))
                    }, f = g => {
                        (g.scale < .99 || g.scale > 1.01) && !g.isDragging || (Z(a, he), c.style.opacity = "", g.off("endAnimation", f), g.off("touchStart", f), g.off("afterTransform", p), e(g))
                    };
                    l.on("endAnimation", f), l.on("touchStart", f), l.on("afterTransform", p), l.on(["error", "destroy"], () => {
                        n()
                    }), l.panTo({
                        x: s,
                        y: r,
                        scale: d,
                        friction: 0,
                        ignoreBounds: !0
                    }), l.stop("current");
                    let Q = {
                            event: l.panMode === "mousemove" ? i.prevMouseMoveEvent || i.options.event : void 0
                        },
                        b = this.optionFor(t, "initialSize");
                    v(a, he), i.hideLoading(t), b === "full" ? l.zoomToFull(Q) : b === "cover" ? l.zoomToCover(Q) : b === "max" ? l.zoomToMax(Q) : l.reset(.172)
                })
            }
            getZoomInfo(t) {
                let {
                    el: e,
                    imageEl: n,
                    thumbEl: i,
                    panzoom: a
                } = t, l = this.instance, c = l.container;
                if (!e || !n || !i || !a || Ai(i) < 3 || !this.optionFor(t, "zoom") || !c || l.state === D.Destroy || getComputedStyle(c).getPropertyValue("--f-images-zoom") === "0") return !1;
                let h = window.visualViewport || null;
                if ((h ? h.scale : 1) !== 1) return !1;
                let {
                    top: m,
                    left: s,
                    width: r,
                    height: d
                } = i.getBoundingClientRect(), {
                    top: u,
                    left: p,
                    fitWidth: f,
                    fitHeight: Q
                } = a.contentRect;
                if (!(r && d && f && Q)) return !1;
                let b = a.container.getBoundingClientRect();
                p += b.left, u += b.top;
                let g = -1 * (p + .5 * f - (s + .5 * r)),
                    F = -1 * (u + .5 * Q - (m + .5 * d)),
                    x = r / f,
                    E = this.option("zoomOpacity") || !1;
                return E === "auto" && (E = Math.abs(r / d - f / Q) > .1), {
                    x: g,
                    y: F,
                    scale: x,
                    opacity: E
                }
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.on("Carousel.change", t.onChange), e.on("Carousel.createSlide", t.onCreateSlide), e.on("Carousel.removeSlide", t.onRemoveSlide), e.on("close", t.onClose)
            }
            detach() {
                let t = this,
                    e = t.instance;
                e.off("Carousel.change", t.onChange), e.off("Carousel.createSlide", t.onCreateSlide), e.off("Carousel.removeSlide", t.onRemoveSlide), e.off("close", t.onClose)
            }
        };
    Object.defineProperty(Ue, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            initialSize: "fit",
            Panzoom: {
                maxScale: 1
            },
            protected: !1,
            zoom: !0,
            zoomOpacity: "auto"
        }
    }), typeof SuppressedError == "function" && SuppressedError;
    var fn = "html",
        xi = "image",
        Qn = "map",
        st = "youtube",
        ht = "vimeo",
        Lt = "html5video",
        wi = (o, t = {}) => {
            let e = new URL(o),
                n = new URLSearchParams(e.search),
                i = new URLSearchParams;
            for (let [c, h] of [...n, ...Object.entries(t)]) {
                let m = h + "";
                if (c === "t") {
                    let s = m.match(/((\d*)m)?(\d*)s?/);
                    s && i.set("start", 60 * parseInt(s[2] || "0") + parseInt(s[3] || "0") + "")
                } else i.set(c, m)
            }
            let a = i + "",
                l = o.match(/#t=((.*)?\d+s)/);
            return l && (a += `#t=${l[1]}`), a
        },
        bs = {
            ajax: null,
            autoSize: !0,
            iframeAttr: {
                allow: "autoplay; fullscreen",
                scrolling: "auto"
            },
            preload: !0,
            videoAutoplay: !0,
            videoRatio: 16 / 9,
            videoTpl: `<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">
  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn't support embedded videos.</video>`,
            videoFormat: "",
            vimeo: {
                byline: 1,
                color: "00adef",
                controls: 1,
                dnt: 1,
                muted: 0
            },
            youtube: {
                controls: 1,
                enablejsapi: 1,
                nocookie: 1,
                rel: 0,
                fs: 1
            }
        },
        gs = ["image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo"],
        ve = class extends X {
            onBeforeInitSlide(t, e, n) {
                this.processType(n)
            }
            onCreateSlide(t, e, n) {
                this.setContent(n)
            }
            onClearContent(t, e) {
                e.xhr && (e.xhr.abort(), e.xhr = null);
                let n = e.iframeEl;
                n && (n.onload = n.onerror = null, n.src = "//about:blank", e.iframeEl = null);
                let i = e.contentEl,
                    a = e.placeholderEl;
                if (e.type === "inline" && i && a) i.classList.remove("fancybox__content"), getComputedStyle(i).getPropertyValue("display") !== "none" && (i.style.display = "none"), setTimeout(() => {
                    a && (i && a.parentNode && a.parentNode.insertBefore(i, a), a.remove())
                }, 0), e.contentEl = void 0, e.placeholderEl = void 0;
                else
                    for (; e.el && e.el.firstChild;) e.el.removeChild(e.el.firstChild)
            }
            onSelectSlide(t, e, n) {
                n.state === _.Ready && this.playVideo()
            }
            onUnselectSlide(t, e, n) {
                var i, a;
                if (n.type === Lt) {
                    try {
                        (a = (i = n.el) === null || i === void 0 ? void 0 : i.querySelector("video")) === null || a === void 0 || a.pause()
                    } catch {}
                    return
                }
                let l;
                n.type === ht ? l = {
                    method: "pause",
                    value: "true"
                } : n.type === st && (l = {
                    event: "command",
                    func: "pauseVideo"
                }), l && n.iframeEl && n.iframeEl.contentWindow && n.iframeEl.contentWindow.postMessage(JSON.stringify(l), "*"), n.poller && clearTimeout(n.poller)
            }
            onDone(t, e) {
                t.isCurrentSlide(e) && !t.isClosing() && this.playVideo()
            }
            onRefresh(t, e) {
                e.slides.forEach(n => {
                    n.el && (this.resizeIframe(n), this.setAspectRatio(n))
                })
            }
            onMessage(t) {
                try {
                    let e = JSON.parse(t.data);
                    if (t.origin === "https://player.vimeo.com") {
                        if (e.event === "ready")
                            for (let n of Array.from(document.getElementsByClassName("fancybox__iframe"))) n instanceof HTMLIFrameElement && n.contentWindow === t.source && (n.dataset.ready = "true")
                    } else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && e.event === "onReady") {
                        let n = document.getElementById(e.id);
                        n && (n.dataset.ready = "true")
                    }
                } catch {}
            }
            loadAjaxContent(t) {
                let e = this.instance.optionFor(t, "src") || "";
                this.instance.showLoading(t);
                let n = this.instance,
                    i = new XMLHttpRequest;
                n.showLoading(t), i.onreadystatechange = function() {
                    i.readyState === XMLHttpRequest.DONE && n.state === D.Ready && (n.hideLoading(t), i.status === 200 ? n.setContent(t, i.responseText) : n.setError(t, i.status === 404 ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"))
                };
                let a = t.ajax || null;
                i.open(a ? "POST" : "GET", e + ""), i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i.send(a), t.xhr = i
            }
            setInlineContent(t) {
                let e = null;
                if (N(t.src)) e = t.src;
                else if (typeof t.src == "string") {
                    let n = t.src.split("#", 2).pop();
                    e = n ? document.getElementById(n) : null
                }
                if (e) {
                    if (t.type === "clone" || e.closest(".fancybox__slide")) {
                        e = e.cloneNode(!0);
                        let n = e.dataset.animationName;
                        n && (e.classList.remove(n), delete e.dataset.animationName);
                        let i = e.getAttribute("id");
                        i = i ? `${i}--clone` : `clone-${this.instance.id}-${t.index}`, e.setAttribute("id", i)
                    } else if (e.parentNode) {
                        let n = document.createElement("div");
                        n.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(n, e), t.placeholderEl = n
                    }
                    this.instance.setContent(t, e)
                } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}")
            }
            setIframeContent(t) {
                let {
                    src: e,
                    el: n
                } = t;
                if (!e || typeof e != "string" || !n) return;
                n.classList.add("is-loading");
                let i = this.instance,
                    a = document.createElement("iframe");
                a.className = "fancybox__iframe", a.setAttribute("id", `fancybox__iframe_${i.id}_${t.index}`);
                for (let [c, h] of Object.entries(this.optionFor(t, "iframeAttr") || {})) a.setAttribute(c, h);
                a.onerror = () => {
                    i.setError(t, "{{IFRAME_ERROR}}")
                }, t.iframeEl = a;
                let l = this.optionFor(t, "preload");
                if (t.type !== "iframe" || l === !1) return a.setAttribute("src", t.src + ""), i.setContent(t, a, !1), this.resizeIframe(t), void i.revealContent(t);
                i.showLoading(t), a.onload = () => {
                    if (!a.src.length) return;
                    let c = a.dataset.ready !== "true";
                    a.dataset.ready = "true", this.resizeIframe(t), c ? i.revealContent(t) : i.hideLoading(t)
                }, a.setAttribute("src", e), i.setContent(t, a, !1)
            }
            resizeIframe(t) {
                let {
                    type: e,
                    iframeEl: n
                } = t;
                if (e === st || e === ht) return;
                let i = n?.parentElement;
                if (!n || !i) return;
                let a = t.autoSize;
                a === void 0 && (a = this.optionFor(t, "autoSize"));
                let l = t.width || 0,
                    c = t.height || 0;
                l && c && (a = !1);
                let h = i && i.style;
                if (t.preload !== !1 && a !== !1 && h) try {
                    let m = window.getComputedStyle(i),
                        s = parseFloat(m.paddingLeft) + parseFloat(m.paddingRight),
                        r = parseFloat(m.paddingTop) + parseFloat(m.paddingBottom),
                        d = n.contentWindow;
                    if (d) {
                        let u = d.document,
                            p = u.getElementsByTagName(fn)[0],
                            f = u.body;
                        h.width = "", f.style.overflow = "hidden", l = l || p.scrollWidth + s, h.width = `${l}px`, f.style.overflow = "", h.flex = "0 0 auto", h.height = `${f.scrollHeight}px`, c = p.scrollHeight + r
                    }
                } catch {}
                if (l || c) {
                    let m = {
                        flex: "0 1 auto",
                        width: "",
                        height: ""
                    };
                    l && l !== "auto" && (m.width = `${l}px`), c && c !== "auto" && (m.height = `${c}px`), Object.assign(h, m)
                }
            }
            playVideo() {
                let t = this.instance.getSlide();
                if (!t) return;
                let {
                    el: e
                } = t;
                if (!e || !e.offsetParent || !this.optionFor(t, "videoAutoplay")) return;
                if (t.type === Lt) try {
                    let i = e.querySelector("video");
                    if (i) {
                        let a = i.play();
                        a !== void 0 && a.then(() => {}).catch(l => {
                            i.muted = !0, i.play()
                        })
                    }
                } catch {}
                if (t.type !== st && t.type !== ht) return;
                let n = () => {
                    if (t.iframeEl && t.iframeEl.contentWindow) {
                        let i;
                        if (t.iframeEl.dataset.ready === "true") return i = t.type === st ? {
                            event: "command",
                            func: "playVideo"
                        } : {
                            method: "play",
                            value: "true"
                        }, i && t.iframeEl.contentWindow.postMessage(JSON.stringify(i), "*"), void(t.poller = void 0);
                        t.type === st && (i = {
                            event: "listening",
                            id: t.iframeEl.getAttribute("id")
                        }, t.iframeEl.contentWindow.postMessage(JSON.stringify(i), "*"))
                    }
                    t.poller = setTimeout(n, 250)
                };
                n()
            }
            processType(t) {
                if (t.html) return t.type = fn, t.src = t.html, void(t.html = "");
                let e = this.instance.optionFor(t, "src", "");
                if (!e || typeof e != "string") return;
                let n = t.type,
                    i = null;
                if (i = e.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
                    let a = this.optionFor(t, st),
                        {
                            nocookie: l
                        } = a,
                        c = function(r, d) {
                            var u = {};
                            for (var p in r) Object.prototype.hasOwnProperty.call(r, p) && d.indexOf(p) < 0 && (u[p] = r[p]);
                            if (r != null && typeof Object.getOwnPropertySymbols == "function") {
                                var f = 0;
                                for (p = Object.getOwnPropertySymbols(r); f < p.length; f++) d.indexOf(p[f]) < 0 && Object.prototype.propertyIsEnumerable.call(r, p[f]) && (u[p[f]] = r[p[f]])
                            }
                            return u
                        }(a, ["nocookie"]),
                        h = `www.youtube${l?"-nocookie":""}.com`,
                        m = wi(e, c),
                        s = encodeURIComponent(i[2]);
                    t.videoId = s, t.src = `https://${h}/embed/${s}?${m}`, t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${s}/mqdefault.jpg`, n = st
                } else if (i = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)) {
                    let a = wi(e, this.optionFor(t, ht)),
                        l = encodeURIComponent(i[1]),
                        c = i[4] || "";
                    t.videoId = l, t.src = `https://player.vimeo.com/video/${l}?${c?`h=${c}${a?"&":""}`:""}${a}`, n = ht
                }
                if (!n && t.triggerEl) {
                    let a = t.triggerEl.dataset.type;
                    gs.includes(a) && (n = a)
                }
                n || typeof e == "string" && (e.charAt(0) === "#" ? n = "inline" : (i = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (n = Lt, t.videoFormat = t.videoFormat || "video/" + (i[1] === "ogv" ? "ogg" : i[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? n = xi : e.match(/\.(pdf)((\?|#).*)?$/i) && (n = "pdf")), (i = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `https://maps.google.${i[1]}/?ll=${(i[2]?i[2]+"&z="+Math.floor(parseFloat(i[3]))+(i[4]?i[4].replace(/^\//,"&"):""):i[4]+"").replace(/\?/,"&")}&output=${i[4]&&i[4].indexOf("layer=c")>0?"svembed":"embed"}`, n = Qn) : (i = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `https://maps.google.${i[1]}/maps?q=${i[2].replace("query=","q=").replace("api=1","")}&output=embed`, n = Qn), n = n || this.instance.option("defaultType"), t.type = n, n === xi && (t.thumbSrc = t.thumbSrc || t.src)
            }
            setContent(t) {
                let e = this.instance.optionFor(t, "src") || "";
                if (t && t.type && e) {
                    switch (t.type) {
                        case fn:
                            this.instance.setContent(t, e);
                            break;
                        case Lt:
                            let n = this.option("videoTpl");
                            n && this.instance.setContent(t, n.replace(/\{\{src\}\}/gi, e + "").replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || ""));
                            break;
                        case "inline":
                        case "clone":
                            this.setInlineContent(t);
                            break;
                        case "ajax":
                            this.loadAjaxContent(t);
                            break;
                        case "pdf":
                        case Qn:
                        case st:
                        case ht:
                            t.preload = !1;
                        case "iframe":
                            this.setIframeContent(t)
                    }
                    this.setAspectRatio(t)
                }
            }
            setAspectRatio(t) {
                let e = t.contentEl;
                if (!(t.el && e && t.type && [st, ht, Lt].includes(t.type))) return;
                let n, i = t.width || "auto",
                    a = t.height || "auto";
                if (i === "auto" || a === "auto") {
                    n = this.optionFor(t, "videoRatio");
                    let m = (n + "").match(/(\d+)\s*\/\s?(\d+)/);
                    n = m && m.length > 2 ? parseFloat(m[1]) / parseFloat(m[2]) : parseFloat(n + "")
                } else i && a && (n = i / a);
                if (!n) return;
                e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.offsetHeight;
                let l = e.getBoundingClientRect(),
                    c = l.width || 1,
                    h = l.height || 1;
                e.style.aspectRatio = n + "", n < c / h ? (a = a === "auto" ? h : Math.min(h, a), e.style.width = "auto", e.style.height = `${a}px`) : (i = i === "auto" ? c : Math.min(c, i), e.style.width = `${i}px`, e.style.height = "auto")
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.on("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.on("Carousel.createSlide", t.onCreateSlide), e.on("Carousel.selectSlide", t.onSelectSlide), e.on("Carousel.unselectSlide", t.onUnselectSlide), e.on("Carousel.Panzoom.refresh", t.onRefresh), e.on("done", t.onDone), e.on("clearContent", t.onClearContent), window.addEventListener("message", t.onMessage)
            }
            detach() {
                let t = this,
                    e = t.instance;
                e.off("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.off("Carousel.createSlide", t.onCreateSlide), e.off("Carousel.selectSlide", t.onSelectSlide), e.off("Carousel.unselectSlide", t.onUnselectSlide), e.off("Carousel.Panzoom.refresh", t.onRefresh), e.off("done", t.onDone), e.off("clearContent", t.onClearContent), window.removeEventListener("message", t.onMessage)
            }
        };
    Object.defineProperty(ve, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: bs
    });
    var ue = "play",
        me = "pause",
        Rt = "ready",
        ye = class extends X {
            constructor() {
                super(...arguments), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: Rt
                }), Object.defineProperty(this, "inHover", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "timer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "progressBar", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                })
            }
            get isActive() {
                return this.state !== Rt
            }
            onReady(t) {
                this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start()
            }
            onChange() {
                this.removeProgressBar(), this.pause()
            }
            onSettle() {
                this.resume()
            }
            onVisibilityChange() {
                document.visibilityState === "visible" ? this.resume() : this.pause()
            }
            onMouseEnter() {
                this.inHover = !0, this.pause()
            }
            onMouseLeave() {
                var t;
                this.inHover = !1, !((t = this.instance.panzoom) === null || t === void 0) && t.isResting && this.resume()
            }
            onTimerEnd() {
                let t = this.instance;
                this.state === "play" && (t.isInfinite || t.page !== t.pages.length - 1 ? t.slideNext() : t.slideTo(0))
            }
            removeProgressBar() {
                this.progressBar && (this.progressBar.remove(), this.progressBar = null)
            }
            createProgressBar() {
                var t;
                if (!this.option("showProgress")) return null;
                this.removeProgressBar();
                let e = this.instance,
                    n = ((t = e.pages[e.page]) === null || t === void 0 ? void 0 : t.slides) || [],
                    i = this.option("progressParentEl");
                if (i || (i = (n.length === 1 ? n[0].el : null) || e.viewport), !i) return null;
                let a = document.createElement("div");
                return v(a, "f-progress"), i.prepend(a), this.progressBar = a, a.offsetHeight, a
            }
            set() {
                let t = this,
                    e = t.instance;
                if (e.pages.length < 2 || t.timer) return;
                let n = t.option("timeout");
                t.state = ue, v(e.container, "has-autoplay");
                let i = t.createProgressBar();
                i && (i.style.transitionDuration = `${n}ms`, i.style.transform = "scaleX(1)"), t.timer = setTimeout(() => {
                    t.timer = null, t.inHover || t.onTimerEnd()
                }, n), t.emit("set")
            }
            clear() {
                let t = this;
                t.timer && (clearTimeout(t.timer), t.timer = null), t.removeProgressBar()
            }
            start() {
                let t = this;
                if (t.set(), t.state !== Rt) {
                    if (t.option("pauseOnHover")) {
                        let e = t.instance.container;
                        e.addEventListener("mouseenter", t.onMouseEnter, !1), e.addEventListener("mouseleave", t.onMouseLeave, !1)
                    }
                    document.addEventListener("visibilitychange", t.onVisibilityChange, !1), t.emit("start")
                }
            }
            stop() {
                let t = this,
                    e = t.state,
                    n = t.instance.container;
                t.clear(), t.state = Rt, n.removeEventListener("mouseenter", t.onMouseEnter, !1), n.removeEventListener("mouseleave", t.onMouseLeave, !1), document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), Z(n, "has-autoplay"), e !== Rt && t.emit("stop")
            }
            pause() {
                let t = this;
                t.state === ue && (t.state = me, t.clear(), t.emit(me))
            }
            resume() {
                let t = this,
                    e = t.instance;
                if (e.isInfinite || e.page !== e.pages.length - 1)
                    if (t.state !== ue) {
                        if (t.state === me && !t.inHover) {
                            let n = new Event("resume", {
                                bubbles: !0,
                                cancelable: !0
                            });
                            t.emit("resume", n), n.defaultPrevented || t.set()
                        }
                    } else t.set();
                else t.stop()
            }
            toggle() {
                this.state === ue || this.state === me ? this.stop() : this.start()
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.on("ready", t.onReady), e.on("Panzoom.startAnimation", t.onChange), e.on("Panzoom.endAnimation", t.onSettle), e.on("Panzoom.touchMove", t.onChange)
            }
            detach() {
                let t = this,
                    e = t.instance;
                e.off("ready", t.onReady), e.off("Panzoom.startAnimation", t.onChange), e.off("Panzoom.endAnimation", t.onSettle), e.off("Panzoom.touchMove", t.onChange), t.stop()
            }
        };
    Object.defineProperty(ye, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            autoStart: !0,
            pauseOnHover: !0,
            progressParentEl: null,
            showProgress: !0,
            timeout: 3e3
        }
    });
    var Ee = class extends X {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            })
        }
        onPrepare(t) {
            let e = t.carousel;
            if (!e) return;
            let n = t.container;
            n && (e.options.Autoplay = A({
                autoStart: !1
            }, this.option("Autoplay") || {}, {
                pauseOnHover: !1,
                timeout: this.option("timeout"),
                progressParentEl: () => this.option("progressParentEl") || null,
                on: {
                    start: () => {
                        t.emit("startSlideshow")
                    },
                    set: i => {
                        var a;
                        n.classList.add("has-slideshow"), ((a = t.getSlide()) === null || a === void 0 ? void 0 : a.state) !== _.Ready && i.pause()
                    },
                    stop: () => {
                        n.classList.remove("has-slideshow"), t.isCompact || t.endIdle(), t.emit("endSlideshow")
                    },
                    resume: (i, a) => {
                        var l, c, h;
                        !a || !a.cancelable || ((l = t.getSlide()) === null || l === void 0 ? void 0 : l.state) === _.Ready && (!((h = (c = t.carousel) === null || c === void 0 ? void 0 : c.panzoom) === null || h === void 0) && h.isResting) || a.preventDefault()
                    }
                }
            }), e.attachPlugins({
                Autoplay: ye
            }), this.ref = e.plugins.Autoplay)
        }
        onReady(t) {
            let e = t.carousel,
                n = this.ref;
            n && e && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && n.start()
        }
        onDone(t, e) {
            let n = this.ref,
                i = t.carousel;
            if (!n || !i) return;
            let a = e.panzoom;
            a && a.on("startAnimation", () => {
                t.isCurrentSlide(e) && n.stop()
            }), t.isCurrentSlide(e) && n.resume()
        }
        onKeydown(t, e) {
            var n;
            let i = this.ref;
            i && e === this.option("key") && ((n = document.activeElement) === null || n === void 0 ? void 0 : n.nodeName) !== "BUTTON" && i.toggle()
        }
        attach() {
            let t = this,
                e = t.instance;
            e.on("Carousel.init", t.onPrepare), e.on("Carousel.ready", t.onReady), e.on("done", t.onDone), e.on("keydown", t.onKeydown)
        }
        detach() {
            let t = this,
                e = t.instance;
            e.off("Carousel.init", t.onPrepare), e.off("Carousel.ready", t.onReady), e.off("done", t.onDone), e.off("keydown", t.onKeydown)
        }
    };
    Object.defineProperty(Ee, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            key: " ",
            playOnStart: !1,
            progressParentEl: o => {
                var t;
                return ((t = o.instance.container) === null || t === void 0 ? void 0 : t.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]")) || o.instance.container
            },
            timeout: 3e3
        }
    });
    var ji = {
            classes: {
                container: "f-thumbs f-carousel__thumbs",
                viewport: "f-thumbs__viewport",
                track: "f-thumbs__track",
                slide: "f-thumbs__slide",
                isResting: "is-resting",
                isSelected: "is-selected",
                isLoading: "is-loading",
                hasThumbs: "has-thumbs"
            },
            minCount: 2,
            parentEl: null,
            thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
            type: "modern"
        },
        at;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Ready = 1] = "Ready", o[o.Hidden = 2] = "Hidden"
    })(at || (at = {}));
    var Wi = "isResting",
        pe = "thumbWidth",
        gt = "thumbHeight",
        q = "thumbClipWidth",
        Pi = class extends X {
            constructor() {
                super(...arguments), Object.defineProperty(this, "type", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: "modern"
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "track", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "carousel", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "thumbWidth", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "thumbClipWidth", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "thumbHeight", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "thumbGap", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "thumbExtraGap", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: at.Init
                })
            }
            get isModern() {
                return this.type === "modern"
            }
            onInitSlide(o, t) {
                let e = t.el ? t.el.dataset : void 0;
                e && (t.thumbSrc = e.thumbSrc || t.thumbSrc || "", t[q] = parseFloat(e[q] || "") || t[q] || 0, t[gt] = parseFloat(e.thumbHeight || "") || t[gt] || 0), this.addSlide(t)
            }
            onInitSlides() {
                this.build()
            }
            onChange() {
                var o;
                if (!this.isModern) return;
                let t = this.container,
                    e = this.instance,
                    n = e.panzoom,
                    i = this.carousel,
                    a = i ? i.panzoom : null,
                    l = e.page;
                if (n && i && a) {
                    if (n.isDragging) {
                        Z(t, this.cn(Wi));
                        let c = ((o = i.pages[l]) === null || o === void 0 ? void 0 : o.pos) || 0;
                        c += e.getProgress(l) * (this[q] + this.thumbGap);
                        let h = a.getBounds(); - 1 * c > h.x.min && -1 * c < h.x.max && a.panTo({
                            x: -1 * c,
                            friction: .12
                        })
                    } else et(t, this.cn(Wi), n.isResting);
                    this.shiftModern()
                }
            }
            onRefresh() {
                this.updateProps();
                for (let o of this.instance.slides || []) this.resizeModernSlide(o);
                this.shiftModern()
            }
            isDisabled() {
                let o = this.option("minCount") || 0;
                if (o) {
                    let e = this.instance,
                        n = 0;
                    for (let i of e.slides || []) i.thumbSrc && n++;
                    if (n < o) return !0
                }
                let t = this.option("type");
                return ["modern", "classic"].indexOf(t) < 0
            }
            getThumb(o) {
                let t = this.option("thumbTpl") || "";
                return {
                    html: this.instance.localize(t, [
                        ["%i", o.index],
                        ["%d", o.index + 1],
                        ["%s", o.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]
                    ])
                }
            }
            addSlide(o) {
                let t = this.carousel;
                t && t.addSlide(o.index, this.getThumb(o))
            }
            getSlides() {
                let o = [];
                for (let t of this.instance.slides || []) o.push(this.getThumb(t));
                return o
            }
            resizeModernSlide(o) {
                this.isModern && (o[pe] = o[q] && o[gt] ? Math.round(this[gt] * (o[q] / o[gt])) : this[pe])
            }
            updateProps() {
                let o = this.container;
                if (!o) return;
                let t = e => parseFloat(getComputedStyle(o).getPropertyValue("--f-thumb-" + e)) || 0;
                this.thumbGap = t("gap"), this.thumbExtraGap = t("extra-gap"), this[pe] = t("width") || 40, this[q] = t("clip-width") || 40, this[gt] = t("height") || 40
            }
            build() {
                let o = this;
                if (o.state !== at.Init) return;
                if (o.isDisabled()) return void o.emit("disabled");
                let t = o.instance,
                    e = t.container,
                    n = o.getSlides(),
                    i = o.option("type");
                o.type = i;
                let a = o.option("parentEl"),
                    l = o.cn("container"),
                    c = o.cn("track"),
                    h = a?.querySelector("." + l);
                h || (h = document.createElement("div"), v(h, l), a ? a.appendChild(h) : e.after(h)), v(h, `is-${i}`), v(e, o.cn("hasThumbs")), o.container = h, o.updateProps();
                let m = h.querySelector("." + c);
                m || (m = document.createElement("div"), v(m, o.cn("track")), h.appendChild(m)), o.track = m;
                let s = A({}, {
                        track: m,
                        infinite: !1,
                        center: !0,
                        fill: i === "classic",
                        dragFree: !0,
                        slidesPerPage: 1,
                        transition: !1,
                        preload: .25,
                        friction: .12,
                        Panzoom: {
                            maxVelocity: 0
                        },
                        Dots: !1,
                        Navigation: !1,
                        classes: {
                            container: "f-thumbs",
                            viewport: "f-thumbs__viewport",
                            track: "f-thumbs__track",
                            slide: "f-thumbs__slide"
                        }
                    }, o.option("Carousel") || {}, {
                        Sync: {
                            target: t
                        },
                        slides: n
                    }),
                    r = new t.constructor(h, s);
                r.on("createSlide", (d, u) => {
                    o.setProps(u.index), o.emit("createSlide", u, u.el)
                }), r.on("ready", () => {
                    o.shiftModern(), o.emit("ready")
                }), r.on("refresh", () => {
                    o.shiftModern()
                }), r.on("Panzoom.click", (d, u, p) => {
                    o.onClick(p)
                }), o.carousel = r, o.state = at.Ready
            }
            onClick(o) {
                o.preventDefault(), o.stopPropagation();
                let t = this.instance,
                    {
                        pages: e,
                        page: n
                    } = t,
                    i = f => {
                        if (f) {
                            let Q = f.closest("[data-carousel-index]");
                            if (Q) return [parseInt(Q.dataset.carouselIndex || "", 10) || 0, Q]
                        }
                        return [-1, void 0]
                    },
                    a = (f, Q) => {
                        let b = document.elementFromPoint(f, Q);
                        return b ? i(b) : [-1, void 0]
                    },
                    [l, c] = i(o.target);
                if (l > -1) return;
                let h = this[q],
                    m = o.clientX,
                    s = o.clientY,
                    [r, d] = a(m - h, s),
                    [u, p] = a(m + h, s);
                d && p ? (l = Math.abs(m - d.getBoundingClientRect().right) < Math.abs(m - p.getBoundingClientRect().left) ? r : u, l === n && (l = l === r ? u : r)) : d ? l = r : p && (l = u), l > -1 && e[l] && t.slideTo(l)
            }
            getShift(o) {
                var t;
                let e = this,
                    {
                        instance: n
                    } = e,
                    i = e.carousel;
                if (!n || !i) return 0;
                let a = e[pe],
                    l = e[q],
                    c = e.thumbGap,
                    h = e.thumbExtraGap;
                if (!(!((t = i.slides[o]) === null || t === void 0) && t.el)) return 0;
                let m = .5 * (a - l),
                    s = n.pages.length - 1,
                    r = n.getProgress(0),
                    d = n.getProgress(s),
                    u = n.getProgress(o, !1, !0),
                    p = 0,
                    f = m + h + c,
                    Q = r < 0 && r > -1,
                    b = d > 0 && d < 1;
                return o === 0 ? (p = f * Math.abs(r), b && r === 1 && (p -= f * Math.abs(d))) : o === s ? (p = f * Math.abs(d) * -1, Q && d === -1 && (p += f * Math.abs(r))) : Q || b ? (p = -1 * f, p += f * Math.abs(r), p += f * (1 - Math.abs(d))) : p = f * u, p
            }
            setProps(o) {
                var t;
                let e = this;
                if (!e.isModern) return;
                let {
                    instance: n
                } = e, i = e.carousel;
                if (n && i) {
                    let a = (t = i.slides[o]) === null || t === void 0 ? void 0 : t.el;
                    if (a && a.childNodes.length) {
                        let l = B(1 - Math.abs(n.getProgress(o))),
                            c = B(e.getShift(o));
                        a.style.setProperty("--progress", l ? l + "" : ""), a.style.setProperty("--shift", c + "")
                    }
                }
            }
            shiftModern() {
                let o = this;
                if (!o.isModern) return;
                let {
                    instance: t,
                    track: e
                } = o, n = t.panzoom, i = o.carousel;
                if (!(t && e && n && i) || n.state === O.Init || n.state === O.Destroy) return;
                for (let l of t.slides) o.setProps(l.index);
                let a = (o[q] + o.thumbGap) * (i.slides.length || 0);
                e.style.setProperty("--width", a + "")
            }
            cleanup() {
                let o = this;
                o.carousel && o.carousel.destroy(), o.carousel = null, o.container && o.container.remove(), o.container = null, o.track && o.track.remove(), o.track = null, o.state = at.Init, Z(o.instance.container, o.cn("hasThumbs"))
            }
            attach() {
                let o = this,
                    t = o.instance;
                t.on("initSlide", o.onInitSlide), t.state === G.Init ? t.on("initSlides", o.onInitSlides) : o.onInitSlides(), t.on(["change", "Panzoom.afterTransform"], o.onChange), t.on("Panzoom.refresh", o.onRefresh)
            }
            detach() {
                let o = this,
                    t = o.instance;
                t.off("initSlide", o.onInitSlide), t.off("initSlides", o.onInitSlides), t.off(["change", "Panzoom.afterTransform"], o.onChange), t.off("Panzoom.refresh", o.onRefresh), o.cleanup()
            }
        };
    Object.defineProperty(Pi, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ji
    });
    var Bs = Object.assign(Object.assign({}, ji), {
            key: "t",
            showOnStart: !0,
            parentEl: null
        }),
        Li = "is-masked",
        Ri = "aria-hidden",
        xe = class extends X {
            constructor() {
                super(...arguments), Object.defineProperty(this, "ref", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "hidden", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                })
            }
            get isEnabled() {
                let t = this.ref;
                return t && !t.isDisabled()
            }
            get isHidden() {
                return this.hidden
            }
            onClick(t, e) {
                e.stopPropagation()
            }
            onCreateSlide(t, e) {
                var n, i, a;
                let l = ((a = (i = (n = this.instance) === null || n === void 0 ? void 0 : n.carousel) === null || i === void 0 ? void 0 : i.slides[e.index]) === null || a === void 0 ? void 0 : a.type) || "",
                    c = e.el;
                if (c && l) {
                    let h = `for-${l}`;
                    ["video", "youtube", "vimeo", "html5video"].includes(l) && (h += " for-video"), v(c, h)
                }
            }
            onInit() {
                var t;
                let e = this,
                    n = e.instance,
                    i = n.carousel;
                if (e.ref || !i) return;
                let a = e.option("parentEl") || n.footer || n.container;
                if (!a) return;
                let l = A({}, e.options, {
                    parentEl: a,
                    classes: {
                        container: "f-thumbs fancybox__thumbs"
                    },
                    Carousel: {
                        Sync: {
                            friction: n.option("Carousel.friction") || 0
                        }
                    },
                    on: {
                        ready: c => {
                            let h = c.container;
                            h && this.hidden && (e.refresh(), h.style.transition = "none", e.hide(), h.offsetHeight, queueMicrotask(() => {
                                h.style.transition = "", e.show()
                            }))
                        }
                    }
                });
                l.Carousel = l.Carousel || {}, l.Carousel.on = A(((t = e.options.Carousel) === null || t === void 0 ? void 0 : t.on) || {}, {
                    click: this.onClick,
                    createSlide: this.onCreateSlide
                }), i.options.Thumbs = l, i.attachPlugins({
                    Thumbs: Pi
                }), e.ref = i.plugins.Thumbs, e.option("showOnStart") || (e.ref.state = at.Hidden, e.hidden = !0)
            }
            onResize() {
                var t;
                let e = (t = this.ref) === null || t === void 0 ? void 0 : t.container;
                e && (e.style.maxHeight = "")
            }
            onKeydown(t, e) {
                let n = this.option("key");
                n && n === e && this.toggle()
            }
            toggle() {
                let t = this.ref;
                if (t && !t.isDisabled()) return t.state === at.Hidden ? (t.state = at.Init, void t.build()) : void(this.hidden ? this.show() : this.hide())
            }
            show() {
                let t = this.ref;
                if (!t || t.isDisabled()) return;
                let e = t.container;
                e && (this.refresh(), e.offsetHeight, e.removeAttribute(Ri), e.classList.remove(Li), this.hidden = !1)
            }
            hide() {
                let t = this.ref,
                    e = t && t.container;
                e && (this.refresh(), e.offsetHeight, e.classList.add(Li), e.setAttribute(Ri, "true")), this.hidden = !0
            }
            refresh() {
                let t = this.ref;
                if (!t || !t.state) return;
                let e = t.container,
                    n = e?.firstChild || null;
                e && n && n.childNodes.length && (e.style.maxHeight = `${n.getBoundingClientRect().height}px`)
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.state === D.Init ? e.on("Carousel.init", t.onInit) : t.onInit(), e.on("resize", t.onResize), e.on("keydown", t.onKeydown)
            }
            detach() {
                var t;
                let e = this,
                    n = e.instance;
                n.off("Carousel.init", e.onInit), n.off("resize", e.onResize), n.off("keydown", e.onKeydown), (t = n.carousel) === null || t === void 0 || t.detachPlugins(["Thumbs"]), e.ref = null
            }
        };
    Object.defineProperty(xe, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Bs
    });
    var bn = {
            panLeft: {
                icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
                change: {
                    panX: -100
                }
            },
            panRight: {
                icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
                change: {
                    panX: 100
                }
            },
            panUp: {
                icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
                change: {
                    panY: -100
                }
            },
            panDown: {
                icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
                change: {
                    panY: 100
                }
            },
            zoomIn: {
                icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
                action: "zoomIn"
            },
            zoomOut: {
                icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
                action: "zoomOut"
            },
            toggle1to1: {
                icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
                action: "toggleZoom"
            },
            toggleZoom: {
                icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
                action: "toggleZoom"
            },
            iterateZoom: {
                icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
                action: "iterateZoom"
            },
            rotateCCW: {
                icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
                action: "rotateCCW"
            },
            rotateCW: {
                icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
                action: "rotateCW"
            },
            flipX: {
                icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
                action: "flipX"
            },
            flipY: {
                icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
                action: "flipY"
            },
            fitX: {
                icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
                action: "fitX"
            },
            fitY: {
                icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
                action: "fitY"
            },
            reset: {
                icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
                action: "reset"
            },
            toggleFS: {
                icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
                action: "toggleFS"
            }
        },
        ft;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Ready = 1] = "Ready", o[o.Disabled = 2] = "Disabled"
    })(ft || (ft = {}));
    var Fs = {
            absolute: "auto",
            display: {
                left: ["infobar"],
                middle: [],
                right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"]
            },
            enabled: "auto",
            items: {
                infobar: {
                    tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'
                },
                download: {
                    tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'
                },
                prev: {
                    tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'
                },
                next: {
                    tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'
                },
                slideshow: {
                    tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'
                },
                fullscreen: {
                    tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'
                },
                thumbs: {
                    tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'
                },
                close: {
                    tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'
                }
            },
            parentEl: null
        },
        Us = {
            tabindex: "-1",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg"
        },
        Vi = "has-toolbar",
        gn = "fancybox__toolbar",
        we = class extends X {
            constructor() {
                super(...arguments), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: ft.Init
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                })
            }
            onReady(t) {
                var e;
                if (!t.carousel) return;
                let n = this.option("display"),
                    i = this.option("absolute"),
                    a = this.option("enabled");
                if (a === "auto") {
                    let m = this.instance.carousel,
                        s = 0;
                    if (m)
                        for (let r of m.slides)(r.panzoom || r.type === "image") && s++;
                    s || (a = !1)
                }
                a || (n = void 0);
                let l = 0,
                    c = {
                        left: [],
                        middle: [],
                        right: []
                    };
                if (n)
                    for (let m of ["left", "middle", "right"])
                        for (let s of n[m]) {
                            let r = this.createEl(s);
                            r && ((e = c[m]) === null || e === void 0 || e.push(r), l++)
                        }
                let h = null;
                if (l && (h = this.createContainer()), h) {
                    for (let [m, s] of Object.entries(c)) {
                        let r = document.createElement("div");
                        v(r, gn + "__column is-" + m);
                        for (let d of s) r.appendChild(d);
                        i !== "auto" || m !== "middle" || s.length || (i = !0), h.appendChild(r)
                    }
                    i === !0 && v(h, "is-absolute"), this.state = ft.Ready, this.onRefresh()
                } else this.state = ft.Disabled
            }
            onClick(t) {
                var e, n;
                let i = this.instance,
                    a = i.getSlide(),
                    l = a?.panzoom,
                    c = t.target,
                    h = c && N(c) ? c.dataset : null;
                if (!h) return;
                if (h.fancyboxToggleThumbs !== void 0) return t.preventDefault(), t.stopPropagation(), void((e = i.plugins.Thumbs) === null || e === void 0 || e.toggle());
                if (h.fancyboxToggleFullscreen !== void 0) return t.preventDefault(), t.stopPropagation(), void this.instance.toggleFullscreen();
                if (h.fancyboxToggleSlideshow !== void 0) {
                    t.preventDefault(), t.stopPropagation();
                    let r = (n = i.carousel) === null || n === void 0 ? void 0 : n.plugins.Autoplay,
                        d = r.isActive;
                    return l && l.panMode === "mousemove" && !d && l.reset(), void(d ? r.stop() : r.start())
                }
                let m = h.panzoomAction,
                    s = h.panzoomChange;
                if ((s || m) && (t.preventDefault(), t.stopPropagation()), s) {
                    let r = {};
                    try {
                        r = JSON.parse(s)
                    } catch {}
                    l && l.applyChange(r)
                } else m && l && l[m] && l[m]()
            }
            onChange() {
                this.onRefresh()
            }
            onRefresh() {
                if (this.instance.isClosing()) return;
                let t = this.container;
                if (!t) return;
                let e = this.instance.getSlide();
                if (!e || e.state !== _.Ready) return;
                let n = e && !e.error && e.panzoom;
                for (let l of t.querySelectorAll("[data-panzoom-action]")) n ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex")) : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"));
                let i = n && n.canZoomIn(),
                    a = n && n.canZoomOut();
                for (let l of t.querySelectorAll('[data-panzoom-action="zoomIn"]')) i ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex")) : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"));
                for (let l of t.querySelectorAll('[data-panzoom-action="zoomOut"]')) a ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex")) : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"));
                for (let l of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                    a || i ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex")) : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"));
                    let c = l.querySelector("g");
                    c && (c.style.display = i ? "" : "none")
                }
            }
            onDone(t, e) {
                var n;
                (n = e.panzoom) === null || n === void 0 || n.on("afterTransform", () => {
                    this.instance.isCurrentSlide(e) && this.onRefresh()
                }), this.instance.isCurrentSlide(e) && this.onRefresh()
            }
            createContainer() {
                let t = this.instance.container;
                if (!t) return null;
                let e = this.option("parentEl") || t,
                    n = e.querySelector("." + gn);
                return n || (n = document.createElement("div"), v(n, gn), e.prepend(n)), n.addEventListener("click", this.onClick, {
                    passive: !1,
                    capture: !0
                }), t && v(t, Vi), this.container = n, n
            }
            createEl(t) {
                let e = this.instance,
                    n = e.carousel;
                if (!n || t === "toggleFS" || t === "fullscreen" && !Xi()) return null;
                let i = null,
                    a = n.slides.length || 0,
                    l = 0,
                    c = 0;
                for (let m of n.slides)(m.panzoom || m.type === "image") && l++, (m.type === "image" || m.downloadSrc) && c++;
                if (a < 2 && ["infobar", "prev", "next"].includes(t)) return i;
                if (bn[t] !== void 0 && !l || t === "download" && !c) return null;
                if (t === "thumbs") {
                    let m = e.plugins.Thumbs;
                    if (!m || !m.isEnabled) return null
                }
                if (t === "slideshow" && (!n.plugins.Autoplay || a < 2)) return null;
                if (bn[t] !== void 0) {
                    let m = bn[t];
                    i = document.createElement("button"), i.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)), v(i, "f-button"), m.action && (i.dataset.panzoomAction = m.action), m.change && (i.dataset.panzoomChange = JSON.stringify(m.change)), i.appendChild(tt(this.instance.localize(m.icon)))
                } else {
                    let m = (this.option("items") || [])[t];
                    m && (i = tt(this.instance.localize(m.tpl)), typeof m.click == "function" && i.addEventListener("click", s => {
                        s.preventDefault(), s.stopPropagation(), typeof m.click == "function" && m.click.call(this, this, s)
                    }))
                }
                let h = i?.querySelector("svg");
                if (h)
                    for (let [m, s] of Object.entries(Us)) h.getAttribute(m) || h.setAttribute(m, String(s));
                return i
            }
            removeContainer() {
                let t = this.container;
                t && t.remove(), this.container = null, this.state = ft.Disabled;
                let e = this.instance.container;
                e && Z(e, Vi)
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.on("Carousel.initSlides", t.onReady), e.on("done", t.onDone), e.on(["reveal", "Carousel.change"], t.onChange), t.onReady(t.instance)
            }
            detach() {
                let t = this,
                    e = t.instance;
                e.off("Carousel.initSlides", t.onReady), e.off("done", t.onDone), e.off(["reveal", "Carousel.change"], t.onChange), t.removeContainer()
            }
        };
    Object.defineProperty(we, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Fs
    });
    var vs = {
            Hash: class extends X {
                onReady() {
                    Vt = !1
                }
                onChange(o) {
                    pt && clearTimeout(pt);
                    let {
                        hash: t
                    } = Yi(), {
                        hash: e
                    } = Fe(), n = o.isOpeningSlide(o.getSlide());
                    n && (yi = e === t ? "" : e), t && t !== e && (pt = setTimeout(() => {
                        try {
                            if (o.state === D.Ready) {
                                let i = "replaceState";
                                n && !de && (i = "pushState", de = !0), window.history[i]({}, document.title, window.location.pathname + window.location.search + t)
                            }
                        } catch {}
                    }, 300))
                }
                onClose(o) {
                    if (pt && clearTimeout(pt), !Vt && de) return de = !1, Vt = !1, void window.history.back();
                    if (!Vt) try {
                        window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (yi || ""))
                    } catch {}
                }
                attach() {
                    let o = this.instance;
                    o.on("ready", this.onReady), o.on(["Carousel.ready", "Carousel.change"], this.onChange), o.on("close", this.onClose)
                }
                detach() {
                    let o = this.instance;
                    o.off("ready", this.onReady), o.off(["Carousel.ready", "Carousel.change"], this.onChange), o.off("close", this.onClose)
                }
                static parseURL() {
                    return Fe()
                }
                static startFromUrl() {
                    Ji()
                }
                static destroy() {
                    window.removeEventListener("hashchange", Hi, !1)
                }
            },
            Html: ve,
            Images: Ue,
            Slideshow: Ee,
            Thumbs: xe,
            Toolbar: we
        },
        Zi = "with-fancybox",
        Bn = "hide-scrollbar",
        Oi = "--fancybox-scrollbar-compensate",
        Ti = "--fancybox-body-margin",
        Fn = "aria-hidden",
        Un = "is-using-tab",
        vn = "is-animated",
        Ci = "is-compact",
        Mi = "is-loading",
        yn = "is-opening",
        fe = "has-caption",
        Bt = "disabled",
        ut = "tabindex",
        ki = "download",
        En = "href",
        Ft = "src",
        ct = o => typeof o == "string",
        Si = function() {
            var o = window.getSelection();
            return !!o && o.type === "Range"
        },
        j, P = null,
        mt = null,
        Gi = 0,
        Di = 0,
        Ii = 0,
        _i = 0,
        Ut = new Map,
        ys = 0,
        K = class o extends Ot {
            get isIdle() {
                return this.idle
            }
            get isCompact() {
                return this.option("compact")
            }
            constructor(t = [], e = {}, n = {}) {
                super(e), Object.defineProperty(this, "userSlides", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "userPlugins", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                }), Object.defineProperty(this, "idle", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "idleTimer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "clickTimer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "pwt", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "ignoreFocusChange", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "startedFs", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: D.Init
                }), Object.defineProperty(this, "id", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "caption", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "footer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "carousel", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "lastFocus", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "prevMouseMoveEvent", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), j || (j = Xi()), this.id = e.id || ++ys, Ut.set(this.id, this), this.userSlides = t, this.userPlugins = n, queueMicrotask(() => {
                    this.init()
                })
            }
            init() {
                if (this.state === D.Destroy) return;
                this.state = D.Init, this.attachPlugins(Object.assign(Object.assign({}, o.Plugins), this.userPlugins)), this.emit("init"), this.emit("attachPlugins"), this.option("hideScrollbar") === !0 && (() => {
                    if (!Zt) return;
                    let e = document,
                        n = e.body,
                        i = e.documentElement;
                    if (n.classList.contains(Bn)) return;
                    let a = window.innerWidth - i.getBoundingClientRect().width,
                        l = parseFloat(window.getComputedStyle(n).marginRight);
                    a < 0 && (a = 0), i.style.setProperty(Oi, `${a}px`), l && n.style.setProperty(Ti, `${l}px`), n.classList.add(Bn)
                })(), this.initLayout(), this.scale();
                let t = () => {
                    this.initCarousel(this.userSlides), this.state = D.Ready, this.attachEvents(), this.emit("ready"), setTimeout(() => {
                        this.container && this.container.setAttribute(Fn, "false")
                    }, 16)
                };
                this.option("Fullscreen.autoStart") && j && !j.isFullscreen() ? j.request().then(() => {
                    this.startedFs = !0, t()
                }).catch(() => t()) : t()
            }
            initLayout() {
                var t, e;
                let n = this.option("parentEl") || document.body,
                    i = tt(this.localize(this.option("tpl.main") || ""));
                if (i) {
                    if (i.setAttribute("id", `fancybox-${this.id}`), i.setAttribute("aria-label", this.localize("{{MODAL}}")), i.classList.toggle(Ci, this.isCompact), v(i, this.option("mainClass") || ""), v(i, yn), this.container = i, this.footer = i.querySelector(".fancybox__footer"), n.appendChild(i), v(document.documentElement, Zi), P && mt || (P = document.createElement("span"), v(P, "fancybox-focus-guard"), P.setAttribute(ut, "0"), P.setAttribute(Fn, "true"), P.setAttribute("aria-label", "Focus guard"), mt = P.cloneNode(), (t = i.parentElement) === null || t === void 0 || t.insertBefore(P, i), (e = i.parentElement) === null || e === void 0 || e.append(mt)), i.addEventListener("mousedown", a => {
                            Gi = a.pageX, Di = a.pageY, Z(i, Un)
                        }), this.option("closeExisting"))
                        for (let a of Ut.values()) a.id !== this.id && a.close();
                    else this.option("animated") && (v(i, vn), setTimeout(() => {
                        this.isClosing() || Z(i, vn)
                    }, 350));
                    this.emit("initLayout")
                }
            }
            initCarousel(t) {
                let e = this.container;
                if (!e) return;
                let n = e.querySelector(".fancybox__carousel");
                if (!n) return;
                let i = this.carousel = new vt(n, A({}, {
                    slides: t,
                    transition: "fade",
                    Panzoom: {
                        lockAxis: this.option("dragToClose") ? "xy" : "x",
                        infinite: !!this.option("dragToClose") && "y"
                    },
                    Dots: !1,
                    Navigation: {
                        classes: {
                            container: "fancybox__nav",
                            button: "f-button",
                            isNext: "is-next",
                            isPrev: "is-prev"
                        }
                    },
                    initialPage: this.option("startIndex"),
                    l10n: this.option("l10n")
                }, this.option("Carousel") || {}));
                i.on("*", (a, l, ...c) => {
                    this.emit(`Carousel.${l}`, a, ...c)
                }), i.on(["ready", "change"], () => {
                    this.manageCaption()
                }), this.on("Carousel.removeSlide", (a, l, c) => {
                    this.clearContent(c), c.state = void 0
                }), i.on("Panzoom.touchStart", () => {
                    var a, l;
                    this.isCompact || this.endIdle(), !((a = document.activeElement) === null || a === void 0) && a.closest(".f-thumbs") && ((l = this.container) === null || l === void 0 || l.focus())
                }), i.on("settle", () => {
                    this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && !this.isClosing && this.checkFocus()
                }), this.option("dragToClose") && (i.on("Panzoom.afterTransform", (a, l) => {
                    let c = this.getSlide();
                    if (c && xn(c.el)) return;
                    let h = this.container;
                    if (h) {
                        let m = Math.abs(l.current.f),
                            s = m < 1 ? "" : Math.max(.5, Math.min(1, 1 - m / l.contentRect.fitHeight * 1.5));
                        h.style.setProperty("--fancybox-ts", s ? "0s" : ""), h.style.setProperty("--fancybox-opacity", s + "")
                    }
                }), i.on("Panzoom.touchEnd", (a, l, c) => {
                    var h;
                    let m = this.getSlide();
                    if (m && xn(m.el) || l.isMobile && document.activeElement && ["TEXTAREA", "INPUT"].indexOf((h = document.activeElement) === null || h === void 0 ? void 0 : h.nodeName) !== -1) return;
                    let s = Math.abs(l.dragOffset.y);
                    l.lockedAxis === "y" && (s >= 200 || s >= 50 && l.dragOffset.time < 300) && (c && c.cancelable && c.preventDefault(), this.close(c, "f-throwOut" + (l.current.f < 0 ? "Up" : "Down")))
                })), i.on("change", a => {
                    var l;
                    let c = (l = this.getSlide()) === null || l === void 0 ? void 0 : l.triggerEl;
                    if (c) {
                        let h = new CustomEvent("slideTo", {
                            bubbles: !0,
                            cancelable: !0,
                            detail: a.page
                        });
                        c.dispatchEvent(h)
                    }
                }), i.on(["refresh", "change"], a => {
                    let l = this.container;
                    if (!l) return;
                    for (let m of l.querySelectorAll("[data-fancybox-current-index]")) m.innerHTML = a.page + 1;
                    for (let m of l.querySelectorAll("[data-fancybox-count]")) m.innerHTML = a.pages.length;
                    if (!a.isInfinite) {
                        for (let m of l.querySelectorAll("[data-fancybox-next]")) a.page < a.pages.length - 1 ? (m.removeAttribute(Bt), m.removeAttribute(ut)) : (m.setAttribute(Bt, ""), m.setAttribute(ut, "-1"));
                        for (let m of l.querySelectorAll("[data-fancybox-prev]")) a.page > 0 ? (m.removeAttribute(Bt), m.removeAttribute(ut)) : (m.setAttribute(Bt, ""), m.setAttribute(ut, "-1"))
                    }
                    let c = this.getSlide();
                    if (!c) return;
                    let h = c.downloadSrc || "";
                    h || c.type !== "image" || c.error || !ct(c[Ft]) || (h = c[Ft]);
                    for (let m of l.querySelectorAll("[data-fancybox-download]")) {
                        let s = c.downloadFilename;
                        h ? (m.removeAttribute(Bt), m.removeAttribute(ut), m.setAttribute(En, h), m.setAttribute(ki, s || h), m.setAttribute("target", "_blank")) : (m.setAttribute(Bt, ""), m.setAttribute(ut, "-1"), m.removeAttribute(En), m.removeAttribute(ki))
                    }
                }), this.emit("initCarousel")
            }
            attachEvents() {
                let t = this,
                    e = t.container;
                if (!e) return;
                e.addEventListener("click", t.onClick, {
                    passive: !1,
                    capture: !1
                }), e.addEventListener("wheel", t.onWheel, {
                    passive: !1,
                    capture: !1
                }), document.addEventListener("keydown", t.onKeydown, {
                    passive: !1,
                    capture: !0
                }), document.addEventListener("visibilitychange", t.onVisibilityChange, !1), document.addEventListener("mousemove", t.onMousemove), t.option("trapFocus") && document.addEventListener("focus", t.onFocus, !0), window.addEventListener("resize", t.onResize);
                let n = window.visualViewport;
                n && (n.addEventListener("scroll", t.onResize), n.addEventListener("resize", t.onResize))
            }
            detachEvents() {
                let t = this,
                    e = t.container;
                if (!e) return;
                document.removeEventListener("keydown", t.onKeydown, {
                    passive: !1,
                    capture: !0
                }), e.removeEventListener("wheel", t.onWheel, {
                    passive: !1,
                    capture: !1
                }), e.removeEventListener("click", t.onClick, {
                    passive: !1,
                    capture: !1
                }), document.removeEventListener("mousemove", t.onMousemove), window.removeEventListener("resize", t.onResize);
                let n = window.visualViewport;
                n && (n.removeEventListener("resize", t.onResize), n.removeEventListener("scroll", t.onResize)), document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), document.removeEventListener("focus", t.onFocus, !0)
            }
            scale() {
                let t = this.container;
                if (!t) return;
                let e = window.visualViewport,
                    n = Math.max(1, e?.scale || 1),
                    i = "",
                    a = "",
                    l = "";
                if (e && n > 1) {
                    let c = `${e.offsetLeft}px`,
                        h = `${e.offsetTop}px`;
                    i = e.width * n + "px", a = e.height * n + "px", l = `translate3d(${c}, ${h}, 0) scale(${1/n})`
                }
                t.style.transform = l, t.style.width = i, t.style.height = a
            }
            onClick(t) {
                var e;
                let {
                    container: n,
                    isCompact: i
                } = this;
                if (!n || this.isClosing()) return;
                !i && this.option("idle") && this.resetIdle();
                let a = t.composedPath()[0];
                if (a.closest(".fancybox-spinner") || a.closest("[data-fancybox-close]")) return t.preventDefault(), void this.close(t);
                if (a.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev();
                if (a.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next();
                if (t.type === "click" && t.detail === 0 || Math.abs(t.pageX - Gi) > 30 || Math.abs(t.pageY - Di) > 30) return;
                let l = document.activeElement;
                if (Si() && l && n.contains(l)) return;
                if (i && ((e = this.getSlide()) === null || e === void 0 ? void 0 : e.type) === "image") return void(this.clickTimer ? (clearTimeout(this.clickTimer), this.clickTimer = null) : this.clickTimer = setTimeout(() => {
                    this.toggleIdle(), this.clickTimer = null
                }, 350));
                if (this.emit("click", t), t.defaultPrevented) return;
                let c = !1;
                if (a.closest(".fancybox__content")) {
                    if (l) {
                        if (l.closest("[contenteditable]")) return;
                        a.matches(pn) || l.blur()
                    }
                    if (Si()) return;
                    c = this.option("contentClick")
                } else a.closest(".fancybox__carousel") && !a.matches(pn) && (c = this.option("backdropClick"));
                c === "close" ? (t.preventDefault(), this.close(t)) : c === "next" ? (t.preventDefault(), this.next()) : c === "prev" && (t.preventDefault(), this.prev())
            }
            onWheel(t) {
                let e = t.target,
                    n = this.option("wheel", t);
                e.closest(".fancybox__thumbs") && (n = "slide");
                let i = n === "slide",
                    a = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function(h, m) {
                        return Math.abs(m) > Math.abs(h) ? m : h
                    }),
                    l = Math.max(-1, Math.min(1, a)),
                    c = Date.now();
                this.pwt && c - this.pwt < 300 ? i && t.preventDefault() : (this.pwt = c, this.emit("wheel", t, l), t.defaultPrevented || (n === "close" ? (t.preventDefault(), this.close(t)) : n === "slide" && (Qe(e) || (t.preventDefault(), this[l > 0 ? "prev" : "next"]()))))
            }
            onScroll() {
                window.scrollTo(Ii, _i)
            }
            onKeydown(t) {
                if (!this.isTopmost()) return;
                this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
                let e = t.key,
                    n = this.option("keyboard");
                if (!n) return;
                let i = t.composedPath()[0],
                    a = document.activeElement && document.activeElement.classList,
                    l = a && a.contains("f-button") || i.dataset.carouselPage || i.dataset.carouselIndex;
                if (e !== "Escape" && !l && N(i) && (i.isContentEditable || ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(i.nodeName) !== -1) || (t.key === "Tab" ? v(this.container, Un) : Z(this.container, Un), t.ctrlKey || t.altKey || t.shiftKey)) return;
                this.emit("keydown", e, t);
                let c = n[e];
                c && typeof this[c] == "function" && (t.preventDefault(), this[c]())
            }
            onResize() {
                let t = this.container;
                if (!t) return;
                let e = this.isCompact;
                t.classList.toggle(Ci, e), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), this.scale(), this.emit("resize")
            }
            onFocus(t) {
                this.isTopmost() && this.checkFocus(t)
            }
            onMousemove(t) {
                this.prevMouseMoveEvent = t, !this.isCompact && this.option("idle") && this.resetIdle()
            }
            onVisibilityChange() {
                document.visibilityState === "visible" ? this.checkFocus() : this.endIdle()
            }
            manageCloseBtn(t) {
                let e = this.optionFor(t, "closeButton") || !1;
                if (e === "auto") {
                    let i = this.plugins.Toolbar;
                    if (i && i.state === ft.Ready) return
                }
                if (!e || !t.contentEl || t.closeBtnEl) return;
                let n = this.option("tpl.closeButton");
                if (n) {
                    let i = tt(this.localize(n));
                    t.closeBtnEl = t.contentEl.appendChild(i), t.el && v(t.el, "has-close-btn")
                }
            }
            manageCaption(t = void 0) {
                var e, n;
                let i = "fancybox__caption",
                    a = this.container;
                if (!a) return;
                Z(a, fe);
                let l = this.isCompact || this.option("commonCaption"),
                    c = !l;
                if (this.caption && this.stop(this.caption), c && this.caption && (this.caption.remove(), this.caption = null), l && !this.caption)
                    for (let r of ((e = this.carousel) === null || e === void 0 ? void 0 : e.slides) || []) r.captionEl && (r.captionEl.remove(), r.captionEl = void 0, Z(r.el, fe), (n = r.el) === null || n === void 0 || n.removeAttribute("aria-labelledby"));
                if (t || (t = this.getSlide()), !t || l && !this.isCurrentSlide(t)) return;
                let h = t.el,
                    m = this.optionFor(t, "caption", "");
                if (!m) return void(l && this.caption && this.animate(this.caption, "f-fadeOut", () => {
                    this.caption && (this.caption.innerHTML = "")
                }));
                let s = null;
                if (c) {
                    if (s = t.captionEl || null, h && !s) {
                        let r = i + `_${this.id}_${t.index}`;
                        s = document.createElement("div"), v(s, i), s.setAttribute("id", r), t.captionEl = h.appendChild(s), v(h, fe), h.setAttribute("aria-labelledby", r)
                    }
                } else s = this.caption, s || (s = a.querySelector("." + i)), !s && (s = document.createElement("div"), s.dataset.fancyboxCaption = "", v(s, i), (this.footer || a).prepend(s)), v(a, fe), this.caption = s;
                s && (s.innerHTML = "", ct(m) || typeof m == "number" ? s.innerHTML = m + "" : m instanceof HTMLElement && s.appendChild(m))
            }
            checkFocus(t) {
                this.focus(t)
            }
            focus(t) {
                var e;
                if (this.ignoreFocusChange) return;
                let n = document.activeElement || null,
                    i = t?.target || null,
                    a = this.container,
                    l = (e = this.carousel) === null || e === void 0 ? void 0 : e.viewport;
                if (!a || !l || !t && n && a.contains(n)) return;
                let c = this.getSlide(),
                    h = c && c.state === _.Ready ? c.el : null;
                if (!h || h.contains(n) || a === n) return;
                t && t.cancelable && t.preventDefault(), this.ignoreFocusChange = !0;
                let m = Array.from(a.querySelectorAll(pn)),
                    s = [],
                    r = null;
                for (let u of m) {
                    let p = !u.offsetParent || !!u.closest('[aria-hidden="true"]'),
                        f = h && h.contains(u),
                        Q = !l.contains(u);
                    if (u === a || (f || Q) && !p) {
                        s.push(u);
                        let b = u.dataset.origTabindex;
                        b !== void 0 && b && (u.tabIndex = parseFloat(b)), u.removeAttribute("data-orig-tabindex"), !u.hasAttribute("autoFocus") && r || (r = u)
                    } else {
                        let b = u.dataset.origTabindex === void 0 ? u.getAttribute("tabindex") || "" : u.dataset.origTabindex;
                        b && (u.dataset.origTabindex = b), u.tabIndex = -1
                    }
                }
                let d = null;
                t ? (!i || s.indexOf(i) < 0) && (d = r || a, s.length && (n === mt ? d = s[0] : this.lastFocus !== a && n !== P || (d = s[s.length - 1]))) : d = c && c.type === "image" ? a : r || a, d && vi(d), this.lastFocus = document.activeElement, this.ignoreFocusChange = !1
            }
            next() {
                let t = this.carousel;
                t && t.pages.length > 1 && t.slideNext()
            }
            prev() {
                let t = this.carousel;
                t && t.pages.length > 1 && t.slidePrev()
            }
            jumpTo(...t) {
                this.carousel && this.carousel.slideTo(...t)
            }
            isTopmost() {
                var t;
                return ((t = o.getInstance()) === null || t === void 0 ? void 0 : t.id) == this.id
            }
            animate(t = null, e = "", n) {
                if (!t || !e) return void(n && n());
                this.stop(t);
                let i = a => {
                    a.target === t && t.dataset.animationName && (t.removeEventListener("animationend", i), delete t.dataset.animationName, n && n(), Z(t, e))
                };
                t.dataset.animationName = e, t.addEventListener("animationend", i), v(t, e)
            }
            stop(t) {
                t && t.dispatchEvent(new CustomEvent("animationend", {
                    bubbles: !1,
                    cancelable: !0,
                    currentTarget: t
                }))
            }
            setContent(t, e = "", n = !0) {
                if (this.isClosing()) return;
                let i = t.el;
                if (!i) return;
                let a = null;
                if (N(e) ? a = e : (a = tt(e + ""), N(a) || (a = document.createElement("div"), a.innerHTML = e + "")), ["img", "picture", "iframe", "video", "audio"].includes(a.nodeName.toLowerCase())) {
                    let l = document.createElement("div");
                    l.appendChild(a), a = l
                }
                N(a) && t.filter && !t.error && (a = a.querySelector(t.filter)), a && N(a) ? (v(a, "fancybox__content"), t.id && a.setAttribute("id", t.id), i.classList.add(`has-${t.error?"error":t.type||"unknown"}`), i.prepend(a), a.style.display === "none" && (a.style.display = ""), getComputedStyle(a).getPropertyValue("display") === "none" && (a.style.display = t.display || this.option("defaultDisplay") || "flex"), t.contentEl = a, n && this.revealContent(t), this.manageCloseBtn(t), this.manageCaption(t)) : this.setError(t, "{{ELEMENT_NOT_FOUND}}")
            }
            revealContent(t, e) {
                let n = t.el,
                    i = t.contentEl;
                n && i && (this.emit("reveal", t), this.hideLoading(t), t.state = _.Opening, (e = this.isOpeningSlide(t) ? e === void 0 ? this.optionFor(t, "showClass") : e : "f-fadeIn") ? this.animate(i, e, () => {
                    this.done(t)
                }) : this.done(t))
            }
            done(t) {
                this.isClosing() || (t.state = _.Ready, this.emit("done", t), v(t.el, "is-done"), this.isCurrentSlide(t) && this.option("autoFocus") && queueMicrotask(() => {
                    var e;
                    (e = t.panzoom) === null || e === void 0 || e.updateControls(), this.option("autoFocus") && this.focus()
                }), this.isOpeningSlide(t) && (Z(this.container, yn), !this.isCompact && this.option("idle") && this.setIdle()))
            }
            isCurrentSlide(t) {
                let e = this.getSlide();
                return !(!t || !e) && e.index === t.index
            }
            isOpeningSlide(t) {
                var e, n;
                return ((e = this.carousel) === null || e === void 0 ? void 0 : e.prevPage) === null && t && t.index === ((n = this.getSlide()) === null || n === void 0 ? void 0 : n.index)
            }
            showLoading(t) {
                t.state = _.Loading;
                let e = t.el;
                e && (v(e, Mi), this.emit("loading", t), t.spinnerEl || setTimeout(() => {
                    if (!this.isClosing() && !t.spinnerEl && t.state === _.Loading) {
                        let n = tt(Vn);
                        v(n, "fancybox-spinner"), t.spinnerEl = n, e.prepend(n), this.animate(n, "f-fadeIn")
                    }
                }, 250))
            }
            hideLoading(t) {
                let e = t.el;
                if (!e) return;
                let n = t.spinnerEl;
                this.isClosing() ? n?.remove() : (Z(e, Mi), n && this.animate(n, "f-fadeOut", () => {
                    n.remove()
                }), t.state === _.Loading && (this.emit("loaded", t), t.state = _.Ready))
            }
            setError(t, e) {
                if (this.isClosing()) return;
                let n = new Event("error", {
                    bubbles: !0,
                    cancelable: !0
                });
                if (this.emit("error", n, t), n.defaultPrevented) return;
                t.error = e, this.hideLoading(t), this.clearContent(t);
                let i = document.createElement("div");
                i.classList.add("fancybox-error"), i.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), this.setContent(t, i)
            }
            clearContent(t) {
                if (t.state === void 0) return;
                this.emit("clearContent", t), t.contentEl && (t.contentEl.remove(), t.contentEl = void 0);
                let e = t.el;
                e && (Z(e, "has-error"), Z(e, "has-unknown"), Z(e, `has-${t.type||"unknown"}`)), t.closeBtnEl && t.closeBtnEl.remove(), t.closeBtnEl = void 0, t.captionEl && t.captionEl.remove(), t.captionEl = void 0, t.spinnerEl && t.spinnerEl.remove(), t.spinnerEl = void 0
            }
            getSlide() {
                var t;
                let e = this.carousel;
                return ((t = e?.pages[e?.page]) === null || t === void 0 ? void 0 : t.slides[0]) || void 0
            }
            close(t, e) {
                if (this.isClosing()) return;
                let n = new Event("shouldClose", {
                    bubbles: !0,
                    cancelable: !0
                });
                if (this.emit("shouldClose", n, t), n.defaultPrevented) return;
                t && t.cancelable && (t.preventDefault(), t.stopPropagation());
                let i = () => {
                    this.proceedClose(t, e)
                };
                this.startedFs && j && j.isFullscreen() ? Promise.resolve(j.exit()).then(() => i()) : i()
            }
            clearIdle() {
                this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null
            }
            setIdle(t = !1) {
                let e = () => {
                    this.clearIdle(), this.idle = !0, v(this.container, "is-idle"), this.emit("setIdle")
                };
                if (this.clearIdle(), !this.isClosing())
                    if (t) e();
                    else {
                        let n = this.option("idle");
                        n && (this.idleTimer = setTimeout(e, n))
                    }
            }
            endIdle() {
                this.clearIdle(), this.idle && !this.isClosing() && (this.idle = !1, Z(this.container, "is-idle"), this.emit("endIdle"))
            }
            resetIdle() {
                this.endIdle(), this.setIdle()
            }
            toggleIdle() {
                this.idle ? this.endIdle() : this.setIdle(!0)
            }
            toggleFullscreen() {
                j && (j.isFullscreen() ? j.exit() : j.request().then(() => {
                    this.startedFs = !0
                }))
            }
            isClosing() {
                return [D.Closing, D.CustomClosing, D.Destroy].includes(this.state)
            }
            proceedClose(t, e) {
                var n, i;
                this.state = D.Closing, this.clearIdle(), this.detachEvents();
                let a = this.container,
                    l = this.carousel,
                    c = this.getSlide(),
                    h = c && this.option("placeFocusBack") ? c.triggerEl || this.option("triggerEl") : null;
                if (h && (Ai(h) ? vi(h) : h.focus()), a && (Z(a, yn), v(a, "is-closing"), a.setAttribute(Fn, "true"), this.option("animated") && v(a, vn), a.style.pointerEvents = "none"), l) {
                    l.clearTransitions(), (n = l.panzoom) === null || n === void 0 || n.destroy(), (i = l.plugins.Navigation) === null || i === void 0 || i.detach();
                    for (let m of l.slides) {
                        m.state = _.Closing, this.hideLoading(m);
                        let s = m.contentEl;
                        s && this.stop(s);
                        let r = m?.panzoom;
                        r && (r.stop(), r.detachEvents(), r.detachObserver()), this.isCurrentSlide(m) || l.emit("removeSlide", m)
                    }
                }
                Ii = window.scrollX, _i = window.scrollY, window.addEventListener("scroll", this.onScroll), this.emit("close", t), this.state !== D.CustomClosing ? (e === void 0 && c && (e = this.optionFor(c, "hideClass")), e && c ? (this.animate(c.contentEl, e, () => {
                    l && l.emit("removeSlide", c)
                }), setTimeout(() => {
                    this.destroy()
                }, 500)) : this.destroy()) : setTimeout(() => {
                    this.destroy()
                }, 500)
            }
            destroy() {
                var t;
                if (this.state === D.Destroy) return;
                window.removeEventListener("scroll", this.onScroll), this.state = D.Destroy, (t = this.carousel) === null || t === void 0 || t.destroy();
                let e = this.container;
                e && e.remove(), Ut.delete(this.id);
                let n = o.getInstance();
                n ? n.focus() : (P && (P.remove(), P = null), mt && (mt.remove(), mt = null), Z(document.documentElement, Zi), (() => {
                    if (!Zt) return;
                    let i = document,
                        a = i.body;
                    a.classList.remove(Bn), a.style.setProperty(Ti, ""), i.documentElement.style.setProperty(Oi, "")
                })(), this.emit("destroy"))
            }
            static bind(t, e, n) {
                if (!Zt) return;
                let i, a = "",
                    l = {};
                if (t === void 0 ? i = document.body : ct(t) ? (i = document.body, a = t, typeof e == "object" && (l = e || {})) : (i = t, ct(e) && (a = e), typeof n == "object" && (l = n || {})), !i || !N(i)) return;
                a = a || "[data-fancybox]";
                let c = o.openers.get(i) || new Map;
                c.set(a, l), o.openers.set(i, c), c.size === 1 && i.addEventListener("click", o.fromEvent)
            }
            static unbind(t, e) {
                let n, i = "";
                if (ct(t) ? (n = document.body, i = t) : (n = t, ct(e) && (i = e)), !n) return;
                let a = o.openers.get(n);
                a && i && a.delete(i), i && a || (o.openers.delete(n), n.removeEventListener("click", o.fromEvent))
            }
            static destroy() {
                let t;
                for (; t = o.getInstance();) t.destroy();
                for (let e of o.openers.keys()) e.removeEventListener("click", o.fromEvent);
                o.openers = new Map
            }
            static fromEvent(t) {
                if (t.defaultPrevented || t.button && t.button !== 0 || t.ctrlKey || t.metaKey || t.shiftKey) return;
                let e = t.composedPath()[0],
                    n = e.closest("[data-fancybox-trigger]");
                if (n) {
                    let p = n.dataset.fancyboxTrigger || "",
                        f = document.querySelectorAll(`[data-fancybox="${p}"]`),
                        Q = parseInt(n.dataset.fancyboxIndex || "", 10) || 0;
                    e = f[Q] || e
                }
                if (!(e && e instanceof Element)) return;
                let i, a, l, c;
                if ([...o.openers].reverse().find(([p, f]) => !(!p.contains(e) || ![...f].reverse().find(([Q, b]) => {
                        let g = e.closest(Q);
                        return !!g && (i = p, a = Q, l = g, c = b, !0)
                    }))), !i || !a || !l) return;
                c = c || {}, t.preventDefault(), e = l;
                let h = [],
                    m = A({}, Ln, c);
                m.event = t, m.triggerEl = e, m.delegate = n;
                let s = m.groupAll,
                    r = m.groupAttr,
                    d = r && e ? e.getAttribute(`${r}`) : "";
                if ((!e || d || s) && (h = [].slice.call(i.querySelectorAll(a))), e && !s && (h = d ? h.filter(p => p.getAttribute(`${r}`) === d) : [e]), !h.length) return;
                let u = o.getInstance();
                return u && u.options.triggerEl && h.indexOf(u.options.triggerEl) > -1 ? void 0 : (e && (m.startIndex = h.indexOf(e)), o.fromNodes(h, m))
            }
            static fromSelector(t, e, n) {
                let i = null,
                    a = "",
                    l = {};
                if (ct(t) ? (i = document.body, a = t, typeof e == "object" && (l = e || {})) : t instanceof HTMLElement && ct(e) && (i = t, a = e, typeof n == "object" && (l = n || {})), !i || !a) return !1;
                let c = o.openers.get(i);
                return !!c && (l = A({}, c.get(a) || {}, l), !!l && o.fromNodes(Array.from(i.querySelectorAll(a)), l))
            }
            static fromNodes(t, e) {
                e = A({}, Ln, e || {});
                let n = [];
                for (let i of t) {
                    let a = i.dataset || {},
                        l = a[Ft] || i.getAttribute(En) || i.getAttribute("currentSrc") || i.getAttribute(Ft) || void 0,
                        c, h = e.delegate,
                        m;
                    h && n.length === e.startIndex && (c = h instanceof HTMLImageElement ? h : h.querySelector("img:not([aria-hidden])")), c || (c = i instanceof HTMLImageElement ? i : i.querySelector("img:not([aria-hidden])")), c && (m = c.currentSrc || c[Ft] || void 0, !m && c.dataset && (m = c.dataset.lazySrc || c.dataset[Ft] || void 0));
                    let s = {
                        src: l,
                        triggerEl: i,
                        thumbEl: c,
                        thumbElSrc: m,
                        thumbSrc: m
                    };
                    for (let r in a) {
                        let d = a[r] + "";
                        d = d !== "false" && (d === "true" || d), s[r] = d
                    }
                    n.push(s)
                }
                return new o(n, e)
            }
            static getInstance(t) {
                return t ? Ut.get(t) : Array.from(Ut.values()).reverse().find(e => !e.isClosing() && e) || null
            }
            static getSlide() {
                var t;
                return ((t = o.getInstance()) === null || t === void 0 ? void 0 : t.getSlide()) || null
            }
            static show(t = [], e = {}) {
                return new o(t, e)
            }
            static next() {
                let t = o.getInstance();
                t && t.next()
            }
            static prev() {
                let t = o.getInstance();
                t && t.prev()
            }
            static close(t = !0, ...e) {
                if (t)
                    for (let n of Ut.values()) n.close(...e);
                else {
                    let n = o.getInstance();
                    n && n.close(...e)
                }
            }
        };
    Object.defineProperty(K, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.36"
    }), Object.defineProperty(K, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Ln
    }), Object.defineProperty(K, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: vs
    }), Object.defineProperty(K, "openers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map
    });
    var Zn = class extends R {
        initialize() {
            this.forceClose = this.forceClose.bind(this)
        }
        connect() {
            this.openValue && this.open(), document.addEventListener("turbo:before-render", this.forceClose)
        }
        disconnect() {
            document.removeEventListener("turbo:before-render", this.forceClose)
        }
        open() {
            this.dialogTarget.showModal()
        }
        close() {
            this.dialogTarget.setAttribute("closing", ""), Promise.all(this.dialogTarget.getAnimations().map(t => t.finished)).then(() => {
                this.dialogTarget.removeAttribute("closing"), this.dialogTarget.close()
            })
        }
        backdropClose(t) {
            t.target === this.dialogTarget && this.close()
        }
        forceClose() {
            this.dialogTarget.close()
        }
    };
    Zn.targets = ["dialog"], Zn.values = {
        open: {
            type: Boolean,
            default: !1
        }
    };
    var Ki = Zn;
    var On = {};
    J(On, {
        default: () => Tt
    });
    var Tt = class extends R {
        connect() {
            this.nextNote = !1
        }
        audioPlayerTargetConnected(o) {
            let t = o.querySelector("audio");
            t.volume = this.volumeValue
        }
        playAudio(o) {
            let t = o.target;
            o.target.classList.contains("audio-player") || (t = o.target.closest(".audio-player"));
            let e = t.querySelector("audio");
            if (this.playingValue && this.playingValue != t.id) {
                let n = document.getElementById(this.playingValue);
                n && n.querySelector("audio").pause()
            }
            e.paused && e.play(), t.classList.add("playing"), this.playingValue = t.id, t.dataset.bpm && (this.bpmValue = t.dataset.bpm)
        }
        toggleAudio(o) {
            let t = o.target;
            o.target.classList.contains("audio-player") || (t = o.target.closest(".audio-player"));
            let e = t.querySelector("audio");
            t.classList.contains("playing") ? e.pause() : e.play()
        }
        pauseAudio(o) {
            let t = o.target;
            o.target.classList.contains("audio-player") || (t = o.target.closest(".audio-player"));
            let e = t.querySelector("audio");
            t.classList.remove("playing"), document.querySelector(".audio-player.playing") || (this.playingValue = "")
        }
        spawnNote() {
            if (this.playingValue) {
                let o = document.getElementById(this.playingValue);
                if (o) {
                    let t = o.querySelector(".audio-player__dog");
                    if (t) {
                        o.classList.contains("playing-alt") ? o.classList.remove("playing-alt") : o.classList.add("playing-alt");
                        let e = document.createElement("img");
                        e.src = "/assets/images/note-small.png", e.classList.add("absolute", "animate-note", "z-30", "pixel"), e.width = 18, e.height = 18;
                        let n = Math.floor(Math.random() * 10) - 10,
                            i = Math.floor(Math.random() * 10) - 5,
                            a = Math.floor(Math.random() * 10) - 40;
                        e.setAttribute("style", `top: ${Math.floor(Math.random()*10)-10}; left: ${Math.floor(Math.random()*30)+40}%; offset-path: path('M 0 0 C ${n} ${n/2} ${i} ${a} ${i} ${a}`), t.appendChild(e), setTimeout(function() {
                            e.remove()
                        }, 1e3), o.dataset.bpm && (this.bpmValue = o.dataset.bpm), this.nextNote = setTimeout(this.spawnNote.bind(this), 60 / this.bpmValue * 1e3)
                    }
                }
            }
        }
        updateVolume(o) {
            o.target.muted ? (this.mutedValue = !0, this.volumeValue = 0) : (this.mutedValue = !1, this.volumeValue = o.target.volume);
            for (let t of this.audioPlayerTargets) {
                let e = t.querySelector("audio");
                e.volume = this.volumeValue
            }
        }
        stopNotes() {
            this.nextNote && (clearTimeout(this.nextNote), this.nextNote = !1)
        }
        syncNotes() {
            this.stopNotes(), this.spawnNote()
        }
    };
    V(Tt, "targets", ["audioPlayer"]), V(Tt, "values", {
        playing: {
            type: String
        },
        bpm: {
            type: Number,
            default: 90
        },
        volume: {
            type: Number,
            default: .5
        },
        muted: {
            type: Boolean,
            default: !1
        }
    });
    var In = {};
    J(In, {
        default: () => Dt
    });
    var Tn = typeof navigator < "u" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : !1;

    function Cn(o, t, e, n) {
        o.addEventListener ? o.addEventListener(t, e, n) : o.attachEvent && o.attachEvent("on".concat(t), e)
    }

    function Ct(o, t, e, n) {
        o.removeEventListener ? o.removeEventListener(t, e, n) : o.detachEvent && o.detachEvent("on".concat(t), e)
    }

    function to(o, t) {
        let e = t.slice(0, t.length - 1);
        for (let n = 0; n < e.length; n++) e[n] = o[e[n].toLowerCase()];
        return e
    }

    function eo(o) {
        typeof o != "string" && (o = ""), o = o.replace(/\s/g, "");
        let t = o.split(","),
            e = t.lastIndexOf("");
        for (; e >= 0;) t[e - 1] += ",", t.splice(e, 1), e = t.lastIndexOf("");
        return t
    }

    function Es(o, t) {
        let e = o.length >= t.length ? o : t,
            n = o.length >= t.length ? t : o,
            i = !0;
        for (let a = 0; a < e.length; a++) n.indexOf(e[a]) === -1 && (i = !1);
        return i
    }
    var kt = {
            backspace: 8,
            "\u232B": 8,
            tab: 9,
            clear: 12,
            enter: 13,
            "\u21A9": 13,
            return: 13,
            esc: 27,
            escape: 27,
            space: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            del: 46,
            delete: 46,
            ins: 45,
            insert: 45,
            home: 36,
            end: 35,
            pageup: 33,
            pagedown: 34,
            capslock: 20,
            num_0: 96,
            num_1: 97,
            num_2: 98,
            num_3: 99,
            num_4: 100,
            num_5: 101,
            num_6: 102,
            num_7: 103,
            num_8: 104,
            num_9: 105,
            num_multiply: 106,
            num_add: 107,
            num_enter: 108,
            num_subtract: 109,
            num_decimal: 110,
            num_divide: 111,
            "\u21EA": 20,
            ",": 188,
            ".": 190,
            "/": 191,
            "`": 192,
            "-": Tn ? 173 : 189,
            "=": Tn ? 61 : 187,
            ";": Tn ? 59 : 186,
            "'": 222,
            "[": 219,
            "]": 221,
            "\\": 220
        },
        nt = {
            "\u21E7": 16,
            shift: 16,
            "\u2325": 18,
            alt: 18,
            option: 18,
            "\u2303": 17,
            ctrl: 17,
            control: 17,
            "\u2318": 91,
            cmd: 91,
            command: 91
        },
        Le = {
            16: "shiftKey",
            18: "altKey",
            17: "ctrlKey",
            91: "metaKey",
            shiftKey: 16,
            ctrlKey: 17,
            altKey: 18,
            metaKey: 91
        },
        I = {
            16: !1,
            18: !1,
            17: !1,
            91: !1
        },
        M = {};
    for (let o = 1; o < 20; o++) kt["f".concat(o)] = 111 + o;
    var C = [],
        Mt = null,
        no = "all",
        rt = new Map,
        Gt = o => kt[o.toLowerCase()] || nt[o.toLowerCase()] || o.toUpperCase().charCodeAt(0),
        xs = o => Object.keys(kt).find(t => kt[t] === o),
        ws = o => Object.keys(nt).find(t => nt[t] === o);

    function io(o) {
        no = o || "all"
    }

    function St() {
        return no || "all"
    }

    function Ws() {
        return C.slice(0)
    }

    function Ls() {
        return C.map(o => xs(o) || ws(o) || String.fromCharCode(o))
    }

    function Rs() {
        let o = [];
        return Object.keys(M).forEach(t => {
            M[t].forEach(e => {
                let {
                    key: n,
                    scope: i,
                    mods: a,
                    shortcut: l
                } = e;
                o.push({
                    scope: i,
                    shortcut: l,
                    mods: a,
                    keys: n.split("+").map(c => Gt(c))
                })
            })
        }), o
    }

    function Vs(o) {
        let t = o.target || o.srcElement,
            {
                tagName: e
            } = t,
            n = !0,
            i = e === "INPUT" && !["checkbox", "radio", "range", "button", "file", "reset", "submit", "color"].includes(t.type);
        return (t.isContentEditable || (i || e === "TEXTAREA" || e === "SELECT") && !t.readOnly) && (n = !1), n
    }

    function Zs(o) {
        return typeof o == "string" && (o = Gt(o)), C.indexOf(o) !== -1
    }

    function Os(o, t) {
        let e, n;
        o || (o = St());
        for (let i in M)
            if (Object.prototype.hasOwnProperty.call(M, i))
                for (e = M[i], n = 0; n < e.length;) e[n].scope === o ? e.splice(n, 1).forEach(l => {
                    let {
                        element: c
                    } = l;
                    return kn(c)
                }) : n++;
        St() === o && io(t || "all")
    }

    function Ts(o) {
        let t = o.keyCode || o.which || o.charCode,
            e = C.indexOf(t);
        if (e >= 0 && C.splice(e, 1), o.key && o.key.toLowerCase() === "meta" && C.splice(0, C.length), (t === 93 || t === 224) && (t = 91), t in I) {
            I[t] = !1;
            for (let n in nt) nt[n] === t && ($[n] = !1)
        }
    }

    function oo(o) {
        if (typeof o > "u") Object.keys(M).forEach(i => {
            Array.isArray(M[i]) && M[i].forEach(a => We(a)), delete M[i]
        }), kn(null);
        else if (Array.isArray(o)) o.forEach(i => {
            i.key && We(i)
        });
        else if (typeof o == "object") o.key && We(o);
        else if (typeof o == "string") {
            for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) e[n - 1] = arguments[n];
            let [i, a] = e;
            typeof i == "function" && (a = i, i = ""), We({
                key: o,
                scope: i,
                method: a,
                splitKey: "+"
            })
        }
    }
    var We = o => {
        let {
            key: t,
            scope: e,
            method: n,
            splitKey: i = "+"
        } = o;
        eo(t).forEach(l => {
            let c = l.split(i),
                h = c.length,
                m = c[h - 1],
                s = m === "*" ? "*" : Gt(m);
            if (!M[s]) return;
            e || (e = St());
            let r = h > 1 ? to(nt, c) : [],
                d = [];
            M[s] = M[s].filter(u => {
                let f = (n ? u.method === n : !0) && u.scope === e && Es(u.mods, r);
                return f && d.push(u.element), !f
            }), d.forEach(u => kn(u))
        })
    };

    function $i(o, t, e, n) {
        if (t.element !== n) return;
        let i;
        if (t.scope === e || t.scope === "all") {
            i = t.mods.length > 0;
            for (let a in I) Object.prototype.hasOwnProperty.call(I, a) && (!I[a] && t.mods.indexOf(+a) > -1 || I[a] && t.mods.indexOf(+a) === -1) && (i = !1);
            (t.mods.length === 0 && !I[16] && !I[18] && !I[17] && !I[91] || i || t.shortcut === "*") && (t.keys = [], t.keys = t.keys.concat(C), t.method(o, t) === !1 && (o.preventDefault ? o.preventDefault() : o.returnValue = !1, o.stopPropagation && o.stopPropagation(), o.cancelBubble && (o.cancelBubble = !0)))
        }
    }

    function qi(o, t) {
        let e = M["*"],
            n = o.keyCode || o.which || o.charCode;
        if (!$.filter.call(this, o)) return;
        if ((n === 93 || n === 224) && (n = 91), C.indexOf(n) === -1 && n !== 229 && C.push(n), ["metaKey", "ctrlKey", "altKey", "shiftKey"].forEach(c => {
                let h = Le[c];
                o[c] && C.indexOf(h) === -1 ? C.push(h) : !o[c] && C.indexOf(h) > -1 ? C.splice(C.indexOf(h), 1) : c === "metaKey" && o[c] && (C = C.filter(m => m in Le || m === n))
            }), n in I) {
            I[n] = !0;
            for (let c in nt) nt[c] === n && ($[c] = !0);
            if (!e) return
        }
        for (let c in I) Object.prototype.hasOwnProperty.call(I, c) && (I[c] = o[Le[c]]);
        o.getModifierState && !(o.altKey && !o.ctrlKey) && o.getModifierState("AltGraph") && (C.indexOf(17) === -1 && C.push(17), C.indexOf(18) === -1 && C.push(18), I[17] = !0, I[18] = !0);
        let i = St();
        if (e)
            for (let c = 0; c < e.length; c++) e[c].scope === i && (o.type === "keydown" && e[c].keydown || o.type === "keyup" && e[c].keyup) && $i(o, e[c], i, t);
        if (!(n in M)) return;
        let a = M[n],
            l = a.length;
        for (let c = 0; c < l; c++)
            if ((o.type === "keydown" && a[c].keydown || o.type === "keyup" && a[c].keyup) && a[c].key) {
                let h = a[c],
                    {
                        splitKey: m
                    } = h,
                    s = h.key.split(m),
                    r = [];
                for (let d = 0; d < s.length; d++) r.push(Gt(s[d]));
                r.sort().join("") === C.sort().join("") && $i(o, h, i, t)
            }
    }

    function $(o, t, e) {
        C = [];
        let n = eo(o),
            i = [],
            a = "all",
            l = document,
            c = 0,
            h = !1,
            m = !0,
            s = "+",
            r = !1,
            d = !1;
        for (e === void 0 && typeof t == "function" && (e = t), Object.prototype.toString.call(t) === "[object Object]" && (t.scope && (a = t.scope), t.element && (l = t.element), t.keyup && (h = t.keyup), t.keydown !== void 0 && (m = t.keydown), t.capture !== void 0 && (r = t.capture), typeof t.splitKey == "string" && (s = t.splitKey), t.single === !0 && (d = !0)), typeof t == "string" && (a = t), d && oo(o, a); c < n.length; c++) o = n[c].split(s), i = [], o.length > 1 && (i = to(nt, o)), o = o[o.length - 1], o = o === "*" ? "*" : Gt(o), o in M || (M[o] = []), M[o].push({
            keyup: h,
            keydown: m,
            scope: a,
            mods: i,
            shortcut: n[c],
            method: e,
            key: n[c],
            splitKey: s,
            element: l
        });
        if (typeof l < "u" && window) {
            if (!rt.has(l)) {
                let u = function() {
                        let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
                        return qi(f, l)
                    },
                    p = function() {
                        let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
                        qi(f, l), Ts(f)
                    };
                rt.set(l, {
                    keydownListener: u,
                    keyupListenr: p,
                    capture: r
                }), Cn(l, "keydown", u, r), Cn(l, "keyup", p, r)
            }
            if (!Mt) {
                let u = () => {
                    C = []
                };
                Mt = {
                    listener: u,
                    capture: r
                }, Cn(window, "focus", u, r)
            }
        }
    }

    function Cs(o) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
        Object.keys(M).forEach(e => {
            M[e].filter(i => i.scope === t && i.shortcut === o).forEach(i => {
                i && i.method && i.method()
            })
        })
    }

    function kn(o) {
        let t = Object.values(M).flat();
        if (t.findIndex(n => {
                let {
                    element: i
                } = n;
                return i === o
            }) < 0) {
            let {
                keydownListener: n,
                keyupListenr: i,
                capture: a
            } = rt.get(o) || {};
            n && i && (Ct(o, "keyup", i, a), Ct(o, "keydown", n, a), rt.delete(o))
        }
        if ((t.length <= 0 || rt.size <= 0) && (Object.keys(rt).forEach(i => {
                let {
                    keydownListener: a,
                    keyupListenr: l,
                    capture: c
                } = rt.get(i) || {};
                a && l && (Ct(i, "keyup", l, c), Ct(i, "keydown", a, c), rt.delete(i))
            }), rt.clear(), Object.keys(M).forEach(i => delete M[i]), Mt)) {
            let {
                listener: i,
                capture: a
            } = Mt;
            Ct(window, "focus", i, a), Mt = null
        }
    }
    var Mn = {
        getPressedKeyString: Ls,
        setScope: io,
        getScope: St,
        deleteScope: Os,
        getPressedKeyCodes: Ws,
        getAllKeyCodes: Rs,
        isPressed: Zs,
        filter: Vs,
        trigger: Cs,
        unbind: oo,
        keyMap: kt,
        modifier: nt,
        modifierMap: Le
    };
    for (let o in Mn) Object.prototype.hasOwnProperty.call(Mn, o) && ($[o] = Mn[o]);
    if (typeof window < "u") {
        let o = window.hotkeys;
        $.noConflict = t => (t && window.hotkeys === $ && (window.hotkeys = o), $), window.hotkeys = $
    }

    function Ms(o, t) {
        var e = {};
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && t.indexOf(n) < 0 && (e[n] = o[n]);
        if (o != null && typeof Object.getOwnPropertySymbols == "function")
            for (var i = 0, n = Object.getOwnPropertySymbols(o); i < n.length; i++) t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(o, n[i]) && (e[n[i]] = o[n[i]]);
        return e
    }
    var Sn = {
            debug: !1,
            logger: console,
            dispatchEvent: !0,
            eventPrefix: !0
        },
        Gn = class {
            constructor(t, e = {}) {
                var n, i, a;
                this.log = (h, m) => {
                    this.debug && (this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${h}`, "color: #3B82F6", "color: unset"), this.logger.log(Object.assign({
                        controllerId: this.controllerId
                    }, m)), this.logger.groupEnd())
                }, this.warn = h => {
                    this.logger.warn(`%c${this.controller.identifier} %c${h}`, "color: #3B82F6; font-weight: bold", "color: unset")
                }, this.dispatch = (h, m = {}) => {
                    if (this.dispatchEvent) {
                        let {
                            event: s
                        } = m, r = Ms(m, ["event"]), d = this.extendedEvent(h, s || null, r);
                        this.targetElement.dispatchEvent(d), this.log("dispatchEvent", Object.assign({
                            eventName: d.type
                        }, r))
                    }
                }, this.call = (h, m = {}) => {
                    let s = this.controller[h];
                    if (typeof s == "function") return s.call(this.controller, m)
                }, this.extendedEvent = (h, m, s) => {
                    let {
                        bubbles: r,
                        cancelable: d,
                        composed: u
                    } = m || {
                        bubbles: !0,
                        cancelable: !0,
                        composed: !0
                    };
                    return m && Object.assign(s, {
                        originalEvent: m
                    }), new CustomEvent(this.composeEventName(h), {
                        bubbles: r,
                        cancelable: d,
                        composed: u,
                        detail: s
                    })
                }, this.composeEventName = h => {
                    let m = h;
                    return this.eventPrefix === !0 ? m = `${this.controller.identifier}:${h}` : typeof this.eventPrefix == "string" && (m = `${this.eventPrefix}:${h}`), m
                }, this.debug = (i = (n = e?.debug) !== null && n !== void 0 ? n : t.application.stimulusUseDebug) !== null && i !== void 0 ? i : Sn.debug, this.logger = (a = e?.logger) !== null && a !== void 0 ? a : Sn.logger, this.controller = t, this.controllerId = t.element.id || t.element.dataset.id, this.targetElement = e?.element || t.element;
                let {
                    dispatchEvent: l,
                    eventPrefix: c
                } = Object.assign({}, Sn, e);
                Object.assign(this, {
                    dispatchEvent: l,
                    eventPrefix: c
                }), this.controllerInitialize = t.initialize.bind(t), this.controllerConnect = t.connect.bind(t), this.controllerDisconnect = t.disconnect.bind(t)
            }
        },
        Dn = class extends Gn {
            constructor(t, e) {
                super(t, e), this.bind = () => {
                    for (let [n, i] of Object.entries(this.hotkeysOptions.hotkeys)) {
                        let a = i.handler.bind(this.controller);
                        $(n, i.options, l => a(l, l))
                    }
                }, this.unbind = () => {
                    for (let n in this.hotkeysOptions.hotkeys) $.unbind(n)
                }, this.controller = t, this.hotkeysOptions = e, this.enhanceController(), this.bind()
            }
            enhanceController() {
                this.hotkeysOptions.filter && ($.filter = this.hotkeysOptions.filter);
                let t = this.controller.disconnect.bind(this.controller),
                    e = () => {
                        this.unbind(), t()
                    };
                Object.assign(this.controller, {
                    disconnect: e
                })
            }
        },
        ks = o => ({
            handler: o[0],
            options: {
                element: o[1]
            }
        }),
        Ss = o => {
            if (!o.hotkeys) {
                let t = {};
                Object.entries(o).forEach(([e, n]) => {
                    Object.defineProperty(t, e, {
                        value: ks(n),
                        writable: !1,
                        enumerable: !0
                    })
                }), o = {
                    hotkeys: t
                }
            }
            return o
        },
        so = (o, t) => new Dn(o, Ss(t));
    var Dt = class extends R {
        connect() {
            this.butTarget.style.left = "120%", so(this, {
                hotkeys: {
                    left: {
                        handler: this.startMove,
                        options: {
                            keydown: !0,
                            keyup: !0
                        }
                    }
                }
            }), window.requestAnimationFrame(this.moveLeft.bind(this))
        }
        startMove(o) {
            o.type == "keydown" ? this.movingValue = !0 : this.movingValue = !1
        }
        moveLeft() {
            if (this.movingValue) {
                let o = this.butTarget.style.left.replace("%", "");
                o > 75 && (this.butTarget.style.left = `${o-.05}%`)
            }
            window.requestAnimationFrame(this.moveLeft.bind(this))
        }
    };
    V(Dt, "targets", ["but"]), V(Dt, "values", {
        moving: {
            type: Boolean,
            default: !1
        }
    });
    var _n = {};
    J(_n, {
        default: () => It
    });
    var It = class extends R {
        connect() {
            this.localeValue = document.querySelector('meta[property="og:locale"]').content, this.getLatestCountdown()
        }
        updateCountdown() {
            this.timeSinceRefreshValue += 1, this.timeSinceRefreshValue >= 300 && (this.timeSinceRefreshValue = 0, this.getLatestCountdown());
            let o = new Date().getTime(),
                t = new Date(this.timeValue),
                e = "",
                n = t.getTime() - o,
                i = Math.floor(n / (1e3 * 60 * 60 * 24));
            i < 10 && i > 0 && (i = `0${i}`);
            let a = Math.floor(n % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
            a < 10 && a >= 0 && (a = `0${a}`);
            let l = Math.floor(n % (1e3 * 60 * 60) / (1e3 * 60));
            l < 10 && l >= 0 && (l = `0${l}`), l == 0 && (l = "00");
            let c = Math.floor(n % (1e3 * 60) / 1e3);
            if (c < 10 && (c = `0${c}`), i == 0 ? a == 0 ? e = " scale-[1.5]" : e = " scale-[1.3]" : i <= 3 && (e = " scale-[1.1]"), n < 0) this.dateTarget.innerHTML = "NOW", this.countdownTarget.innerHTML = "(REFRESH)", document.getElementById("index2").classList.remove("hidden"), document.getElementById("index1").classList.add("hidden");
            else {
                if (this.localeValue == "ja_JP") this.dateTarget.innerHTML = `${this.timeValue.substring(0,4)}\u5E74${this.timeValue.substring(6,7)}\u6708${this.timeValue.substring(9,10)}\u65E5\u3000\u30EA\u30EA\u30FC\u30B9`;
                else {
                    let h = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        m = this.timeValue.substring(9, 10);
                    this.dateTarget.innerHTML = `Releasing on ${h[t.getMonth()]} ${m-1}, ${this.timeValue.substring(0,4)}`, this.infoTarget.innerHTML = `* ${h[t.getMonth()]} ${m} in Japan, Australia, and New Zealand`
                }
                this.countdownTarget.innerHTML = `<div class='flex gap-x-2 items-center justify-center${e}'>${i>0?"<span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>"+i+"</span><span class='text-2xl md:text-5xl w-4 md:w-8'>:</span>":""}${i>0||a>0?"<span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>"+a+"</span><span class='text-2xl md:text-5xl w-4 md:w-8'>:</span>":""}<span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>${l}</span><span class='text-2xl md:text-5xl w-4 md:w-8'>:</span><span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>${c}</span></div>`
            }
        }
        getLatestCountdown() {
            fetch(this.sourceValue, {
                cache: "no-store"
            }).then(o => o.text()).then(o => {
                o == "NO" ? this.startCountdown() : o.includes("https") || (this.timeValue = o, this.startCountdown())
            }).catch(o => {
                this.timeValue = "2025-06-05T00:00:00+09:00", this.startCountdown()
            })
        }
        startCountdown() {
            this.updateCountdown(), this.startedValue || (setInterval(this.updateCountdown.bind(this), 1e3), this.startedValue = !0)
        }
    };
    V(It, "targets", ["date", "countdown", "info"]), V(It, "values", {
        time: {
            type: String,
            default: ""
        },
        cooldown: {
            type: Number,
            default: 0
        },
        started: {
            type: Boolean,
            default: !1
        },
        locale: {
            type: String,
            default: "en_US"
        },
        source: {
            type: String,
            default: "https://files.deltarune.com/is-it-ready-yet.txt"
        },
        timeSinceRefresh: {
            type: Number,
            default: 0
        }
    });
    var Nn = {};
    J(Nn, {
        default: () => Re
    });
    var Re = class extends R {
        connect() {
            if (this.hasContainerTarget) {
                for (var o = Math.floor(Math.random() * 4) + 6, t = 0; t < o; t++) {
                    var e = Math.floor(Math.random() * 600) + 600 + t * 10,
                        n = Math.floor(Math.random() * 400) + 20 + t * 10;
                    t % 2 == 0 && (e = 0 - e - 20), this.appendParticle(e, n, this.containerTarget)
                }
                for (var i = Math.floor(Math.random() * 4) + 8, t = 0; t < i; t++) {
                    var e = Math.floor(Math.random() * 600) + 800 + t * 10,
                        n = Math.floor(Math.random() * 400) + 20 + t * 10;
                    t % 2 == 0 && (e = 0 - e - 20), this.appendPixel(e, n, this.containerTarget)
                }
            }
            if (this.hasMobileTarget && !1) {
                var o;
                for (var t; t < o; t++) var e, n;
                var i;
                for (var t; t < i; t++) var e, n
            }
        }
        appendParticle(o, t, e, n = 12) {
            var i = Math.floor(Math.random() * 3) + 1;
            o > 0 && (i += 3);
            var a = Math.floor(Math.random() * 6) + 1,
                l = Math.floor(Math.random() * 80) + 50;
            t += l * 2;
            var c = document.createElement("img");
            c.setAttribute("class", "absolute opacity-50 animate-pulse motion-safe:translate-y-0"), c.setAttribute("data-distance", l), c.setAttribute("data-scroll-target", "parallax"), c.setAttribute("src", `/assets/images/particle-${i}.png`), c.setAttribute("style", `margin-left: ${o}px; margin-top: ${t}px; animation-delay: -${a}s; max-width: ${n}px`), c.setAttribute("alt", "Particle"), c.setAttribute("aria-hidden", "true"), e.append(c)
        }
        appendPixel(o, t, e, n = 4) {
            var i = Math.floor(Math.random() * n) + 2,
                a = Math.floor(Math.random() * 6) + 1,
                l = Math.floor(Math.random() * 100) + 20,
                c = Math.floor(Math.random() * 200);
            t += l * 2;
            var h = document.createElement("span");
            h.setAttribute("class", "absolute animate-pulse motion-safe:translate-y-0 border-0"), h.setAttribute("data-distance", l), h.setAttribute("data-scroll-target", "parallax"), h.setAttribute("style", `margin-left: ${o}px; margin-top: ${t}px; width: ${i}px; height: ${i}px; background-color: rgb(${c}, ${c}, 255); animation-delay: -${a}s`), h.setAttribute("aria-hidden", "true"), e.append(h)
        }
    };
    V(Re, "targets", ["particle", "container", "mobile"]);
    var An = {};
    J(An, {
        default: () => Nt
    });
    var _t = Pt(Ze(), 1);
    var Nt = class extends R {
        connect() {
            let o = new _t.Howl({
                src: ["/assets/audio/sprinkle.ogg", "/assets/audio/sprinkle.mp3"],
                volume: .5
            });
            this.sprinkle = o;
            let t = new _t.Howl({
                src: ["/assets/audio/bagel_ralsei.ogg", "/assets/audio/bagel_ralsei.mp3"],
                volume: .5
            });
            this.ralsei = t;
            let e = new _t.Howl({
                src: ["/assets/audio/bagel_susie.ogg", "/assets/audio/bagel_susie.mp3"],
                volume: .5
            });
            this.susie = e;
            let n = new _t.Howl({
                src: ["/assets/audio/face.ogg", "/assets/audio/face.mp3"],
                volume: .5
            });
            this.face = n, localStorage.getItem("rarecats-points") !== null && (this.pointsValue = localStorage.getItem("rarecats-points")), this.summonCat(), setTimeout(() => {
                this.catTarget.classList.remove("hidden"), this.initializedValue = !0, window.requestAnimationFrame(this.catTick.bind(this))
            }, 100)
        }
        summonCat() {
            let o = Math.floor(Math.random() * 1e3) + 1;
            this.pullsValue >= 100 ? this.hardReset() : o <= 700 ? (this.catTarget.setAttribute("src", "/assets/images/cat-001.gif"), this.catTarget.setAttribute("data-rarecats-points-param", 10)) : o <= 879 ? (this.catTarget.setAttribute("src", "/assets/images/cat-002.gif"), this.catTarget.setAttribute("data-rarecats-points-param", 50)) : o <= 959 ? (this.catTarget.setAttribute("src", "/assets/images/cat-005.gif"), this.catTarget.setAttribute("data-rarecats-points-param", 250)) : o <= 989 ? (this.catTarget.setAttribute("src", "/assets/images/cat-006.gif"), this.catTarget.setAttribute("data-rarecats-points-param", 1e3)) : o <= 999 ? (this.catTarget.setAttribute("src", "/assets/images/cat-007.gif"), this.catTarget.setAttribute("data-rarecats-points-param", 3e3)) : this.initializedValue == !1 ? this.summonCat() : this.hardReset(), this.xValue = Math.floor(Math.random() * (document.body.clientWidth - 200)), this.yValue = Math.floor(Math.random() * (document.body.clientHeight - 200)), this.horizontalValue = Math.round(Math.random()) ? 1 : -1, this.verticalValue = Math.round(Math.random()) ? 1 : -1, this.updateCat()
        }
        clickCat(o) {
            this.catTarget.classList.contains("animate-caught") == !1 && (this.pullsValue += 1, this.catTarget.classList.add("animate-caught"), this.catTarget.classList.remove("cursor-pointer"), this.caughtValue = !0, "points" in o.params && o.params.points == parseInt(o.params.points) ? this.pointsValue += o.params.points : this.hardReset(), setTimeout(() => {
                this.catTarget.classList.remove("animate-caught"), this.catTarget.classList.add("cursor-pointer"), this.caughtValue = !1, this.catTarget.removeAttribute("disabled"), this.summonCat()
            }, 1e3))
        }
        pointsValueChanged(o, t) {
            if (document.title = `${this.pointsValue} points`, this.initializedValue == !0 && (localStorage.setItem("rarecats-points", this.pointsValue), o > t)) {
                let e = o - t,
                    n = document.createElement("span");
                if (n.classList.add("absolute", "w-24", "h-12", "pointer-events-none", "text-2xl", "text-white", "text-center", "font-pixel", "text-center", "z-5"), this.yValue > 80 ? (n.classList.add("animate-toast"), n.setAttribute("style", `left: ${this.xValue+40}px; top: ${this.yValue+20}px`)) : (n.classList.add("animate-toast-down"), n.setAttribute("style", `left: ${this.xValue+40}px; top: ${this.yValue+160}px`)), n.innerHTML = `+${e}`, this.containerTarget.append(n), setTimeout(() => {
                        n.remove()
                    }, 1e3), e >= 3e3 ? (this.ralsei.rate(.8), this.ralsei.play(), this.ralsei.rate(.81), this.ralsei.play(), this.sprinkle.rate(.25), this.sprinkle.play()) : e >= 1e3 ? (this.ralsei.rate(1), this.ralsei.play(), this.sprinkle.rate(.5), this.sprinkle.play()) : e >= 250 ? (this.susie.rate(1.3), this.susie.play()) : e >= 50 ? (this.sprinkle.rate(.95), this.sprinkle.play()) : e >= 10 && (this.sprinkle.rate(1), this.sprinkle.play()), e > 3e3) this.hardReset();
                else if (e >= 1e3) {
                    let i = Math.floor(Math.random() * (document.body.clientWidth - 200)),
                        a = Math.floor(Math.random() * (document.body.clientHeight - 200));
                    this.windowTarget.setAttribute("style", `left: ${i}px; top: ${a}px`), this.windowTarget.classList.add("animate-fade-in"), this.windowTarget.classList.remove("hidden", "animate-fade-out"), setTimeout(() => {
                        this.windowTarget.classList.remove("animate-fade-in"), this.windowTarget.classList.add("animate-fade-out")
                    }, 3e3), setTimeout(() => {
                        this.windowTarget.classList.add("hidden"), this.windowTarget.classList.remove("animate-fade-out", "animate-fade-in")
                    }, 5e3)
                }
            }
        }
        catTick() {
            let o = Math.max(document.body.clientWidth - 130, 130),
                t = Math.max(document.body.clientHeight - 150, 150);
            (this.xValue >= o || this.xValue <= -60) && (this.horizontalValue = -this.horizontalValue), this.xValue >= o && (this.xValue = o), (this.yValue >= t || this.yValue <= -65) && (this.verticalValue = -this.verticalValue), this.yValue >= t && (this.yValue = t), this.xValue += this.horizontalValue, this.yValue += this.verticalValue, this.updateCat(), window.requestAnimationFrame(this.catTick.bind(this))
        }
        updateCat() {
            this.caughtValue == !1 && this.catTarget.setAttribute("style", `left: ${this.xValue}px; top: ${this.yValue}px`)
        }
        reset() {
            this.pointsValue = 0, this.summonCat()
        }
        hardReset() {
            this.pointsValue = 0, this.catTarget.setAttribute("src", "/assets/images/cat-009.gif"), this.catTarget.classList.add("animate-megazoom"), this.face.play(), setTimeout(this.fullReset.bind(this), 500)
        }
        fullReset() {
            this.catTarget.classList.remove("animate-megazoom"), this.summonCat(), window.location.href = "/sweepstakes/"
        }
    };
    V(Nt, "targets", ["cat", "container", "window"]), V(Nt, "values", {
        initialized: {
            type: Boolean,
            default: !1
        },
        points: {
            type: Number,
            default: 0
        },
        pulls: {
            type: Number,
            default: 0
        },
        horizontal: {
            type: Number,
            default: 1
        },
        vertical: {
            type: Number,
            default: 1
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        caught: {
            type: Boolean,
            default: !1
        }
    });
    var Yn = {};
    J(Yn, {
        default: () => At
    });
    var Xn = Pt(Ze(), 1);
    var At = class extends R {
        connect() {
            this.locale = {
                en: {
                    rumble: "You can never defeat us!!! Let's rumble!"
                },
                ja: {
                    rumble: "\u304A\u307E\u3048\u306B\u306F\u3000\u308F\u308C\u3089\u3092\u3000\u305F\u304A\u3059\u3053\u3068\u306F\u3000\u3067\u304D\u306C\uFF01\u3000\u3044\u304F\u305E\uFF01\uFF01"
                }
            };
            let o = new Xn.Howl({
                src: ["/assets/audio/slam.ogg", "/assets/audio/slam.mp3"],
                volume: .5
            });
            this.slam = o;
            let t = new Xn.Howl({
                src: ["/assets/audio/ma.ogg", "/assets/audio/ma.mp3"],
                volume: .5
            });
            this.ma = t
        }
        start() {
            this.startedValue == !1 && (this.slam.play(), this.doorTarget.classList.add("hidden"), this.squareTarget.classList.remove("hidden"), window.requestAnimationFrame(this.moveTick.bind(this)), setTimeout(() => {
                this.clickedValue == !1 && (this.escapedTarget.classList.remove("hidden"), this.escapedValue = !0, this.squareTarget.classList.add("hidden"), window.getSelection().removeAllRanges())
            }, 5e3))
        }
        moveTick() {
            if (this.escapedValue == !1 && this.clickedValue == !1) {
                let o = this.containerTarget.clientWidth / 2,
                    t = this.containerTarget.clientHeight / 2,
                    e = 250,
                    n = e * Math.cos(this.angleValue),
                    i = e * Math.sin(this.angleValue) * Math.cos(this.angleValue);
                this.angleValue += .02, this.squareTarget.setAttribute("style", `left: ${o+n-this.squareTarget.clientWidth/2}px; top: ${t+i-this.squareTarget.clientHeight/2}px`), window.requestAnimationFrame(this.moveTick.bind(this))
            }
        }
        click() {
            this.clickedValue == !1 && (this.clickedValue = !0, this.squareTarget.classList.add("animate-fly-off"), this.squareTarget.classList.remove("cursor-pointer"), this.ma.play(), document.title = this.locale[this.localeValue].rumble, setTimeout(() => {
                window.location.href = "/chapter3"
            }, 3e3))
        }
        playMa() {
            this.ma.play()
        }
    };
    V(At, "targets", ["container", "door", "square", "escaped"]), V(At, "values", {
        clicked: {
            type: Boolean,
            default: !1
        },
        escaped: {
            type: Boolean,
            default: !1
        },
        started: {
            type: Boolean,
            default: !1
        },
        angle: {
            type: Number,
            default: 0
        },
        locale: {
            type: String,
            default: "en"
        }
    });
    var Jn = {};
    J(Jn, {
        default: () => Oe
    });
    var ao = Pt(Ze(), 1);
    var Oe = class extends R {
        connect() {
            let o = new ao.Howl({
                src: ["/assets/audio/chord.ogg", "/assets/audio/chord.mp3"],
                volume: .5
            });
            this.sound = o
        }
        click(o) {
            this.clicksValue >= 3 ? window.location.href = "/window" : (o.preventDefault(), this.sound.play(), this.clicksValue += 1)
        }
    };
    V(Oe, "values", {
        clicks: {
            type: Number,
            default: 0
        }
    });
    var Hn = {};
    J(Hn, {
        default: () => Ce
    });
    var Te = Pt(lo(), 1);
    var Ce = class extends R {
        parallaxTargetConnected(o) {
            o.classList.add("parallax");
            let t = 10;
            "distance" in o.dataset && (t = o.dataset.distance);
            let e = window.innerHeight / 200;
            Te.create({
                elem: o,
                from: 0,
                to: "bottom-top",
                direct: !0,
                props: {
                    "--tw-translate-y": {
                        from: 0,
                        to: `-${e*t}px`
                    }
                }
            }).start()
        }
        parafadeTargetConnected(o) {
            o.classList.add("parafade"), Te.create({
                elem: o,
                from: "top-bottom",
                to: "top-middle",
                direct: !0,
                props: {
                    opacity: {
                        from: 0,
                        to: 1
                    }
                }
            }).start()
        }
        parashadowTargetConnected(o) {
            o.classList.add("parafade"), Te.create({
                elem: o,
                from: "top-bottom",
                to: "middle-middle",
                direct: !0,
                props: {
                    "--shadow-length": {
                        from: "100px",
                        to: "10px"
                    },
                    "--shadow-y": {
                        from: "100px",
                        to: "10px"
                    },
                    "--shadow-z": {
                        from: "-100px",
                        to: "-10px"
                    }
                }
            }).start()
        }
        scrollTo(o) {
            document.querySelector(o.params.element) ? document.querySelector(o.params.element).scrollIntoView({
                behavior: "smooth"
            }) : window.location.href = `${window.location.origin}${o.params.element}`
        }
    };
    V(Ce, "targets", ["parallax", "parafade"]);
    var jn = {};
    J(jn, {
        default: () => Me
    });
    var Me = class extends R {
        connect() {
            this.appendStar(Math.floor(Math.random() * 10) + 450, Math.floor(Math.random() * 10) + 100, !1), this.appendStar(Math.floor(Math.random() * 10) + 320, Math.floor(Math.random() * 5) + 105, !1), this.appendStar(Math.floor(Math.random() * 10) + 480, Math.floor(Math.random() * 10) + 150, !1), this.appendStar(Math.floor(Math.random() * 10) + 500, Math.floor(Math.random() * 10) + 350, !1), this.appendStar(0 - (Math.floor(Math.random() * 10) + 450), Math.floor(Math.random() * 10) + 100, !1), this.appendStar(0 - (Math.floor(Math.random() * 10) + 320), Math.floor(Math.random() * 5) + 105, !1), this.appendStar(0 - (Math.floor(Math.random() * 10) + 480), Math.floor(Math.random() * 10) + 150, !1), this.appendStar(0 - (Math.floor(Math.random() * 10) + 500), Math.floor(Math.random() * 10) + 325, !1);
            for (var o = Math.floor(Math.random() * 6) + 4, t = 0; t < o; t++) {
                var e = Math.floor(Math.random() * 300) + 600 + t * 10,
                    n = Math.floor(Math.random() * 200) + 200 + t * 10,
                    i = !1;
                t < 2 && (i = !0), t % 2 == 0 && (e = 0 - e - 20), this.appendStar(e, n, i)
            }
        }
        appendStar(o, t, e) {
            var n = 6;
            e || (n = Math.floor(Math.random() * 5) + 1);
            var i = Math.floor(Math.random() * 6) + 1,
                a = Math.floor(Math.random() * 20) + 10;
            t += a * 2;
            var l = document.createElement("img");
            l.setAttribute("class", "absolute opacity-50 animate-pulse motion-safe:translate-y-0"), l.setAttribute("data-distance", a), l.setAttribute("data-scroll-target", "parallax"), l.setAttribute("src", `/assets/images/star${n}.png`), l.setAttribute("style", `margin-left: ${o}px; margin-top: ${t}px; animation-delay: -${i}s`), l.setAttribute("alt", "Star"), l.setAttribute("aria-hidden", "true"), this.containerTarget.append(l)
        }
    };
    V(Me, "targets", ["star", "container"]);
    var Pn = {};
    J(Pn, {
        default: () => Xt
    });
    var Xt = class extends R {
        connect() {
            this.locale = {
                en: {
                    unknown: "Unknown contact.",
                    error: "She never smiled?",
                    thank_you: "Thank you."
                },
                ja: {
                    unknown: "\u4E0D\u660E\u306E\u9023\u7D61\u5148",
                    error: "\u5F7C\u5973\u306F\u4E8C\u5EA6\u3068\u7B11\u308F\u306A\u304B\u3063\u305F\uFF1F",
                    thank_you: "\u3042\u308A\u304C\u3068\u3046\u3002"
                }
            }, this.destroyForm()
        }
        clearForm() {
            if (this.hasFieldTarget)
                for (let o of this.fieldTargets) o.value = ""
        }
        destroyForm() {
            if (this.hasFieldTarget)
                for (let o of this.fieldTargets) o.remove();
            if (this.hasButtonTarget)
                for (let o of this.buttonTargets) o.remove()
        }
        checkInput() {
            this.destroyForm(), this.feedbackTarget.innerHTML = this.locale[this.localeValue].thank_you
        }
    };
    V(Xt, "targets", ["button", "form", "feedback", "field"]), V(Xt, "values", {
        locale: {
            type: String,
            default: "en"
        }
    });
    var Kn = {};
    J(Kn, {
        default: () => Yt
    });
    var Yt = class extends R {
        startDrawing(o) {
            this.drawingValue = !0
        }
        stopDrawing(o) {
            this.drawingValue = !1
        }
        draw(o) {
            if (this.drawingValue) {
                let t = document.elementFromPoint(o.clientX, o.clientY);
                if ("therapyTarget" in t.dataset && t.dataset.therapyTarget == "cover") {
                    let n = document.querySelectorAll(".revealed").length;
                    if (t.classList.remove("z-3"), t.classList.add("z-1", "revealed"), this.treeTarget.setAttribute("style", `opacity: ${n/300}`), n > 300) {
                        for (let i of this.coverTargets) i.classList.remove("z-3"), i.classList.add("z-1", "revealed");
                        this.treeTarget.classList.remove("pointer-events-none")
                    }
                }
                let e = document.createElement("span");
                if (e.classList.add("absolute", "w-[8px]", "h-[8px]", "bg-white", "pointer-events-none", "select-none"), this.revealingValue ? e.classList.add("z-1") : e.classList.add("z-4"), e.setAttribute("data-therapy-target", "dot"), e.setAttribute("style", `left: ${o.clientX}px; top: ${o.clientY}px`), this.containerTarget.append(e), this.dotTargets.length > 500) {
                    let n = this.dotTargets.length - 500;
                    for (let i of this.dotTargets)
                        if (i.remove(), n -= 1, n <= 0) break
                }
                this.dotsDrawnValue += 1, this.revealingValue == !1 && this.dotsDrawnValue > 2500 && (this.revealingValue = !0, this.treeTarget.classList.remove("hidden"), this.coverboxTarget.classList.remove("hidden"), this.treeTarget.setAttribute("style", "opacity: 0"))
            }
        }
    };
    V(Yt, "targets", ["container", "coverbox", "cover", "dot", "tree"]), V(Yt, "values", {
        drawing: {
            type: Boolean,
            default: !1
        },
        dotsDrawn: {
            type: Number,
            default: 0
        },
        revealing: {
            type: Boolean,
            default: !1
        }
    });
    var $n = {};
    J($n, {
        default: () => ke
    });
    var ke = class extends R {
        connect() {
            for (let o of this.element.querySelectorAll("video")) o.setAttribute("data-video-target", "video")
        }
        playVideo(o) {
            this.hasVideoTarget && this.hasPlayButtonTarget && (this.videoTarget.play(), this.videoTarget.setAttribute("controls", !0), this.playButtonTarget.classList.add("hidden"), this.videoTarget.focus())
        }
        playExternalVideo(o) {
            this.hasContainerTarget && (o.preventDefault(), this.containerTarget.innerHTML = `<iframe class="w-full aspect-video" src="https://www.youtube-nocookie.com/embed/${o.params.ytid}?autoplay=1" credentialless allowfullscreen referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin" csp="sandbox allow-scripts allow-same-origin;" frameborder="0" allow="accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; battery 'none'; browsing-topics 'none'; camera 'none'; display-capture 'none'; domain-agent 'none'; document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport ''; gamepad 'none'; geolocation 'none'; gyroscope 'none'; hid 'none'; identity-credentials-get 'none'; idle-detection 'none'; local-fonts 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; otp-credentials 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-create 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none'; serial 'none'; speaker-selection 'none'; usb 'none'; window-management 'none'; xr-spatial-tracking 'none'"></iframe>`)
        }
    };
    V(ke, "targets", ["container", "playButton", "video"]);
    var Gs = {
            "./controllers/audio_controller.js": On,
            "./controllers/chapter3_controller.js": In,
            // "./controllers/countdown_controller.js": _n,
            // "./controllers/particles_controller.js": Nn,
            "./controllers/rarecats_controller.js": An,
            "./controllers/romb_controller.js": Yn,
            "./controllers/roots_controller.js": Jn,
            "./controllers/scroll_controller.js": Hn,
            // "./controllers/stars_controller.js": jn,
            "./controllers/thankyou_controller.js": Pn,
            "./controllers/therapy_controller.js": Kn,
            "./controllers/video_controller.js": $n
        },
        co = Gs;
    K.bind("[data-fancybox]", {
        Toolbar: {
            display: {
                left: [],
                middle: [],
                right: ["close"]
            }
        },
        Thumbs: {
            type: "classic"
        },
        Hash: !1
    });
    window.Stimulus = ne.start();
    Stimulus.register("dialog", Ki);
    Object.entries(co).forEach(([o, t]) => {
        if (o.includes("_controller.") || o.includes("-controller.")) {
            let e = o.replace("./controllers/", "").replace(/[_-]controller\..*$/, "").replace(/_/g, "-").replace(/\//g, "--");
            Stimulus.register(e, t.default)
        }
    });
})();
/*! Bundled license information:

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
*/