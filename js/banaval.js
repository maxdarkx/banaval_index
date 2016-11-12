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
}


function guardarPosicion(event)
{
	if(numpos<=MAXPOS)
	{
		var pos=event.target.id.substring(3);
		posiciones.push(pos);
		$("#td_"+pos).removeClass('tdpos');
		$("#td_"+pos).addClass('estado1');
		//$("#td_"+pos).css('background','green');
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
	//verificar el resto



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
		alert("gane");
		
		var input1=document.getElementById('tbluser1').getElementsByTagName('input');
		var input2=document.getElementById('tbluser2').getElementsByTagName('input');
    	for(var i=0; i<input1.length; i++)
        {	input1[i].disabled=true;
			inputs2[i].disabled=true;
		}
    	
	}
	if(rpta.wmac==6)
	{
		alert("gano");
		/*$("#tbluser1").prop('disabled',true);
		$("#tbluser2").prop('disabled',true);*/
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