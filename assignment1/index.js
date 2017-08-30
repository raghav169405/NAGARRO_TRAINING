function setTimeout(myfunc,n)
{
    var d=new Date();
    while(new Date-d<n)
    {

    }

    myfunc();
}

function myfunc(d,n)
{
    console.log('Hi,');
}


setTimeout(myfunc,1000);
console.log('Raghav');


