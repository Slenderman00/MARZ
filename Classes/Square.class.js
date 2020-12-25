class square {
    constructor(objects, canvas, screen) {
        this.canvas;
        this.objects = [];
        this.screen = [];
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      

    addCanvas = (canvas) => {
        this.canvas = canvas;
    }

    add = (name, x, y, width, height, rotation, sprite, layer) => {
        this.objects.push({ "name": name, "x": x, "y": y, "width": width, "height": height, "rotation": rotation, "sprite": sprite, "layer": layer });
    }

    delete(name) {
        let i = 0;
        this.objects.forEach(obj => { 
            if(obj.name == name) {
                this.objects.splice(i, 1);
            }
            i++;
        });
    }

    updateobjects = (name, x, y, width, height, rotation, sprite1, layer) => {
        let i = 0;
        this.objects.forEach(obj => {
            if(name == obj.name) {
                let object = obj;
                if(x != null) {
                    object.x = x;
                }
                if(y != null) {
                    object.y = y;
                }
                if(width != null) {
                    object.width = width;
                }
                if(height != null) {
                    object.height = height;
                }
                if(rotation != null) {
                    object.rotation = rotation;
                }
                if(sprite1 != null) {
                    object.sprite = sprite1;
                }
                if(layer != null) {
                    object.layer = layer;
                }
                this.objects.splice(i, 1);
                this.objects.push(object);
            }
            i++;
        });
    }

    updatescreen = (name, x, y, width, height, rotation, sprite1, layer) => {
        let i = 0;
        this.screen.forEach(obj => {
            if(name == obj.name) {
                let object = obj;
                if(x != null) {
                    object.x = x;
                }
                if(y != null) {
                    object.y = y;
                }
                if(width != null) {
                    object.width = width;
                }
                if(height != null) {
                    object.height = height;
                }
                if(rotation != null) {
                    object.rotation = rotation;
                }
                if(sprite1 != null) {
                    object.sprite = sprite1;
                }
                if(layer != null) {
                    object.layer = layer;
                }
                this.screen.splice(i, 1);
                this.screen.push(object);
            }
            i++;
        });
    }

    contact = (name, func) => {
        let x = 0;
        let y = 0;
        let width = 0;
        let height = 0;
        let obj2;

        this.screen.forEach(obj => {
            if(obj.name == name) {
                x = obj.x;
                y = obj.y;
                width = obj.width;
                height = obj.height;
                obj2 = obj;
            }
        });

        this.screen.forEach(obj => {
            if (x < obj.x + obj.width && x + width > obj.x && y < obj.y + obj.height && y + height > obj.y) {
                func(obj, obj2)
            }
        });
    }

    load = (obj) => {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.addEventListener("load", () => {
                resolve(image);
            });
            image.addEventListener("error", (err) => {
                reject(err);
            });
            image.src = obj.sprite;
        });
    }

    init = (x, y) => {
        let render = [];
        this.objects.forEach(obj => {
            if(obj.x + 100 >= -x && obj.x <= -x + 1920 && obj.y + 100 >= -y && obj.y <= -y + 1080) {
                render.push(obj)
            }
        });
        this.screen = render;
    }

    draw = (transX, transY, x, y) => {
        let ctx = this.canvas.getContext("2d");
        ctx.msImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.translate(transX, transY);

        let render = [];
        //athis.objects.sort((a, b) => {return  a.x > x});
        this.objects.forEach(obj => {
            if(obj.x + 100 >= -x && obj.x <= -x + 1920 && obj.y + 100 >= -y && obj.y <= -y + 1080) {
                render.push(obj)
            }
        });

        this.screen = render;

        render.sort((a, b) => {return a.layer - b.layer});

        Promise
        .all(render.map(i => this.load(i)))
        .then((images) => {
            let i = 0;
            ctx.clearRect(x, y, this.canvas.width, this.canvas.height);
            images.forEach((image) => {
                try {
                    ctx.save(); 
                    ctx.rotate(Math.PI / 180 * render[i].rotation);
                    ctx.drawImage(image, render[i].x + x, render[i].y + y, render[i].width, render[i].height);
                    ctx.restore();
                } catch {

                }
                i++;
            });
        }).catch((err) => {
            console.error(err);
        });
    }
}