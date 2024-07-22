var url = localStorage.getItem('url');
document.addEventListener('deviceready', function () {
    getPruebas();
});

var saveVehiculo = function (asignacion) {

    var datos = {
        function: 'saveVehiculo',
        idvehiculo: $("#idvehiculo").val(),
        placa: $("#placa").val().toUpperCase(),
        cliente: $("#cliente").val().toUpperCase(),
        direccion: $("#direccion").val().toUpperCase(),
        ciudad: $("#ciudad").val().toUpperCase(),
        marca: $("#marca").val().toUpperCase(),
        numeracion_interna_del_vehiculo: $("#numeracion_interna_del_vehiculo").val().toUpperCase(),
        serial_taximetro: $("#serial_taximetro").val().toUpperCase(),
        empresa_afiliado: $("#empresa_afiliado").val().toUpperCase(),
        asignar: asignacion
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

var getPlaca = function () {
    hideAlertDialog();
    var datos = {
        placa: $("#placaIngresada").val(),
        function: "getPlaca"
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
            if (rta.length <= 0) {
                mesajeAlert("info", 'No se encontraron registros');
            } else {
                document.getElementById("idvehiculo").disabled = true;
                $("#idvehiculo").val(rta.idvehiculo);
                $("#placa").val(rta.placa);
                $("#cliente").val(rta.cliente);
                $("#direccion").val(rta.direccion);
                $("#ciudad").val(rta.ciudad);
                $("#marca").val(rta.marca);
                $("#numeracion_interna_del_vehiculo").val(rta.numeracion_interna_del_vehiculo);
                $("#serial_taximetro").val(rta.serial_taximetro);
                $("#empresa_afiliado").val(rta.empresa_afiliado);
            }
        })
        .catch(error => {
            mesajeAlert("error", 'Error en servidor ' + error.message);
        })
}

var getPruebas = function () {
    var datos = {
        function: "getPruebas"
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
            $("#placasVisor").html("");
            console.log(rta);
            $.each(rta, function (i, data) {
                $('#placasVisor').append("<ons-row style=' margin-top: 18px;'><ons-col style='font-weight: bold;background: white; margin-top: 5px;'>" + data.placa + "</ons-col><ons-col style='font-weight: bold;background: white'><ons-button style='width: 95%;  height: 30px; background-color: #A2D9CE; color: black;'onclick='iniciarCalibracion(" + data.idcalibracion + ")'>Iniciar -></ons-button></ons-col></ons-row>");
            });
        })
        .catch(error => {
            mesajeAlert("error", 'Error en servidor ' + error.message);
        })
}

var iniciarCalibracion = function (idcalibracion) {
    localStorage.setItem("idcalibracion", idcalibracion);
    window.location.href = "taximetro.html"
}

var nuevo = function () {
    $("#idvehiculo").val("");
    $("#placa").val("");
    $("#cliente").val("");
    $("#direccion").val("");
    $("#ciudad").val("");
    $("#marca").val("");
    $("#numeracion_interna_del_vehiculo").val("");
    $("#serial_taximetro").val("");
    $("#empresa_afiliado").val("");
}


var createAlertDialog = function () {
    var dialog = document.getElementById('my-alert-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('alert-dialog.html', { append: true })
            .then(function (dialog) {
                dialog.show();
            });
    }
};
var hideAlertDialog = function () {
    document
        .getElementById('my-alert-dialog')
        .hide();
};

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

