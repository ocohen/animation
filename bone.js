function Bone(width, height, tr)
{
    this.trans = tr;
    this.width = width;
    this.height = height;
}

Bone.prototype.ApplyTransform = function(tr)
{
    this.tl = tr.Transform(new Point2(0,0));
    this.tr = tr.Transform(new Point2(this.width,0));
    this.bl = tr.Transform(new Point2(0,this.height));
    this.br = tr.Transform(new Point2(this.width,this.height));
}

Bone.prototype.Draw = function(context, tr)
{
    var newTr = tr.MatrixMultiply(this.trans);
    this.ApplyTransform(newTr);

    context.beginPath();
    context.strokeStyle= "#000000";
    context.moveTo(this.tl.x, this.tl.y);
    context.lineTo(this.tr.x, this.tr.y);
    context.lineTo(this.br.x, this.br.y);
    context.lineTo(this.bl.x, this.bl.y);
    context.lineTo(this.tl.x,this.tl.y);
    context.stroke();
}
