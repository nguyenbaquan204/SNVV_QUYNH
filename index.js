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
const envelope = document.querySelector("#open-letter");
const envelopeHint = document.querySelector("#envelope-hint");
const letterPaper = document.querySelector("#letter-paper");
const letterBody = document.querySelector("#letter-body");
const letterSignature = document.querySelector("#letter-signature");
const wishArea = document.querySelector("#wish-area");
const showWishButton = document.querySelector("#show-wish");
const wishForm = document.querySelector("#wish-form");
let typingTimer = null;

function stopLetterTyping() {
  if (typingTimer !== null) {
    window.clearTimeout(typingTimer);
    typingTimer = null;
  }
}

function scrollLetterWithReader(force = false) {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  const bodyRect = letterBody.getBoundingClientRect();
  const threshold = window.innerHeight - 110;
  if (force || bodyRect.bottom > threshold) {
    const amount = force ? bodyRect.top - 32 : bodyRect.bottom - threshold + 26;
    window.scrollBy({ top: amount, behavior });
  }
}

function scrollLetterToStart() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  const paperTop = letterPaper.getBoundingClientRect().top;
  window.scrollBy({ top: paperTop - 28, behavior });
}

function revealLetter() {
  const tokens = letterText.match(/\S+|\s+/g) || [];
  let tokenIndex = 0;
  let lastScrollAt = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealNext() {
    if (tokenIndex >= tokens.length) {
      typingTimer = null;
      letterSignature.hidden = false;
      wishArea.hidden = false;
      window.setTimeout(() => wishArea.scrollIntoView({ block: "end", behavior: reducedMotion ? "auto" : "smooth" }), 260);
      return;
    }

    const token = tokens[tokenIndex++];
    if (/^\s+$/.test(token)) {
      letterBody.append(document.createTextNode(token));
    } else {
      const word = document.createElement("span");
      word.className = "letter-word";
      word.textContent = token;
      letterBody.append(word);
    }

    const now = performance.now();
    if (now - lastScrollAt > 340) {
      scrollLetterWithReader();
      lastScrollAt = now;
    }

    const pause = reducedMotion ? 0 : (/[,;.!?♡]$/.test(token) ? 120 : 54);
    typingTimer = window.setTimeout(revealNext, pause);
  }

  typingTimer = window.setTimeout(() => {
    scrollLetterToStart();
    revealNext();
  }, 180);
}

function celebrate() {
  const layer = document.querySelector("#confetti-layer");
  const colors = ["#cb7479", "#e3b77d", "#c9a9c2", "#f0d6c4", "#9eaaa0"];
  for (let i = 0; i < 38; i += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = (Math.random() * 100) + "%";
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.55) + "s";
    piece.style.setProperty("--drift", (Math.random() * 150 - 75) + "px");
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
  stopLetterTyping();
  envelope.classList.remove("opened");
  envelope.setAttribute("aria-expanded", "false");
  envelopeHint.hidden = false;
  document.querySelector("#gift-intro").hidden = false;
  letterPaper.hidden = true;
  letterBody.textContent = "";
  letterSignature.hidden = true;
  wishArea.hidden = true;
  wishForm.hidden = true;
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
  document.querySelector("#gift-intro").hidden = true;
  letterPaper.hidden = false;
  letterBody.textContent = "";
  revealLetter();
});

showWishButton.addEventListener("click", () => {
  const opening = wishForm.hidden;
  wishForm.hidden = !opening;
  showWishButton.setAttribute("aria-expanded", String(opening));
  showWishButton.textContent = opening ? "Gấp lại điều ước ♡" : "Gửi anh một điều ước ✨";
});

if (window.location.protocol.startsWith("http") && !["localhost", "127.0.0.1"].includes(window.location.hostname)) {
  document.querySelector("#qr-section").hidden = false;
  document.querySelector("#qr-image").src = "https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&color=332c2c&bgcolor=fffdfa&data=" + encodeURIComponent(window.location.href);
}
