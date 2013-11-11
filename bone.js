Bone.prototype.SetRotation = function(rotation)
{
    this.rotation = rotation;

    var wl = this.joint.x - this.x;
    var wr = this.width + this.x - this.joint.x;
    var ht = this.joint.y - this.y;
    var hb = this.height + this.y - this.joint.y;

    var lX = this.joint.x + Math.cos(rotation + Math.PI) * wl;
    var lY = this.joint.y - Math.sin(rotation + Math.PI) * wl;
    var rX = this.joint.x + Math.cos(rotation) * wr;
    var rY = this.joint.y - Math.sin(rotation) * wr;

    var tX = this.joint.x + Math.cos(rotation+Math.PI/2) * ht
    var tY = this.joint.y - Math.sin(rotation+Math.PI/2) * ht;
    var bX = this.joint.x + Math.cos(rotation+3*Math.PI/2) * hb;
    var bY = this.joint.y - Math.sin(rotation+3*Math.PI/2) * hb; 

    this.tlX = lX + tX - this.joint.x;
    this.tlY = lY + tY - this.joint.y;

    this.trX = rX + tX - this.joint.x;
    this.trY = rY + tY - this.joint.y;

    this.blX = lX + bX - this.joint.x;
    this.blY = lY + bY - this.joint.y;

    this.brX = rX + bX - this.joint.x;
    this.brY = rY + bY - this.joint.y;

    for(var i=0; i<this.children.length; i++)
    {
        this.children[i].SetRotation(this.joint.x, this.joint.y, rotation);
    }

}

function Bone(x, y, width, height, joint)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.joint = joint;
    this.children = [];
    this.SetRotation(0);
}

function RootBone(x,y,width,height)
{
    var joint = new Joint(x,y,x,y);
    var bone = new Bone(x,y,width,height,joint);
    joint.bone = bone;

    return bone;
}

Bone.prototype.AddBone = function(x,y,width,height)
{
    var joint = new Joint(x,y,this.joint.x, this.joint.y);
    var bone = new Bone(x,y,width,height, joint);
    joint.bone = bone;
    this.children.push(joint);

    return bone;
}

Bone.prototype.Draw = function(context)
{
    //bone
    context.beginPath();
    context.strokeStyle= "#000000";
    context.moveTo(this.tlX, this.tlY);
    context.lineTo(this.trX, this.trY);
    context.lineTo(this.brX, this.brY);
    context.lineTo(this.blX, this.blY);
    context.lineTo(this.tlX,this.tlY);
    context.stroke();

    this.joint.Draw(context);

    //children
    for(var i=0; i<this.children.length; i++)
    {
        this.children[i].Draw(context);
    }
}
