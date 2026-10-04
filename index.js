const letterLines = [
  "Quỳnh à,",
  "",
  "Chúc mừng sinh nhật em. Anh vẫn nhớ nụ cười của em và những khoảnh khắc bình thường mà mình có với nhau. Có em bên cạnh, một ngày rất đỗi bình thường cũng trở nên đặc biệt.",
  "",
  "Tuổi mới, anh mong em luôn vui, tự tin làm mọi điều em muốn và dịu dàng với chính mình. Dù em có đi đến đâu, anh vẫn muốn là người ở cạnh, lắng nghe em và cùng em đi qua mọi chuyện.",
  "",
  "Cảm ơn em đã bước vào cuộc đời anh. Anh thương em nhiều lắm. ♡"
];
const letterText = letterLines.join("\n");
const coverScreen = document.querySelector("#cover-screen");
const giftScreen = document.querySelector("#gift-screen");
const giftIntro = document.querySelector("#gift-intro");
const envelope = document.querySelector("#open-letter");
const envelopeHint = document.querySelector("#envelope-hint");
const letterPaper = document.querySelector("#letter-paper");
const letterBody = document.querySelector("#letter-body");
const letterSignature = document.querySelector("#letter-signature");
const wishArea = document.querySelector("#wish-area");
const showWishButton = document.querySelector("#show-wish");
const wishForm = document.querySelector("#wish-form");
const wishInput = document.querySelector("#wish-input");
const wishResponse = document.querySelector("#wish-response");
let typingTimer = null;

function celebrate() {
  const layer = document.querySelector("#confetti-layer");
  const colors = ["#cb7479", "#e3b77d", "#c9a9c2", "#f0d6c4", "#9eaaa0"];
  for (let i = 0; i < 38; i += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.55}s`;
    piece.style.setProperty("--drift", `${Math.random() * 150 - 75}px`);
    layer.appendChild(piece);
  }
  window.setTimeout(() => { layer.replaceChildren(); }, 4000);
}

document.querySelector("#open-gift").addEventListener("click", () => {
  coverScreen.hidden = true;
  giftScreen.hidden = false;
  window.scrollTo(0, 0);
  celebrate();
});

document.querySelector("#back-to-cover").addEventListener("click", () => {
  window.clearInterval(typingTimer);
  typingTimer = null;
  envelope.classList.remove("opened");
  envelope.setAttribute("aria-expanded", "false");
  envelopeHint.hidden = false;
  giftIntro.hidden = false;
  letterPaper.hidden = true;
  letterBody.textContent = "";
  letterSignature.hidden = true;
  wishArea.hidden = true;
  wishForm.hidden = true;
  wishForm.reset();
  wishResponse.textContent = "";
  showWishButton.setAttribute("aria-expanded", "false");
  showWishButton.textContent = "Gửi anh một điều ước ✨";
  giftScreen.hidden = true;
  coverScreen.hidden = false;
  window.scrollTo(0, 0);
});

envelope.addEventListener("click", () => {
  if (!letterPaper.hidden) return;
  envelope.classList.add("opened");
  envelope.setAttribute("aria-expanded", "true");
  envelopeHint.hidden = true;
  giftIntro.hidden = true;
  letterPaper.hidden = false;
  letterBody.textContent = "";
  let position = 0;
  typingTimer = window.setInterval(() => {
    letterBody.textContent += letterText.charAt(position);
    position += 1;
    if (position >= letterText.length) {
      window.clearInterval(typingTimer);
      typingTimer = null;
      letterSignature.hidden = false;
      wishArea.hidden = false;
    }
  }, 22);
});

showWishButton.addEventListener("click", () => {
  const opening = wishForm.hidden;
  wishForm.hidden = !opening;
  showWishButton.setAttribute("aria-expanded", String(opening));
  showWishButton.textContent = opening ? "Gấp lại điều ước ♡" : "Gửi anh một điều ước ✨";
  if (opening) wishInput.focus();
});

wishForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const wish = wishInput.value.trim();
  wishResponse.textContent = wish
    ? `Anh ghi nhớ điều ước “${wish}” rồi nhé. Mong tuổi mới sẽ mang điều ấy đến với em. ♡`
    : "Điều ước bí mật cũng được. Anh chỉ mong em luôn hạnh phúc. ♡";
  wishForm.hidden = true;
  showWishButton.setAttribute("aria-expanded", "false");
  showWishButton.textContent = "Gửi anh một điều ước ✨";
  wishInput.value = "";
});

if (window.location.protocol.startsWith("http") && !["localhost", "127.0.0.1"].includes(window.location.hostname)) {
  document.querySelector("#qr-section").hidden = false;
  document.querySelector("#qr-image").src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=12&data=${encodeURIComponent(window.location.href)}`;
}


