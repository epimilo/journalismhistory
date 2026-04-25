const artifactContent = {
  voice: {
    tag: "Am thanh",
    title: "May nghe ghi am",
    subtitle: "Mot diem neo cho loi ke, phong van, va cac doan doc chen trong trien lam.",
    body: [
      "Ban co the bien vat pham nay thanh mot tram nghe audio: moi lan bam se mo ra mot doan ghi am, loi dan, hoac nhat ky am thanh tuan tu.",
      "Trong ban demo nay, no dong vai tro nhac rang rang rang rang giua phong: mot vat nho nhung goi y rang cau chuyen co the den bang giong noi thay vi chi van ban.",
      "Khi da co noi dung that, ban co the thay phan body nay bang transcript, duong dan mp3, hoac nut mo modal audio rieng."
    ]
  },
  typewriter: {
    tag: "Van ban",
    title: "May danh chu cua bien tap vien",
    subtitle: "Noi trung bay nhung dong mo dau, tieu de nhap nhoang, va net lao dong cua toa soan.",
    body: [
      "Hotspot nay hop voi cac doan mo ta boi canh: vi du mot ghi chu ve cach mot ban tin duoc hinh thanh, ai viet nhap dau tien, ai sua lan cuoi.",
      "Ve mat giao dien, no la diem dung de ke nhung phan can nhieu chu hon, bo sung bang hinh scan ban thao, trich doan, hay timeline bien tap.",
      "Neu ban muon day hon, vat pham nay co the mo sang mot cua so side-by-side giua ban nhap tho va phien ban dang bao."
    ]
  },
  timeline: {
    tag: "Cot moc",
    title: "Khung lich tren tuong",
    subtitle: "Mot mat phang hop ly de treo cac moc thoi gian, thay doi, va mat mat.",
    body: [
      "Vat pham nay dai dien cho timeline tong quan: luc su kien bat dau, luc khong gian doi dang, va luc mot trang thai song ket thuc.",
      "Thay vi viet toan bo noi dung vao phong, ban de nguoi xem cham vao tung moc roi doc theo lop. Cach nay giu phong thoang, nhung van co do sau.",
      "Trong phien ban that, ban co the doi no thanh chuoi nam-thang-ngay, them anh nho, hoac dan sang tai lieu scan."
    ]
  },
  archive: {
    tag: "Luu vat",
    title: "Hop luu tru va ba cuon film",
    subtitle: "Noi giu nhung thu con sot lai sau khi mot dinh dang mat di.",
    body: [
      "Day la hotspot hop voi nhung mon do mang tinh vat chat: the nha bao, phong bi anh, danh sach truc, bang ten, hoac nhung thu khong con xuat hien trong doi song so.",
      "Trong trien lam dang ke ve mot to bao ngung in, hop luu tru co the giup nguoi xem cam ro y nghia cua chuyen doi dinh dang: mat di khong chi la mot kenh phat hanh, ma la ca thao tac, chat lieu, mui, va nhip lam viec.",
      "Neu ban muon them motion, hotspot nay co the mo gallery dang carousel gom 5-7 mon do, moi mon do la mot manh chu ky uc rieng."
    ]
  },
  newspaper: {
    tag: "Trang bao",
    title: "So bao giay cuoi cung",
    subtitle: "Bam vao de roi khoi vat the trung bay va buoc thang vao mot trang bao tuong tac.",
    body: [
      "To bao la vat chuyen canh trung tam cua demo nay. No bat dau nhu mot mon hien vat tren be, nhung khi nguoi xem bam vao thi no mo rong thanh mot khong gian doc mo phong front page va bai phong su ben trong.",
      "Cau truc nay hop voi y tuong cua ban: dung mot vat the trong VR room lam cong vao mot lop ke chuyen khac, thay vi giu moi thu trong cung mot kieu tuong tac.",
      "Trong phien ban that, ban co the thay ten toa soan, ngay phat hanh, bai viet, hinh scan, va du lieu lich su bang chat lieu cua rieng ban."
    ]
  }
};

const newspaperFeatures = {
  "editor-note": {
    kicker: "Thu toa soan",
    title: "Chung toi dong may in, nhung khong dong ky uc",
    deck: "Mot doan thu ngan tu bien tap vien co the dat o day de mo ra tam the cua ngay so bao giay cuoi cung duoc phat hanh.",
    copy: [
      "Buoi sang hom do, toa soan van sang den dung gio. May pha ca phe van keu, dien thoai van rung, mail van do ve. Chi co mot thu khac di: moi nguoi deu biet cuoi ngay nay se co mot chuyen khong lap lai nua.",
      "Neu dung bo cuc nay cho noi dung that, ban co the viet bang giong thu toa soan: khong can qua dai, nhung phai co nhiem luc cua mot noi vua ket thuc mot thoi quen lao dong rat cu the.",
      "Phan nay hop de chen mot cau noi de nho, mot doan hoi tuong ngan, hoac mot xin loi nho gui den doc gia da theo bao giay suot nhieu nam."
    ]
  },
  timeline: {
    kicker: "Chuyen doi",
    title: "Bon cot moc cua mot su im lang bat ngo",
    deck: "Mot timeline nho de dua nguoi xem di qua qua trinh tu rut gon nhan su, giam ky phat hanh, den so bao cuoi.",
    copy: [
      "Cot moc dau tien co the la luc toa soan bat dau giam so trang. Chuyen doi luon den tu nhung dau hieu rat vat chat: it trang hon, it muc hon, it xe giao bao hon.",
      "Cot moc thu hai la nhung cuoc hop ngan nhung nang. O do, quyet dinh kinh doanh va noi lo cua phong vien dung chung trong cung mot can phong.",
      "Cot moc thu ba la luc doc gia nhan ra lich phat hanh thay doi. Su kien doi khi khong nam trong thong bao lon, ma nam o viec thoi quen buoi sang cua ho bat ngo trong di.",
      "Cot moc cuoi la ngay may in tat. Phan nay rat hop de dua anh chup nha in, thong so, hoac mot con so cu the de cho thay su ket thuc co trong luong."
    ]
  },
  archive: {
    kicker: "Vat con sot lai",
    title: "Nhung thu o lai sau khi bao giay dung chay",
    deck: "Trang nay co the chua danh sach vat the, tai lieu scan, va nhung dau vet lao dong ma ban muon giu lai trong trien lam.",
    copy: [
      "Mot tam the nha bao da nga mau, mot tap ban in thu co vet but do, mot phong bi chua anh chua kip tra lai kho. Nhung vat the nay khong noi thay cho bai viet, nhung chung noi thay cho nhung ban tay da tao ra bai viet.",
      "Neu muon giu tinh trung bay, ban co the dung bo cuc nay nhu mot ho so vat chung. Moi do vat duoc dat ten gon, them chu thich ngan, va neu can thi cho mo anh lon hon.",
      "Khi dua len GitHub Pages, cach lam gon nhat la dat tat ca metadata trong mot object JavaScript. Luc can thay chat lieu that, ban chi sua du lieu ma khong phai dap giao dien."
    ]
  }
};

const artifactPanel = document.getElementById("artifactPanel");
const artifactTag = document.getElementById("artifactTag");
const artifactTitle = document.getElementById("artifactTitle");
const artifactSubtitle = document.getElementById("artifactSubtitle");
const artifactBody = document.getElementById("artifactBody");
const helpPanel = document.getElementById("helpPanel");
const newspaperView = document.getElementById("newspaperView");
const newspaperPages = document.querySelector(".newspaper__pages");
const featureKicker = document.getElementById("featureKicker");
const featureTitle = document.getElementById("featureTitle");
const featureDeck = document.getElementById("featureDeck");
const featureCopy = document.getElementById("featureCopy");
const sceneWrap = document.getElementById("sceneWrap");
const cameraRig = document.getElementById("cameraRig");
const mainCamera = document.getElementById("mainCamera");

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

function openNewspaper(mode = "frontpage") {
  closeArtifact();
  newspaperPages.dataset.mode = mode;
  newspaperView.classList.remove("overlay--hidden");
  sceneWrap.setAttribute("aria-hidden", "true");
}

function closeNewspaper() {
  newspaperView.classList.add("overlay--hidden");
  sceneWrap.removeAttribute("aria-hidden");
}

function focusNewspaper() {
  if (!cameraRig || !cameraRig.object3D) return;
  cameraRig.object3D.position.set(0, 1.6, 2.8);
  cameraRig.object3D.rotation.set(0, 0, 0);
  if (mainCamera && mainCamera.object3D) {
    mainCamera.object3D.rotation.set(0, 0, 0);
  }
}

function renderFeature(key) {
  const feature = newspaperFeatures[key];
  if (!feature) return;

  featureKicker.textContent = feature.kicker;
  featureTitle.textContent = feature.title;
  featureDeck.textContent = feature.deck;
  featureCopy.innerHTML = feature.copy.map((paragraph) => `<p>${paragraph}</p>`).join("");
  newspaperPages.dataset.mode = "feature";
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeature("editor-note");

  document.querySelectorAll(".clickable").forEach((node) => {
    node.addEventListener("click", () => {
      const key = node.dataset.artifact;
      if (key === "newspaper") {
        openNewspaper("frontpage");
        return;
      }
      renderArtifact(key);
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;

      if (action === "close-panel") closeArtifact();
      if (action === "toggle-help") helpPanel.hidden = !helpPanel.hidden;
      if (action === "close-help") helpPanel.hidden = true;
      if (action === "open-frontpage") newspaperPages.dataset.mode = "frontpage";
      if (action === "open-feature") renderFeature("editor-note");
      if (action === "close-newspaper") closeNewspaper();
      if (action === "focus-newspaper") focusNewspaper();
    });
  });

  document.querySelectorAll("[data-feature]").forEach((button) => {
    button.addEventListener("click", () => {
      renderFeature(button.dataset.feature);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeArtifact();
      helpPanel.hidden = true;
      closeNewspaper();
    }
  });
});
