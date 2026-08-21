export type Paths = {
  name?: string;
  show?: boolean;
  style: {
    strokeWidth: string;
    stroke: string;
    fill: string;
  };
  path: (["M", string, string] | ["L", string, string])[];
}[];

/**
 * Evaluates a string expression containing percentages or calculations.
 *
 * @param expr - The string expression to evaluate.
 * @returns The numeric result of the evaluated expression, or 0 if invalid.
 */
function evalExpression({
  expr,
  width,
  height,
}: {
  expr: string;
  width: number;
  height: number;
}) {
  const replaced = expr
    .replace(/([\d.]+)%/g, (_, num) => {
      const val = parseFloat(num);
      return `(${val} / 100)`;
    })
    .replace(/width/g, width.toString())
    .replace(/height/g, height.toString())
    .replace(/100/g, "100");

  try {
    return Function(`"use strict"; return (${replaced});`)();
  } catch {
    return 0;
  }
}

/**
 * Generates SVG path data based on provided Paths definitions and dimensions.
 *
 * @param params - Object containing paths array, width, and height.
 * @returns An array of updated Paths with parsed coordinates.
 */
function createSvgPaths({
  paths,
  width,
  height,
}: {
  paths: Paths;
  width: number;
  height: number;
}) {
  return paths.map((path) => {
    return {
      ...path,
      path: path.path
        .map(([cmd, x, y]) => {
          const parsedX =
            x.includes("%") || x.match(/[+\-*/]/)
              ? evalExpression({
                  expr: x.replace(/%/g, "* width / 100"),
                  width,
                  height,
                })
              : x;
          const parsedY =
            y.includes("%") || y.match(/[+\-*/]/)
              ? evalExpression({
                  expr: y.replace(/%/g, "* height / 100"),
                  width,
                  height,
                })
              : y;

          const numX =
            typeof parsedX === "string" ? parseFloat(parsedX) : parsedX;
          const numY =
            typeof parsedY === "string" ? parseFloat(parsedY) : parsedY;

          return `${cmd} ${parseInt(numX)},${parseInt(numY)}`;
        })
        .join(" "),
    };
  });
}

/**
 * Recursively finds the closest parent element with `position: relative`.
 *
 * @param element - The starting HTMLElement.
 * @returns The found parent HTMLElement or null if not found.
 */
function findRelativeParent(
  element: HTMLElement | SVGSVGElement | null
): HTMLElement | null {
  if (!element || !element.parentElement) return null;

  const parent = element.parentElement;
  const animationName = window.getComputedStyle(parent).animationName;
  const transitionProperty = window.getComputedStyle(parent).transitionProperty;

  if (
    animationName !== "none" ||
    (transitionProperty !== "all" && transitionProperty !== "none")
  ) {
    return parent;
  }

  return findRelativeParent(parent);
}

/**
 * Creates and appends SVG <path> elements to the provided SVG element based on Paths data.
 *
 * @param params - Object containing target SVG element, Paths data, width, and height.
 */
function createSvgElement({
  el,
  paths,
  width,
  height,
  enableBackdropBlur,
  enableViewBox,
}: {
  el: SVGSVGElement;
  paths: Paths;
  width: number;
  height: number;
  enableBackdropBlur: boolean;
  enableViewBox: boolean;
}) {
  const prevWidth = el.getAttribute("data-width");
  const prevHeight = el.getAttribute("data-height");

  if (prevWidth != width.toString() || prevHeight != height.toString()) {
    el.setAttribute("data-width", width.toString());
    el.setAttribute("data-height", height.toString());

    // Clear previous paths
    el.querySelectorAll("path").forEach((path) => path.remove());

    // Enable viewbox
    if (enableViewBox) {
      el.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }

    // Create new paths
    createSvgPaths({
      paths,
      width,
      height,
    }).map((p) => {
      const pathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      pathElement.setAttribute("d", p.path);
      pathElement.style.fill = p.style.fill;
      pathElement.style.stroke = p.style.stroke;
      pathElement.style.strokeWidth = p.style.strokeWidth;
      pathElement.style.vectorEffect = "non-scaling-stroke";
      pathElement.style.shapeRendering = "geometricPrecision";

      el && el.appendChild(pathElement);
    });

    // Backdrop blur masking
    if (enableBackdropBlur) {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(el);
      const encoded = encodeURIComponent(svgString);
      const dataUri = `data:image/svg+xml,${encoded}`;

      let divMask = document.createElement("div");

      if (
        el.nextElementSibling?.hasAttribute("data-backdrop") &&
        el.nextElementSibling instanceof HTMLDivElement
      ) {
        divMask = el.nextElementSibling;
      } else {
        divMask.style.opacity = "0";
      }

      divMask.style.willChange = "backdrop-blur";
      divMask.style.transition = "opacity 0.8s ease";
      divMask.style.maskImage = `url("${dataUri}")`;
      divMask.style.maskRepeat = "no-repeat";
      divMask.style.maskSize = "contain";
      divMask.style.zIndex = "-1";
      divMask.style.backdropFilter = "blur(10px)";
      divMask.setAttribute("data-backdrop", "true");
      divMask.setAttribute("class", el.getAttribute("class") ?? "");
      el.parentNode?.insertBefore(divMask, el.nextSibling);

      setTimeout(() => {
        divMask.style.opacity = "1";
      }, 0);
    }
  }
}

/**
 * Sets up the SVG renderer: initializes ResizeObserver, transition & animation listeners,
 * and renders SVG paths based on parent size changes.
 *
 * @param params - Object containing the target SVG element and Paths data.
 * @returns An object with `destroy` function to clean up observers.
 */
function setupSvgRenderer({
  el,
  paths,
  enableBackdropBlur = false,
  enableViewBox = false,
}: {
  el: SVGSVGElement & {
    render?: () => void;
  };
  paths: Paths;
  enableBackdropBlur?: boolean;
  enableViewBox?: boolean;
}) {
  const parentElement = findRelativeParent(el) ?? el;
  const parentWidth = () =>
    parentElement?.getBoundingClientRect().width.toString();
  const parentHeight = () =>
    parentElement?.getBoundingClientRect().height.toString();

  const render = () => {
    const width = el.getBoundingClientRect().width;
    const height = el.getBoundingClientRect().height;

    createSvgElement({
      el,
      paths,
      width,
      height,
      enableBackdropBlur,
      enableViewBox,
    });
  };

  el.render = render;

  // Initialize ResizeObserver to re-render on size changes
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      entry;
      render();
    }
  });

  observer.observe(el);

  // Handle transitionstart → re-render until transition ends
  parentElement.addEventListener("transitionstart", () => {
    console.log("run");
    let running = true;

    function loop() {
      if (!running) return;
      render();

      requestAnimationFrame(loop);
    }

    loop();

    parentElement.addEventListener(
      "transitionend",
      () => {
        if (
          parentWidth().toString() == el.getAttribute("data-width") &&
          parentHeight().toString() == el.getAttribute("data-height")
        ) {
          running = false;
          console.log("stop");
        }
      },
      { once: true }
    );
  });

  // Handle animationstart → re-render until animation ends
  parentElement.addEventListener("animationstart", () => {
    let running = true;

    function loop() {
      if (!running) return;
      render();

      requestAnimationFrame(loop);
    }

    loop();

    parentElement.addEventListener(
      "animationend",
      () => {
        if (
          parentWidth().toString() == el.getAttribute("data-width") &&
          parentHeight().toString() == el.getAttribute("data-height")
        ) {
          running = false;
        }
      },
      { once: true }
    );
  });

  return {
    /**
     * Disconnects the ResizeObserver and cleans up listeners.
     */
    destroy: () => observer.disconnect(),
  };
}

export { setupSvgRenderer };
