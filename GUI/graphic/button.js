class PedestrianButton {

    constructor(x, y, margin, orientation, text) {
        this.x = x;
        this.y = y;
        this.margin = margin;
        this.orientation = orientation;
        this.text = text;
        this.button = null;
    }

    create() {

        this.button = createButton(this.text);
        switch (this.orientation) {
            case "up-down":
                this.button.position(this.x - this.margin * 1.5, this.y + this.margin * 0.5);
                break;

            case "up-right":
                this.button.position(this.x + this.margin * 0.5, this.y - this.margin * 1.25);
                break;

            case "right-left":
                this.button.position(this.x - this.margin * 0.5, this.y - this.margin * 1.25);
                break;

            case "right-down":
                this.button.position(this.x + this.margin * 1.25, this.y + this.margin * 0.5);
                break;

            case "down-up":
                this.button.position(this.x + this.margin * 1.25, this.y - this.margin * 0.5);
                break;

            case "down-left":
                this.button.position(this.x - this.margin * 0.5, this.y + this.margin * 1.25);
                break;

            case "left-right":
                this.button.position(this.x + this.margin * 0.5, this.y + this.margin * 1.25);
                break;

            case "left-up":
                this.button.position(this.x - this.margin * 1.5, this.y - this.margin * 0.5);
                break;

            default:
                break;
        }
        this.button.mousePressed(this.update);
    }

    update() {
        console.log(this.orientation + " pressed");
        
    }
}