// ==========================================
// PLEXUS BACKGROUND ENGINE
// ==========================================

let svg;
let nodes = [];

let width;
let height;

const maxDistance = 150;
const nodeCount = 40;

// ==========================================
// CREATE NODES
// ==========================================

function createNodes() {


    nodes = [];

    for (let i = 0; i < nodeCount; i++) {

        nodes.push({

            x: Math.random() * width,
            y: Math.random() * height,

            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5

        });

    }


}

// ==========================================
// RENDER FRAME
// ==========================================

function renderFrame() {


    if (!svg) return;

    svg.innerHTML = "";

    const currentStroke =
        getComputedStyle(document.body)
            .getPropertyValue("--plexus-stroke")
            .trim() || "255,255,255";

    nodes.forEach(node => {

        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) {
            node.vx *= -1;
        }

        if (node.y <= 0 || node.y >= height) {
            node.vy *= -1;
        }

        const circle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        circle.setAttribute("cx", node.x);
        circle.setAttribute("cy", node.y);
        circle.setAttribute("r", "3");

        circle.setAttribute(
            "fill",
            "var(--plexus-node)"
        );

        svg.appendChild(circle);

    });

    for (let i = 0; i < nodes.length; i++) {

        for (let j = i + 1; j < nodes.length; j++) {

            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {

                const opacity =
                    (1 - distance / maxDistance) * 0.25;

                const line =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "line"
                    );

                line.setAttribute("x1", nodes[i].x);
                line.setAttribute("y1", nodes[i].y);

                line.setAttribute("x2", nodes[j].x);
                line.setAttribute("y2", nodes[j].y);

                line.setAttribute(
                    "stroke",
                    `rgba(${currentStroke}, ${opacity})`
                );

                line.setAttribute(
                    "stroke-width",
                    "1.5"
                );

                svg.appendChild(line);

            }

        }

    }

    requestAnimationFrame(renderFrame);


}

// ==========================================
// INITIALISE
// ==========================================

function initPlexus() {


    svg = document.getElementById("plexusSVG");

    if (!svg) {

        console.error(
            "PLEXUS SVG NOT FOUND"
        );

        return;

    }

    width = window.innerWidth;
    height = window.innerHeight;

    createNodes();

    renderFrame();

    console.log(
        "PLEXUS INITIALISED"
    );


}

// ==========================================
// RESIZE
// ==========================================

window.addEventListener("resize", () => {


    width = window.innerWidth;
    height = window.innerHeight;


});

// ==========================================
// START
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initPlexus
);
