const mh = document.getElementById("mh");
const typeText = document.getElementById("type-text");
const cards = document.querySelectorAll(".card");
const cardCount = document.getElementById("cardcount");
const words = "I build things, break things, and learn from it.";
let wordPos = 0;
function typeWords() {
    if (wordPos < words.length) {
        typeText.textContent += words.charAt(wordPos);
        wordPos++;
        setTimeout(typeWords, 55);
	}
}
typeWords();
let current = 0;
const spots = [
    { x: 0,    rotateY: 0,    scale: 1,    opacity: 1,    z: 5, blur: 0 },
    { x: 310,  rotateY: -55,  scale: 0.78, opacity: 0.55, z: 3, blur: 1 },
    { x: 0,    rotateY: -180, scale: 0.65, opacity: 0.18, z: 1, blur: 3 },
    { x: -310, rotateY: 55,   scale: 0.78, opacity: 0.55, z: 3, blur: 1 }
];
function moveCards() {
    cards.forEach(function(card, i) {
        let place = (i - current + cards.length) % cards.length;
        let spot = spots[place];
        card.style.transform =
            "translateX(" + spot.x + "px)" +
            " rotateY(" + spot.rotateY + "deg)" +
            " scale(" + spot.scale + ")";
        card.style.opacity = spot.opacity;
        card.style.zIndex = spot.z;
        card.style.filter = "blur(" + spot.blur + "px)";
	});
    cardCount.textContent =
        String(current + 1).padStart(2, "0") + " / 04";
}
function nextCard() {
    current++;

    if (current >= cards.length) {
        current = 0;
	}
    moveCards();
    restartTimer();
}
function previousCard() {
    current--;
    if (current < 0) {
        current = cards.length - 1;
	}
    moveCards();
    restartTimer();
}
let autoMove = setInterval(nextCard, 3500);
function restartTimer() {
    clearInterval(autoMove);
    autoMove = setInterval(nextCard, 3500);
}
cards.forEach(function(card, i) {
    card.addEventListener("click", function() {
        current = i;
        moveCards();
        restartTimer();
	});
});
window.addEventListener("scroll", function() {
    let scroll = window.scrollY;
    let fade = Math.max(0, 1 - scroll / 500);
    mh.style.opacity = fade;
    mh.style.transform =
        "translateY(" + scroll * 0.15 + "px) scale(" +
        (0.95 + fade * 0.05) + ")";
});
moveCards();