
document.addEventListener('deviceready', function () {
    conectarDHT('192.168.1.38', '502');


});




function conectarDHT(ip, puerto) {
    cordova.exec(function (data) {
        console.log(data)
        escribirDHT(1, 155);
        setInterval(function () { leerDHT() }, 1000);

    }, function (error) {

        console.log(error);
    }, "mds", "open", [ip, puerto]);
}

function escribirDHT(R, D) {
    cordova.exec(function (data) {
        console.log(data);
    }, function (error) {
        var datos = JSON.parse(localStorage.getItem('datos'))
        conectarDHT(datos.ip, datos.puerto);
        //        $("#alert").show();
        ////        $("#mesaje").html('Intentelo nuevamente.' + error);
        //        $("#mesaje").html('Intentelo nuevamente.');
        console.log(error);
    }, "mds", "escribir", [R, D]);
}

function leerDHT() {
    cordova.exec(function (data) {
        var res = data.split("|")
        console.log(res[1])
        $("#pulsos").text(res[0]);
        
        console.log(data);
    }, function (error) {
        console.log(error);
    }, "mds", "leer", [60]);
}