const CANVAS_SIZE = 600;
const FLOWER_COUNT = 50;
const flowers = [];

function setup() {
  const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  canvas.parent("sketch-container");
  pixelDensity(min(window.devicePixelRatio || 1, 2));
  growFlowerField();
}

function draw() {
  background(245, 240, 230);
  drawSoil(width / 2, height * 0.6, width * 0.35, height * 0.15);

  for (const flower of flowers) {
    flower.update(mouseX, mouseY);
    flower.display();
  }
}

function growFlowerField() {
  flowers.length = 0;

  const maxX = width * 0.3;
  const maxY = height * 0.1;
  const goldenAngle = PI * (3 - sqrt(5));

  for (let i = 0; i < FLOWER_COUNT; i += 1) {
    const spread = sqrt((i + 0.5) / FLOWER_COUNT);
    const angle = i * goldenAngle;
    const jitter = 1 + random(-0.08, 0.08);
    const x = maxX * spread * cos(angle) * jitter;
    const y = maxY * spread * sin(angle) * jitter;
    const stemHeight = lerp(70 + random(30), 20 + random(20), spread);
    const size = lerp(8 + random(4), 4 + random(2), spread);

    flowers.push(
      new Flower(width / 2 + x, height * 0.6 + y, size, stemHeight),
    );
  }
}

function mousePressed() {
  const pointerIsInsideCanvas =
    mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;

  if (pointerIsInsideCanvas) {
    growFlowerField();
  }
}
