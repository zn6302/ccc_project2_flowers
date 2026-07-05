let flowers = [];

function setup() {
	createCanvas(600, 600);

	for (let i = 0; i < 80; i++) {
		let baseRandom = random()
		let r1 = baseRandom * width * 0.3;
		let r2 = baseRandom * height * 0.1;
		let ang = random(TWO_PI);
		let x = r1 * cos(ang);
		let y = r2 * sin(ang);

		let t = r1 / (width * 0.3); // 離中心的比例：0=中心，1=邊緣
		let stemH = lerp(70 + random(30), 20 + random(20), t); // 中心高120，邊緣矮50
		let sz = lerp(8 + random(4), 4 + random(2), t);

		flowers.push(new Flower(width / 2 + x, height * 0.6 + y, sz, stemH));
	}
}

function draw() {
	background(245, 240, 230);
	drawSoil(width / 2, height * 0.6, width * 0.35, height * 0.15)

	for (let f of flowers) {
		f.update(mouseX, mouseY);
		f.display();
	}
}
