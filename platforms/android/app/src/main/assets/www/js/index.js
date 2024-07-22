/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var url = "";
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        localStorage.setItem('url', 'http://192.168.1.38:8090/serverMercolab/index.php/');
        this.receivedEvent('deviceready');
        url = localStorage.getItem('url');
        if (localStorage.getItem('uuid') == null || localStorage.getItem('uuid') == "" || localStorage.getItem('uuid') == undefined) {
            saveDispositivo();
        } else {
            if (localStorage.getItem('uuid') !== device.uuid) {
                document.getElementById("dispositivo").innerHTML = "Dispositivo no reconocido por el sistema"
                //$("#dispositivo").html("<div style=' color: black;'>Dispositivo inactivo</div>");
            } else {
                consultarActivo();
            }
        }

    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();

var mostrarUuid = function () {
    Swal.fire({
        position: 'center',
        text: device.uuid,
    })
}

var saveDispositivo = function () {
    var data = {
        function: "saveDispotivio",
        descripcion: device.uuid,
        marca: device.manufacturer,
        modelo: device.model
    }
    fetch(url + "Clogin",
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json'
            },
        })
        .then(respuesta => respuesta.json())
        .then((rta) => {
            console.log(rta);
            localStorage.setItem('uuid', device.uuid);
        })
        .catch(error => {
            console.log(error.message);
            if (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Problemas en el registro del equipo: ' + error.message,
                    showConfirmButton: true,
                    confirmButtonColor: '#3085d6',
                    // timer: 1500
                })
            }
        });
}

var consultarActivo = function () {
    var data = {
        function: "getDispotivio",
        uuid: device.uuid,
    }
    fetch(url + "Clogin",
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json'
            },
        })
        .then(respuesta => respuesta.json())
        .then((rta) => {
            console.log(rta);
            if (rta[0].estado == 0) {
                document.getElementById("dispositivo").innerHTML = "El dispositivo esta inactivo"
            } else {
                document.getElementById("btn-login").disabled = false;
                document.getElementById("email").disabled = false;
                document.getElementById("password").disabled = false;
                document.getElementById("dispositivo").innerHTML = "Dispositivo activo"
            }

        })
        .catch(error => {
            console.log(error.message);
            if (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Problemas en el registro del equipo: ' + error.message,
                    showConfirmButton: true,
                    confirmButtonColor: '#3085d6',
                    // timer: 1500
                })
            }
        });
}

$("#btn-login").click(function (ev) {
    ev.preventDefault();
    var data = {
        email: $('#email').val(),
        password: $('#password').val(),
        function: 'login'
    }

    fetch(url + "Clogin",
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json'
            },
        })
        .then(respuesta => respuesta.json())
        .then((rta) => {
            console.log(rta);
            if (rta == 0) {
                var messaje = 'Usuario o contraseña incorrecto.';
                errorMesaje(messaje, 'error')
            } else {
                if (rta[0].estado == 0) {
                    var messaje = 'El usuario no esta activo comuniquese con el adminitrador del sistema.';
                    errorMesaje(messaje, 'info')
                } else {
                    localStorage.setItem("rol", rta[0].idrol)
                    localStorage.setItem("usuario", rta[0].nombres)
                    localStorage.setItem("idusuario", rta[0].idusuario)
                    window.location.href = "principal.html"
                }

            }
        })
        .catch(error => {
            console.log(error.message);
            if (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Problemas en el registro: ' + error.message,
                    showConfirmButton: true,
                    confirmButtonColor: '#3085d6',
                    // timer: 1500
                })
            }
        });

})

function errorMesaje(messaje, icon) {
    Swal.fire({
        position: 'center',
        icon: icon,
        text: messaje,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        // timer: 1500
    })
}