const getClientById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/client/' + id
    }).done(res => res);
};

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
        }
    })
}

const getInfoClient = async id => {
    var client = await getClientById(id);
    console.log(client);
  
    document.getElementById('name').value = client.listClient[0].name;
    document.getElementById('surname').value = client.listClient[0].surname;
    document.getElementById('lastname').value = client.listClient[0].lastname;
    document.getElementById('email').value = client.listClient[0].email;
    document.getElementById('address').value = client.listClient[0].address;
    document.getElementById('phone').value = client.listClient[0].phone;
    document.getElementById('extension').value = client.listClient[0].extension;
    document.getElementById('age').value = client.listClient[0].age;
    document.getElementById('company').value = client.listClient[0].company;
    document.getElementById('face').value = client.listClient[0].facebook;
    document.getElementById('tiktok').value = client.listClient[0].tiktok;
    document.getElementById('instagram').value = client.listClient[0].instagram;
    document.getElementById('photo').value = client.listClient[0].photo;
    console.log(client);
    console.log("si esta entrando");


};

const getInfoUpdateClient = async id => {
    let client = await getClientById(id);

    document.getElementById('id_updateC').value = id;
    document.getElementById('name_up').value = client.listClient[0].name;
    document.getElementById('surname_up').value = client.listClient[0].surname;
    document.getElementById('lastname_up').value = client.listClient[0].lastname;
    document.getElementById('email_up').value = client.listClient[0].email;
    document.getElementById('address_up').value = client.listClient[0].address;
    document.getElementById('phone_up').value = client.listClient[0].phone;
    document.getElementById('extension_up').value = client.listClient[0].extension;
    document.getElementById('age_up').value = client.listClient[0].age;
    document.getElementById('company_up').value = client.listClient[0].company;
    document.getElementById('face_up').value = client.listClient[0].facebook;
    document.getElementById('tiktok_up').value = client.listClient[0].tiktok;
    document.getElementById('instagram_up').value = client.listClient[0].instagram;
    document.getElementById('photo_up').value = client.listClient[0].photo;
    console.log(client);

};

const getClient = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/client'
    }).done(res => {
        console.log(res.listClient);

        let listClient = res.listClient;
        let table = $("#tabla");
        
        for (let i = 0; i < listClient.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listClient[i].name +" "+ listClient[i].surname+ " "+ listClient[i].lastname+ "</td>" +
                "<td>" + listClient[i].email + "</td>" +
                "<td>" + '<button onclick="getInfoClient(' + listClient[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#details"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getInfoUpdateClient(' + listClient[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-pen" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<a href="orderTracking.html" class="btn btn-info" role="button" ><i class="fa fa-list" aria-hidden="true"></i></a> </td>' +
                "</tr>")
                
        }
        
    });
};

function registerClient (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
          
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de realizar el registro?',
        text: "Te sugerimos que revises la información antes de registrar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then ((result) => {
    if (result.isConfirmed) { //value
        //aquí estaria el codigo del registro
        let name = document.getElementById('nameRe').value;
        let surname = document.getElementById('surnameRe').value;
        let lastname = document.getElementById('lastnameRe').value;
        var age = document.getElementById('ageRe').value;
        let address = document.getElementById('addressRe').value
        let phone = document.getElementById('phoneRe').value;
        let extension = document.getElementById('extensionRe').value;
        let email = document.getElementById('emailRe').value;
        let company = document.getElementById('companyRe').value;
        let facebook = document.getElementById('faceRe').value;
        let tiktok = document.getElementById('tiktokRe').value;
        let instagram = document.getElementById('instagramRe').value;
        let photo = document.getElementById('photoRe').value;
        // let image = document.getElementById('imagenArreglo').files[0];
  
        console.log(photo);
        console.log(result);
        
    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/client/create',
        data: { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram, photo }
    }).done(function (res) {
        console.log(res);
    });
        swalWithBootstrapButtons.fire(
            'Registro exitoso',
            'Se ha registrado al cliente exitosamente',
            'success'
        )
        let formulario = document.getElementById('formu');
        formulario.reset();
            
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            'Acción cancelada',
            'No se ha realizado el registro',
            'error'
            )
            }
        }).catch((error)=>{
            swalWithBootstrapButtons.fire(
                '¡Error al registrar!',
                'Ha ocurrido un error al registrar al cliente',
                'error'
              )
          })
};


function updateClient(){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
          
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de realizar los cambios?',
        text: "Te sugerimos que revises la información antes de guadar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
    if (result.value) { //value
        //aquí estaria el codigo del registro
        console.log(id);
        console.log("Si entra para hacer los cambios");
        var id = document.getElementById('id_updateC').value;
        let name = document.getElementById('name_up').value;
        let surname = document.getElementById('surname_up').value;
        let lastname = document.getElementById('lastname_up').value;
        let age = document.getElementById('age_up').value;
        let address = document.getElementById('address_up').value;
        let phone = document.getElementById('phone_up').value;
        let extension = document.getElementById('extension_up').value;
        let email = document.getElementById('email_up').value;
        let company = document.getElementById('company_up').value;
        let facebook = document.getElementById('face_up').value;
        let tiktok = document.getElementById('tiktok_up').value;
        let instagram = document.getElementById('instagram_up').value;
        let photo = document.getElementById('photo_up').value;

        console.log(id);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/client/update/' + id,
        data: { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram, photo }
    }).done(function (res) {
        console.log(res);
       
    });
        swalWithBootstrapButtons.fire(
            'Modificación exitosa',
            'Se ha modificado al cliente exitosamente',
            'success'
        )
        $('#update'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
        setTimeout(function() {
            let refresh = document.getElementById('tabla');
        refresh= location.reload();
            location.reload(true);
          }, 2000);
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            'Acción cancelada',
            'No se ha realizado la modificación',
            'error'
            )
            }
        }).catch((error)=>{
            swalWithBootstrapButtons.fire(
                '¡Error al modificar!',
                'Ha ocurrido un error al modificar al cliente',
                'error'
              )
              console.log(error)
          })
};

function doSearch()
    {
        const tableReg = document.getElementById('tabla');
        const searchText = document.getElementById('search-focus').value.toLowerCase();
        let total = 0;

        // Recorremos todas las filas con contenido de la tabla

        for (let i = 1; i < tableReg.rows.length; i++) {
            // Si el td tiene la clase "noSearch" no se busca en su cntenido

            if (tableReg.rows[i].classList.contains("noSearch")) {
                continue;
            }

            let found = false;
            const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
            // Recorremos todas las celdas
            for (let j = 0; j < cellsOfRow.length && !found; j++) {
                const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                // Buscamos el texto en el contenido de la celda
                if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                    found = true;
                    total++;
                }
            }
            if (found) {
                tableReg.rows[i].style.display = '';
            } else {
                // si no ha encontrado ninguna coincidencia, esconde la
                // fila de la tabla
                tableReg.rows[i].style.display = 'none';

            }

        }
}



getClient();