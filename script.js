/* ════════════════════════════════════════════════════
   VR Story Room — script.js (upgraded)
   - Intro splash with exit animation
   - Canvas textures for all 4 display surfaces
   - Hover glow + tooltip on all clickables
   - Visible cursor ring tracking mouse
   - Full-height artifact panel (slides from right)
   - Progress counter "X / 7 đã khám phá"
   - Full Vietnamese text (có dấu)
════════════════════════════════════════════════════ */

/* ── Artifact content (tiếng Việt đầy đủ) ── */
const artifactContent = {
  voice: {
    tag: "Âm thanh",
    title: "Máy nghe ghi âm",
    subtitle: "Trạm nghe cho những đoạn phỏng vấn, lời dẫn, và lớp kể chuyện bằng giọng nói.",
    body: [
      "Vật phẩm này hợp để mở ra transcript, audio clip, hoặc một lớp hỏi âm ngắn giữa những đoạn trưng bày có nhiều văn bản.",
      "Trong demo, nó đóng vai trò điểm dừng cho một mảnh ký ức được kể bằng giọng nói thay vì bằng hình ảnh hay bộ chữ dài."
    ]
  },
  typewriter: {
    tag: "Văn bản",
    title: "Máy đánh chữ của biên tập viên",
    subtitle: "Nơi kể về bản thảo, tiêu đề, và quá trình đưa một ý thành một bản tin.",
    body: [
      "Đây là điểm hợp lý cho những đoạn mô tả bối cảnh: ai viết, ai sửa, bản nháp đầu tiên trông ra sao, và những chi tiết lao động thường bị bỏ qua.",
      "Nếu cần mở rộng sau này, vật phẩm này có thể dẫn đến một trang riêng gồm bản thảo scan và phiên bản đã lên khuôn."
    ]
  },
  timeline: {
    tag: "Cột mốc",
    title: "Khung lịch trên tường",
    subtitle: "Mặt phẳng để treo các mốc thời gian, chuyển đổi, và những ngày đánh dấu.",
    body: [
      "Người xem có thể bắt đầu hành trình tại đây để nắm bối cảnh tổng quan trước khi đi sâu vào các vật phẩm có tính cá nhân hơn.",
      "Trong bản thật, bạn chỉ cần thay nội dung này bằng timeline và hình scan tài liệu nếu cần."
    ]
  },
  archive: {
    tag: "Lưu vật",
    title: "Hộp lưu trữ và ba cuộn film",
    subtitle: "Nơi giữ những thứ còn sót lại sau khi một định dạng mất đi.",
    body: [
      "Hộp lưu trữ hợp với các vật chứng vật chất: thẻ nhà báo, phong bì ảnh, ghi chú tay, hay những món đồ không đi cùng lên bản số.",
      "Nó tạo cảm giác rằng quá trình chuyển đổi không chỉ mất một kênh phát hành, mà mất cả thao tác, mùi, chất liệu, và nhịp lao động."
    ]
  },
  "painting-dawn": {
    tag: "Tranh treo tường",
    title: "Bức tranh số 1 — Bình minh",
    subtitle: "Một khung tranh có thể dùng để treo ảnh, poster thiết kế, hoặc một minh họa mở đầu hành trình.",
    body: [
      "Vật phẩm này hợp với ảnh chụp, minh họa, hoặc một trang scan đã được xử lý để treo như một tác phẩm mô phỏng trong phòng trưng bày.",
      "Khi bạn có hình thật, chỉ cần thay texture hoặc đổi plane này thành một khung tranh theo đúng tỉ lệ của file thiết kế."
    ]
  },
  "painting-night": {
    tag: "Tranh treo tường",
    title: "Bức tranh số 2 — Đêm khuya",
    subtitle: "Điểm dừng bổ sung cho một lớp không khí, ký ức, hoặc một poster truyền thông cần quan sát riêng.",
    body: [
      "Đây là vị trí hợp để đặt một bức tranh đối ứng với bức thứ nhất, giúp phòng có nhiều lớp nhìn hơn và tăng tính triển lãm.",
      "Về sau, bạn có thể đổi sang ảnh tòa soạn, ảnh nhân vật, hoặc một poster có text và họa tiết phục vụ mạch kể chuyện."
    ]
  },
  newspaper: {
    tag: "Trang báo",
    title: "Số báo giấy cuối cùng",
    subtitle: "Vật phẩm ở điểm cuối hành trình, bấm vào để mở file báo HTML thật của bạn.",
    body: [
      "Khác với bản mock trước, hotspot này mở trực tiếp file to-bao-cuoi-cung.html được nhúng vào overlay toàn màn hình.",
      "Nghĩa là khi bạn sửa file báo gốc, phần triển lãm này tự động lấy đúng phiên bản mới nhất mà không cần viết lại giao diện."
    ]
  }
};

const focusPoints = {
  timeline:        { x: -1.95, z: 1.7  },
  archive:         { x:  1.95, z: 1.45 },
  voice:           { x: -1.35, z: -0.75 },
  typewriter:      { x:  1.35, z: -0.8 },
  "painting-dawn": { x: -5.9,  z: -1.75 },
  "painting-night":{ x:  5.95, z: -1.55 },
  newspaper:       { x:  0,    z: -2.95 }
};

const TELEPORT_OFFSETS = { floor: 1.2, wall: 2.55, pedestal: 1.95 };
const MAX_TELEPORT_STEP = 2.75;
const ROOM_LIMITS = { x: 7.5, z: 7.5 };
const TOTAL_ARTIFACTS = 7;
const MOBILE_MAX_PIXEL_RATIO = 1.25;
const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
const isMobileDevice = /Android|iPhone|iPad|iPod|Mobile|Windows Phone|BlackBerry|Opera Mini/i.test(navigator.userAgent) || isTouchDevice;
const hasDeviceOrientationAPI = typeof window.DeviceOrientationEvent !== "undefined";

/* ── DOM refs ── */
const artifactPanel   = document.getElementById("artifactPanel");
const artifactTag     = document.getElementById("artifactTag");
const artifactTitle   = document.getElementById("artifactTitle");
const artifactSubtitle= document.getElementById("artifactSubtitle");
const artifactBody    = document.getElementById("artifactBody");
const appShell        = document.getElementById("appShell");
const helpPanel       = document.getElementById("helpPanel");
const introShell      = document.getElementById("introShell");
const introToggle     = document.getElementById("introToggle");
const introToggleMark = document.getElementById("introToggleMark");
const journeySelect   = document.getElementById("journeySelect");
const newspaperView   = document.getElementById("newspaperView");
const newspaperFrame  = document.getElementById("newspaperFrame");
const sceneWrap       = document.getElementById("sceneWrap");
const cameraRig       = document.getElementById("cameraRig");
const mainCursor      = document.getElementById("mainCursor");
const audioButton     = document.getElementById("audioButton");
const sceneEl         = document.querySelector("a-scene");
const introSplash     = document.getElementById("introSplash");
const introEnterBtn   = document.getElementById("introEnterBtn");
const cursorRing      = document.getElementById("cursorRing");
const artifactTooltip = document.getElementById("artifactTooltip");
const progressCount   = document.getElementById("progressCount");
const progressFill    = document.getElementById("progressFill");
const gyroPrompt      = document.getElementById("gyroPrompt");
const gyroEnableBtn   = document.getElementById("gyroEnableBtn");
const hudStatusText   = document.querySelector(".hud__status span:last-child");

/* ── State ── */
const audioState = { context: null, enabled: true, started: false };
const exploredSet = new Set();

/* ════════════════════════════════════════
   CANVAS TEXTURES
════════════════════════════════════════ */

function drawTimelineCanvas() {
  const canvas = document.getElementById("timelineCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // Background
  ctx.fillStyle = "#ece3d1";
  ctx.fillRect(0, 0, W, H);

  // Subtle aged paper grain
  const grainSteps = isMobileDevice ? 650 : 2000;
  for (let i = 0; i < grainSteps; i++) {
    ctx.fillStyle = `rgba(100,70,30,${Math.random() * 0.04})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }

  // Title
  ctx.fillStyle = "#3b2a14";
  ctx.font = "bold 28px serif";
  ctx.textAlign = "center";
  ctx.fillText("DÒNG THỜI GIAN", W / 2, 50);

  // Divider
  ctx.strokeStyle = "#b38e5f";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(40, 65); ctx.lineTo(W - 40, 65); ctx.stroke();

  const events = [
    { year: "1954", text: "Thành lập tòa soạn" },
    { year: "1968", text: "Số báo đặc biệt chiến tranh" },
    { year: "1975", text: "Thống nhất đất nước" },
    { year: "1986", text: "Thời kỳ Đổi Mới" },
    { year: "1995", text: "Bình thường hóa quan hệ" },
    { year: "2010", text: "Chuyển đổi kỹ thuật số" },
    { year: "2024", text: "Số báo giấy cuối cùng" },
  ];

  const lineX = W / 2;
  const startY = 100;
  const step = (H - 150) / (events.length - 1);

  // Timeline line
  ctx.strokeStyle = "#c9a86c";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(lineX, startY); ctx.lineTo(lineX, startY + step * (events.length - 1)); ctx.stroke();

  events.forEach((ev, i) => {
    const y = startY + i * step;
    const isLeft = i % 2 === 0;

    // Dot
    ctx.fillStyle = "#c57c37";
    ctx.beginPath(); ctx.arc(lineX, y, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ece3d1";
    ctx.beginPath(); ctx.arc(lineX, y, 4, 0, Math.PI * 2); ctx.fill();

    // Connector
    const connEnd = isLeft ? 60 : W - 60;
    ctx.strokeStyle = "#c9a86c";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(lineX, y); ctx.lineTo(connEnd, y); ctx.stroke();

    // Year label
    ctx.fillStyle = "#7a5c2e";
    ctx.font = "bold 16px monospace";
    ctx.textAlign = isLeft ? "right" : "left";
    ctx.fillText(ev.year, isLeft ? connEnd - 6 : connEnd + 6, y - 8);

    // Event text
    ctx.fillStyle = "#3b2a14";
    ctx.font = "13px serif";
    ctx.textAlign = isLeft ? "right" : "left";
    const words = ev.text.split(" ");
    let line = "";
    let lineY = y + 10;
    words.forEach(w => {
      const test = line + (line ? " " : "") + w;
      if (ctx.measureText(test).width > 160 && line) {
        ctx.fillText(line, isLeft ? connEnd - 6 : connEnd + 6, lineY);
        line = w; lineY += 15;
      } else { line = test; }
    });
    ctx.fillText(line, isLeft ? connEnd - 6 : connEnd + 6, lineY);
  });
}

function drawArchiveCanvas() {
  const canvas = document.getElementById("archiveCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  ctx.fillStyle = "#8b6242";
  ctx.fillRect(0, 0, W, H);

  // Wood grain lines
  for (let i = 0; i < 12; i++) {
    ctx.strokeStyle = `rgba(60,30,10,${0.08 + Math.random() * 0.12})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, 0);
    ctx.lineTo(Math.random() * W, H);
    ctx.stroke();
  }

  // Label sticker
  ctx.fillStyle = "#f4e8c8";
  ctx.fillRect(30, 30, W - 60, H - 60);

  ctx.fillStyle = "#8b6242";
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#c9a86c";
  ctx.strokeRect(34, 34, W - 68, H - 68);

  ctx.fillStyle = "#3b2a14";
  ctx.font = "bold 20px serif";
  ctx.textAlign = "center";
  ctx.fillText("HỘP LƯU TRỮ", W / 2, 80);
  ctx.font = "14px serif";
  ctx.fillStyle = "#7a5c2e";
  ctx.fillText("Tài liệu — Ảnh — Film", W / 2, 108);
  ctx.font = "12px monospace";
  ctx.fillStyle = "#a07850";
  ctx.fillText("1954 – 2024", W / 2, 130);
  ctx.fillText("SỐ LƯỢNG: 3 CUỘN", W / 2, 150);
}

function drawPaintingDawn() {
  const canvas = document.getElementById("paintingDawnCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // Sky gradient — warm dawn
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6);
  sky.addColorStop(0, "#1a0e22");
  sky.addColorStop(0.3, "#6b2d4a");
  sky.addColorStop(0.6, "#e8834d");
  sky.addColorStop(1, "#f5c97a");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Sun
  const sunGrad = ctx.createRadialGradient(W/2, H*0.52, 0, W/2, H*0.52, 90);
  sunGrad.addColorStop(0, "rgba(255,240,180,0.95)");
  sunGrad.addColorStop(0.4, "rgba(255,180,60,0.6)");
  sunGrad.addColorStop(1, "rgba(255,120,30,0)");
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, W, H);

  // Horizon ground
  const ground = ctx.createLinearGradient(0, H*0.55, 0, H);
  ground.addColorStop(0, "#2e4a2a");
  ground.addColorStop(1, "#1a2e18");
  ctx.fillStyle = ground;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.58);
  ctx.bezierCurveTo(W*0.25, H*0.52, W*0.75, H*0.58, W, H*0.54);
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
  ctx.fill();

  // River reflection
  const river = ctx.createLinearGradient(0, H*0.6, 0, H*0.85);
  river.addColorStop(0, "rgba(255,180,60,0.6)");
  river.addColorStop(1, "rgba(30,60,90,0.4)");
  ctx.fillStyle = river;
  ctx.beginPath();
  ctx.ellipse(W/2, H*0.73, W*0.22, H*0.08, 0, 0, Math.PI*2);
  ctx.fill();

  // Silhouette trees
  ctx.fillStyle = "#112010";
  for (let i = 0; i < 8; i++) {
    const x = (W / 8) * i + Math.random() * 40;
    const h = 60 + Math.random() * 80;
    const w = 8 + Math.random() * 12;
    ctx.fillRect(x, H * 0.58 - h, w, h);
    // Canopy
    ctx.beginPath();
    ctx.arc(x + w/2, H * 0.58 - h, w * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Title plate
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(W/2 - 90, H - 42, 180, 30);
  ctx.fillStyle = "#f4d7a3";
  ctx.font = "italic 14px serif";
  ctx.textAlign = "center";
  ctx.fillText("Bình minh — 1975", W / 2, H - 22);
}

function drawPaintingNight() {
  const canvas = document.getElementById("paintingNightCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // Deep night sky
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  sky.addColorStop(0, "#040814");
  sky.addColorStop(0.5, "#0d1535");
  sky.addColorStop(1, "#1a2050");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Stars
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H * 0.65;
    const r = Math.random() * 1.6;
    const op = 0.4 + Math.random() * 0.6;
    ctx.fillStyle = `rgba(220,230,255,${op})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }

  // Moon
  const moonGrad = ctx.createRadialGradient(W*0.72, H*0.14, 0, W*0.72, H*0.14, 42);
  moonGrad.addColorStop(0, "rgba(255,248,220,0.95)");
  moonGrad.addColorStop(0.7, "rgba(220,210,180,0.6)");
  moonGrad.addColorStop(1, "rgba(180,180,200,0)");
  ctx.fillStyle = moonGrad;
  ctx.beginPath(); ctx.arc(W*0.72, H*0.14, 28, 0, Math.PI*2); ctx.fill();

  // Moon glow
  const moonGlow = ctx.createRadialGradient(W*0.72, H*0.14, 20, W*0.72, H*0.14, 90);
  moonGlow.addColorStop(0, "rgba(200,210,255,0.15)");
  moonGlow.addColorStop(1, "rgba(200,210,255,0)");
  ctx.fillStyle = moonGlow;
  ctx.beginPath(); ctx.arc(W*0.72, H*0.14, 90, 0, Math.PI*2); ctx.fill();

  // Ground / city silhouette
  ctx.fillStyle = "#080c16";
  ctx.fillRect(0, H * 0.62, W, H * 0.38);

  // Building silhouettes
  const buildings = [
    { x: 0,    w: 60, h: 130 }, { x: 55,   w: 45, h: 100 },
    { x: 95,   w: 70, h: 160 }, { x: 160,  w: 40, h: 85  },
    { x: 195,  w: 55, h: 145 }, { x: 245,  w: 80, h: 120 },
    { x: 320,  w: 50, h: 90  }, { x: 365,  w: 65, h: 170 },
    { x: 425,  w: 55, h: 105 }, { x: 475,  w: 60, h: 140 },
    { x: 530,  w: 80, h: 95  }
  ];
  buildings.forEach(b => {
    ctx.fillStyle = "#0a0f1c";
    ctx.fillRect(b.x, H * 0.62 - b.h, b.w, b.h);
    // Lit windows
    for (let wy = H*0.62 - b.h + 10; wy < H*0.62 - 10; wy += 16) {
      for (let wx = b.x + 8; wx < b.x + b.w - 8; wx += 14) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(255,220,120,${0.4 + Math.random()*0.5})`;
          ctx.fillRect(wx, wy, 6, 8);
        }
      }
    }
  });

  // Water reflection
  const water = ctx.createLinearGradient(0, H*0.78, 0, H);
  water.addColorStop(0, "rgba(20,35,80,0.8)");
  water.addColorStop(1, "rgba(5,10,30,0.95)");
  ctx.fillStyle = water;
  ctx.fillRect(0, H * 0.78, W, H * 0.22);

  // Moon reflection on water
  ctx.fillStyle = "rgba(200,210,255,0.12)";
  ctx.beginPath();
  ctx.ellipse(W*0.72, H*0.88, 18, 40, 0, 0, Math.PI*2);
  ctx.fill();

  // Title plate
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(W/2 - 90, H - 40, 180, 28);
  ctx.fillStyle = "#b2a6d2";
  ctx.font = "italic 14px serif";
  ctx.textAlign = "center";
  ctx.fillText("Đêm khuya — Hà Nội", W / 2, H - 20);
}

function initCanvasTextures() {
  drawTimelineCanvas();
  drawArchiveCanvas();
  drawPaintingDawn();
  drawPaintingNight();
}

/* ════════════════════════════════════════
   INTRO SPLASH
════════════════════════════════════════ */
function dismissSplash() {
  if (!introSplash) return;
  introSplash.classList.add("is-exiting");
  setTimeout(() => {
    introSplash.style.display = "none";
    introSplash.removeAttribute("aria-modal");
    // Start showing intro toggle after 5s
    setTimeout(() => {
      if (introToggle) {
        introToggle.hidden = false;
        updateIntroToggle();
      }
    }, 5000);
  }, 680);
}

/* ════════════════════════════════════════
   CURSOR RING
════════════════════════════════════════ */
let cursorX = 0, cursorY = 0;
let cursorActive = false;
let cursorRafId = null;

function tickCursor() {
  cursorRing.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  artifactTooltip.style.left = (cursorX + 20) + "px";
  artifactTooltip.style.top  = (cursorY - 12) + "px";
  cursorRafId = requestAnimationFrame(tickCursor);
}

function initCursorRing() {
  if (isMobileDevice) return;
  // Start the RAF loop immediately so it's always in sync with display refresh
  cursorRafId = requestAnimationFrame(tickCursor);

  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (!cursorActive) {
      cursorActive = true;
      cursorRing.classList.add("is-visible");
    }
  });

  document.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("is-visible");
    cursorActive = false;
  });
}

/* ════════════════════════════════════════
   TOOLTIP + HOVER GLOW
════════════════════════════════════════ */
function showTooltip(label) {
  if (isMobileDevice) return;
  artifactTooltip.textContent = label;
  artifactTooltip.classList.add("is-visible");
  cursorRing.classList.add("is-hovering");
}

function hideTooltip() {
  if (isMobileDevice) return;
  artifactTooltip.classList.remove("is-visible");
  cursorRing.classList.remove("is-hovering");
}

function applyHoverGlow(el, on) {
  if (isMobileDevice) return;
  if (on) {
    el.setAttribute("animation__hover", "property: material.emissive; to: #8b5c20; dur: 200; easing: easeOutQuad");
  } else {
    el.setAttribute("animation__hover", "property: material.emissive; to: #000000; dur: 280; easing: easeOutQuad");
  }
}

/* ════════════════════════════════════════
   PROGRESS COUNTER
════════════════════════════════════════ */
function markExplored(key) {
  if (!key || exploredSet.has(key)) return;
  exploredSet.add(key);
  const count = exploredSet.size;
  if (progressCount) progressCount.textContent = count;
  if (progressFill)  progressFill.style.width = (count / TOTAL_ARTIFACTS * 100) + "%";
}

/* ════════════════════════════════════════
   ARTIFACT PANEL
════════════════════════════════════════ */
function renderArtifact(key) {
  const item = artifactContent[key];
  if (!item) return;

  artifactTag.textContent      = item.tag;
  artifactTitle.textContent    = item.title;
  artifactSubtitle.textContent = item.subtitle;
  artifactBody.innerHTML       = item.body.map(p => `<p>${p}</p>`).join("");
  artifactPanel.classList.remove("overlay--hidden");
  markExplored(key);
}

function closeArtifact() {
  artifactPanel.classList.add("overlay--hidden");
}

/* ════════════════════════════════════════
   NEWSPAPER
════════════════════════════════════════ */
function isNewspaperOpen() {
  return !newspaperView.classList.contains("overlay--hidden");
}

function openNewspaper() {
  hideTooltip();
  closeArtifact();
  newspaperView.classList.remove("overlay--hidden");
  sceneWrap.setAttribute("aria-hidden", "true");
  markExplored("newspaper");
}

function closeNewspaper() {
  hideTooltip();
  newspaperView.classList.add("overlay--hidden");
  sceneWrap.removeAttribute("aria-hidden");
}

function reloadNewspaper() {
  if (!newspaperFrame) return;
  if (newspaperFrame.contentWindow) { newspaperFrame.contentWindow.location.reload(); return; }
  newspaperFrame.setAttribute("src", newspaperFrame.getAttribute("src"));
}

/* ════════════════════════════════════════
   INTRO SHELL TOGGLE
════════════════════════════════════════ */
function updateIntroToggle() {
  if (!introShell || !introToggle || !introToggleMark) return;
  const collapsed = introShell.classList.contains("is-collapsed");
  introToggleMark.textContent = collapsed ? "›" : "×";
  introToggle.setAttribute("aria-label", collapsed ? "Mở lại bảng giới thiệu" : "Thu gọn bảng giới thiệu");
}

/* ════════════════════════════════════════
   CAMERA / TELEPORT
════════════════════════════════════════ */
function animateCameraTo(x, z) {
  if (!cameraRig) return;
  cameraRig.setAttribute("animation__move", `property: position; to: ${x} 1.6 ${z}; dur: 430; easing: easeInOutQuad`);
}

function focusArtifact(key) {
  const point = focusPoints[key];
  if (!point) return;
  animateCameraTo(point.x, point.z);
}

function teleportToPoint(point) {
  if (isNewspaperOpen() || !point || !cameraRig || !AFRAME.THREE) return;
  const current = cameraRig.object3D.position;
  const moveVector = new AFRAME.THREE.Vector3(point.x - current.x, 0, point.z - current.z);
  if (moveVector.lengthSq() < 0.01) return;
  const offset = TELEPORT_OFFSETS[point.surface] || TELEPORT_OFFSETS.floor;
  const distance = Math.max(0, Math.min(moveVector.length() - offset, MAX_TELEPORT_STEP));
  if (distance <= 0.05) return;
  moveVector.normalize().multiplyScalar(distance);
  const nextX = Math.max(-ROOM_LIMITS.x, Math.min(ROOM_LIMITS.x, current.x + moveVector.x));
  const nextZ = Math.max(-ROOM_LIMITS.z, Math.min(ROOM_LIMITS.z, current.z + moveVector.z));
  animateCameraTo(nextX, nextZ);
}

function getTeleportIntersection(el, evt) {
  if (!el) return null;

  const directIntersection = evt && evt.detail && evt.detail.intersection;
  if (directIntersection && directIntersection.point) {
    return {
      x: directIntersection.point.x,
      z: directIntersection.point.z,
      surface: el.dataset.surface || "floor"
    };
  }

  if (!mainCursor || !mainCursor.components || !mainCursor.components.raycaster) return null;

  const fallbackIntersection = mainCursor.components.raycaster.getIntersection(el);
  if (!fallbackIntersection || !fallbackIntersection.point) return null;

  return {
    x: fallbackIntersection.point.x,
    z: fallbackIntersection.point.z,
    surface: el.dataset.surface || "floor"
  };
}

function applyPerformanceProfile() {
  if (!sceneEl || !isMobileDevice) return;
  sceneEl.setAttribute("renderer", "antialias: false; colorManagement: true; precision: mediump; powerPreference: high-performance");
  sceneEl.addEventListener("render-target-loaded", () => {
    if (!sceneEl.renderer) return;
    sceneEl.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MOBILE_MAX_PIXEL_RATIO));
  }, { once: true });
}

function configureInputMode() {
  document.body.classList.toggle("is-mobile", isMobileDevice);
  if (!mainCursor) return;

  if (isMobileDevice) {
    // Center ray works reliably with touch on mobile A-Frame.
    mainCursor.setAttribute("cursor", "rayOrigin: entity; fuse: false");
    if (cursorRing) cursorRing.style.display = "none";
    if (artifactTooltip) artifactTooltip.style.display = "none";
  } else {
    mainCursor.setAttribute("cursor", "rayOrigin: mouse");
  }
}

function updateStatusHint() {
  if (!hudStatusText) return;
  hudStatusText.textContent = isMobileDevice
    ? "Mobile: vuốt để xoay nhìn, chạm vào vật phẩm hoặc bề mặt để di chuyển. Có thể bật cảm biến xoay sau khi vào phòng."
    : "Desktop: rê chuột để nhìn quanh, bấm vào bề mặt trong phòng để di đến gần điểm đó. Nhạc nền bật sau lần chạm đầu tiên.";
}

function setGyroEnabled(enabled) {
  const mainCamera = document.getElementById("mainCamera");
  if (!mainCamera) return;
  mainCamera.setAttribute("look-controls", `touchEnabled: true; mouseEnabled: true; magicWindowTrackingEnabled: ${enabled ? "true" : "false"}`);
}

function needsIOSGyroPermission() {
  return hasDeviceOrientationAPI && typeof window.DeviceOrientationEvent.requestPermission === "function";
}

function showGyroPrompt() {
  if (!gyroPrompt || !isMobileDevice || !needsIOSGyroPermission()) return;
  gyroPrompt.hidden = false;
}

async function requestGyroPermission() {
  if (!needsIOSGyroPermission()) return;
  try {
    const result = await window.DeviceOrientationEvent.requestPermission();
    if (result === "granted") {
      setGyroEnabled(true);
      if (gyroPrompt) gyroPrompt.hidden = true;
      return;
    }
  } catch (error) {
    // Keep controls available via touch drag even if gyro is denied.
  }
  setGyroEnabled(false);
}

/* ════════════════════════════════════════
   FULLSCREEN
════════════════════════════════════════ */
function updateFullscreenButton() {
  const isFs = document.fullscreenElement === appShell || document.webkitFullscreenElement === appShell;
  document.body.classList.toggle("is-fullscreen", isFs);
}

async function toggleFullscreen() {
  if (!appShell) return;
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
  if (fsEl === appShell) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else if (!fsEl) {
    (appShell.requestFullscreen || appShell.webkitRequestFullscreen).call(appShell);
  }
}

/* ════════════════════════════════════════
   AMBIENT AUDIO
════════════════════════════════════════ */
function createAmbientAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const master  = context.createGain();
  const filter  = context.createBiquadFilter();
  const lfo     = context.createOscillator();
  const lfoGain = context.createGain();
  const shimmer = context.createOscillator();
  const shimmerGain = context.createGain();

  master.gain.value    = 0.11;
  filter.type          = "lowpass";
  filter.frequency.value = 1180;
  filter.Q.value       = 0.7;
  lfo.type             = "sine";
  lfo.frequency.value  = 0.06;
  lfoGain.gain.value   = 220;
  shimmer.type         = "sine";
  shimmer.frequency.value = 0.12;
  shimmerGain.gain.value  = 0.018;

  master.connect(filter);
  filter.connect(context.destination);
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  shimmer.connect(shimmerGain);
  shimmerGain.connect(master.gain);

  [
    { frequency: 196.0,  gain: 0.05,  type: "sine",     detune: -4 },
    { frequency: 246.94, gain: 0.043, type: "triangle", detune:  3 },
    { frequency: 293.66, gain: 0.034, type: "sine",     detune:  1 },
    { frequency: 392.0,  gain: 0.018, type: "sine",     detune: -2 }
  ].forEach(v => {
    const osc  = context.createOscillator();
    const gain = context.createGain();
    osc.type = v.type; osc.frequency.value = v.frequency; osc.detune.value = v.detune;
    gain.gain.value = v.gain;
    osc.connect(gain); gain.connect(master); osc.start();
  });

  lfo.start(); shimmer.start();
  audioState.context = context;
  audioState.started = true;
}

async function ensureAmbientAudioStarted() {
  if (!audioState.enabled) return;
  if (!audioState.started) createAmbientAudio();
  if (!audioState.context) return;
  if (audioState.context.state === "suspended") await audioState.context.resume();
}

async function toggleAudio() {
  audioState.enabled = !audioState.enabled;
  if (!audioState.started && audioState.enabled) {
    await ensureAmbientAudioStarted();
  } else if (audioState.context) {
    audioState.enabled ? await audioState.context.resume() : await audioState.context.suspend();
  }
  if (audioButton) audioButton.textContent = audioState.enabled ? "Tắt nhạc" : "Bật nhạc";
}

/* ════════════════════════════════════════
   ACTION HANDLER
════════════════════════════════════════ */
function handleAction(action) {
  if (action === "close-panel")      closeArtifact();
  if (action === "toggle-help")      helpPanel.hidden = !helpPanel.hidden;
  if (action === "close-help")       helpPanel.hidden = true;
  if (action === "close-newspaper")  closeNewspaper();
  if (action === "reload-newspaper") reloadNewspaper();
  if (action === "toggle-audio")     toggleAudio();
  if (action === "toggle-intro" && introShell) {
    introShell.classList.toggle("is-collapsed");
    updateIntroToggle();
  }
}

/* ════════════════════════════════════════
   VR BUTTON REBIND
════════════════════════════════════════ */
function bindSceneFullscreenButton() {
  const sceneButton = document.querySelector(".a-enter-vr-button");
  if (!sceneButton || sceneButton.dataset.boundFullscreen === "true") return;
  sceneButton.dataset.boundFullscreen = "true";
  sceneButton.title = "Toàn màn hình";
  sceneButton.setAttribute("aria-label", "Toàn màn hình");
  sceneButton.addEventListener("click", (e) => {
    e.preventDefault(); e.stopImmediatePropagation(); toggleFullscreen();
  }, true);
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  configureInputMode();
  updateStatusHint();
  applyPerformanceProfile();

  // Canvas textures — run as soon as DOM is ready
  initCanvasTextures();

  // Cursor ring
  initCursorRing();

  // Intro splash dismiss
  if (introEnterBtn) {
    introEnterBtn.addEventListener("click", async () => {
      if (isMobileDevice) showGyroPrompt();
      dismissSplash();
      if (isMobileDevice && !needsIOSGyroPermission()) setGyroEnabled(true);
    });
  }

  // Fullscreen listeners
  document.addEventListener("fullscreenchange", updateFullscreenButton);
  document.addEventListener("webkitfullscreenchange", updateFullscreenButton);
  updateFullscreenButton();

  // Bind VR button → fullscreen
  if (sceneEl) sceneEl.addEventListener("loaded", bindSceneFullscreenButton);
  setTimeout(bindSceneFullscreenButton, 300);
  setTimeout(bindSceneFullscreenButton, 1200);

  // Audio priming
  const primeAudio = () => ensureAmbientAudioStarted();
  document.addEventListener("pointerdown", primeAudio, { passive: true });
  document.addEventListener("keydown", primeAudio);

  // Clickable artifacts — click + hover
  document.querySelectorAll(".clickable").forEach(node => {
    const key   = node.dataset.artifact;
    const label = node.dataset.label || key;

    if (!isMobileDevice) {
      node.addEventListener("mouseenter", () => {
        if (label) showTooltip(label);
        applyHoverGlow(node, true);
      });

      node.addEventListener("mouseleave", () => {
        hideTooltip();
        applyHoverGlow(node, false);
      });
    }

    node.addEventListener("click", () => {
      if (!key) return;
      if (key === "newspaper") { openNewspaper(); return; }
      renderArtifact(key);
    });
  });

  // Teleportable surfaces use their own click events, with the shared mouse raycaster as fallback.
  document.querySelectorAll(".teleportable").forEach(node => {
    node.addEventListener("click", (event) => {
      const targetPoint = getTeleportIntersection(node, event);
      if (targetPoint) teleportToPoint(targetPoint);
    });
  });

  // Data-action buttons
  document.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => handleAction(btn.dataset.action));
  });

  // Journey dropdown
  if (journeySelect) {
    journeySelect.addEventListener("change", () => {
      const key = journeySelect.value;
      if (!key) return;
      focusArtifact(key);
      if (key !== "newspaper") renderArtifact(key);
    });
  }

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeArtifact();
    helpPanel.hidden = true;
    closeNewspaper();
  });

  // Also close splash on Escape / Space
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Escape" || e.key === " " || e.key === "Enter") && introSplash && !introSplash.classList.contains("is-exiting") && introSplash.style.display !== "none") {
      dismissSplash();
    }
  });

  if (gyroEnableBtn) {
    gyroEnableBtn.addEventListener("click", requestGyroPermission);
  }
});
