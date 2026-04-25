const artifactContent = {
  voice: {
    tag: "Am thanh",
    title: "May nghe ghi am",
    subtitle: "Tram nghe cho nhung doan phong van, loi dan, va lop ke chuyen bang giong noi.",
    body: [
      "Vat pham nay hop de mo ra transcript, audio clip, hoac mot lop hoi am ngan giua nhung doan trung bay co nhieu van ban.",
      "Trong demo, no dong vai tro diem dung cho mot manh ky uc duoc ke bang giong noi thay vi bang hinh anh hay bo chu dai."
    ]
  },
  typewriter: {
    tag: "Van ban",
    title: "May danh chu cua bien tap vien",
    subtitle: "Noi ke ve ban thao, tieu de, va qua trinh dua mot y thanh mot ban tin.",
    body: [
      "Day la diem hop ly cho nhung doan mo ta boi canh: ai viet, ai sua, ban nhap dau tien trong ra sao, va nhung chi tiet lao dong thuong bi bo qua.",
      "Neu can mo rong sau nay, vat pham nay co the dan den mot trang rieng gom ban thao scan va phien ban da len khuon."
    ]
  },
  timeline: {
    tag: "Cot moc",
    title: "Khung lich tren tuong",
    subtitle: "Mat phang de treo cac moc thoi gian, chuyen doi, va nhung ngay danh dau.",
    body: [
      "Nguoi xem co the bat dau hanh trinh tai day de nam boi canh tong quan truoc khi di sau vao cac vat pham co tinh ca nhan hon.",
      "Trong ban that, ban chi can thay noi dung nay bang timeline va hinh scan tai lieu neu can."
    ]
  },
  archive: {
    tag: "Luu vat",
    title: "Hop luu tru va ba cuon film",
    subtitle: "Noi giu nhung thu con sot lai sau khi mot dinh dang mat di.",
    body: [
      "Hop luu tru hop voi cac vat chung vat chat: the nha bao, phong bi anh, ghi chu truc, hay nhung mon do khong di cung len ban so.",
      "No tao cam giac rang qua trinh chuyen doi khong chi mat mot kenh phat hanh, ma mat ca thao tac, mui, chat lieu, va nhip lao dong."
    ]
  },
  newspaper: {
    tag: "Trang bao",
    title: "So bao giay cuoi cung",
    subtitle: "Vat pham o diem cuoi hanh trinh, bam vao de mo file bao HTML that cua ban.",
    body: [
      "Khac voi ban mock truoc, hotspot nay mo truc tiep file `to-bao-cuoi-cung.html` duoc nhung vao overlay toan man hinh.",
      "Nghia la khi ban sua file bao goc, phan trien lam nay tu dong lay dung phien ban moi nhat ma khong can viet lai giao dien."
    ]
  }
};

const focusPoints = {
  timeline: { x: -1.95, z: 1.7 },
  archive: { x: 1.95, z: 1.45 },
  voice: { x: -1.75, z: -1.35 },
  typewriter: { x: 1.7, z: -1.4 },
  newspaper: { x: 0, z: -2.95 }
};

const TELEPORT_OFFSETS = {
  floor: 1.15,
  wall: 2.4,
  pedestal: 1.7
};

const MAX_TELEPORT_STEP = 2.25;

const artifactPanel = document.getElementById("artifactPanel");
const artifactTag = document.getElementById("artifactTag");
const artifactTitle = document.getElementById("artifactTitle");
const artifactSubtitle = document.getElementById("artifactSubtitle");
const artifactBody = document.getElementById("artifactBody");
const helpPanel = document.getElementById("helpPanel");
const journeySelect = document.getElementById("journeySelect");
const newspaperView = document.getElementById("newspaperView");
const newspaperFrame = document.getElementById("newspaperFrame");
const sceneWrap = document.getElementById("sceneWrap");
const cameraRig = document.getElementById("cameraRig");
const mainCamera = document.getElementById("mainCamera");

function isNewspaperOpen() {
  return !newspaperView.classList.contains("overlay--hidden");
}

function renderArtifact(key) {
  const item = artifactContent[key];
  if (!item) return;

  artifactTag.textContent = item.tag;
  artifactTitle.textContent = item.title;
  artifactSubtitle.textContent = item.subtitle;
  artifactBody.innerHTML = item.body.map((paragraph) => `<p>${paragraph}</p>`).join("");
  artifactPanel.classList.remove("overlay--hidden");
}

function closeArtifact() {
  artifactPanel.classList.add("overlay--hidden");
}

function animateCameraTo(x, z) {
  if (!cameraRig) return;

  cameraRig.setAttribute(
    "animation__move",
    `property: position; to: ${x} 1.6 ${z}; dur: 430; easing: easeInOutQuad`
  );
}

function focusArtifact(key) {
  const point = focusPoints[key];
  if (!point) return;
  animateCameraTo(point.x, point.z);
}

function openNewspaper() {
  closeArtifact();
  newspaperView.classList.remove("overlay--hidden");
  sceneWrap.setAttribute("aria-hidden", "true");
}

function closeNewspaper() {
  newspaperView.classList.add("overlay--hidden");
  sceneWrap.removeAttribute("aria-hidden");
}

function reloadNewspaper() {
  if (!newspaperFrame) return;
  if (newspaperFrame.contentWindow) {
    newspaperFrame.contentWindow.location.reload();
    return;
  }

  const source = newspaperFrame.getAttribute("src");
  newspaperFrame.setAttribute("src", source);
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

  const nextX = Math.max(-5.6, Math.min(5.6, current.x + moveVector.x));
  const nextZ = Math.max(-5.9, Math.min(5.9, current.z + moveVector.z));

  animateCameraTo(nextX, nextZ);
}

function handleAction(action) {
  if (action === "close-panel") closeArtifact();
  if (action === "toggle-help") helpPanel.hidden = !helpPanel.hidden;
  if (action === "close-help") helpPanel.hidden = true;
  if (action === "close-newspaper") closeNewspaper();
  if (action === "reload-newspaper") reloadNewspaper();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".clickable").forEach((node) => {
    node.addEventListener("click", () => {
      const key = node.dataset.artifact;
      if (!key) return;

      if (key === "newspaper") {
        openNewspaper();
        return;
      }

      renderArtifact(key);
    });
  });

  document.querySelectorAll(".teleportable").forEach((node) => {
    node.addEventListener("click", (event) => {
      const intersection = event.detail && event.detail.intersection;
      const point = intersection && intersection.point;
      if (!point) return;

      teleportToPoint({
        x: point.x,
        z: point.z,
        surface: node.dataset.surface || "floor"
      });
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      handleAction(button.dataset.action);
    });
  });

  if (journeySelect) {
    journeySelect.addEventListener("change", () => {
      const key = journeySelect.value;
      if (!key) return;
      focusArtifact(key);
      if (key !== "newspaper") renderArtifact(key);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeArtifact();
      helpPanel.hidden = true;
      closeNewspaper();
      return;
    }
  });
});
