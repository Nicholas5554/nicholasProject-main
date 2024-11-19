const INITIAL_VELOCITY = 0.02;
const VELOCITY_INCREASE = 0.000015;

export class Ball {
    constructor(ballElement) {
        this.ballElement = ballElement;
        this.resetBall();
    }

    get xVar() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'));
    }

    set xVar(value) {
        this.ballElement.style.setProperty('--x', value);
    }

    get yVar() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'));
    }

    set yVar(value) {
        this.ballElement.style.setProperty('--y', value);
    }

    ballBounds() {
        return this.ballElement.getBoundingClientRect();
    }

    resetBall() {
        this.xVar = 50;
        this.yVar = 50;
        this.direction = { x: 0, y: 0 };

        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = randomNumberInside(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddles) {
        this.xVar += this.direction.x * this.velocity * delta;
        this.yVar += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;

        const ballBounds = this.ballBounds();

        if (ballBounds.bottom >= window.innerHeight || ballBounds.top <= 0) {
            this.direction.y *= -1;
        }

        paddles.forEach(paddle => {
            const paddleBounds = paddle.getBoundingClientRect();
            if (isCollision(ballBounds, paddleBounds)) {
                this.direction.x *= -1;
            }
        });
    }
}

const randomNumberInside = (min, max) => {
    return Math.random() * (max - min) + min;
}

const isCollision = (ballBounds, paddleBounds) => {
    return (
        ballBounds.left <= paddleBounds.right &&
        ballBounds.right >= paddleBounds.left &&
        ballBounds.top <= paddleBounds.bottom &&
        ballBounds.bottom >= paddleBounds.top
    );
}
