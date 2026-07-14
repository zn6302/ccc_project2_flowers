class Flower {
  constructor(x, y, size, stemHeight) {
    this.x = x;
    this.y = y - stemHeight;
    this.rootY = y;
    this.stemHeight = stemHeight;

    this.type = floor(random(6));
    this.centerRadius = random(size, size * 1.5);
    this.petalDistance = random(size * 1.2, size * 2.5);
    this.petalWidth = random(size * 1.6, size * 4);
    this.petalHeight = random(size * 0.6, size * 1.2);
    this.petalCount = floor(random(5, 13));

    this.primaryColor = random(FLOWER_PALETTE);
    this.secondaryColor = random(
      FLOWER_PALETTE.filter((colorValue) => colorValue !== this.primaryColor),
    );
    this.stemColor = random(STEM_PALETTE);
    this.randomId = random();

    this.sway = 0;
    this.swayVelocity = 0;

    // Spline 花型的形變參數。
    this.time = random(500, 45000);
    this.angleFrequency = random(2, 8);
    this.angleAmplitude = random(0.05, 0.25);
    this.radiusFrequency = random(2, 7);
    this.radiusAmplitude = random(0.05, 0.25);

    this.babyBreathSprays = this.createBabyBreathSprays();
  }

  createBabyBreathSprays() {
    const sprays = [];
    const sprayCount = 5 + floor(random(4));

    for (let i = 0; i < sprayCount; i += 1) {
      const fan =
        map(i, 0, max(1, sprayCount - 1), -1, 1) + random(-0.25, 0.25);
      const tipX = fan * this.centerRadius * random(2.4, 4.2);
      const tipY = -this.centerRadius * random(4.4, 7.2);
      const midX =
        tipX * random(0.25, 0.55) +
        random(-this.centerRadius * 0.5, this.centerRadius * 0.5);
      const midY = tipY * random(0.35, 0.65);
      const branches = [];
      const branchCount = 5 + floor(random(4));

      for (let j = 0; j < branchCount; j += 1) {
        const progress = random(0.28, 0.95);
        const startX = bezierPoint(0, midX * 0.35, midX, tipX, progress);
        const startY = bezierPoint(0, midY * 0.45, midY, tipY, progress);
        const side = j % 2 === 0 ? -1 : 1;
        const branchAngle =
          -HALF_PI + fan * 0.45 + side * random(0.18, 0.7);
        const branchLength =
          this.centerRadius *
          random(0.9, 2.4) *
          map(progress, 0.28, 0.95, 1.2, 0.65);
        const endX = startX + cos(branchAngle) * branchLength;
        const endY = startY + sin(branchAngle) * branchLength;
        const buds = [];
        const budCount = 2 + floor(random(4));

        for (let k = 0; k < budCount; k += 1) {
          const budAngle = random(TWO_PI);
          const budDistance = random(
            this.centerRadius * 0.05,
            this.centerRadius * 0.75,
          );

          buds.push({
            x: endX + cos(budAngle) * budDistance,
            y: endY + sin(budAngle) * budDistance * 0.75,
            radiusScale: random(0.2, 0.48),
          });
        }

        branches.push({ startX, startY, endX, endY, buds });
      }

      const tipBuds = [];

      for (let k = 0; k < 5; k += 1) {
        const budAngle = random(TWO_PI);
        const budDistance = random(
          this.centerRadius * 0.1,
          this.centerRadius * 0.8,
        );

        tipBuds.push({
          x: tipX + cos(budAngle) * budDistance,
          y: tipY + sin(budAngle) * budDistance * 0.7,
          radiusScale: random(0.24, 0.55),
        });
      }

      sprays.push({ midX, midY, tipX, tipY, branches, tipBuds });
    }

    return sprays;
  }

  display() {
    const topX = this.x + this.sway;

    this.displayStem(topX);

    push();
    translate(topX, this.y);
    stroke(this.primaryColor);
    fill(this.secondaryColor);

    switch (this.type) {
      case 0:
        this.displayRadialPetals();
        break;
      case 1:
        this.displayDoubleLayerPetals();
        break;
      case 2:
        this.displayRoundPetals();
        break;
      case 3:
        this.displayLinearBloom();
        break;
      case 4:
        this.displaySplineBloom();
        break;
      case 5:
        this.displayBabyBreath();
        break;
    }

    pop();
  }

  displayStem(topX) {
    push();
    stroke(this.stemColor);
    strokeWeight(3);
    strokeCap(ROUND);
    noFill();

    const controlPoint1X = this.x + this.sway * 0.15;
    const controlPoint1Y = this.rootY - this.stemHeight * 0.33;
    const controlPoint2X = this.x + this.sway * 0.6;
    const controlPoint2Y = this.rootY - this.stemHeight * 0.66;

    bezier(
      this.x,
      this.rootY,
      controlPoint1X,
      controlPoint1Y,
      controlPoint2X,
      controlPoint2Y,
      topX,
      this.y,
    );
    pop();
  }

  displayRadialPetals() {
    for (let i = 0; i < this.petalCount; i += 1) {
      ellipse(
        this.petalDistance,
        0,
        this.petalWidth,
        this.petalHeight,
      );
      rotate(TWO_PI / this.petalCount);
    }

    circle(0, 0, this.centerRadius);
    fill(255, 160);
    circle(0, 0, this.centerRadius / 2);
  }

  displayDoubleLayerPetals() {
    for (let i = 0; i < this.petalCount; i += 1) {
      const angle = (i / this.petalCount) * TWO_PI;

      circle(
        cos(angle) * this.petalDistance * 0.6,
        sin(angle) * this.petalDistance * 0.6,
        this.petalWidth * 0.5,
      );
    }

    for (let i = 0; i < this.petalCount; i += 1) {
      const angle = ((i + 0.5) / this.petalCount) * TWO_PI;

      circle(
        cos(angle) * this.petalDistance * 0.4,
        sin(angle) * this.petalDistance * 0.4,
        this.petalHeight,
      );
    }

    noStroke();
    fill(this.primaryColor);
    circle(0, 0, this.centerRadius);
    fill(255, 255, 255, 180);
    circle(0, 0, this.centerRadius * 0.5);
  }

  displayRoundPetals() {
    const petalCount = floor(map(this.petalCount, 5, 12, 4, 7));

    for (let i = 0; i < petalCount; i += 1) {
      const angle = (i / petalCount) * TWO_PI;

      circle(
        cos(angle) * this.centerRadius * 1.5,
        sin(angle) * this.centerRadius * 1.5,
        this.centerRadius * 2.5,
      );
    }

    circle(0, 0, this.centerRadius * 2);

    strokeCap(ROUND);
    strokeWeight(2);

    const lineCount = 14 + floor(this.randomId * 5);

    for (let i = 0; i < lineCount; i += 1) {
      const angle = (i / lineCount) * TWO_PI;
      const lengthMultiplier = map(
        noise(i * 0.4 + this.centerRadius * 0.01),
        0,
        1,
        1,
        1.5,
      );

      line(
        0,
        0,
        cos(angle) * this.centerRadius * lengthMultiplier,
        sin(angle) * this.centerRadius * lengthMultiplier,
      );
    }
  }

  displayLinearBloom() {
    const lineCount = 12 + floor(this.randomId * 8);

    for (let i = 0; i < lineCount; i += 1) {
      const angle = (i / lineCount) * TWO_PI;
      const endpointX = cos(angle) * this.centerRadius * 2;
      const endpointY = sin(angle) * this.centerRadius * 2;

      line(0, 0, endpointX, endpointY);

      push();
      noStroke();
      fill(this.primaryColor);
      circle(endpointX, endpointY, this.centerRadius * 0.4);
      pop();
    }

    push();
    circle(0, 0, this.centerRadius * 1.5);
    noStroke();
    fill(this.primaryColor);
    circle(0, 0, this.centerRadius);
    pop();
  }

  displaySplineBloom() {
    const baseSize = this.centerRadius * 3;
    const evenRadius = sin(this.time / 1300) * baseSize;
    const oddRadius = sin(this.time / 1000 + PI) * baseSize;
    const tightness = sin(this.time / 750) * 5;

    stroke(this.primaryColor);
    fill(this.secondaryColor);
    strokeWeight(1);

    this.drawSplinePetalLayer(
      evenRadius,
      oddRadius,
      tightness,
      -1,
    );

    stroke(this.secondaryColor);
    fill(this.primaryColor);

    this.drawSplinePetalLayer(
      oddRadius,
      evenRadius,
      tightness,
      1,
    );

    noStroke();
    fill(255, 200);
    circle(0, 0, this.centerRadius * 0.08);
  }

  drawSplinePetalLayer(evenRadius, oddRadius, tightness, direction) {
    beginShape();
    splineProperty("tightness", tightness);

    for (let i = 0; i < 12; i += 1) {
      const rotation =
        direction * (i % 2 === 0 ? -this.time / 10000 : this.time / 10000);
      const baseAngle = map(i, 0, 12, 0, TAU) + rotation;
      const baseRadius = i % 2 === 0 ? evenRadius : oddRadius;
      const angle =
        baseAngle + sin(i * this.angleFrequency) * this.angleAmplitude;
      const radius =
        baseRadius *
        (1 + cos(i * this.radiusFrequency) * this.radiusAmplitude);

      splineVertex(cos(angle) * radius, sin(angle) * radius);
    }

    endShape(CLOSE);
  }

  displayBabyBreath() {
    strokeCap(ROUND);
    noFill();

    for (const spray of this.babyBreathSprays) {
      this.strokeWithAlpha(this.secondaryColor, 190);
      strokeWeight(1);
      bezier(
        0,
        0,
        spray.midX * 0.35,
        spray.midY * 0.45,
        spray.midX,
        spray.midY,
        spray.tipX,
        spray.tipY,
      );

      for (const branch of spray.branches) {
        this.strokeWithAlpha(this.secondaryColor, 180);
        strokeWeight(0.8);
        line(branch.startX, branch.startY, branch.endX, branch.endY);

        for (const bud of branch.buds) {
          this.displayBabyBreathBud(
            bud.x,
            bud.y,
            this.centerRadius * bud.radiusScale,
          );
        }
      }

      for (const bud of spray.tipBuds) {
        this.displayBabyBreathBud(
          bud.x,
          bud.y,
          this.centerRadius * bud.radiusScale,
        );
      }
    }

    noStroke();
    this.fillWithAlpha(this.primaryColor, 230);
    circle(0, -this.centerRadius * 0.2, this.centerRadius * 0.38);
  }

  displayBabyBreathBud(x, y, radius) {
    noStroke();
    this.fillWithAlpha(this.primaryColor, 70);
    circle(x, y, radius * 1.55);
    this.fillWithAlpha(this.secondaryColor, 235);
    circle(x, y, radius);
    this.fillWithAlpha(this.primaryColor, 145);
    circle(x - radius * 0.12, y - radius * 0.12, radius * 0.45);
  }

  fillWithAlpha(baseColor, alpha) {
    fill(red(baseColor), green(baseColor), blue(baseColor), alpha);
  }

  strokeWithAlpha(baseColor, alpha) {
    stroke(red(baseColor), green(baseColor), blue(baseColor), alpha);
  }

  update(pointerX, pointerY) {
    const horizontalDistance = this.x + this.sway - pointerX;
    const pointerDistance = dist(
      this.x + this.sway,
      this.y,
      pointerX,
      pointerY,
    );

    let pointerForce = 0;

    if (pointerDistance < 90) {
      const direction = horizontalDistance / (pointerDistance + 1);
      const strength = 1 - pointerDistance / 90;
      pointerForce = direction * strength;
    }

    this.swayVelocity += -this.sway * 0.12 + pointerForce * 2.5;
    this.swayVelocity *= 0.88;
    this.sway += this.swayVelocity;
    this.time += deltaTime * 0.35;
  }
}
