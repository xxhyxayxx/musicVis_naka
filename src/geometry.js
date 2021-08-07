Geometry = class{
    constructor(x, y, z, rotate_y, size) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotate_y = rotate_y;
        this.size = size;
    }

    show_geometry = () => {
        let level_map = map(level, 0, 1, 0, 35);
        push();
        translate(this.x, this.y, this.z);
        rotateY(this.rotate_y)
        rotateZ(frameCount*1 + bass);
        specularMaterial(250);
        scale(this.size+(level_map*0.05));
        box(100);
        pop();
    }
}