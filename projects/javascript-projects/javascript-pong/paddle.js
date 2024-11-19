const SPEED = 0.05;

export class Paddle {
    constructor(paddleElement) {
        this.paddleElement = paddleElement;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue('--position'));
    }

    set position(value) {
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        this.paddleElement.style.setProperty('--position', value);
    }

    reset() {
        this.position = 50;
    }

    paddleBounce() {
        return this.paddleElement.getBoundingClientRect();
    }

    update(delta, ballHeight) {
        const direction = ballHeight > this.position ? 1 : -1;
        const movement = direction * SPEED * delta;
        this.position += movement;

        if (this.position < 0) this.position = 0;
        if (this.position > 100) this.position = 100;
    }
}