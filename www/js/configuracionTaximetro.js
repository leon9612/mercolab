
var url = localStorage.getItem('url');
var taximetro = new Object;
document.addEventListener('deviceready', function () {
    if (localStorage.getItem('ip') !== undefined && localStorage.getItem('ip') !== '') {
        $("#ip").val(localStorage.getItem('ip'));
    }
    if (localStorage.getItem('idconfiguracion') !== undefined && localStorage.getItem('idconfiguracion') !== null && localStorage.getItem('idconfiguracion') !== '') {
        getCiudades(localStorage.getItem('idconfiguracion'));
    } else {
        getCiudades(0);
    }


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
            if (rta.idconfiguracion.length > 0) {
                cargarDatos(rta.idconfiguracion);
            }
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
            document.getElementById('idconfiguracion').value = data.idconfiguracion;
            document.getElementById('ciudad').value = data.ciudad;
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

function cargarDatos(dat) {
    var data = dat[0];
    setearDatosTaximetro();
    document.getElementById('idconfiguracion').value = data.idconfiguracion;
    document.getElementById('ciudad').value = data.ciudad;
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
}

function setearDatosTaximetro() {
    taximetro.tiempo = 0.0;
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
    if ($("#tiempo") !== undefined)
        $("#tiempo").text(taximetro.tiempo);
    clearInterval(cronometro);
};

var updateParametro = function () {
    var datos = {
        function: 'updateParametros',
        idconfiguracion: document.getElementById('idconfiguracion').value,
        banderazoPesos: document.getElementById('banderazoPesos').value,
        banderazoUnidad: document.getElementById('banderazoUnidad').value,
        distanciaCaida: document.getElementById('distanciaCaida').value,
        divistorDistancia: document.getElementById('divistorDistancia').value,
        divistorVelocidad: document.getElementById('divistorVelocidad').value,
        numCaidasDistancia: document.getElementById('numCaidasDistancia').value,
        numCaidasTiempo: document.getElementById('numCaidasTiempo').value,
        perimetro: document.getElementById('perimetro').value,
        pesosUnidad: document.getElementById('pesosUnidad').value,
        tiempoCaida: document.getElementById('tiempoCaida').value,
        unidad: document.getElementById('unidad').value,

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
            if (rta == 1) {
                mesajeAlert("info", 'Proceso exitoso');
            }
        })
        .catch(error => {
            console.log(error.message);
            mesajeAlert("error", 'Error en servidor ' + error.message);
        })
}

var mesajeAlert = function (icon, mesaje) {
    Swal.fire({
        position: 'center',
        icon: icon,
        text: mesaje,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        // timer: 1500
    })
}

var nuevo = function () {
    document.getElementById('idconfiguracion').value = '';
    document.getElementById('ciudad').value = '';
    document.getElementById('banderazoPesos').value = '';
    document.getElementById('banderazoUnidad').value = '';
    document.getElementById('distanciaCaida').value = '';
    document.getElementById('divistorDistancia').value = '';
    document.getElementById('divistorVelocidad').value = '';
    document.getElementById('numCaidasDistancia').value = '';
    document.getElementById('numCaidasTiempo').value = '';
    document.getElementById('perimetro').value = '';
    document.getElementById('pesosUnidad').value = '';
    document.getElementById('tiempoCaida').value = '';
    document.getElementById('unidad').value = '';
}