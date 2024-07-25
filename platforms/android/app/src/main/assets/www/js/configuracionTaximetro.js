var taximetro = new Object();
var url = localStorage.getItem('url');

document.addEventListener('deviceready', function () {
    if (localStorage.getItem('ip') !== undefined && localStorage.getItem('ip') !== '') {
        $("#ip").val(localStorage.getItem('ip'));
    }
    if (localStorage.getItem('idconfiguracion') !== undefined && localStorage.getItem('idconfiguracion') !== null && localStorage.getItem('idconfiguracion') !== '') {
        getCiudades(localStorage.getItem('idconfiguracion'));
    }
    getCiudades(0);

});

function getCiudades(idconfiguracion) {
    var datos = {
        function: "getCiudades",
        idconfiguracion: idconfiguracion
    }
    fetch(url + "Ctaximetro",
        {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json'
            },
        })
        .then(respuesta => respuesta.json())
        .then((rta) => {
            
            cargarDatos(rta.idconfiguracion);
            
            localStorage.setItem('configuraciones', JSON.stringify(rta.ciudades));
            $.each(rta.ciudades, function (i, data) {
                $('#selectConfigTaximetro').append("<option  value=" + data.idconfiguracion + ">" + data.ciudad + "</option>");
            });
        })
        .catch(error => {
            console.log(error.message);
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'Error en servidor ' + error.message,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                // timer: 1500
            })
        })
}


function selectCiudad() {
    localStorage.setItem('idconfiguracion', $('#selectConfigTaximetro option:selected').attr('value'));
    var configuracions = JSON.parse(localStorage.getItem('configuraciones'));
    var idconfiguracion = JSON.parse(localStorage.getItem('idconfiguracion'));
    var key = Object.keys(configuracions[0]);
    $.each(configuracions, function (i, data) {
        if (idconfiguracion == data.idconfiguracion) {
            document.getElementById('banderazoPesos').value = data.banderazoPesos;
            document.getElementById('banderazoUnidad').value = data.banderazoUnidad;
            document.getElementById('distanciaCaida').value = data.distanciaCaida;
            document.getElementById('divistorDistancia').value = data.divistorDistancia;
            document.getElementById('divistorVelocidad').value = data.divistorVelocidad;
            document.getElementById('numCaidasDistancia').value = data.numCaidasDistancia;
            document.getElementById('numCaidasTiempo').value = data.numCaidasTiempo;
            document.getElementById('perimetro').value = data.perimetro;
            document.getElementById('pesosUnidad').value = data.pesosUnidad;
            document.getElementById('tiempoCaida').value = data.tiempoCaida;
            document.getElementById('unidad').value = data.unidad;
            setearDatosTaximetro();
        }

    });


}

function cargarDatos(dat){
    
    console.log(dat);
    // document.getElementById('banderazoPesos').value = data.banderazoPesos;
    //         document.getElementById('banderazoUnidad').value = data.banderazoUnidad;
    //         document.getElementById('distanciaCaida').value = data.distanciaCaida;
    //         document.getElementById('divistorDistancia').value = data.divistorDistancia;
    //         document.getElementById('divistorVelocidad').value = data.divistorVelocidad;
    //         document.getElementById('numCaidasDistancia').value = data.numCaidasDistancia;
    //         document.getElementById('numCaidasTiempo').value = data.numCaidasTiempo;
    //         document.getElementById('perimetro').value = data.perimetro;
    //         document.getElementById('pesosUnidad').value = data.pesosUnidad;
    //         document.getElementById('tiempoCaida').value = data.tiempoCaida;
    //         document.getElementById('unidad').value = data.unidad;
}

function setearDatosTaximetro() {
    taximetro.tiempo = 0.0;
    taximetro.distancia = 0.0;
}

function guradarIp() {
    localStorage.setItem('ip', $("#ip").val());
}


var cronometro;
var inicio = false;

var tIniciar = function () {
    if (!inicio) {
        inicio = true;
        cronometro = setInterval(function () {
            taximetro.tiempo = taximetro.tiempo + 100;
            if ($("#tiempo") !== undefined) {
                var tiempo = taximetro.tiempo / 1000;
                $("#tiempo").text(tiempo.toFixed(1));
            }
        }, 100);
    }
};
var tPausar = function () {
    inicio = false;
    clearInterval(cronometro);
};
var tReset = function () {
    inicio = false;
    taximetro.tiempo = 0.0;
    taximetro.distancia = 0.0;
    if ($("#tiempo") !== undefined)
        $("#tiempo").text(taximetro.tiempo);
    clearInterval(cronometro);
};