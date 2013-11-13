function Vector3(x,y,w)
{
    this.x = x;
    this.y = y;
    this.w = w;
}

function Point2(x,y)
{
    return new Vector3(x,y,1);
}

function Matrix33(data)
{
    this.data = data;
}

function MakeTransform(x,y,angle)
{
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var data =  [c, -s, x,
                  s, c, y,
                  0, 0, 1];

    return new Matrix33(data);
}


Matrix33.prototype.MatrixMultiply= function(tr)
{
    var out = [0,0,0, 0,0,0, 0,0,0];
    for(var i=0; i<3; i++)
    {
        out[i*3]   = this.data[i*3] * tr.data[0] + this.data[i*3+1] * tr.data[3] + this.data[i*3+2] * tr.data[6];
        out[i*3+1] = this.data[i*3] * tr.data[1] + this.data[i*3+1] * tr.data[4] + this.data[i*3+2] * tr.data[7];
        out[i*3+2] = this.data[i*3] * tr.data[2] + this.data[i*3+1] * tr.data[5] + this.data[i*3+2] * tr.data[8];
    }

    return new Matrix33(out);
}

Matrix33.prototype.Transform= function(v)
{
    var x = this.data[0] * v.x + this.data[1] * v.y + this.data[2] * v.w;
    var y = this.data[3] * v.x + this.data[4] * v.y + this.data[5] * v.w;
    var w = this.data[6] * v.x + this.data[7] * v.y + this.data[8] * v.w;

    return new Vector3(x,y,w);
}

