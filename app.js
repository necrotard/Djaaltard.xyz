/* Djaaltard site: Twitch + YouTube muted autoplay players, click-through overlays, mute toggles, share-on-X rows. */
(function () {
  'use strict';
  var TWITCH = 'nekrotard';
  var qs = new URLSearchParams(location.search); if (/^[a-z0-9_]{3,25}$/.test(qs.get('testchannel') || '')) TWITCH = qs.get('testchannel'); // QA only: test autoplay with any live channel
  var YT_CHANNEL = 'UCCJoOpH4PKfXGpbhxYMNTtQ'; // youtube.com/@Djaaltard
  if (/^UC[A-Za-z0-9_-]{22}$/.test(qs.get('testyt') || '')) YT_CHANNEL = qs.get('testyt'); // QA only
  var host = location.hostname || 'localhost';

  function setMuteBtn(btn, muted) {
    btn.dataset.muted = String(muted);
    btn.setAttribute('aria-pressed', String(!muted));
    btn.textContent = muted ? '🔇 Unmute' : '🔊 Mute';
    btn.setAttribute('aria-label', (muted ? 'Unmute ' : 'Mute ') + (btn.closest('.twitch') ? 'Twitch' : 'YouTube') + ' stream');
  }
  function showOffline(box, on) { var o = box.querySelector('.offline'); if (o) o.hidden = !on; box.classList.toggle('is-offline', !!on); }
  function arm(box) { box.classList.add('armed'); }
  function disarm(box) { box.classList.remove('armed'); }
  function loadScript(src, ok, fail) {
    var s = document.createElement('script'); s.src = src; s.async = true;
    s.onload = ok; s.onerror = fail || function () {}; document.head.appendChild(s);
  }

  // ---------- Twitch (Embed JS API -> player.twitch.tv/?channel=nekrotard&parent=<host>&autoplay=true&muted=true) ----------
  // Twitch refuses to autoplay (and pauses) a player that is covered by ANY element, even a transparent link or a tiny
  // button. So while the Twitch player is live/playing nothing sits on top of it: the mute toggle lives in the card header,
  // and a click inside the player is detected (window blur + focused iframe) and opens twitch.tv/nekrotard in a new tab.
  // The transparent full-box <a> overlay is only "armed" when the channel is offline / not playing.
  var TWITCH_URL = 'https://www.twitch.tv/nekrotard';
  var tBox = document.getElementById('twitch-box');
  var tBtn = document.getElementById('twitch-mute');
  var tPlayer = null; var tPlaying = false; var tFrame = null;
  function twitchFrame() { return tFrame || (tFrame = tBox.querySelector('.player iframe')); }
  function twitchPlainIframe() {
    var f = document.createElement('iframe');
    f.src = 'https://player.twitch.tv/?channel=' + TWITCH + '&parent=' + encodeURIComponent(host) + '&autoplay=true&muted=true';
    f.title = 'nekrotard live on Twitch'; f.allow = 'autoplay; fullscreen'; f.allowFullscreen = true;
    document.getElementById('twitch-player').appendChild(f);
    tBtn.hidden = true; // no JS API without the embed script
  }
  loadScript('https://player.twitch.tv/js/embed/v1.js', function () {
    try {
      tPlayer = new window.Twitch.Player('twitch-player', {
        channel: TWITCH, parent: [host], autoplay: true, muted: true, width: '100%', height: '100%'
      });
      var P = window.Twitch.Player;
      tPlayer.addEventListener(P.ONLINE, function () { showOffline(tBox, false); disarm(tBox); });
      tPlayer.addEventListener(P.PLAYING, function () { tPlaying = true; showOffline(tBox, false); disarm(tBox); });
      tPlayer.addEventListener(P.PAUSE, function () { tPlaying = false; });
      tPlayer.addEventListener(P.OFFLINE, function () { tPlaying = false; showOffline(tBox, true); arm(tBox); });
      tPlayer.addEventListener(P.READY, function () { tBox.classList.add('ready'); });
      var f = twitchFrame(); if (f) f.title = 'nekrotard live on Twitch';
    } catch (e) { twitchPlainIframe(); }
  }, twitchPlainIframe);
  // nothing playing after 15 s (autoplay blocked, stream offline): arm the click-through overlay
  setTimeout(function () { if (!tPlaying) arm(tBox); }, 15000);
  // click anywhere inside the (unobstructed) Twitch player -> open the channel page
  window.addEventListener('blur', function () {
    setTimeout(function () {
      var f = twitchFrame();
      if (!f || document.activeElement !== f) return;
      window.open(TWITCH_URL, '_blank', 'noopener');
      if (tPlayer && tPlaying) setTimeout(function () { try { tPlayer.play(); } catch (e) {} }, 350); // undo the player's click-to-pause
      setTimeout(function () { try { f.blur(); window.focus(); } catch (e) {} }, 50);
    }, 0);
  });
  tBtn.addEventListener('click', function (e) {
    e.preventDefault(); e.stopPropagation();
    if (!tPlayer) return;
    var muted = tBtn.dataset.muted === 'true';
    try {
      if (muted) { tPlayer.setMuted(false); if (tPlayer.getVolume && tPlayer.getVolume() < 0.05) tPlayer.setVolume(0.6); tPlayer.play && tPlayer.play(); }
      else tPlayer.setMuted(true);
      setMuteBtn(tBtn, !muted);
    } catch (err) { /* player not ready yet */ }
  });

  // ---------- YouTube (live_stream embed + IFrame API, enablejsapi=1) ----------
  var yBox = document.getElementById('yt-box');
  var yBtn = yBox.querySelector('.mute');
  var yFrame = document.getElementById('yt-player');
  var yPlayer = null; var yStarted = false;
  var yOrigin = location.origin && location.origin.indexOf('http') === 0 ? '&origin=' + encodeURIComponent(location.origin) : '';
  yFrame.src = 'https://www.youtube.com/embed/live_stream?channel=' + YT_CHANNEL + '&autoplay=1&mute=1&playsinline=1&enablejsapi=1&rel=0' + yOrigin;
  window.onYouTubeIframeAPIReady = function () {
    yPlayer = new window.YT.Player('yt-player', {
      events: {
        onReady: function () { yBox.classList.add('ready'); try { yPlayer.mute(); yPlayer.playVideo(); } catch (e) {} },
        onStateChange: function (ev) { if (ev.data === 1 || ev.data === 3) { yStarted = true; showOffline(yBox, false); } },
        onError: function () { showOffline(yBox, true); }
      }
    });
  };
  loadScript('https://www.youtube.com/iframe_api', null, function () { yBtn.hidden = true; });
  // live_stream shows its own "unavailable / not live" screen when the channel is offline; add our message if nothing plays
  setTimeout(function () { if (!yStarted) showOffline(yBox, true); }, 12000);
  yBtn.addEventListener('click', function (e) {
    e.preventDefault(); e.stopPropagation();
    if (!yPlayer || !yPlayer.isMuted) return;
    try {
      if (yPlayer.isMuted()) { yPlayer.unMute(); if (yPlayer.getVolume() < 5) yPlayer.setVolume(70); yPlayer.playVideo(); setMuteBtn(yBtn, false); }
      else { yPlayer.mute(); setMuteBtn(yBtn, true); }
    } catch (err) {}
  });

  // ---------- share rows: copy + Post on X ----------
  var here = location.origin && location.origin.indexOf('http') === 0 ? location.origin + location.pathname : '';
  Array.prototype.forEach.call(document.querySelectorAll('.share-row'), function (row) {
    var url = row.dataset.url; var input = row.querySelector('input');
    if (!url || url.indexOf('__') === 0) { url = here || 'https://www.twitch.tv/nekrotard'; input.value = url; }
    var post = row.querySelector('.post');
    post.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(row.dataset.text || '') + '&url=' + encodeURIComponent(url);
    var btn = row.querySelector('.copy');
    btn.addEventListener('click', function () {
      function done(ok) { btn.textContent = ok ? 'Copied ✓' : 'Press Ctrl+C'; btn.classList.toggle('ok', ok); setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('ok'); }, 1600); }
      function legacy() { input.focus(); input.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} done(ok); }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(function () { done(true); }, legacy);
      else legacy();
    });
    input.addEventListener('focus', function () { input.select(); });
  });
})();
