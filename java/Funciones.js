// Dadas la division que contiene todas las pestañas y la de la pestaña que se
// quiere mostrar, la funcion oculta todas las pestañas a excepcion de esa.
function cambiarPestanna(pestannas,pestanna) {

    // Obtiene los elementos con los identificadores pasados.
    pestanna = document.getElementById(pestanna.id);
    let listaPestannas = document.getElementById(pestannas.id);

    // Obtiene las divisiones que tienen el contenido de las pestañas.
    let cpestanna = document.getElementById('c'+pestanna.id);
    let listacPestannas = document.getElementById('contenido'+pestannas.id);

    let i=0;
    // Recorre la lista ocultando todas las pestañas y restaurando el fondo
    // y el padding de las pestañas.
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom','');
        });
        i += 1;
    }

    $(document).ready(function(){
        // Muestra el contenido de la pestaña pasada como parametro a la funcion,
        // cambia el color de la pestaña y aumenta el padding para que tape el
        // borde superior del contenido que esta juesto debajo y se vea de este
        // modo que esta seleccionada.
        $(cpestanna).css('display','');
        $(pestanna).css('background','dimgray');
        $(pestanna).css('padding-bottom','2px');
    });

}
function discrim(){
    var a = document.getElementById('aval').value; //Tomo valor de la casilla a
    var b = document.getElementById('bval').value; //Tomo valor de la casilla b
    var c = document.getElementById('cval').value; //Tomo valor de la casilla c
    return (b*b - 4*a*c);
}

function primer(){
    var a = document.getElementById('avar').value; //Tomo valor de la casilla a
    var b = document.getElementById('bvar').value; //Tomo valor de la casilla b
    var c = ((-b)/a);  //Calculo el valor de X
    c = c.toFixed(2); // Redondeamos a dos decimales
    document.getElementById('x1').value = c;

}
function soluciones(){
    var a = document.getElementById('aval').value; //Tomo valor de la casilla a
    var b = document.getElementById('bval').value; //Tomo valor de la casilla b
    var c = document.getElementById('cval').value; //Tomo valor de la casilla c
    var disc = discrim(a,b,c); //Saco el discriminante
    if (disc < 0) // Si el discriminante me da menor a 0, mando la alerta
        alert("Sin solución real");
    else // Si no, actualizar la casilla que dice X1 y X2 por las formulas de Bashkara.
    {
        var x1 = (-b + Math.sqrt(disc))/(2*a); //Calculo el valor de X1
        var x2 = (-b - Math.sqrt(disc))/(2*a); //Calculo el valor de X2
        document.getElementById("x11").value = x1.toFixed(2); // Redondeamos a dos decimales
        document.getElementById("x22").value =  x2.toFixed(2); // Redondeamos a dos decimales
    }
}

function can() {
    var canvas=document.getElementById("canva"); // refiere al canvas en la pagina
    var ctx=canvas.getContext("2d"); // Indica que el grafico esta en 2 dimensiones
    ctx.clearRect(0,0,canvas.width,canvas.height); //Limpiamos el canvas
    //Graficamos la grilla
    ctx.beginPath();

    for(let i=0;i<canvas.height;i+=10){ //Graficamos lineas horizontales
        ctx.moveTo(0,i+10);
        ctx.strokeStyle="#dbdbdb";
        ctx.lineTo(canvas.width,i+10);
        ctx.stroke();
    }
    for(let t=0;t<canvas.width;t+=10){ //Graficamos lineas verticales
        ctx.moveTo(t+10,0);
        ctx.strokeStyle="#dbdbdb";
        ctx.lineTo(t+10,canvas.height);
        ctx.stroke();
    }
    ctx.closePath();

    ctx.beginPath(); //Graficamos eje de las Y
    ctx.moveTo(0,canvas.height/2);
    ctx.lineWidth=4;
    ctx.strokeStyle="#ff0006";
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();

    ctx.moveTo(canvas.width/2,0); //Graficamos eje de las X
    ctx.strokeStyle="#ff000b";
    ctx.lineWidth=4;
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.stroke();
    ctx.closePath();

    //Grafico
    var a =Number(document.getElementById('avar').value); //Tomo el valor de A
    var b =Number(document.getElementById('bvar').value); //Tomo el valor de B
    var x0 = canvas.width/2; //Calculamos la mitad del grafico
    var y0 = canvas.height/2; //Calculamos la mitad del grafico
    var x;
    var y;
    var dx = 4;
    var xMax = Math.round((canvas.width-x0)/dx); //asginamos valores maximo del grafico
    var xMin = Math.round(-x0/dx); //asignamos valor minimo para el grafico
    ctx.beginPath();
    ctx.strokeStyle="blue"; //Color de dibujo
    ctx.lineWidth=4; //Asignamos Ancho de linea
    for (var i=xMin; i<xMax; i++) //grafico de la recta
    {
        x=dx*i;
        y=(a*x+b);
        if(i===xMin) {
            ctx.moveTo(x0+x,y0-y);
        } else {
            ctx.lineTo(x0+x,y0-y);
        }
    }

    ctx.stroke();
}

function load(){

    var canvas= document.getElementById("canva"); //llamo al canvas
    var c = canvas.getContext('2d'); //pongo el contexto en 2 dimensiones
    const fps= 30; // fotos por segundo
    var x=canvas.width/2,y=canvas.height/2; //ponemo el circulo en el centro del canvas
    var vy=5; //velocidad aleatoria
    var vx=6;
    if (Math.floor(Math.random() * 2) == 0){ //direcion inicial aleatoria
        vx *= -1;
    }
    else {
        vy *= -1;
    }
    setInterval(update, 1000 / fps);

    function update() {
        c.fillStyle="black"; //limpiamos el canvas
        c.fillRect(0,0,canvas.width,canvas.height);
        c.fillStyle="yellow";
        c.beginPath();
        c.arc(x,y,10,0,2*Math.PI,false); // dibujamos un circulo
        c.fill();
        x+=vx; //movemos el circulo
        y+=vy;


        if(((x+10+vx)>canvas.width)||(x+10+vx)<1) //rebote del circulo respecto a x
        {
            vx*=-1;
        }
        if(((y+10+vy)>canvas.height)||(y+10+vy)<=1) //rebote del circulo respecto a y
        {
            vy*=-1;
        }
    }
}

