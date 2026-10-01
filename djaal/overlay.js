/* Djaal roaming mascot – trimmed web copy of the nekrotard OBS overlay (Joll Chat Mascot 2.0 art).
 * Standalone: no bot, no bot-config.js, no token, no mic. Reads #nekrotard chat anonymously (read-only)
 * so chat messages / !commands / subs make Djaal react. Tap Djaal for a random pose.
 */
'use strict';
const CONFIG = {
  name: 'Djaal', mascot: 'joll', channel: 'nekrotard', scale: 0.4, bubbleScale: 0.62,
  bubbles: true, bubbleMs: 5000, bubbleGapMs: 600, bubbleMaxChars: 80, bubbleQueueMax: 6, bubbleMinIntervalPerUserMs: 8000,
  ignoreUsers: ['nightbot', 'streamelements', 'streamlabs', 'moobot', 'fossabot', 'wizebot', 'soundalerts', 'sery_bot'],
  activity: { messages: 3, windowMs: 20000, quietMs: 25000 },
  userCooldownMs: 15000, modsBypassCooldown: true,
  greet: { enabled: true, batchMs: 1500, maxNames: 3, skipBroadcaster: true,
           lines: ['yo {names}!', 'yo {names}! welcome in 😈', 'ayy {names}! pull up a horn', 'sup {names}! shades on, stream on'] },
  commands: {
    '!djaal':    { cooldownMs: 5000, chat: true, aliases: ['!pepe'] },
    '!commands': { cooldownMs: 20000, chat: true, aliases: ['!help', '!cmds'] },
    '!build':    { cooldownMs: 15000, chat: true },
    '!pit':      { cooldownMs: 10000, chat: true },
    '!hype':     { cooldownMs: 12000, chat: true },
    '!hug':      { cooldownMs: 4000, chat: true },
    '!lurk':     { cooldownMs: 3000, chat: true },
    '!roll':     { cooldownMs: 4000, chat: true },
    '!8ball':    { cooldownMs: 4000, chat: true },
    '!so':       { cooldownMs: 5000, chat: true, modOnly: true },
    '!dance':    { cooldownMs: 8000, chat: false },
    '!wave':     { cooldownMs: 6000, chat: false },
    '!jump':     { cooldownMs: 6000, chat: false },
    '!walk':     { cooldownMs: 8000, chat: false },
    '!float':    { cooldownMs: 8000, chat: false },
    '!gg':       { cooldownMs: 6000, chat: false },
    '!lol':      { cooldownMs: 6000, chat: false },
    '!brb':      { cooldownMs: 6000, chat: false },
    '!w':        { cooldownMs: 6000, chat: false },
  },
  build: 'Blazing Scream Warlock',  // used by !build / !pit
  pitTier: 120, pitTime: 'about 4 min',
  actionQueueMax: 4,               // queued command animations beyond this are dropped (the broadcaster gets 2 extra slots)
  events: { subs: true, raids: true, bits: true, minBits: 1 },   // hype jump + "thanks" bubble
  effects: true,
  joll: {
    dir: 'joll/', fullH: 440, floor: 14, cutSink: 18, overshoot: 1.14, holdMs: 1600, reactChat: true,
    // Idle roaming inside the browser source's own viewport (400x700 = small wander, 1920x1080 = whole screen).
    // mode 'floor' = walks along the bottom, 'free' = wanders anywhere (keeps room above his head for the bubble).
    // speeds are px/s at scale 1; pauses in ms (he stands in the Grinch-hands idle); margin = px kept from every edge.
    roam: { enabled: true, mode: 'floor', speedWalk: 95, speedRun: 300, runChance: 0.25, pauseMin: 2500, pauseMax: 6000,
            afterReactMin: 900, afterReactMax: 1800, margin: 8, bubbleRoom: 170, minTravel: 40 },
    funny: /(\blo+l+\b|\blmf?ao+\b|\brofl\b|\bha(ha)+h?\b|\bhe(he)+\b|\bkekw?\b|omegalul|\bxd+\b|sending me|i'?m dead|💀|😂|🤣)/i,
    poses: {
      front:        { file: 'pose_01_front.png', w: 527, h0: 793, h: 1.0 },
      threeQuarter: { file: 'pose_02_three_quarter.png', w: 353, h0: 774, h: 1.0 },
      laugh:        { file: 'pose_05_laugh_big.png', w: 585, h0: 771, h: 1.0 },
      pointing:     { file: 'pose_06_pointing.png', w: 543, h0: 739, h: 0.96 },   // really hands under the chin
      smug:         { file: 'pose_08_smug_closeup.png', w: 439, h0: 442, h: 0.72, cut: true },
      laughLines:   { file: 'pose_09_laugh_speedlines.png', w: 418, h0: 436, h: 0.72, cut: true },
      cash:         { file: 'pose_11_holding_cash.png', w: 416, h0: 430, h: 0.74, cut: true },
      grin:         { file: 'pose_13_grin_closeup.png', w: 454, h0: 491, h: 0.76, cut: true },
      walking:      { file: 'pose_14_walking.png', w: 282, h0: 465, h: 0.98 },
      running:      { file: 'pose_10_running.png', w: 368, h0: 378, h: 0.6 },
      hero:         { file: 'extra_04_low_hero_angle.png', w: 448, h0: 842, h: 1.04 },
      heroLaugh:    { file: 'extra_05_low_hero_laugh.png', w: 535, h0: 834, h: 1.04 },
      gg:           { file: 'extra_08_gg_victory.png', w: 1025, h0: 896, h: 0.95 },
      wave:         { file: 'extra_09_hi_chat_wave.png', w: 992, h0: 870, h: 0.95 },
      hype:         { file: 'extra_10_hype_yell.png', w: 887, h0: 883, h: 0.95 },
      zzz:          { file: 'extra_11_chillin_zzz.png', w: 1034, h0: 785, h: 0.8 },
      thinking:     { file: 'extra_12_thinking.png', w: 995, h0: 894, h: 0.9 },
      rain:         { file: 'extra_13_make_it_rain.png', w: 892, h0: 857, h: 0.9, cut: true },
      dance:        { file: 'extra_14_dance_notes.png', w: 870, h0: 870, h: 0.9, cut: true },
      zoomies:      { file: 'extra_15_zoomies.png', w: 881, h0: 572, h: 0.66 },
      brb:          { file: 'extra_16_brb_back.png', w: 732, h0: 969, h: 1.02 },
      sparkle:      { file: 'extra_17_grin_sparkle.png', w: 746, h0: 709, h: 0.8, cut: true },
      lol:          { file: 'extra_18_lol.png', w: 895, h0: 839, h: 0.9, cut: true },
      w:            { file: 'extra_19_w_in_chat.png', w: 772, h0: 841, h: 1.0 },
    },
    clipPose: { wave: 'wave', jump: 'heroLaugh', dance: 'dance', walk: 'walking' },   // fallback when a step has no pose
  },
  live: true, debug: false,
};

// Lines Djaal says. {name} = chatter, {target} = argument, {n} = number, {build}/{tier}/{time} from CONFIG.
const LINES = {
  djaal: ['yo {name}! Djaal in the building 😈', 'horns up, {name}! 🤘', '{name}, the shades stay ON. always.', 'who summoned Djaal? oh, it\'s {name}',
          'pink, glossy and dangerous. hi {name}', 'I\'m not a frog, {name}. I\'m a lifestyle.', '{name}, stay hydrated. demon\'s orders 💧',
          'tail wiggle for {name} 〰️', 'you rang, {name}? 😏', '{name} said my name 3 times. big mistake. hi!'],
  build: ['{build} 🔥 Pit {tier} in {time}. scream, burn, repeat.', 'running {build}: Pit {tier} in {time}. the screaming is the build 🔥'],
  pit: ['Pit {tier} in {time}. Tormented and unbothered 😈', 'Pit {tier}? {time}. I\'ve had longer loading screens 🔥',
        'Pit {tier} in {time}. the demons filed a complaint 💀', '{time} Pit {tier} clears. {build} goes brrr 🔥'],
  hype: ['HYPE HYPE HYPE 🔥🔥🔥', 'LET\'S GOOOO {name}! 🎉', 'chat is ON FIRE 🔥', 'pure demon energy ⚡ thanks {name}!'],
  lurk: ['enjoy the lurk, {name}! 👋', 'see ya in the shadows, {name} 👋', '{name} fades into the dark... I respect it 👋'],
  hug: ['*hugs {name}* 💖', '*big squishy demon hug for {name}* 💖', 'come here {name} *hug* (the horns are soft, promise) 💖'],
  hugOther: ['{name} sends a hug to {target} *hug* 💖', '*squeezes {target}* that one\'s from {name} 💖'],
  roll: ['{name} rolled {n}! 🎲', '{name} rolls the d100... {n}! 🎲'],
  roll100: ['{name} rolled a NAT 100!!! 🎲🔥'], roll1: ['{name} rolled... a 1. oof. 🎲💀'], rollHigh: ['{name} rolled {n}! big roll 🎲🔥'],
  eightball: ['it is certain 😈', 'without a doubt', 'yes. the horns have spoken', 'you may rely on it', 'signs point to yes 🔥', 'most likely',
              'ask again after the Pit 🕳️', 'better not tell you now 😏', 'cannot predict now, my shades are foggy', 'concentrate and ask again',
              'don\'t count on it', 'my reply is no', 'my sources say no 💀', 'very doubtful', 'absolutely not. next question', 'ask chat. chat knows'],
  eightballEmpty: ['ask me something, {name}: !8ball <question> 🎱'],
  so: ['SHOUTOUT → {target}! go show some love 💖', 'everybody go follow {target}! 🔥'],
  soChat: ['Go show some love to {target} 💖 https://twitch.tv/{login}'],
  soUsage: ['usage: !so <username>'],
  dance: ['watch the tail 〰️', 'dance break! 💃', 'these hips don\'t lie 😈'], wave: ['hiii 👋', 'o/'], jump: ['hup! ⚡', 'boing!'],
  walk: ['going for a stroll 🚶'], float: ['just floating... 😌'],
  commands: ['{list}'],
  gg: ['GG! 🏆', 'GG WP chat 😈', 'GGs only 🏆'], lol: ['LMAOOO 😂', 'I\'m crying behind the shades 😂', 'LOL 💀'],
  brb: ['brb, demon business 👋', 'be right back. don\'t touch my Pit 😈'], w: ['W 🏆', 'massive W, {name} 🏆', 'W in the chat 🔥'],
};

(function applyParams() {
  const q = new URLSearchParams(location.search);
  const bool = (v) => !/^(0|false|no|off)$/i.test(v);
  if (q.has('debug')) CONFIG.debug = bool(q.get('debug'));
  if (q.has('live')) CONFIG.live = bool(q.get('live'));
  if (window.JOLL_ROAM !== undefined) { const v = String(window.JOLL_ROAM); if (/^(floor|free)$/.test(v)) { CONFIG.joll.roam.mode = v; CONFIG.joll.roam.enabled = true; } else CONFIG.joll.roam.enabled = bool(v); }
  if (window.JOLL_SCALE) CONFIG.scale = window.JOLL_SCALE;
  if (window.JOLL_BSCALE) CONFIG.bubbleScale = window.JOLL_BSCALE;
})();
const log = (...a) => { if (CONFIG.debug) console.log('[djaal]', ...a); };
document.documentElement.style.setProperty('--scale', CONFIG.bubbleScale || CONFIG.scale);
if (CONFIG.debug) document.body.classList.add('debug');
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const fill = (s, v = {}) => s.replace(/\{(\w+)\}/g, (m, k) => (v[k] != null ? v[k] : { build: CONFIG.build, tier: CONFIG.pitTier, time: CONFIG.pitTime, bot: CONFIG.name }[k] ?? m));
const line = (key, v) => fill(pick(LINES[key]), v);

// ---------- Joll Chat Mascot 2.0: neutral idle + one-shot snap-pop reactions on the kit stills (CSS + Web Animations) ----------
function JollMascot() {
  const J = CONFIG.joll; const P = J.poses; const R = J.roam || { enabled: false };
  const box = document.getElementById('mascot'); box.classList.add('joll');
  const mk = (id, parent, tag = 'div') => { const e = document.createElement(tag); if (id) e.id = id; parent.appendChild(e); return e; };
  const fxw = mk('fxw', box);                        // same CSS "acting" wrapper as classic (hug squeeze, lurk sink, shake, pop, sad)
  const rig = mk('jrig', fxw); rig.className = 'idle';
  const shadow = mk('jshadow', rig); const sway = mk('jsway', rig); const pop = mk('jpop', sway); const bob = mk('jbob', pop);
  const face = mk('jface', bob);                     // mirrored (scaleX(-1)) only while walking/running left
  const speed = mk('jspeed', face); for (let i = 0; i < 4; i++) mk('', speed, 'i');   // run speed lines (behind him)
  const NS = 'http://www.w3.org/2000/svg';
  const ink = document.createElementNS(NS, 'svg'); ink.id = 'jink'; ink.setAttribute('viewBox', '-100 -100 200 200'); rig.appendChild(ink);
  const inkG = document.createElementNS(NS, 'g'); ink.appendChild(inkG);
  const imgs = {};
  for (const [k, p] of Object.entries(P)) {
    const im = new Image(); im.src = J.dir + p.file; im.alt = ''; im.className = 'jimg' + (p.cut ? ' cut' : ''); im.decoding = 'sync';
    face.appendChild(im); imgs[k] = im; if (im.decode) im.decode().catch(() => {});
  }
  const extra = { bounce: 0, squash: 0 };            // Voice writes here; unused by the Joll art
  let W = 0; let H = 0; const geo = {}; let cur = ''; let busyT = false;
  let x = 0; let y = 0; let dir = 1;                 // x = sprite centre, y = lift above the floor (free mode)
  const OV = 1.12;                                   // pop overshoot allowance used for clamping
  const M = () => (R.margin || 0);
  function layout() {
    W = window.innerWidth; H = window.innerHeight; const S = CONFIG.scale;
    const fullH = Math.min(J.fullH * S, H * 0.7); const maxW = W - 14;   // wide poses fill the width; capX() limits their pop overshoot so nothing clips
    for (const [k, p] of Object.entries(P)) {
      let h = fullH * (p.h || 1); let w = h * p.w / p.h0; if (w > maxW) { w = maxW; h = w * p.h0 / p.w; }
      const bottom = p.cut ? -J.cutSink * S : J.floor * S; geo[k] = { w, h, bottom };
      Object.assign(imgs[k].style, { width: `${w}px`, height: `${h}px`, left: `${-w / 2}px`, bottom: `${bottom}px` });
    }
    if (!x) x = W / 2;
    if (cur) { clampTo(cur); place(); }
  }
  // keep pose k fully on screen at (x, y), including the pop overshoot; poses wider than the screen are centred
  function clampTo(k) {
    const g = geo[k]; const half = (g.w / 2) * OV + M();
    x = W - 2 * half <= 0 ? W / 2 : Math.min(W - half, Math.max(half, x));
    if (P[k].cut) y = 0;                             // close-ups are cut at the bottom: they always sit on the floor
    const topRoom = R.mode === 'free' ? (R.bubbleRoom || 0) * CONFIG.scale : 0;
    const maxY = Math.max(0, H - g.bottom - g.h * 1.14 - M() - topRoom);
    y = Math.min(maxY, Math.max(0, y));
  }
  function place() {
    const g = geo[cur];
    sway.style.left = `${x}px`; sway.style.bottom = `${y}px`;
    shadow.style.left = `${x}px`; shadow.style.bottom = `${6 + y}px`;
    shadow.style.width = `${Math.min(g.w * 0.62, 220 * CONFIG.scale)}px`; shadow.style.opacity = P[cur].cut ? 0 : '';
    fxw.style.transformOrigin = `${x}px 100%`;
    const moving = cur === 'walking' || cur === 'running';
    face.style.transform = moving && dir < 0 ? 'scaleX(-1)' : '';
  }
  function setPose(k) {
    if (imgs[cur]) imgs[cur].classList.remove('on'); imgs[k].classList.add('on'); cur = k; place();
  }
  layout(); window.addEventListener('resize', layout); setPose('front');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let popAnim = null;
  function run(kf, ms, easing) {       // one transform animation on the pop layer at a time; guard so a paused/hidden source can't stall the queue
    const prev = popAnim; popAnim = pop.animate(kf, { duration: ms, easing, fill: 'forwards' }); if (prev) prev.cancel();
    return Promise.race([popAnim.finished.catch(() => {}), sleep(ms + 250)]);
  }
  // how far the CSS cycles push the sprite sideways: [scaleX of the bob/cycle, tilt as a fraction of height]
  const CYC = { front: [1.0, 0.025], walking: [1.03, 0.045], running: [1.05, 0.07] }; const cyc = (k) => CYC[k] || [1.01, 0.0];
  const capX = (k, want) => { const g = geo[k]; const [cs, tl] = cyc(k); const room = Math.min(x, W - x) - 2 - g.h * tl;
    return Math.max(1, Math.min(want, room / (g.w / 2 * cs))); };
  function squashOut() { return run([{ transform: 'scale(1,1)' }, { transform: `scale(${capX(cur, 1.22).toFixed(3)},0.58)` }], 110, 'cubic-bezier(.5,0,1,.6)'); }
  function popIn(small) {
    const o = capX(cur, 1.08); if (!small) inkBurst();
    const k = small ? 0.5 : 1;                        // locomotion switches use a smaller pop than reactions
    return run([{ transform: `scale(${1 - 0.4 * k},${1 - 0.5 * k})` }, { transform: `scale(${1 - 0.1 * k},${1 + 0.14 * k})`, offset: 0.42 }, { transform: `scale(${(1 + (o - 1) * k).toFixed(3)},${1 - 0.06 * k})`, offset: 0.7 },
      { transform: 'scale(0.99,1.02)', offset: 0.87 }, { transform: 'scale(1,1)' }], small ? 220 : 330, 'ease-out');
  }
  function inkBurst() {                              // black impact lines around his upper body, like the kit's pop frames
    const g = geo[cur]; const r = Math.min(190 * CONFIG.scale, Math.max(g.w, g.h) * 0.5);
    const cy = H - y - g.bottom - g.h * 0.6; const size = r * 2.6;
    Object.assign(ink.style, { width: `${size}px`, height: `${size}px`, left: `${x - size / 2}px`, top: `${cy - size / 2}px` });
    let d = ''; const n = 10; const off = Math.random() * 6.28;
    for (let i = 0; i < n; i++) {
      const a = off + (i / n) * 6.283 + (Math.random() - 0.5) * 0.35; const r0 = 72 + Math.random() * 6; const r1 = r0 + 16 + Math.random() * 8;
      const c = Math.cos(a); const s = Math.sin(a); const wd = 2.6;
      d += `M${(c * r0).toFixed(1)} ${(s * r0).toFixed(1)}L${(c * r1 - s * wd).toFixed(1)} ${(s * r1 + c * wd).toFixed(1)}L${(c * r1 + s * wd).toFixed(1)} ${(s * r1 - c * wd).toFixed(1)}Z`;
    }
    inkG.innerHTML = `<path d="${d}" fill="#f3dfb8"/>`;
    ink.animate([{ opacity: 1, transform: 'scale(0.8)' }, { opacity: 1, transform: 'scale(1.05)', offset: 0.5 }, { opacity: 0, transform: 'scale(1.3)' }], { duration: 300, easing: 'ease-out', fill: 'forwards' });
  }
  const MOVE = { walking: 'walk', running: 'run' };
  let chain = Promise.resolve();
  function snapTo(k) {                               // serialised, so roaming and the reaction queue never interleave pose swaps
    chain = chain.then(() => doSnap(k)).catch(() => {}); return chain;
  }
  async function doSnap(k) {
    if (!imgs[k]) k = 'front';
    if (k === cur) { rig.className = MOVE[k] || (k === 'front' ? 'idle' : 'react'); return; }
    busyT = true; const small = !!(MOVE[k] || (MOVE[cur] && k === 'front' && roamActive()));
    await squashOut(); clampTo(k); setPose(k);
    rig.className = MOVE[k] || (k === 'front' ? 'idle' : 'react');
    await popIn(small); busyT = false;
  }
  /** Pop into a pose and hold it (with a faster bob). The queue calls toIdle() when the action is done. */
  async function react(k, hold = J.holdMs) { log('joll pose', k, `${hold}ms`); await snapTo(k); await sleep(hold); }
  function toIdle() { return snapTo('front'); }
  const poseFor = (clip) => J.clipPose[clip] || '';
  function show() { return roamActive() ? Promise.resolve() : toIdle(); }   // base clips (idle / walk) are the idle; roaming handles itself
  function playOnce(name) { const k = poseFor(name); return k ? react(k) : toIdle(); }
  function playFor(name, ms) { const k = poseFor(name); return k ? react(k, Math.max(900, Math.min(2600, ms - 700))) : toIdle().then(() => sleep(ms)); }
  let actTimer = 0;
  function act(cls, ms) { fxw.className = ''; void fxw.offsetWidth; fxw.className = cls; clearTimeout(actTimer); actTimer = setTimeout(() => { fxw.className = ''; }, ms); }
  function headY() { const g = geo[cur]; return H - y - g.bottom - g.h; }   // static layout top (no jitter from the pop)
  function anchor(where = 'head') {
    const g = geo[cur]; const bottom = H - y - Math.max(0, g.bottom);
    if (where === 'feet') return { x, y: bottom - 8, w: g.w * 0.6 };
    if (where === 'chest') return { x, y: H - y - g.bottom - g.h * 0.45, w: g.w * 0.6 };
    return { x, y: headY() + g.h * 0.2, w: g.w * 0.6 };
  }

  // ---------- idle roaming: pause (Grinch-hands idle) -> walk / run to a random spot -> pause ... ; stops for every reaction ----------
  const rnd = (a, b) => a + Math.random() * (b - a);
  const qBusy = () => (typeof State !== 'undefined' && (State.busy || State.queue.length > 0));
  function roamActive() { return !!(R.enabled && CONFIG.mascot !== 'classic'); }
  const roam = { state: 'pause', until: performance.now() + rnd(1200, 2500), tx: 0, ty: 0, wasBusy: false, switching: false };
  function roamBounds() {                            // the widest of the idle / walk / run sprites, mirrored or not, plus pop overshoot
    const ext = (k, pop) => { const g = geo[k]; const [cs, tl] = cyc(k); return g.w / 2 * cs * pop + g.h * tl; };
    const half = Math.max(ext('front', 1.04), ext('walking', 1.04), ext('running', 1.04)) + M();   // incl. walk/run tilt; capX() keeps any squash on screen
    const hMax = Math.max(geo.front.h, geo.walking.h, geo.running.h) * 1.14;
    const topRoom = R.mode === 'free' ? (R.bubbleRoom || 0) * CONFIG.scale : 0;
    return { x0: half, x1: Math.max(half, W - half), y1: R.mode === 'free' ? Math.max(0, H - hMax - J.floor * CONFIG.scale - M() - topRoom) : 0 };
  }
  async function go(k, next) { roam.switching = true; await snapTo(k); roam.switching = false; if (next) next(); }
  let last = performance.now();
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    requestAnimationFrame(tick);
    if (!roamActive()) return;
    const busy = qBusy();
    if (busy) { roam.wasBusy = true; roam.state = 'pause'; return; }          // a reaction owns him: freeze where he is
    if (roam.wasBusy) { roam.wasBusy = false; roam.until = now + rnd(R.afterReactMin, R.afterReactMax); }
    if (roam.switching || busyT) return;
    const S = CONFIG.scale;
    if (roam.state === 'pause') {
      if (cur !== 'front') { go('front'); return; }
      if (now < roam.until) return;
      const b = roamBounds(); const span = b.x1 - b.x0;
      if (span < (R.minTravel || 0) && b.y1 < (R.minTravel || 0)) { roam.until = now + rnd(R.pauseMin, R.pauseMax); return; }
      let tx = x; let tries = 0;
      do { tx = rnd(b.x0, b.x1); tries++; } while (Math.abs(tx - x) < Math.min(span * 0.35, 300 * S) && tries < 12);
      roam.tx = tx; roam.ty = R.mode === 'free' ? rnd(0, b.y1) : 0;
      roam.run = Math.random() < (R.runChance || 0);
      dir = roam.tx >= x ? 1 : -1;
      roam.state = 'move'; go(roam.run ? 'running' : 'walking');
      return;
    }
    if (roam.state === 'move') {
      if (!MOVE[cur]) { go(roam.run ? 'running' : 'walking'); return; }
      const b = roamBounds(); roam.tx = Math.min(b.x1, Math.max(b.x0, roam.tx)); roam.ty = Math.min(b.y1, Math.max(0, roam.ty));
      const v = (roam.run ? R.speedRun : R.speedWalk) * S * dt;
      const dx = roam.tx - x; const dy = roam.ty - y; const d = Math.hypot(dx, dy);
      if (d <= v) { x = roam.tx; y = roam.ty; place(); roam.state = 'pause'; roam.until = performance.now() + rnd(R.pauseMin, R.pauseMax); go('front'); return; }
      x += dx / d * v; y += dy / d * v; const nd = dx >= 0 ? 1 : -1; if (nd !== dir) dir = nd;
      x = Math.min(b.x1, Math.max(b.x0, x)); place();
    }
  }
  requestAnimationFrame(tick);

  face.addEventListener('pointerdown', (e) => { e.preventDefault(); if (typeof onTap === 'function') onTap(); });
  return { show, playOnce, playFor, react, toIdle, poseFor, act, headY, anchor, setFace() {}, setTalkRate() {}, extra, vids: {}, layered: false, joll: true,
           face: 'closed', get current() { return cur; }, get pose() { return cur; }, get acting() { return fxw.className; }, get transitioning() { return busyT; },
           get x() { return x; }, get y() { return y; }, get dir() { return dir; }, get roam() { return roam.state; },
           rect() { const im = imgs[cur]; return im.getBoundingClientRect(); } };
}

const Mascot = JollMascot();
// (no mic / lip-sync on the web copy) – stub keeps the shared queue + bubble code unchanged
const Voice = { speak() {}, set hypeGlint(v) {} };

// ---------- particle effects (canvas): confetti, fire, hearts, stars, sparkles ----------
const FX = (() => {
  const cv = document.getElementById('fx') || (() => { const c = document.createElement('canvas'); c.id = 'fx'; document.getElementById('stage').appendChild(c); return c; })();
  const g = cv.getContext('2d'); let W = 0; let H = 0; let dpr = 1; const P = []; let running = false; let total = 0;
  function size() { dpr = Math.min(2, window.devicePixelRatio || 1); W = window.innerWidth; H = window.innerHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = `${W}px`; cv.style.height = `${H}px`; }
  size(); window.addEventListener('resize', size);
  const rnd = (a, b) => a + Math.random() * (b - a);
  const COLORS = ['#ff3fa4', '#ffd23f', '#3fe0ff', '#ffffff', '#b44bff', '#7dff6a'];
  const s = () => CONFIG.scale;
  function burst(type, where = 'head', n) {
    if (!CONFIG.effects) return; const a = Mascot.anchor(where); const sc = s();
    if (type === 'confetti') for (let i = 0; i < (n || 110); i++) P.push({ t: 'c', x: a.x + rnd(-20, 20) * sc, y: a.y, vx: rnd(-7, 7) * sc, vy: rnd(-15, -5) * sc, g: 0.32 * sc, life: rnd(90, 150), age: 0, w: rnd(6, 11) * sc, h: rnd(3, 6) * sc, rot: rnd(0, 6.28), vr: rnd(-0.3, 0.3), c: pick(COLORS) });
    if (type === 'fire') for (let i = 0; i < (n || 90); i++) P.push({ t: 'f', x: a.x + rnd(-0.55, 0.55) * a.w, y: a.y + rnd(-10, 10) * sc, vx: rnd(-0.6, 0.6) * sc, vy: rnd(-5.5, -2.2) * sc, g: -0.03 * sc, life: rnd(35, 70), age: -rnd(0, 40), r: rnd(12, 26) * sc });
    if (type === 'hearts') for (let i = 0; i < (n || 14); i++) P.push({ t: 'h', x: a.x + rnd(-60, 60) * sc, y: a.y + rnd(-10, 30) * sc, vx: rnd(-0.6, 0.6) * sc, vy: rnd(-2.6, -1.4) * sc, g: 0, life: rnd(80, 120), age: -rnd(0, 30), r: rnd(12, 22) * sc, ph: rnd(0, 6.28), c: pick(['#ff3fa4', '#ff6fbf', '#ff2a6d']) });
    if (type === 'stars') for (let i = 0; i < (n || 26); i++) { const an = rnd(0, 6.28); const sp = rnd(3, 8) * sc; P.push({ t: 's', x: a.x, y: a.y, vx: Math.cos(an) * sp, vy: Math.sin(an) * sp - 2 * sc, g: 0.12 * sc, life: rnd(50, 80), age: 0, r: rnd(7, 13) * sc, rot: rnd(0, 6.28), vr: rnd(-0.2, 0.2), c: pick(['#ffd23f', '#ffffff', '#3fe0ff']) }); }
    if (type === 'sparkle') for (let i = 0; i < (n || 16); i++) P.push({ t: 's', x: a.x + rnd(-70, 70) * sc, y: a.y + rnd(-40, 40) * sc, vx: 0, vy: rnd(-1, -0.3) * sc, g: 0, life: rnd(30, 55), age: -rnd(0, 20), r: rnd(5, 9) * sc, rot: 0, vr: 0.1, c: pick(['#ffffff', '#ffd23f']) });
    total += 1; if (!running) { running = true; requestAnimationFrame(step); }
  }
  function heart(x, y, r) { g.beginPath(); g.moveTo(x, y + r * 0.35); g.bezierCurveTo(x - r * 1.2, y - r * 0.5, x - r * 0.5, y - r * 1.25, x, y - r * 0.45); g.bezierCurveTo(x + r * 0.5, y - r * 1.25, x + r * 1.2, y - r * 0.5, x, y + r * 0.35); g.fill(); }
  function star(x, y, r, rot) { g.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r; const an = rot + i * Math.PI / 5; g.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } g.closePath(); g.fill(); }
  function step() {
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i]; p.age += 1; if (p.age < 0) continue;
      if (p.age > p.life) { P.splice(i, 1); continue; }
      p.vy += p.g; p.x += p.vx; p.y += p.vy; if (p.t === 'c') { p.vx *= 0.985; p.vy = Math.min(p.vy, 6); }
      const f = p.age / p.life; const alpha = f > 0.7 ? (1 - f) / 0.3 : 1;
      if (p.t === 'c') { g.save(); g.globalAlpha = alpha; g.translate(p.x, p.y); p.rot += p.vr; g.rotate(p.rot); g.scale(1, Math.cos(p.age * 0.2)); g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore(); }
      else if (p.t === 'f') { g.save(); g.globalCompositeOperation = 'lighter'; const r = p.r * (1 - f * 0.7); const gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        gr.addColorStop(0, `rgba(255,245,180,${0.9 * alpha})`); gr.addColorStop(0.35, `rgba(255,150,30,${0.7 * alpha})`); gr.addColorStop(0.7, `rgba(230,40,20,${0.35 * alpha})`); gr.addColorStop(1, 'rgba(120,0,0,0)');
        g.fillStyle = gr; g.beginPath(); g.arc(p.x, p.y, r, 0, 6.283); g.fill(); g.restore(); }
      else if (p.t === 'h') { g.globalAlpha = alpha; g.fillStyle = p.c; heart(p.x + Math.sin(p.age * 0.08 + p.ph) * 8 * s(), p.y, p.r); g.globalAlpha = 1; }
      else if (p.t === 's') { g.globalAlpha = alpha; g.fillStyle = p.c; p.rot += p.vr; star(p.x, p.y, p.r * (p.vx === 0 ? Math.sin(Math.PI * f) : 1), p.rot); g.globalAlpha = 1; }
    }
    if (P.length) requestAnimationFrame(step); else { running = false; g.clearRect(0, 0, W, H); }
  }
  return { burst, get count() { return P.length; }, get bursts() { return total; } };
})();
// ---------- base state (idle float <-> walk from chat activity) + action queue ----------
// action = { steps: [{ clip, plays | ms, act, actMs, fx, fxAt, glint }], onStart() }  (legacy { clip, plays, ms } still works)
const State = (() => {
  const times = []; let lastMsg = 0; let base = 'idle'; let busy = false; const queue = [];
  function chatTick() {
    const now = Date.now(); lastMsg = now; times.push(now);
    while (times.length && now - times[0] > CONFIG.activity.windowMs) times.shift();
    if (times.length >= CONFIG.activity.messages) setBase('walk');
  }
  function setBase(b) { if (b === base) return; base = b; log('base ->', b); if (!busy) Mascot.show(base, true); }
  setInterval(() => { if (base === 'walk' && Date.now() - lastMsg > CONFIG.activity.quietMs) setBase('idle'); }, 1000);
  function enqueue(action, front = false, force = false) {
    if (!action.steps) action = { steps: [action] };
    if (queue.length >= (force ? CONFIG.actionQueueMax + 2 : CONFIG.actionQueueMax) && !front) { log('queue full, dropped'); return false; }
    front ? queue.unshift(action) : queue.push(action); pump(); return true;
  }
  async function pump() {
    if (busy) return; busy = true;
    while (queue.length) {
      const a = queue.shift();
      try { if (a.onStart) a.onStart(); } catch (e) { log('onStart error', e); }
      for (const st of a.steps) {
        if (st.only === 'joll' && !Mascot.joll) continue;
        const clip = st.clip === 'base' ? base : (st.clip || base);
        log('play', clip, st.plays ? `x${st.plays}` : `${st.ms}ms`, st.act || '', st.fx || '');
        if (st.glint) Voice.hypeGlint = true;
        if (st.act) Mascot.act(st.act, st.actMs || st.ms || 1800);
        if (st.fx) [].concat(st.fx).forEach((f) => { const [type, where] = f.split('@'); setTimeout(() => FX.burst(type, where || 'head'), st.fxAt || 0); });
        if (Mascot.joll) {                                 // Joll: pop into the step's pose and hold it; pose-less idle steps wait on the idle pose
          const pose = st.pose || Mascot.poseFor(clip);
          if (pose) await Mascot.react(pose, st.hold || Math.max(900, Math.min(2600, (st.ms || 2300) - 700)));
          else { await Mascot.toIdle(); await new Promise((r) => setTimeout(r, st.ms || 1200)); }
        } else if (st.plays) await Mascot.playOnce(clip, st.plays); else await Mascot.playFor(clip, st.ms || 5000);
        Voice.hypeGlint = false;
      }
      if (Mascot.joll) await Mascot.toIdle();            // always pop back to the neutral idle between reactions
    }
    busy = false; Mascot.show(base, true);
  }
  function quiet() { times.length = 0; lastMsg = 0; setBase('idle'); }
  return { chatTick, enqueue, quiet, get base() { return base; }, get busy() { return busy; }, get idle() { return !busy && !queue.length; }, queue };
})();
// ---------- speech bubble (priority queue: 2 = events, 1 = Djaal's replies/greetings, 0 = chat) ----------
const Bubble = (() => {
  const wrap = document.getElementById('bubble-wrap'); const el = document.getElementById('bubble');
  const who = el.querySelector('.who'); const msg = el.querySelector('.msg');
  const q = []; let showing = null; const lastByUser = {}; const bs = () => CONFIG.bubbleScale || CONFIG.scale;
  function place() {   // sit just above the horns, but never run off the top of the source
    const need = el.offsetHeight + 30 * bs();
    wrap.style.setProperty('--head-y', `${Math.max(need, Mascot.headY() - 4)}px`);
    if (Mascot.joll) {   // follow him sideways, clamped so the whole bubble stays on screen; the tail still points at him
      const vw = window.innerWidth; const bw = el.offsetWidth; const hx = Mascot.x;
      const mg = 8 + bw * 0.06;                        // room for the bubble's pop-in overshoot
      const cx = bw + 2 * mg >= vw ? vw / 2 : Math.min(vw - bw / 2 - mg, Math.max(bw / 2 + mg, hx));
      wrap.style.transform = `translateX(${(cx - vw / 2).toFixed(1)}px)`;
      const lim = Math.max(0, bw / 2 - 26 * bs());
      el.style.setProperty('--tail', `${Math.max(-lim, Math.min(lim, hx - cx)).toFixed(1)}px`);
    }
  }
  window.addEventListener('resize', place);
  function push(user, text, opts = {}) {
    if (!opts.force && !CONFIG.bubbles) return;
    const key = (user || '').toLowerCase(); const prio = opts.prio != null ? opts.prio : (opts.priority ? 2 : 0);
    if (prio === 0 && key) {
      const now = Date.now(); if (now - (lastByUser[key] || 0) < CONFIG.bubbleMinIntervalPerUserMs) return;
      lastByUser[key] = now;
    }
    const item = { user, text, kind: opts.kind || '', prio, tumble: opts.tumble, speak: !!opts.speak, react: !!opts.react,
                   ms: opts.ms || (prio ? Math.min(9000, Math.max(3800, 2000 + 55 * Array.from(text).length)) : CONFIG.bubbleMs) };
    let i = q.length; while (i > 0 && q[i - 1].prio < prio) i--; q.splice(i, 0, item);
    while (q.length > CONFIG.bubbleQueueMax) { const j = q.findIndex((x) => x.prio === 0); q.splice(j >= 0 ? j : q.length - 1, 1); }
    if (prio >= 1 && showing && showing.prio <= prio) {      // keep Djaal's reply in sync with his animation: shorten what's up now
      const up = performance.now() - showing.t0; const minUp = showing.prio === 0 ? 1200 : 2500;
      clearTimeout(showing.cutTimer); showing.cutTimer = setTimeout(cut, Math.max(0, minUp - up));
    }
    next();
  }
  let hideTimer = 0;
  function cut() { if (!showing || showing.leaving) return; clearTimeout(hideTimer); hide(); }
  function hide() {
    const it = showing; it.leaving = true; clearTimeout(it.cutTimer);
    el.classList.remove('show'); setTimeout(() => { if (showing === it) { showing = null; next(); } }, 220 + CONFIG.bubbleGapMs);
  }
  function next() {
    if (showing || !q.length) return;
    const it = q.shift(); showing = it; it.t0 = performance.now();
    who.textContent = it.user ? `${it.user}:` : '';          // textContent => no HTML injection
    el.className = 'bubble' + (it.kind ? ' ' + it.kind : '');
    msg.textContent = it.text;
    if (it.tumble) {                                          // e.g. !roll: numbers spin, then land
      const [a, b] = it.tumble.range; const t0 = performance.now();
      msg.textContent = fill(it.tumble.template, { n: a });
      const spin = () => { if (showing !== it) return; if (performance.now() - t0 < it.tumble.ms) { msg.textContent = fill(it.tumble.template, { n: Math.floor(a + Math.random() * (b - a + 1)) }); setTimeout(spin, 60); } else { msg.textContent = it.text; el.classList.add('landed'); } };
      spin();
    }
    if (it.react && Mascot.joll && CONFIG.joll.reactChat && State.idle) {   // chatter's message: quick grin (or laugh if it's funny)
      State.enqueue({ steps: [{ pose: CONFIG.joll.funny.test(it.text) ? 'laughLines' : 'grin', hold: 1300 }] });
    }
    if (it.speak) Voice.speak(Math.min(it.ms - 600, 450 + 60 * Array.from(it.text).length));
    place(); void el.offsetWidth; el.classList.add('show');
    hideTimer = setTimeout(() => { if (showing === it && !it.leaving) hide(); }, it.ms);
  }
  (function follow() { if (showing) place(); requestAnimationFrame(follow); })();   // follow the head while he walks / roams / jumps
  return { push, q, get showing() { return showing; } };
})();
// ---------- text cleanup ----------
function cleanText(s, max = CONFIG.bubbleMaxChars) {
  s = String(s || '')
    .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2066-\u2069]/g, '')            // control / bidi chars
    .replace(/\bhttps?:\/\/\S+/gi, '')
    .replace(/\bwww\.\S+/gi, '')
    .replace(/\b[\w-]+(\.[\w-]+)*\.(com|net|org|tv|gg|io|co|ly|me|xyz|ru|info|biz|link|app|dev|site|shop|live|stream)(\/\S*)?\b/gi, '')
    .replace(/\s+/g, ' ').trim();
  const chars = Array.from(s);                                   // don't split emoji / surrogate pairs
  return chars.length > max ? chars.slice(0, max - 1).join('').trimEnd() + '…' : s;
}
const cleanName = (s) => cleanText(s, 25).replace(/\s/g, '');
// ---------- commands ----------
// Each ACTION returns { say: bubble text, chat: chat text (default = say), kind, steps, tumble }. Return null to ignore.
// Steps: clip/plays/ms = classic body clip; pose/hold = Joll Chat Mascot 2.0 pose (ignored by classic).
const ACTIONS = {
  '!djaal': (c) => ({ say: line('djaal', c), steps: [{ clip: pick(['wave', 'jump']), plays: 1, fx: 'sparkle', pose: 'sparkle', hold: 1700 }] }),
  '!commands': () => { const list = commandList(); return { say: list, kind: 'help', steps: [{ clip: 'wave', plays: 1, pose: 'smug', hold: 1800 }] }; },
  '!build': (c) => ({ say: line('build', c), kind: 'build', steps: [{ clip: 'jump', plays: 1, glint: true, fx: 'fire@feet', pose: 'pointing', hold: 2000 }] }),
  '!pit': (c) => ({ say: line('pit', c), kind: 'hype', steps: [{ clip: 'jump', plays: 1, glint: true, fx: ['fire@feet', 'stars@head@350'], pose: 'thinking', hold: 2000 }] }),
  '!hype': (c) => ({ say: line('hype', c), kind: 'hype', steps: [{ clip: 'dance', ms: 5500, glint: true, fx: ['confetti', 'fire@feet', 'confetti@head@1800', 'fire@feet@1900', 'confetti@head@3600'], pose: 'hype', hold: 2400 }] }),
  '!lurk': (c) => ({ say: line('lurk', c), steps: [{ clip: 'wave', plays: 1, pose: 'brb', hold: 1300 }, { clip: 'idle', ms: 3400, act: 'lurk', actMs: 3400 }] }),
  '!hug': (c) => { const t = targetName(c.arg); const other = t && t.toLowerCase() !== c.login;
    return { say: other ? line('hugOther', { ...c, target: t }) : line('hug', c), kind: 'love', steps: [{ clip: 'idle', ms: 2300, act: 'hug', actMs: 2300, fx: ['hearts@chest', 'hearts@head@900'], pose: 'laugh', hold: 1900 }] }; },
  '!roll': (c) => { const n = 1 + Math.floor(Math.random() * 100); const key = n === 100 ? 'roll100' : n === 1 ? 'roll1' : n >= 90 ? 'rollHigh' : 'roll';
    const after = n >= 90 ? { clip: 'jump', plays: 1, fx: ['confetti', 'stars'], glint: n === 100, pose: 'w', hold: 1500 } : n <= 10 ? { clip: 'idle', ms: 1400, act: 'sad', actMs: 1400, pose: 'zzz', hold: 1300 } : { clip: 'idle', ms: 900, act: 'pop', actMs: 600, fx: 'sparkle', pose: 'grin', hold: 1100 };
    return { say: line(key, { ...c, n }), kind: 'roll', tumble: { template: `${c.name} rolls… {n} 🎲`, range: [1, 100], ms: 1100 },
             steps: [{ clip: 'idle', ms: 1100, act: 'shake', actMs: 1100, pose: 'thinking', hold: 800 }, after] }; },
  '!8ball': (c) => { const qn = cleanText(c.arg, 60);
    if (!qn) return { say: line('eightballEmpty', c), kind: '8ball', steps: [{ clip: 'wave', plays: 1, pose: 'thinking', hold: 1500 }] };
    const ans = pick(LINES.eightball);
    return { say: `“${qn}” 🎱 ${ans}`, chat: `@${c.name} 🎱 ${ans}`, kind: '8ball', steps: [{ clip: 'idle', ms: 1600, act: 'shake', actMs: 1600, fx: 'sparkle@head@1200', pose: 'thinking', hold: 1200 }, { clip: 'idle', ms: 0, pose: 'smug', hold: 1100, only: 'joll' }] }; },
  '!so': (c) => { const t = targetName(c.arg); if (!t) return { say: line('soUsage', c), chat: null, steps: [{ clip: 'wave', plays: 1, pose: 'thinking', hold: 1200 }] };
    return { say: line('so', { ...c, target: t }), chat: line('soChat', { ...c, target: t, login: t.toLowerCase() }), kind: 'hype',
             steps: [{ clip: 'jump', plays: 1, glint: true, fx: ['stars', 'confetti@head@250'], pose: 'w', hold: 1900 }] }; },
  '!dance': (c) => ({ say: line('dance', c), steps: [{ clip: 'dance', ms: 6000, pose: 'dance', hold: 2600 }] }),
  '!wave': (c) => ({ say: line('wave', c), steps: [{ clip: 'wave', plays: 1, pose: 'wave', hold: 1700 }] }),
  '!jump': (c) => ({ say: line('jump', c), steps: [{ clip: 'jump', plays: 1, fx: 'sparkle@feet', pose: 'heroLaugh', hold: 1300, act: 'pop', actMs: 600 }] }),
  '!walk': (c) => ({ say: line('walk', c), steps: [{ clip: 'walk', ms: 6000, pose: 'walking', hold: 2400 }] }),
  '!float': (c) => ({ say: line('float', c), steps: [{ clip: 'idle', ms: 6000, pose: 'zzz', hold: 2400 }] }),
  '!gg': (c) => ({ say: line('gg', c), kind: 'hype', steps: [{ clip: 'jump', plays: 1, glint: true, fx: ['confetti', 'stars@head@300'], pose: 'gg', hold: 2000 }] }),
  '!lol': (c) => ({ say: line('lol', c), steps: [{ clip: 'jump', plays: 1, pose: 'lol', hold: 1900 }] }),
  '!brb': (c) => ({ say: line('brb', c), steps: [{ clip: 'wave', plays: 1, pose: 'brb', hold: 2200 }] }),
  '!w': (c) => ({ say: line('w', c), kind: 'hype', steps: [{ clip: 'jump', plays: 1, glint: true, fx: 'stars@head', pose: 'w', hold: 1800 }] }),
};
function targetName(arg) { const m = String(arg || '').trim().match(/^@?([A-Za-z0-9_]{2,25})\b/); return m ? m[1] : ''; }
function commandList() {
  const C = CONFIG.commands; const fun = ['!djaal', '!build', '!pit', '!hype', '!hug', '!lurk', '!roll', '!8ball <q>', '!so <user>'];
  const moves = ['!dance', '!wave', '!jump', '!walk', '!float', '!gg', '!lol', '!brb', '!w'];
  const has = (k) => C[k.split(' ')[0]]; const tag = (k) => (C[k.split(' ')[0]].modOnly ? `${k} (mods)` : k);
  return `${fun.filter(has).map(tag).join(' ')} · moves: ${moves.filter(has).join(' ')}`;
}
const ALIASES = {}; Object.entries(CONFIG.commands).forEach(([k, c]) => (c.aliases || []).forEach((a) => { ALIASES[a] = k; }));
const lastUsed = {}; const userLast = {};
function roleOf(tags, login) {
  const b = String(tags.badges || ''); const broadcaster = /(^|,)broadcaster\//.test(b) || login === CONFIG.channel || login === 'api';
  const mod = broadcaster || tags.mod === '1' || /(^|,)moderator\//.test(b); return { broadcaster, mod, vip: mod || /(^|,)vip\//.test(b) };
}
/** Run a chat command. Returns true if it was a known command (even if it was on cooldown). */
function runCommand(cmdRaw, name, opts = {}) {
  const cmd = ALIASES[cmdRaw] || cmdRaw; const c = CONFIG.commands[cmd]; const fn = ACTIONS[cmd];
  if (!c || !fn) return false;
  const login = (opts.login || name || '').toLowerCase(); const role = opts.role || { broadcaster: false, mod: false, vip: false };
  if (c.modOnly && !role.vip) { log('mod-only', cmd, login); return true; }
  const now = Date.now();
  if (now - (lastUsed[cmd] || 0) < (c.cooldownMs || 0)) { log('cooldown', cmd); return true; }
  if (!(CONFIG.modsBypassCooldown && role.mod) && now - (userLast[login] || 0) < CONFIG.userCooldownMs) { log('user cooldown', login, cmd); return true; }
  const r = fn({ name, login, arg: opts.arg || '', role }); if (!r) return true;
  const kind = `djaal ${r.kind || ''}`.trim();
  const ok = State.enqueue({ steps: r.steps, onStart: () => Bubble.push('', r.say, { prio: 1, force: true, kind, speak: true, tumble: r.tumble }) }, false, role.broadcaster);
  if (!ok) return true;                                  // animation queue full: drop silently, no cooldown burned
  lastUsed[cmd] = now; userLast[login] = now;
  return true;
}
// ---------- first-message greetings ("yo <name>!") ----------
const Greeter = (() => {
  const seen = new Set(); let pending = []; let timer = 0;
  function isNew(login) { if (seen.has(login)) return false; seen.add(login); return true; }
  function add(name, login) {
    if (!CONFIG.greet.enabled) return;
    if (CONFIG.greet.skipBroadcaster && login === CONFIG.channel) return;
    pending.push(name); if (!timer) timer = setTimeout(flush, CONFIG.greet.batchMs);
  }
  function flush() {
    timer = 0; const names = pending.splice(0); if (!names.length) return;
    const max = CONFIG.greet.maxNames; const shown = names.slice(0, max); const more = names.length - shown.length;
    let list = shown.length === 1 ? shown[0] : `${shown.slice(0, -1).join(', ')} & ${shown[shown.length - 1]}`; if (more > 0) list = `${shown.join(', ')} +${more}`;
    const text = fill(pick(CONFIG.greet.lines), { names: list });
    const show = () => Bubble.push('', text, { prio: 1, force: true, kind: 'djaal greet', speak: true });
    if (State.idle || Mascot.joll) State.enqueue({ steps: [{ clip: 'wave', plays: 1, pose: 'wave', hold: 1700 }], onStart: show }); else show();   // classic: wave only when he's free; Joll: queued
  }
  return { isNew, add, seen };
})();
// ---------- events ----------
const EVENT_STEPS = {   // Joll pose per event (classic ignores pose/hold and plays the jump clip)
  hype: [{ clip: 'jump', plays: 1, glint: true, fx: ['confetti', 'stars@head@300'], pose: 'hype', hold: 1900 }],
  rain: [{ clip: 'jump', plays: 1, glint: true, fx: ['confetti', 'stars@head@300'], pose: 'rain', hold: 2000 }],
  cash: [{ clip: 'jump', plays: 1, glint: true, fx: ['confetti', 'stars@head@300'], pose: 'cash', hold: 1800 }],
  raid: [{ clip: 'jump', plays: 1, glint: true, pose: 'zoomies', hold: 900 }, { clip: 'jump', plays: 1, glint: true, fx: ['confetti', 'stars@head@300'], pose: 'gg', hold: 1700 }],
  wave: [{ clip: 'jump', plays: 1, glint: true, fx: ['confetti', 'stars@head@300'], pose: 'wave', hold: 1800 }],
};
function hype(name, text, kind = 'hype') {
  let steps = EVENT_STEPS[kind] || EVENT_STEPS.hype;
  if (!Mascot.joll) steps = steps.slice(-1);             // classic: one jump, exactly as before
  State.enqueue({ steps }, true);
  Bubble.push('', text || `thanks ${name}!`, { priority: true, force: true, kind: 'hype', speak: true });
}
/** Follow hook – IRC can't see follows. Call this from Streamer.bot (enable CONFIG.streamerbot),
 *  from your own EventSub bridge, or manually: window.djaal.follow('SomeName'). */
function onFollow(name) { hype(cleanName(name), `thanks for the follow, ${cleanName(name)}!`, 'wave'); }

function handlePrivmsg(tags, nick, text) {
  const login = (nick || '').toLowerCase(); const name = cleanName(tags['display-name'] || nick);
  if (CONFIG.ignoreUsers.includes(login)) return;
  const bits = parseInt(tags.bits || '0', 10);
  const first = Greeter.isNew(login);
  if (bits > 0 && CONFIG.events.bits && bits >= CONFIG.events.minBits) { hype(name, `thanks ${name} for ${bits} bits!`, 'rain'); return; }
  const t = text.trim();
  if (t.startsWith('!')) {                                 // commands never go in the bubble
    const sp = t.search(/\s/); const cmd = (sp < 0 ? t : t.slice(0, sp)).toLowerCase(); const arg = sp < 0 ? '' : t.slice(sp + 1);
    if (runCommand(cmd, name, { login, arg, role: roleOf(tags, login) })) return;
  }
  if (first) Greeter.add(name, login);
  State.chatTick();
  const clean = cleanText(t);
  if (clean && !t.startsWith('!')) Bubble.push(name, clean, { react: !first });   // a first message gets the greeting wave instead
}
function handleUsernotice(tags) {
  const id = tags['msg-id'] || ''; const name = cleanName(tags['display-name'] || tags.login || 'friend');
  if (CONFIG.events.subs && ['sub', 'resub', 'giftpaidupgrade', 'anongiftpaidupgrade', 'primepaidupgrade'].includes(id)) hype(name, `thanks ${name} for the sub!`);
  else if (CONFIG.events.subs && id === 'subgift') { if (tags['msg-param-community-gift-id'] == null) hype(name, `thanks ${name} for the gift sub!`, 'rain'); }
  else if (CONFIG.events.subs && id === 'submysterygift') hype(name, `thanks ${name} for ${tags['msg-param-mass-gift-count'] || 'the'} gift subs!`, 'rain');
  else if (CONFIG.events.raids && id === 'raid') hype(name, `thanks ${name} for the raid! (${tags['msg-param-viewerCount'] || '?'})`, 'raid');
}
// ---------- anonymous Twitch IRC over WebSocket (read-only) ----------
const Chat = (() => {
  const dot = document.getElementById('status') || document.createElement('div'); let ws; let backoff = 1000; let pingTimer; let lastRx = 0;
  const unescapeTag = (v) => v.replace(/\\s/g, ' ').replace(/\\:/g, ';').replace(/\\\\/g, '\\').replace(/\\r/g, '').replace(/\\n/g, '');
  function parse(line) {
    const m = { tags: {}, prefix: '', command: '', params: [] }; let i = 0;
    if (line[0] === '@') { const sp = line.indexOf(' '); line.slice(1, sp).split(';').forEach((kv) => { const e = kv.indexOf('='); m.tags[e < 0 ? kv : kv.slice(0, e)] = e < 0 ? '' : unescapeTag(kv.slice(e + 1)); }); i = sp + 1; }
    if (line[i] === ':') { const sp = line.indexOf(' ', i); m.prefix = line.slice(i + 1, sp); i = sp + 1; }
    const rest = line.slice(i); const t = rest.indexOf(' :');
    const head = t >= 0 ? rest.slice(0, t) : rest; m.params = head.split(' ').filter(Boolean); m.command = m.params.shift() || '';
    if (t >= 0) m.params.push(rest.slice(t + 2));
    return m;
  }
  function connect() {
    if (!CONFIG.live || !CONFIG.channel) return;
    dot.className = 'wait';
    ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
    ws.onopen = () => {
      ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
      ws.send('PASS SCHMOOPIIE');
      ws.send(`NICK justinfan${Math.floor(10000 + Math.random() * 89999)}`);
      ws.send(`JOIN #${CONFIG.channel}`);
      clearInterval(pingTimer);
      pingTimer = setInterval(() => { if (Date.now() - lastRx > 330000) { log('stale, reconnecting'); ws.close(); } else ws.send('PING :djaal'); }, 60000);
    };
    ws.onmessage = (ev) => {
      lastRx = Date.now();
      for (const line of String(ev.data).split('\r\n')) {
        if (!line) continue; const m = parse(line);
        switch (m.command) {
          case 'PING': ws.send(`PONG :${m.params[0] || 'tmi.twitch.tv'}`); break;
          case 'ROOMSTATE': case 'JOIN': dot.className = 'ok'; backoff = 1000; log(m.command, m.params[0]); break;
          case 'PRIVMSG': handlePrivmsg(m.tags, m.prefix.split('!')[0], m.params[1] || ''); break;
          case 'USERNOTICE': handleUsernotice(m.tags); break;
          case 'RECONNECT': log('server asked to reconnect'); ws.close(); break;
          case 'NOTICE': log('NOTICE', m.params.join(' ')); break;
        }
      }
    };
    ws.onclose = () => { dot.className = 'err'; clearInterval(pingTimer); log(`disconnected, retry in ${backoff} ms`); setTimeout(connect, backoff); backoff = Math.min(backoff * 2, 30000); };
    ws.onerror = () => { try { ws.close(); } catch (e) {} };
  }
  return { connect, parse };
})();

// ---------- tap Djaal: random pose pop (+ a little line) ----------
const TAP_POSES = ['laugh', 'pointing', 'smug', 'laughLines', 'cash', 'grin', 'hero', 'heroLaugh', 'gg', 'wave', 'hype', 'zzz', 'thinking', 'rain', 'dance', 'zoomies', 'brb', 'sparkle', 'lol', 'w', 'threeQuarter'];
const TAP_LINES = ['horns up! 🤘', 'the shades stay ON 😎', 'Pit push tonight 🔥', 'Pit push tonight 🔥', 'hi! I\'m Djaal 👋', 'go say hi in chat 💬', 'GG 🏆', 'hands off the horns 😏'];
let lastTapPose = ''; let lastTapAt = 0;
function onTap() {
  const now = performance.now(); if (now - lastTapAt < 450 || State.queue.length >= 2) return; lastTapAt = now;
  let k; do { k = pick(TAP_POSES); } while (k === lastTapPose); lastTapPose = k;
  const say = Math.random() < 0.45;
  State.enqueue({ steps: [{ pose: k, hold: 1500, fx: Math.random() < 0.5 ? 'sparkle' : undefined }], onStart: say ? () => Bubble.push('', pick(TAP_LINES), { prio: 1, force: true, kind: 'djaal', ms: 2600 }) : undefined });
}
window.djaal = { chat: (user, text, tags = {}) => handlePrivmsg(tags, user, text), tap: onTap, config: CONFIG, state: State, mascot: () => Mascot, bubble: () => Bubble };

// ---------- boot ----------
Mascot.show('idle', true);
Chat.connect();
