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

Joint.prototype.GetEffector = function(id,tr)
{
    var newTr = tr.MatrixMultiply(this.tr);
    for(var i=0; i<this.children.length; i++)
    {
        var s = this.children[i].GetEffector(id, newTr);
        if(s != false)
        {
            return s;
        }
    }
}

Joint.prototype.BuildJacobian = function(J, s, tr)
{
    var newTr = tr.MatrixMultiply(this.tr);
    var Pj = newTr.Transform(Point2(0,0));
    var Vj = Point2(0,0);
    var delta = s.Minus(Pj);   
    J.push( Vj.Cross( delta ) );

    for(var i=0; i<this.children.length; i++)
    {
        this.children[i].BuildJacobian(J, s, newTr);
    }
}

Joint.prototype.Draw = function(context, tr)
{
    var newTr = tr.MatrixMultiply(this.tr);
    var pt = newTr.Transform(Point2(0,0));
    context.beginPath();
    context.arc(pt.x, pt.y, 3, 0, 2*Math.PI, false);
    context.fillStyle = "#eeaaee";
    context.fill();
    context.stroke();
    
    for(var i=0; i<this.children.length; i++)
    {
        this.children[i].Draw(context, newTr);
    }
}
