class Street {
    constructor(width, height, streetWidth) {
        this.width = width;
        this.height = height;
        this.streetWidth = streetWidth;
    }

    draw() {
        noStroke();
        fill(255);
        rect(this.width / 2 - this.streetWidth, 0, 20, this.height / 2 - this.streetWidth + 20);
        rect(this.width / 2 + this.streetWidth, 0, 20, this.height / 2 - this.streetWidth + 20);
        rect(this.width / 2 - this.streetWidth, this.height / 2 + this.streetWidth, 20, this.height / 2 - this.streetWidth);
        rect(this.width / 2 + this.streetWidth, this.height / 2 + this.streetWidth, 20, this.height / 2 - this.streetWidth);
        rect(0, this.height / 2 - this.streetWidth, this.width / 2 - this.streetWidth, 20);
        rect(0, this.height / 2 + this.streetWidth, this.width / 2 - this.streetWidth, 20);
        rect(this.width / 2 + this.streetWidth, this.height / 2 - this.streetWidth, this.width / 2 - this.streetWidth, 20);
        rect(this.width / 2 + this.streetWidth, this.height / 2 + this.streetWidth, this.width / 2 - this.streetWidth, 20);
    }
}