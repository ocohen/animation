Shape.prototype.SetRotation = function(rotation)
{
    this.rotation = rotation;

    var lX = this.x + Math.cos(rotation + Math.PI) * this.width/2;
    var lY = this.y - Math.sin(rotation + Math.PI) * this.width/2;
    var rX = this.x + Math.cos(rotation) * this.width/2;
    var rY = this.y - Math.sin(rotation) * this.width/2;

    var tX = this.x + Math.cos(rotation+Math.PI/2) * this.height/2;
    var tY = this.y - Math.sin(rotation+Math.PI/2) * this.height/2;
    var bX = this.x + Math.cos(rotation+3*Math.PI/2) * this.height/2;
    var bY = this.y - Math.sin(rotation+3*Math.PI/2) * this.height/2;

    /*this.tlX = lX + tX - this.x;
    this.tlY = lY + tY - this.y;

    this.trX = rX + tX - this.x;
    this.trY = rY + tY - this.r;*/

    this.tlX = lX + tX - this.x;
    this.tlY = lY + tY - this.y;

    this.trX = rX + tX - this.x;
    this.trY = rY + tY - this.y;

    this.blX = lX + bX - this.x;
    this.blY = lY + bY - this.y;

    this.brX = rX + bX - this.x;
    this.brY = rY + bY - this.y;

}

function Shape(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.SetRotation(0);
}


Shape.prototype.Draw = function(context)
{
    this.SetRotation(this.rotation + 0.01);

    context.beginPath();
    context.strokeStyle= "#000000";
    context.moveTo(this.tlX, this.tlY);
    context.lineTo(this.trX, this.trY);
    context.lineTo(this.brX, this.brY);
    context.lineTo(this.blX, this.blY);
    context.lineTo(this.tlX,this.tlY);
    context.stroke()
}
