/* mediafool-player.js version 0.2.0 */

(function(){
    var vid = document.querySelector("#audioPlayer");
    var pp = document.querySelector("#playpause");
    var fill = document.querySelector(".fill");
    var trsp = document.querySelector(".transport");
    var timestr = document.querySelector("#timestr");

    timestr.textContent = "00:00:00";
    pp.textContent = "play >>";

    <!-- Try HLS (Safari, iOS) -->
    vid.src = "hls/master.m3u8";
    <!-- Try DASH -->
    var player = dashjs.MediaPlayer().create();
    player.initialize(vid, "dash/stream.mpd", false);

    vid.ontimeupdate = function () {
        var t = vid.currentTime;
        var progress = t / vid.duration * 100;
        fill.style.width = '' + progress + '%';
        var tstr = new Date(t * 1000).toISOString().substr(11, 8);
        timestr.textContent = tstr;
    };
    vid.onplay = function () {
        pp.textContent = "pause >>";
    };
    vid.onpause = function () {
        pp.textContent = "play >>";
    };

    pp.onclick = function () {
        if (vid.paused) {
            vid.play();
        } else {
            vid.pause();
        }
    };

    trsp.onclick = function (e) {
        var pos = e.clientX / trsp.offsetWidth;
        fill.style.width = '' + (pos * 100.0) + '%';
        vid.currentTime = pos * vid.duration;
        if (vid.paused) {
            vid.play();
        }
    };
})();
