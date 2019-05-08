class PedestrianTrafficLight {
    constructor(x, y, diameter, orientation, margin) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.orientation = orientation;
        this.margin = margin;
        this.red = false;
        this.green = false;
    }

    draw() {
        noStroke();
        if (this.orientation === "left-up") {
            fill(255, 0, 0, this.red ? 255 : 50);
            circle(this.x - this.margin * 2, this.y + this.margin * 1.25, this.diameter);
            fill(0, 255, 0, this.green ? 255 : 50);
            circle(this.x - this.margin * 2, this.y + this.margin * 2, this.diameter);
        } else if (this.orientation === "left-right") {
            fill(255, 0, 0, this.red ? 255 : 50);
            circle(this.x - this.margin * 0.5, this.y + this.margin * 3, this.diameter);
            fill(0, 255, 0, this.green ? 255 : 50);
            circle(this.x - this.margin * 1.25, this.y + this.margin * 3, this.diameter);
        } else if (this.orientation === "right-down") {
            fill(255, 0, 0, this.red ? 255 : 50);
            circle(this.x + this.margin * 2.75, this.y - this.margin * 0.5, this.diameter);
            fill(0, 255, 0, this.green ? 255 : 50);
            circle(this.x + this.margin * 2.75, this.y - this.margin * 1.25, this.diameter);
        } else if (this.orientation === "right-left") {
            fill(255, 0, 0, this.red ? 255 : 50);
            circle(this.x + this.margin * 1.25, this.y - this.margin * 2.5, this.diameter);
            fill(0, 255, 0, this.green ? 255 : 50);
            circle(this.x + this.margin * 2, this.y - this.margin * 2.5, this.diameter);
        } else if (this.orientation === "up-down") {
            fill(255, 0, 0, this.red ? 255 : 50);
            circle(this.x - this.margin * 2.75, this.y - (this.margin * 0.5), this.diameter);
            fill(0, 255, 0, this.green ? 255 : 50);
            circle(this.x - this.margin * 2.75, this.y - (this.margin * 1.25), this.diameter);
        } else if (this.orientation === "up-right") {
            fill(255, 0, 0, this.red ? 255 : 50);
            circle(this.x - this.margin * 0.5, this.y - (this.margin * 2.5), this.diameter);
            fill(0, 255, 0, this.green ? 255 : 50);
            circle(this.x - this.margin * 1.25, this.y - (this.margin * 2.5), this.diameter);
        } else if (this.orientation === "down-up") {
            fill(255, 0, 0, this.red ? 255 : 50);
            circle(this.x + this.margin * 2.75, this.y + this.margin * 1.25, this.diameter);
            fill(0, 255, 0, this.green ? 255 : 50);
            circle(this.x + this.margin * 2.75, this.y + this.margin * 2, this.diameter);
        } else if (this.orientation === "down-left") {
            fill(255, 0, 0, this.red ? 255 : 50);
            circle(this.x + this.margin * 1.25, this.y + this.margin * 3, this.diameter);
            fill(0, 255, 0, this.green ? 255 : 50);
            circle(this.x + this.margin * 2, this.y + this.margin * 3, this.diameter);
        }
    }

    update(red, green) {
        this.red = red;
        this.green = green;
    }
}