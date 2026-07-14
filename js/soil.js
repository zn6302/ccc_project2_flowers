function drawSoil(centerX, centerY, radiusX, radiusY) {
  drawSoilLayer(centerX, centerY, radiusX, radiusY, 1, "#DCD5C8");
  drawSoilLayer(centerX, centerY, radiusX, radiusY, 0.8, "#CDC5B6");
}

function drawSoilLayer(centerX, centerY, radiusX, radiusY, scale, soilColor) {
  noStroke();
  fill(soilColor);
  beginShape();

  for (let i = 0; i <= 48; i += 1) {
    const angle = (i / 48) * TWO_PI;
    const noiseScale = map(
      noise(cos(angle) * 1.5 + 5, sin(angle) * 1.5 + 5),
      0,
      1,
      0.8,
      1.15,
    );

    splineVertex(
      centerX + cos(angle) * radiusX * noiseScale * scale,
      centerY + sin(angle) * radiusY * noiseScale * scale,
    );
  }

  endShape(CLOSE);
}
