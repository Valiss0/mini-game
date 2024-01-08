window.addEventListener("load", () => {
	const canvas = document.getElementById("game");
	const cxt = canvas.getContext("2d");

	const groundImg = new Image();
	groundImg.src = "./images/ground.png";

	const foodImg = new Image();
	foodImg.src = "./images/food.png";

	let game = setInterval(drawGame, 100);

	const box = 32;

	let food = {
		x: Math.floor(Math.random() * 17 + 1) * box,
		y: Math.floor(Math.random() * 15 + 3) * box,
	};

	let score = 0;

	let snake = [];

	snake[0] = {
		x: 9 * box,
		y: 10 * box,
	};

	document.addEventListener("keydown", handleKeydown);

	let direction;

	function handleKeydown(e) {
		const keyCode = e.keyCode;
		if (keyCode === 37 && direction !== "right") {
			direction = "left";
		} else if (keyCode === 38 && direction !== "down") {
			direction = "up";
		} else if (keyCode === 39 && direction !== "left") {
			direction = "right";
		} else if (keyCode === 40 && direction !== "up") {
			direction = "down";
		}
	}

	function gameOver() {
		clearInterval(game);
		alert("Your score: " + score);
	}

	function ownCollision(snakeHead, snakeBody) {
		for (let index = 0; index < snakeBody.length; index++) {
			const element = snakeBody[index];
			if (snakeHead.x === element.x && snakeHead.y === element.y) {
				gameOver();
			}
		}
	}

	function drawGame() {
		cxt.drawImage(groundImg, 0, 0);
		cxt.drawImage(foodImg, food.x, food.y);

		cxt.fillStyle = "white";
		cxt.font = "50px Arial";
		cxt.fillText(score, box * 2.5, box * 1.7);

		for (let index = 0; index < snake.length; index++) {
			const element = snake[index];
			if (index === 0) {
				cxt.fillStyle = "red";
			} else {
				cxt.fillStyle = "green";
			}
			cxt.fillRect(element.x, element.y, box, box);
		}

		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		if (
			snakeX < box ||
			snakeX > box * 17 ||
			snakeY < box * 3 ||
			snakeY > box * 17
		) {
			gameOver();
		}

		if (direction === "left") {
			snakeX -= box;
		}
		if (direction === "right") {
			snakeX += box;
		}
		if (direction === "up") {
			snakeY -= box;
		}
		if (direction === "down") {
			snakeY += box;
		}

		if (food.x === snakeX && food.y === snakeY) {
			food = {
				x: Math.floor(Math.random() * 17 + 1) * box,
				y: Math.floor(Math.random() * 15 + 3) * box,
			};
			score += 1;
		} else {
			snake.pop();
		}

		let newHead = {
			x: snakeX,
			y: snakeY,
		};

		ownCollision(newHead, snake);

		snake.unshift(newHead);
	}
});
