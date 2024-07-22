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