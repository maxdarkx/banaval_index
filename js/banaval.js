var base_url="/banaval";
var numpos=0;
var MAXPOS=6;
var posiciones=[];

$( document ).ready(inicializar);

function inicializar()
{
	$("#tblpos").on('click','.tdpos',guardarPosicion);
	$("#tbluser1").on('click','tdpos1',jugar);
	$("#frmpos").on('submit',continuar);
}


function guardarPosicion(event)
{
	var pos=event.target.id.substring(3);
	posiciones.push(pos);
	$("#td_"+pos).removeClass('tdpos');
	$("#td_"+pos).addClass('estado1');
	//$("#td_"+pos).css('background','green');
	numpos++;
	if(numpos==MAXPOS){
		$("#btnseguir").prop('disabled',false);		
	}
	//verificar si funciona!!
	/*
	parametros={url:base_url+'/posiciones/guardar/'+pos,method:'get',data:'',type:'json',processRpta:procesarGuardarPosicion};
	enviarSolicitudAjax(parametros);
	//verificar*/
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
	if(rpta.resultado=='ok')
	{
		$("#td1_"+rpta.posicion).addClass('estado'+rpta.estado);
		$("#td2_"+rpta.ataque).addClass('estado'+rpta.miestado);
	}
	else
	{
		alert("No se pudo realizar la peticion");
	}
}
function procesarGuardarPosicion(data)
{
	if(data.status=='OK'){
		
		
	}
}

function enviarSolicitudAjax(parametros)
{
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