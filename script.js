const words = ["CAT", "DOG", "SUN", "PEN", "BAT"];

const wordEl = document.getElementById("word");
const lettersEl = document.getElementById("letters");
const msgEl = document.getElementById("msg");
const ctaEl = document.getElementById("cta");
const boardEl = document.querySelector(".board");

console.log({
    wordEl,
    lettersEl,
    msgEl,
    ctaEl,
    boardEl
});

const current = words[Math.floor(Math.random() * words.length)];
const missing = 1;
const correct = current[missing];

wordEl.innerHTML = `${current[0]} _ ${current[2]}`;

const options = [
    correct,
    ...["A", "E", "I", "O", "U", "B", "D", "N", "T"].filter(l => l !== correct)
]
.sort(() => Math.random() - 0.5)
.slice(0, 3)
.sort(() => Math.random() - 0.5);

lettersEl.innerHTML = "";

options.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;

    btn.addEventListener("click", () => {

        if (letter === correct) {

            wordEl.innerHTML = current;

            msgEl.textContent = "🎉 Correct!";

            ctaEl.style.display = "inline-block";

            lettersEl.innerHTML = "";

            for (let i = 0; i < 30; i++) {

                const confetti = document.createElement("div");

                confetti.className = "confetti";

                confetti.style.left = (80 + Math.random() * 180) + "px";

                confetti.textContent = ["🎉", "✨", "🎊"][i % 3];

                boardEl.appendChild(confetti);

                setTimeout(() => confetti.remove(), 2000);
            }

        } else {

            msgEl.textContent = "❌ Try Again!";

            boardEl.classList.add("shake");

            setTimeout(() => {
                boardEl.classList.remove("shake");
            }, 400);

        }

    });

    lettersEl.appendChild(btn);

});

ctaEl.addEventListener("click", () => {
    window.open("https://ishtiaqali.com", "_blank");
});
