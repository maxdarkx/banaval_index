var base_url="/banaval";
var numpos=0;
var MAXPOS=6;
var posiciones=[];

$( document ).ready(inicializar);

function inicializar()
{
	$("#tblpos").on('click','.tdpos',guardarPosicion);
	$("#tbluser1").on('click','.tdpos1',jugar);
	$("#frmpos").on('submit',continuar);
	$("#resetear").on('submit',restarting);
}


function guardarPosicion(event)
{
	if(numpos<MAXPOS)
	{
		var pos=event.target.id.substring(3);
		posiciones.push(pos);
		$("#td_"+pos).removeClass('tdpos');
		$("#td_"+pos).addClass('estado1');
	}
	numpos++;
	if(numpos==MAXPOS){
		$("#btnseguir").prop('disabled',false);		
	}
}

function continuar()
{
	for(i in posiciones){
		$("#frmpos").append("<input type='hidden' name='posiciones["+i+"]' value='"+posiciones[i]+"'>");
	}
	return true;
}

function jugar(event)
{
	var pos=event.target.id.substring(4);
	
	var parametros={url:base_url+'/jugar',
					method:'get',
					data:{posicion:pos},
					type:'json',
					processRpta:actualizarTablero
				};
	
	enviarSolicitudAjax(parametros);
}

function actualizarTablero(rpta)
{
	console.log("usuario= "+rpta.wus);
	console.log("maquina= "+rpta.wmac);
	if(rpta.resultado=='ok')
	{
		$("#td1_"+rpta.posicion).removeClass();
		$("#td1_"+rpta.posicion).addClass('estado'+rpta.estado);

		$("#td2_"+rpta.ataque).removeClass();
		$("#td2_"+rpta.ataque).addClass('estado'+rpta.miestado);

	}
	else
	{
		alert("No se pudo realizar la peticion");
	}
	if(rpta.wus==6)
	{
		alert("Gana el Usuario con "+rpta.mov+" movimientos");
		guardarPartida(2);
		
		var input1=document.getElementById('tbluser1').getElementsByTagName('input');
		var input2=document.getElementById('tbluser2').getElementsByTagName('input');
    	for(var i=0; i<input1.length; i++)
        {	
        	input1[i].disabled=true;
			input2[i].disabled=true;
		}
    	
	}
	if(rpta.wmac==6)
	{
		alert("Gana la maquina con"+rpta.mov+" movimientos");
		var input1=document.getElementById('tbluser1').getElementsByTagName('input');
		var input2=document.getElementById('tbluser2').getElementsByTagName('input');

		guardarPartida(1);
		
    	for(var i=0; i<input1.length; i++)
        {	
        	input1[i].disabled=true;
			input2[i].disabled=true;
		}
	}
}

function enviarSolicitudAjax(parametros)
{
	//console.log(parametros);
	var request = $.ajax({
  							url: parametros.url,
  							type: parametros.method,
  							data: parametros.data,
  							dataType: parametros.type
					});
	request.done(parametros.processRpta);
	
	request.fail(function( jqXHR, textStatus ) 
	{
  		alert( "Request failed: " + textStatus );
	});

}

function restarting(event)
{
	var parametros={url:base_url+'/destroySession',
					method:'get',
					data:{parametro:''},
					type:'text',
					processRpta:displayReset
				};
	
	enviarSolicitudAjax(parametros);
}

function guardarPartida(win)
{
	var parametros={url:base_url+'/finPartida',
					method:'get',
					data:{ganador:win},
					type:'text',
					//processRpta:displayReset
				};
	
	enviarSolicitudAjax(parametros);
}

function displayReset()
{
	alert("Ahora se reiniciara el juego");
}