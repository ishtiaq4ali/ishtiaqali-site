/*==================================================
IshtiaqAli.com
Digital Ecosystem
Version 1.0
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const ecosystem = document.querySelector(".ecosystem-wrapper");

    if (!ecosystem) return;

    const nodes = document.querySelectorAll(".eco-node");
    const center = document.querySelector(".center-card");

    /*=========================================
      MOUSE PARALLAX
    =========================================*/

    ecosystem.addEventListener("mousemove", (e) => {

        const rect = ecosystem.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (mouseX - centerX) / 40;
        const moveY = (mouseY - centerY) / 40;

        center.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

        nodes.forEach((node, index) => {

            const factor = (index % 5 + 2);

            node.style.transform =
                `translate(${moveX / factor}px, ${moveY / factor}px)`;

        });

    });

    ecosystem.addEventListener("mouseleave", () => {

        center.style.transform = "";

        nodes.forEach(node => {

            node.style.transform = "";

        });

    });




    /*=========================================
      HOVER GLOW
    =========================================*/

    nodes.forEach(node => {

        node.addEventListener("mouseenter", () => {

            nodes.forEach(n => {

                n.style.opacity = ".35";

            });

            node.style.opacity = "1";

            node.style.transform += " scale(1.08)";

        });

        node.addEventListener("mouseleave", () => {

            nodes.forEach(n => {

                n.style.opacity = "1";

                n.style.transform = "";

            });

        });

    });




    /*=========================================
      RANDOM FLOATING
    =========================================*/

    nodes.forEach(node => {

        const duration = 6 + Math.random() * 4;

        const delay = Math.random() * 4;

        node.animate([

            {
                transform: "translateY(0px)"
            },

            {
                transform: "translateY(-10px)"
            },

            {
                transform: "translateY(0px)"
            }

        ], {

            duration: duration * 1000,

            delay: delay * 1000,

            iterations: Infinity,

            easing: "ease-in-out"

        });

    });




    /*=========================================
      CENTER PULSE
    =========================================*/

    setInterval(() => {

        center.animate([

            {

                transform: "scale(1)"

            },

            {

                transform: "scale(1.04)"

            },

            {

                transform: "scale(1)"

            }

        ], {

            duration: 1800,

            easing: "ease-in-out"

        });

    }, 3500);




    /*=========================================
      INTERSECTION OBSERVER
    =========================================*/

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                ecosystem.classList.add("visible");

            }

        });

    }, {

        threshold: 0.25

    });

    observer.observe(ecosystem);

});