var i=0;
var k=0;

function forEach(array,callback)
{
    while(i<array.length)
    {
        callback(array[i]);
        i++;
    }
}

function callback(arr)
{
    console.log(arr);
}

forEach([1,2,3,4,5,6,7,8,9,10],callback);


function  map(array, square_number) {
    var i=0
    var b = new Array(array.length);
    while (i<array.length)
    {
        b[i] = square_number(array[i]);
        i=i+1;
    }
    return b;
}

function square_number(a) {
    return a*a;
}

var newarray=map([1,2,3,4,5,6,],square_number);
console.log(newarray);