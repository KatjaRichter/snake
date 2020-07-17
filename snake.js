 "use strict"
  var canvas = document.getElementById('game'),
      ctx = canvas.getContext("2d"),
      pox,poy,
      npx,npy,
      apx,apy,
      boolean,
      dix = 30, diy = 0,
      keydown = false,
      loopspeed = 250,
      spielintervall,
      score = 0,
      speedname = " Mittel",
      gamesize = 300,
      tutorial = 0,
      colint,
      col = 0,
      escapeloop = false;
  document.getElementById("h1").innerHTML = "Willkommen zu Snake!";
  document.getElementById("p").innerHTML = "Wählen Sie eine Geschwindigkeit! Verstellen Sie auch nach Wunsch die Größe!";





  function Zufallszahl() {
    var res = (Math.floor(Math.random() * (gamesize/30))) // 0<=x<1

      return res=res*30+1;

  };

  function Spielbeginn(){
  clearInterval(colint);
  ctx.fillStyle ="#FFFFFF";
  ctx.fillRect(0,0,500,500);
  ctx.fillStyle ="#CEF6CE";
  ctx.fillRect(0,0,gamesize,gamesize);
  ctx.fillStyle ="#444444";
  pox = [Zufallszahl()];
  poy = [Zufallszahl()];
  ctx.fillRect(pox[0],poy[0],28,28);
  apx = Zufallszahl();
  apy = Zufallszahl();
  ctx.fillStyle = "#EE3B3B";
  ctx.fillRect(apx,apy,28,28);
  score = 0;
  if (tutorial == 3)
      {document.getElementById("p").innerHTML = "Viel Spaß!";};
  document.getElementById('high').innerHTML = score;
  document.getElementById('size').innerHTML=(gamesize/30)+"x"+(gamesize/30);
  document.getElementById('speed').innerHTML=speedname;
  };

  function loop(){


  npx = pox[0] + dix;
  npy = poy[0] + diy;


  if (npx == (gamesize+1)){npx = 1;};
  if (npy == (gamesize+1)){npy = 1;};
  if (npx == -29){npx = (gamesize-29);};
  if (npy == -29){npy = (gamesize-29);};

  for (var t=0; t<pox.length-1; t++){
    if(npx == pox[t] && npy == poy[t])
    {Spielbeginn();};
  };

  if (npx == apx && npy == apy){
      if (tutorial == 2)
          {document.getElementById("p").innerHTML = "Aber fressen Sie sich nicht!";
           tutorial = 3};
      pox.unshift(npx);
      poy.unshift(npy);
      if (((gamesize/30)*(gamesize/30)) == pox.length)
          {clearInterval(spielintervall);
           escapeloop = true;
              pox = [-1];
              }

      score++;
      document.getElementById("high").innerHTML = score;
      do {boolean = false;
          apx = Zufallszahl();
          apy = Zufallszahl();
          for (var s=0; s<pox.length; s++){
               if (apx == pox[s] && apy == poy[s]){
                  boolean=true;
                 }
               };
          } while (boolean==true);

}
  else {if (pox.length > 1){
           for (var i=pox.length-1; i>0; i--){
               pox[i] = pox[i-1];
               poy[i] = poy[i-1];
               };
           };
       pox[0] = npx;
       poy[0] = npy;
       };

  ctx.fillStyle ="#CEF6CE";
  ctx.fillRect(0,0,gamesize,gamesize);
  ctx.fillStyle ="#444444";
  ctx.fillRect(pox[0],poy[0],28,28);
  ctx.fillStyle ="#008000";
  for (var j=1; j < pox.length; j++){
      ctx.fillRect(pox[j],poy[j],28,28);
      };

  for (var k=1; k<pox.length; k++){
   var a=pox[k-1]-pox[k];
   var b=poy[k-1]-poy[k];
   if (a==30){ctx.fillRect(pox[k]+28,poy[k],2,28);}
   if (a==-30){ctx.fillRect(pox[k]-2,poy[k],2,28);}
   if (b==30){ctx.fillRect(pox[k],poy[k]+28,28,2);}
   if (b==-30){ctx.fillRect(pox[k],poy[k]-2,28,2);}
 }

  ctx.fillStyle = "#EE3B3B";
  ctx.fillRect(apx,apy,28,28);

  keydown = false;

  if(escapeloop == true){
     ctx.fillStyle ="#8A2BE2";
     ctx.fillRect(0,0,gamesize,gamesize);
     colint = setInterval(regenbogen,300);
     escapeloop = false;
  };

  };


  function speed(s){
    if (tutorial == 0)
        {document.getElementById("h1").innerHTML = "Snake";
        document.getElementById("p").innerHTML = "Steuern Sie den Schlangenkopf mit den Pfeiltasten, oder den Tasten WASD!";
        tutorial = 1; };
    clearInterval(spielintervall);
    if (s==1){loopspeed=400;speedname=" Langsam";};
    if (s==2){loopspeed=250;speedname=" Mittel";};
    if (s==3){loopspeed=100;speedname=" Schnell";};
    if (s==4){loopspeed=5;speedname=" Turbo";};

   Spielbeginn();
   spielintervall = setInterval(loop,loopspeed);
   };

   function size(s){

     clearInterval(spielintervall);
     if (s==1&&gamesize>60)
         {gamesize=gamesize-30;};
     if (s==2&&gamesize<450)
         {gamesize=gamesize+30;};

    Spielbeginn();
    spielintervall = setInterval(loop,loopspeed);
   };

   function regenbogen(){
     if(col == 0){ctx.fillStyle ="#DB3D3D";
     ctx.fillRect(0,0,gamesize,gamesize);};
     if(col == 1){ctx.fillStyle ="#F17222";
     ctx.fillRect(0,0,gamesize,gamesize);};
     if(col == 2){ctx.fillStyle ="#346778";
     ctx.fillRect(0,0,gamesize,gamesize);};
     if(col == 3){ctx.fillStyle ="#56AE35";
     ctx.fillRect(0,0,gamesize,gamesize);};
     if(col == 4){ctx.fillStyle ="#0180B5";
     ctx.fillRect(0,0,gamesize,gamesize);};
     if(col == 5){ctx.fillStyle ="#8800FF";
     ctx.fillRect(0,0,gamesize,gamesize);};
     if(col == 5){col = 0;}
     else{col++;};
   };



  document.addEventListener('keydown', function() {

    if ((event.which == 37 || event.which == 65) && dix == 0 && keydown == false) {
      if(tutorial == 1)
         {document.getElementById("p").innerHTML = "Fressen Sie die roten Äpfel!";
          tutorial = 2;};
      dix = -30;
      diy = 0;
      keydown = true;
    };

    if ((event.which == 38 || event.which == 87) && diy == 0 && keydown == false) {
      if(tutorial == 1)
         {document.getElementById("p").innerHTML = "Fressen Sie die roten Äpfel!";
          tutorial = 2;};
      diy = -30;
      dix = 0;
      keydown = true;
    };

    if ((event.which == 39 || event.which == 68) && dix == 0 && keydown == false) {
      if(tutorial == 1)
         {document.getElementById("p").innerHTML = "Fressen Sie die roten Äpfel!";
          tutorial = 2;};
      dix = 30;
      diy = 0;
      keydown = true;
    };

    if ((event.which == 40 || event.which == 83) && diy == 0 && keydown == false) {
      if(tutorial == 1)
         {document.getElementById("p").innerHTML = "Fressen Sie die roten Äpfel!";
          tutorial = 2;};
      diy = 30;
      dix = 0;
      keydown = true;
    };

  });
