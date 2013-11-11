function Global()
{
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
}

function Joint(x,y,pX, pY)
{
    this.x = x;
    this.y = y;
    this.rotation = Math.atan2(pY-y,x-pX);
    this.len = Math.sqrt((x-pX)*(x-pX) + (y-pY)*(y-pY));
    this.children = [];
    this.p = p;
}

Joint.prototype.SetRotation = function(rotation)
{
    this.rotation = rotation;
}

Joint.prototype.SetRotation(x,y,rotation)
{
    this.x = x + this.len * Math.cos(this.rotation + rotation);
    this.y = y - this.len * Math.sin(this.rotation + rotation);
}

Joint.prototype.Draw = function(context)
{
    context.beginPath();
    context.arc(this.x, this.y, 5, 0, 2*Math.PI, false);
    context.fillStyle = "#eeaaee";
    context.fill();
    context.stroke();
}
