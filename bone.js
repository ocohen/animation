Bone.prototype.SetRotation = function(rotation)
{
    this.rotation = rotation;

    var wl = this.joint.x - this.x;
    var wr = this.width + this.x - this.joint.x;
    var ht = this.joint.y - this.y;
    var hb = this.height + this.y - this.joint.y;

    var lX = this.x + Math.cos(rotation + Math.PI) * wl;
    var lY = this.y - Math.sin(rotation + Math.PI) * wl;
    var rX = this.x + Math.cos(rotation) * wr;
    var rY = this.y - Math.sin(rotation) * wr;

    var tX = this.x + Math.cos(rotation+Math.PI/2) * ht
    var tY = this.y - Math.sin(rotation+Math.PI/2) * ht;
    var bX = this.x + Math.cos(rotation+3*Math.PI/2) * hb;
    var bY = this.y - Math.sin(rotation+3*Math.PI/2) * hb; 

    this.tlX = lX + tX - this.x;
    this.tlY = lY + tY - this.y;

    this.trX = rX + tX - this.x;
    this.trY = rY + tY - this.y;

    this.blX = lX + bX - this.x;
    this.blY = lY + bY - this.y;

    this.brX = rX + bX - this.x;
    this.brY = rY + bY - this.y;

}

function Bone(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.joint = new Joint(x+width/2,y+height/2);
    this.SetRotation(0);
}


Bone.prototype.Draw = function(context)
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
