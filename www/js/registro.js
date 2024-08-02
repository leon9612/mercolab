var url = localStorage.getItem('url');
document.addEventListener('deviceready', function () {
    
    var datos = {
        function: "getTipoDocumento"
    }
    fetch(url + "Clogin",
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

            $.each(rta, function (i, data) {
                $('#tipoDocumento').append("<option value=" + data.tipo_identificacion + ">" + data.nombre + "</option>");
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


$("#btn-registro").click(function (ev) {
    ev.preventDefault();
    var data = {
        idrol: 1,
        nombres: $("#nombres").val(),
        apellidos: $("#apellidos").val(),
        tipo_identificacion: $('#tipoDocumento option:selected').attr('value'),
        numero_identificacion: $('#numeroDocumento').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        estado: 0,
        function: 'guardarData'
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
            if (rta == 1) {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    text: 'El usuario se registro con exito.',
                    showConfirmButton: true,
                    confirmButtonColor: '#3085d6',
                })
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


//}