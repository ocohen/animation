function Joint(x,y,pX, pY)
{
    this.x = x;
    this.y = y;
    this.rotation = Math.atan2(pY-y,x-pX);
    this.len = Math.sqrt((x-pX)*(x-pX) + (y-pY)*(y-pY));
}

Joint.prototype.SetRotationGlobal = function(x,y,rotation)
{
    var oldX = this.x;
    var oldY = this.y;
    this.x = x + this.len * Math.cos(this.rotation + rotation);
    this.y = y - this.len * Math.sin(this.rotation + rotation);

    var dX = this.x - oldX;
    var dY = this.y - oldY;

    this.bone.x += dX;
    this.bone.y += dY;
    this.bone.SetRotationGlobal(rotation);
}

Joint.prototype.Draw = function(context)
{
    context.beginPath();
    context.arc(this.x, this.y, 5, 0, 2*Math.PI, false);
    context.fillStyle = "#eeaaee";
    context.fill();
    context.stroke();
}
