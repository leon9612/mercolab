var conectado = false;
document.addEventListener('deviceready', function () {
    var ip = localStorage.getItem('ip');
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
        setInterval(function () {
            leerDHT()
        }, 1000);

    }, function (error) {
        console.log(error);
        $("#conec").html("<label style='color: red'>Desconectado.</label>");
    }, "mds", "open", [ip, puerto]);
}

function escribirDHT(R, D) {
    cordova.exec(function (data) {
        console.log(data);
        conectado = true;
    }, function (error) {

        //        $("#alert").show();
        ////        $("#mesaje").html('Intentelo nuevamente.' + error);
        //        $("#mesaje").html('Intentelo nuevamente.');
        console.log(error);
        conectado = false;
        $("#conec").html("<label style='color: red'>Desconectado.</label>");
    }, "mds", "escribir", [R, D]);
}

function leerDHT() {
    cordova.exec(function (data) {
        var res = data.split("|")
        console.log(res[1])
        $("#pulsos").text(res[0]);

        console.log(data);
        conectado = true;
    }, function (error) {
        console.log(error);
        conectado = false;
        $("#conec").html("<label style='color: red'>Desconectado.</label>");
    }, "mds", "leer", [60]);
}

function desConectarDHT() {
    cordova.exec(function (data) {
        conectado = false;
    }, function (error) {
        console.log(error);
    }, "mds", "desconectar", []);
}