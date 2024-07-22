var url = localStorage.getItem('url');
document.addEventListener('deviceready', function () {
    if (localStorage.getItem('ip') !== undefined && localStorage.getItem('ip') !== '') {
        $("#ip").val(localStorage.getItem('ip'));
    }
    var datos = {
        function: "getCiudades"
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
            localStorage.setItem('configuraciones', JSON.stringify(rta));
            $.each(rta, function (i, data) {
                $('#selectConfigTaximetro').append("<option  value=" + data.idconfiguracion + ">" + data.ciudad + "</option>");
            });
        })
        .catch(error => {
            console.log(error.message);
            MySwal.fire({
                position: 'center',
                icon: 'error',
                text: 'Error en servidor ' + error.message,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                // timer: 1500
            })
        })
});


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
            // var data2 = data;
            // for (var j = 0; j < key.length; j++) {
            //     if (document.getElementById(key[j])) {
            //         console.log(document.getElementById(key[j]));    
            //         console.log(key[j]);
            //         console.log(typeof(key[j]) );
            //         console.log(document.getElementById(key[j]).value = data.key[j]);
            //         document.getElementById(key[j]).value = dat2[j];
            //         break;
            //     }

            // }
        }

    });


}

function guradarIp() {
    localStorage.setItem('ip', $("#ip").val());
}