var nome="Usuário";
var temposessao=25;
var intercurto=10;
var interlongo=25;
var modo=1; //automático 1, manual 0;
var qntinter=3;
var vardisplay=document.getElementById("display");

/*---ao iniciar página---*/
window.onload = function (){
	if((localStorage.pomonome)&&(localStorage.pomotemsessao)&&(localStorage.pomotemintcurto)&&(localStorage.pomotemintlongo)&&(localStorage.pomomodo)&&(localStorage.pomoquant))
	{
		nome = localStorage.pomonome;
		temposessao = localStorage.pomotemsessao;
		intercurto = localStorage.pomotemintcurto;
		interlongo = localStorage.pomotemintlongo;
		modo = localStorage.pomomodo;
		qntinter = localStorage.pomoquant;
	}
	document.getElementById("nomeuser").innerHTML= nome;
	document.getElementById("display").innerHTML= temposessao+" min";
}
/*----Configurações-----*/
function conf(){
	/*delertar chaves*/
	localStorage.removeItem("pomonome");
	localStorage.removeItem("pomotemsessao");
	localStorage.removeItem("pomotemintcurto");
	localStorage.removeItem("pomotemintlongo");
	localStorage.removeItem("pomomodo");
	localStorage.removeItem("pomoquant");
	/*definir chaves*/
	localStorage.pomonome=document.getElementById("nomeid").value;
	localStorage.pomotemsessao=document.getElementById("temposessaoid").value;
	localStorage.pomotemintcurto=document.getElementById("tempointercurtoid").value;
	localStorage.pomotemintlongo=document.getElementById("tempointervalolongoid").value;
	
	var radiomodo = document.getElementsByName('modo');
	for (var i = 0, length = radiomodo.length; i < length; i++) {
		if (radiomodo[i].checked) {
		localStorage.pomomodo=radiomodo[i].value;
		break;
		}
	}

	var radios = document.getElementsByName('qntintervasloscurtos');
	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
		localStorage.pomoquant=radios[i].value;
		break;
		}
	}
	/*alimentar variáveis*/
	nome = localStorage.pomonome;
	temposessao=localStorage.pomotemsessao;
	intercurto=localStorage.pomotemintcurto;
	interlongo=localStorage.pomotemintlongo;
	modo=localStorage.pomomodo;
	qntinter=localStorage.pomoquant;
}
function resetchaves(){
	localStorage.removeItem("pomonome");
	localStorage.removeItem("pomotemsessao");
	localStorage.removeItem("pomotemintcurto");
	localStorage.removeItem("pomotemintlongo");
	localStorage.removeItem("pomomodo");
	localStorage.removeItem("pomoquant");

	nome="Usuário";
	temposessao=25;
	intercurto=10;
	interlongo=25;
	modo=1; //automático 1, manual 0;
	qntinter=3;
}

var seconds;
var remseconds;
var minuts;
var toCount=false;
var setCount;
var tiposessao=0; //sessao 0, intervalo curto 1, intervalo longo 2
var contadorsessao=0;
var contadorintervalocurto=0;

function chamada(){
	if(tiposessao==0){
		tempo=temposessao;
		document.getElementById("relogiotittle").innerHTML="Sessão de Trabalho";
	}else if(tiposessao==1){
		tempo=intercurto;
		document.getElementById("relogiotittle").innerHTML="Intervalo Curto";
	}else{
		tempo=interlongo;
		document.getElementById("relogiotittle").innerHTML="Intervalo Longo";
	}
	remove('btnplay');
	display('btnpause');
	seconds=Number(tempo)*60;
	minuts=Number(tempo);
	toCount=true;
	counting();
}

function display(e){
	document.getElementById(e).style.display="block";
}
function remove(e){
	document.getElementById(e).style.display="none";
}

function pause(status){
	toCount=status.value;
	if(status.id=="btnpause"){
		remove("btnpause");
		display("btncontinue");
		display("btnvoltar");
	}else if(status.id=="btncontinue"){
		remove("btncontinue");
		remove("btnvoltar");
		display("btnpause");
	}else{
		remove("btnpause");
		remove("btncontinue");
		remove("btnvoltar");
		display("btnplay");
		clearInterval(setCount);
		tiposessao=0;
		document.getElementById("display").innerHTML= tempo+" min";
	}
	
}

function count(){
if(seconds>0){
	if(toCount==true){
		seconds--;
		remseconds=seconds%60;
		minuts=Math.floor(seconds/60);
		if(minuts<10){
			minuts="0"+minuts;
		}
		if(remseconds<10){
			remseconds="0"+remseconds;
		}
		vardisplay.innerHTML=minuts+" : "+remseconds;
	}
}else{
	clearInterval(setCount);
	var audio = new Audio('bell.mp3');
	audio.play();
	if(tiposessao==0){
		contadorsessao++;
		document.getElementById("contador").innerHTML=contadorsessao;
		if(contadorintervalocurto==qntinter-1){
			tiposessao=2;
			tempo=interlongo;
			document.getElementById("relogiotittle").innerHTML="Intervalo Longo";
		}else{
			tiposessao=1;
			contadorintervalocurto++;
			tempo=intercurto;
			document.getElementById("relogiotittle").innerHTML="Intervalo Curto";
		}
	}else{
		tiposessao=0;
		tempo=temposessao;
		document.getElementById("relogiotittle").innerHTML="Sessão de Trabalho";
	}
	if(modo==1){
		chamada();
	}else{
		remove('btnpause');
		display('btnplay');
		document.getElementById("display").innerHTML= tempo+" min";
	}
}
}
function counting(){

remseconds=seconds%60;
if(minuts<10){
	minuts="0"+minuts;
}
if(remseconds<10){
	remseconds="0"+remseconds;
}
vardisplay.innerHTML=minuts+" : "+remseconds;
setCount=setInterval(count,1000);
}
