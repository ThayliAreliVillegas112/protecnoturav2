
const getSegClientById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/segClient/' + id
    }).done(res => res);
};


const getSegInfoClient = async id => {
    var seguimiento = await getSegClientById(id);
    console.log(seguimiento);

    var dateCreated = new Date(seguimiento.listSegClient[0].date).toLocaleDateString();
    
    document.getElementById('name').value = seguimiento.listSegClient[0].representante;
    document.getElementById('dateRegistro').value = dateCreated;
    document.getElementById('asuntoTratado').value = seguimiento.listSegClient[0].asunto;
    document.getElementById('acuerdoCliente').value = seguimiento.listSegClient[0].acuerdo;


};

const getSegClient = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/segClient/segC'
    }).done(res => {
        console.log(res.listSegClient);

        let listSegClient = res.listSegClient;
        let table = $("#seguimiento");
        
        for (let i = 0; i < listSegClient.length; i++) {
            var dateRegister = new Date(listSegClient[i].date).toLocaleDateString(); // Esta linea sirve para que solo muestre la fecha sin el tiempo
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + dateRegister + "</td>" +
                "<td>" + listSegClient[i].identificador + "</td>" +
                "<td>" + '<button onclick="getSegInfoClient(' + listSegClient[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsSeguimiento"> <i class="fa fa-info" aria-hidden="true"></i></button> </td>' +
                "</tr>")
        }
    });
};


function registerSegClient (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
          
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro de realizar el registro?',
        text: "Te sugerimos que revises la información antes de registrar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then ((result) => {
    if (result.isConfirmed) { //value
        //aquí estaria el codigo del registro
        let representante = document.getElementById('repre').value;
        let date = document.getElementById('date').value;
        let identificador = document.getElementById('identi').value;
        var asunto = document.getElementById('asunto').value;
        let acuerdo = document.getElementById('acuerdo').value
        let client_id = document.getElementById('mySelect').value;

        
        console.log("si llena todoo");
        console.log(result);
        
    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/segClient/create',
        data: { representante, date, identificador, asunto, acuerdo, client_id }
    }).done(function (res) {
        console.log(res);
    });
        swalWithBootstrapButtons.fire(
            'Registro exitoso',
            'Se ha registrado el seguimiento exitosamente',
            'success'
        )
        let formulario = document.getElementById('formu2');
        formulario.reset();
            
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            'Acción cancelada',
            'No se ha realizado el registro del seguimiento',
            'error'
            )
            }
        }).catch((error)=>{
            swalWithBootstrapButtons.fire(
                '¡Error al registrar!',
                'Ha ocurrido un error al registrar este seguimiento',
                'error'
              )
            // console.log(error);
          })
};


const getSelectClient = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/client'
    }).done(res => {
        console.log(res.listClient);

        let listClient = res.listClient;
        
        $.each(listClient, function (i, item) {
            $('#mySelect').append($('<option>', { 
                value: item.id,  //con esta linea guarda en el campo client_id el id y no el nombre como cadena
                text : item.name +" "+ item.surname +" "+ item.lastname
                
            }));
        });

        console.log("si esta regresando")
    });
};


getSegClient();
getSelectClient();