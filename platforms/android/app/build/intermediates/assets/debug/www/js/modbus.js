//import tax from './configuracionTaximetro';

var conectado = false;
var ip = localStorage.getItem('ip');
var taximetro = new Object;
document.addEventListener('deviceready', function () {
    if (ip == undefined || ip == null || ip == "") {
        $("#conec").html("<label style='color: green'>Asigne la ip</label>");
    } else {
        conectarDHT(ip, '502');

    }


});

function validaConect() {
    if (!conectado) {
        conectarDHT($("#ip").val(), '502');
    }
}


function conectarDHT(ip, puerto) {
    cordova.exec(function (data) {
        $("#conec").html("<label style='color: green'>Conectado</label>");
        conectado = true;
        setearDatosTaximetro();
        // parametrosArduino();
        setInterval(function () {
            leerDHT()
        }, 800);

    }, function (error) {
        console.log(error);
        $("#conec").html("<label style='color: red'>Desconectado.</label>");
    }, "mds", "open", [ip, puerto]);
}

function escribirDHT(R, D) {
    cordova.exec(function (data) {
        console.log(data);
        conectado = true;
        $("#conec").html("<label style='color: green'>Conectado</label>");
    }, function (error) {

        //        $("#alert").show();
        ////        $("#mesaje").html('Intentelo nuevamente.' + error);
        //        $("#mesaje").html('Intentelo nuevamente.');
        console.log(error);
        conectado = false;
        $("#conec").html("<label style='color: red'>Desconectado.</label>");
        conectarDHT(ip, '502');
    }, "mds", "escribir", [R, D]);
}

function leerDHT() {
    cordova.exec(function (data) {
        var r = data.split("|")

        //$("#pulsos").text(r[0]);
        $("#conec").html("<label style='color: green'>Conectado</label>");
        conectado = true;

        // if (r[8] === "1") {
        //     escribirDHT(8, 0);
        // } else {
        //     escribirDHT(8, 1);
        // }
        // taximetro.pulso_total = "---";
        // if ($("#pulsos") !== undefined) {
        //     $("#pulsos").text(parseInt(taximetro.pulso_total))
        // }

        // taximetro.revoluciones = "---";
        // if ($("#revoluciones") !== undefined) {
        //     $("#revoluciones").text(taximetro.revoluciones);
        // }

        taximetro.distancia = parseFloat(r[7]) / 10;

        if ($("#distancia") !== undefined) {
            $("#distancia").text(taximetro.distancia);
        }

        taximetro.velocidad = parseFloat(r[6]);
        if ($("#velocidad") !== undefined) {
            $("#velocidad").text(taximetro.velocidad);
        }

        // if (isNaN(taximetro.velocidad) || parseFloat(taximetro.velocidad) < 0)
        //     taximetro.velocidad = 0;
        // if (!enInicio) {
        //     if ($("#velocidad") !== undefined)
        //         $("#velocidad").text(taximetro.velocidad);
        //     if (parseFloat(taximetro.velocidad) < 1)
        //         activarBotonPlat('btnPlataforma');
        //     else
        //         desactivarBotonPlat('btnPlataforma');
        // }





    }, function (error) {
        console.log(error);
        conectado = false;
        $("#conec").html("<label style='color: red'>Desconectado.</label>");
        conectarDHT(ip, '502');
    }, "mds", "leer", [9]);
}

function desConectarDHT() {
    cordova.exec(function (data) {
        conectado = false;
    }, function (error) {
        console.log(error);
    }, "mds", "desconectar", []);
}
var iniciar = function () {
    resetTax2();
    setearDatosCOnfiguracion();

}


function setearDatosCOnfiguracion() {
    taximetro.perimetro = document.getElementById('perimetro').value;
    taximetro.divistorDistancia = document.getElementById('divistorDistancia').value;
    taximetro.divistorVelocidad = document.getElementById('divistorVelocidad').value;
    console.log(taximetro);
    parametrosArduino();
}


var parametrosArduino = function () {
    escribirDHT(1, 0);
    sleep(50);
    escribirDHT(1, 1);
    sleep(50);
    escribirDHT(2, parseFloat(taximetro.perimetro) * 10);
    sleep(50);
    escribirDHT(3, parseFloat(taximetro.divistorVelocidad) * 100);
    sleep(50);
    escribirDHT(4, parseFloat(taximetro.divistorDistancia) * 100);
    sleep(50);
    escribirDHT(5, 1);
    sleep(50);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var resetTax2 = function () {
    escribirDHT(5, 1);
};