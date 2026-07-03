document.addEventListener("DOMContentLoaded", () => {

    // Word list
    const words = [
        "CAT",
        "DOG",
        "SUN",
        "PEN",
        "BAT"
    ];

    // Elements
    const wordEl = document.getElementById("word");
    const lettersEl = document.getElementById("letters");
    const msgEl = document.getElementById("msg");
    const ctaEl = document.getElementById("cta");
    const boardEl = document.querySelector(".board");

    // Safety check
    if (!wordEl || !lettersEl || !msgEl || !ctaEl || !boardEl) {
        console.error("Banner elements not found.");
        return;
    }

    // Pick a random word
    const current = words[Math.floor(Math.random() * words.length)];

    // Hide the middle letter
    const missingIndex = 1;
    const correctLetter = current[missingIndex];

    // Display word
    wordEl.innerHTML =
        current.substring(0, missingIndex) +
        " _ " +
        current.substring(missingIndex + 1);

    // Alphabet
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // Remove the correct letter
    const availableWrongLetters = alphabet.filter(letter => letter !== correctLetter);

    // Pick TWO random wrong letters
    const wrongLetters = [];

    while (wrongLetters.length < 2) {

        const randomLetter =
            availableWrongLetters[
                Math.floor(Math.random() * availableWrongLetters.length)
            ];

        if (!wrongLetters.includes(randomLetter)) {
            wrongLetters.push(randomLetter);
        }
    }

    // Always include the correct answer
    const options = [
        correctLetter,
        wrongLetters[0],
        wrongLetters[1]
    ];

    // Shuffle
    options.sort(() => Math.random() - 0.5);

    console.log("Word:", current);
    console.log("Correct:", correctLetter);
    console.log("Options:", options);

    // Create buttons
    lettersEl.innerHTML = "";

    options.forEach(letter => {

        const btn = document.createElement("button");

        btn.textContent = letter;

        btn.addEventListener("click", () => {

            if (letter === correctLetter) {

                wordEl.innerHTML = current;

                msgEl.innerHTML = "🎉 Correct!";

                ctaEl.style.display = "inline-block";

                lettersEl.innerHTML = "";

                // Confetti
                for (let i = 0; i < 25; i++) {

                    const confetti = document.createElement("div");

                    confetti.className = "confetti";

                    confetti.style.left = Math.random() * 260 + "px";

                    confetti.style.top = "0px";

                    confetti.textContent = ["🎉", "✨", "🎊"][Math.floor(Math.random() * 3)];

                    boardEl.appendChild(confetti);

                    setTimeout(() => {
                        confetti.remove();
                    }, 2000);
                }

            } else {

                msgEl.innerHTML = "❌ Try Again!";

                boardEl.classList.add("shake");

                setTimeout(() => {
                    boardEl.classList.remove("shake");
                }, 400);

            }

        });

        lettersEl.appendChild(btn);

    });

    // CTA
    ctaEl.addEventListener("click", () => {

        window.open("https://ishtiaqali.com", "_blank");

    });

});
