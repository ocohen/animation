function Joint(tr)
{
    this.tr = tr;
    this.children = [];
}

Joint.prototype.AddChild = function(child)
{
    this.children.push(child);
}

Joint.prototype.Rotate = function(theta)
{
    var tr = MakeTransform(0,0,theta);
    this.tr = this.tr.MatrixMultiply(tr);
}

Joint.prototype.Draw = function(context, tr)
{
    var newTr = tr.MatrixMultiply(this.tr);
    var pt = newTr.Transform(new Point2(0,0));
    context.beginPath();
    context.arc(pt.x, pt.y, 5, 0, 2*Math.PI, false);
    context.fillStyle = "#eeaaee";
    context.fill();
    context.stroke();
    
    for(var i=0; i<this.children.length; i++)
    {
        this.children[i].Draw(context, newTr);
    }
}
