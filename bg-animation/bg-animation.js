/* =====================================================

   FEATURE: GLOBAL BACKGROUND ENGINE

   PURPOSE:
   Render animated Plexus background
   across the entire website.

   RESPONSIBILITIES:
   - Generate nodes
   - Generate connecting lines
   - Animate movement
   - React to screen resize
   - Use current theme colours

   DEPENDENCIES:
   - global-background.css
   - #plexusSVG

   DOES NOT CONTROL:
   - Header
   - Dome Menu
   - Dark Mode
   - Footer
   - Front Page Content

   OWNER:
   global-background/

===================================================== */


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let plexusCanvas;

let plexusNodes = [];

let canvasWidth;
let canvasHeight;

const maxConnectionDistance = 150;

const totalNodes = 40;


/* =====================================================
   CREATE PLEXUS NODES

   PURPOSE:
   Generate all animated nodes used
   by the Plexus network.
===================================================== */

function createPlexusNodes() {

    plexusNodes = [];

    for (let nodeIndex = 0; nodeIndex < totalNodes; nodeIndex++) {

        plexusNodes.push({

            x:
                Math.random() *
                canvasWidth,

            y:
                Math.random() *
                canvasHeight,

            vx:
                (Math.random() - 0.5)
                * 0.5,

            vy:
                (Math.random() - 0.5)
                * 0.5

        });

    }

}


/* =====================================================
   RENDER ANIMATION FRAME

   PURPOSE:
   Draw nodes and connection lines.
===================================================== */

function renderPlexusFrame() {

    if (!plexusCanvas) {

        return;

    }

    plexusCanvas.innerHTML = "";

    const currentStrokeColour =

        getComputedStyle(
            document.body
        )

        .getPropertyValue(
            "--plexus-stroke"
        )

        .trim()

        || "255,255,255";


    /* ==========================================
       UPDATE NODE POSITIONS
    ========================================== */

    plexusNodes.forEach(node => {

        node.x += node.vx;
        node.y += node.vy;

        if (
            node.x <= 0 ||
            node.x >= canvasWidth
        ) {

            node.vx *= -1;

        }

        if (
            node.y <= 0 ||
            node.y >= canvasHeight
        ) {

            node.vy *= -1;

        }

        const nodeCircle =

            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        nodeCircle.setAttribute(
            "cx",
            node.x
        );

        nodeCircle.setAttribute(
            "cy",
            node.y
        );

        nodeCircle.setAttribute(
            "r",
            "3"
        );

        nodeCircle.setAttribute(
            "fill",
            "var(--plexus-node)"
        );

        plexusCanvas.appendChild(
            nodeCircle
        );

    });


    /* ==========================================
       DRAW CONNECTION LINES
    ========================================== */

    for (
        let firstNode = 0;
        firstNode < plexusNodes.length;
        firstNode++
    ) {

        for (
            let secondNode =
                firstNode + 1;

            secondNode <
                plexusNodes.length;

            secondNode++
        ) {

            const dx =

                plexusNodes[firstNode].x -

                plexusNodes[secondNode].x;

            const dy =

                plexusNodes[firstNode].y -

                plexusNodes[secondNode].y;

            const distance =

                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distance <
                maxConnectionDistance
            ) {

                const opacity =

                    (
                        1 -
                        distance /
                        maxConnectionDistance
                    )

                    * 0.25;

                const connectionLine =

                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "line"
                    );

                connectionLine.setAttribute(
                    "x1",
                    plexusNodes[firstNode].x
                );

                connectionLine.setAttribute(
                    "y1",
                    plexusNodes[firstNode].y
                );

                connectionLine.setAttribute(
                    "x2",
                    plexusNodes[secondNode].x
                );

                connectionLine.setAttribute(
                    "y2",
                    plexusNodes[secondNode].y
                );

                connectionLine.setAttribute(

                    "stroke",

                    `rgba(${currentStrokeColour}, ${opacity})`

                );

                connectionLine.setAttribute(
                    "stroke-width",
                    "1.5"
                );

                plexusCanvas.appendChild(
                    connectionLine
                );

            }

        }

    }


    requestAnimationFrame(
        renderPlexusFrame
    );

}


/* =====================================================
   INITIALISE PLEXUS ENGINE

   PURPOSE:
   Start Plexus animation.
===================================================== */

function initialisePlexusEngine() {

    plexusCanvas =

        document.getElementById(
            "plexusSVG"
        );

    if (!plexusCanvas) {

        console.error(
            "PLEXUS SVG NOT FOUND"
        );

        return;

    }

    canvasWidth =
        window.innerWidth;

    canvasHeight =
        window.innerHeight;

    plexusCanvas.setAttribute(
        "width",
        canvasWidth
    );

    plexusCanvas.setAttribute(
        "height",
        canvasHeight
    );

    createPlexusNodes();

    renderPlexusFrame();

    console.log(
        "PLEXUS INITIALISED"
    );

}


/* =====================================================
   WINDOW RESIZE HANDLER

   PURPOSE:
   Keep SVG canvas synced with
   browser size.
===================================================== */

window.addEventListener(

    "resize",

    () => {

        canvasWidth =
            window.innerWidth;

        canvasHeight =
            window.innerHeight;

        if (plexusCanvas) {

            plexusCanvas.setAttribute(
                "width",
                canvasWidth
            );

            plexusCanvas.setAttribute(
                "height",
                canvasHeight
            );

        }

    }

);


/* =====================================================
   START ENGINE
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initialisePlexusEngine

);