class Shape{
    static idCounter=0;
    constructor(name,color){
        this.id=++Shape.idCounter;
        this.name=name;
        this.color=color;
        }
        describe(){
            console.log(`${this.name} color is ${this.color}`);
        }
        static compare(a,b){
            if(a>b) return a;
            else return b;
        }
}

// shape1=new Shape('circle','red');
// shape2=new Shape('triangle','blue');
// shape1.describe();
// shape2.describe();

class Circle extends Shape{
    constructor(name,color,radius){
        super(name,color);
        this.radius=radius;
    }
    area(){
        return Math.PI*Math.pow(this.radius,2);
    }
    perimeter(){
        return 2*Math.PI*this.radius;
    }
    describe(){
        console.log(`${this.name} color is ${this.color} and radius is ${this.radius}`);
    }
}
class Rectangle extends Shape{
    constructor(name,color,w,h){
        super(name,color);
        this.width=w;
        this.height=h;
    }
    area(){
        return this.width*this.height;
    }
    perimeter(){
        return 2*(this.width+this.height);
    }
     describe(){
        console.log(`${this.name} color is ${this.color} ,its height is ${this.height} and width is ${this.width}`);
    }
}
class Triangle extends Shape{
    constructor(name,color,base,height){
        super(name,color);
        this.base=base;
        this.height=height;
    }
    area(){
        return 0.5*this.base*this.height;
    }
     describe(){
        console.log(`${this.name} color is ${this.color} ,its height is ${this.height} and base is ${this.base}`);
    }
}
circle=new Circle('circle','yellow',3);
let cArea=circle.area()
circle.describe()
console.log(cArea);
console.log(circle.perimeter());
rect=new Rectangle('rectangle','yellow',2,6);
tri=new Triangle("triangle","orange",5,2);
tri.area();
rect.describe();
let rArea=rect.area()
console.log(rArea);
console.log(rect.perimeter());
console.log(Shape.compare(cArea,rArea));
class ShapeCollection{
    constructor(){
        this.shapes=[];
    }
    add(shape){
        this.shapes.push(shape);
       console.log(this.shapes);
    }
    getTotalArea(){
        return this.shapes.reduce((total,shape)=>total+shape.area(),0);
    }
    getByType(Type){
        return this.shapes.filter(shape=>shape instanceof Type);
    }
    sortByArea(){
        return this.shapes.sort((a,b)=>a.area()-b.area());
    }
    removeById(shapeId){
        this.shapes=this.shapes.filter(shape=>shape.id !=shapeId)
    }
}
const collection=new ShapeCollection();
collection.add(circle);
collection.add(rect);
collection.add(tri);
console.log(`${collection.shapes.length} shapes are added`);
console.log("Total Area",collection.getTotalArea().toFixed(2));
console.log("Rectangle in collection:",collection.getByType(Rectangle));
console.log(collection.sortByArea());
const id=rect.id;
collection.removeById(id);
console.log(collection.shapes);

console.log(tri instanceof Triangle);
console.log(rect.constructor.name);
console.log(Object.getPrototypeOf(circle));
console.log(Circle.prototype);
console.log(Object.getPrototypeOf(circle)===Circle.prototype);
