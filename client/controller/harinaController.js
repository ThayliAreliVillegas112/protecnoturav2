const getHarinaById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/harina/' + id
    }).done(res => res);
};

const getInfoUpdateHarina = async id => {
    let harina = await getHarinaById(id);

    document.getElementById('id_updateHarina').value = id;
    document.getElementById('nameHarina_up').value = client.listClient[0].name;
    console.log(harina);
};

const getHarina = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/harina'
    }).done(res => {
        console.log(res.listHarina);

        let listHarina = res.listHarina;
        let table = $("#harinas");
        
        for (let i = 0; i < listHarina.length; i++) {
            let stock;
            stock = 10;
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listHarina[i].nameH +"</td>" +
                "<td>" + stock +"</td>" +
                "<td>" + '<button onclick="getInfoClient(' + listHarina[i].id + ');" type="button" class="btn btn-success text-dark iconMargin" data-bs-toggle="modal" data-bs-target="#addHarinaRegister"> <i class="fa fa-folder-plus infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getInfoClient(' + listHarina[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#updateNameH"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +  
                "<td>" + '<button onclick="getInfoUpdateClient(' + listHarina[i].id + ');" type="button" class="btn btn-warning text-dark iconMargin" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-pen" aria-hidden="true"></i></button> </td>' +
                // "<td>" + '<a href="orderTracking.html" class="btn btn-info" role="button" ><i class="fa fa-list" aria-hidden="true"></i></a> </td>' +
                "</tr>")
                
        }
        
    });
};
getHarina();

function registerClient (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
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
    // let photo = document.getElementById('photoRe').value;
    let photo1 = localStorage.getItem("photo");
    let image = photo1;
        console.log("mmmmmmmmmmm");
        console.log(photo1);

if (name == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (surname == ""){
    Swal.fire({
        title: "Completa el campo APELLIDO MATERNO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(lastname == ""){
    Swal.fire({
        title: "Completa el campo APELLIDO PATERNO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(address == ""){
    Swal.fire({
        title: "Completa el campo DIRECCIÓN",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(phone == ""){
    Swal.fire({
        title: "Completa el campo TELÉFONO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(email == ""){
    Swal.fire({
        title: "Completa el campo CORREO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de realizar el registro?',
        text: "Te sugerimos que revises la información antes de registrar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then ((result) => {
        if(result.isConfirmed){
            $.ajax({
                type: 'POST',
                url: 'http://localhost:4000/client/create',
                data: { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram, image}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado al cliente exitosamente',
                        'success'
                    )
                    let formulario = document.getElementById('formu'); 
                    formulario.reset()
                } else {
                    Swal.fire({
                        title: "Hubo un problema al registrar",
                        confirmButtonText: "Aceptar",
                        icon: "error",
                    });
                }
            });
        }{
            swalWithBootstrapButtons.fire(
                'Acción cancelada',
                'No se ha realizado el registro',
                'error'
            )
        }
    })
}};

function updateClient (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
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

if (name == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (surname == ""){
    Swal.fire({
        title: "Completa el campo APELLIDO MATERNO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(lastname == ""){
    Swal.fire({
        title: "Completa el campo APELLIDO PATERNO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(address == ""){
    Swal.fire({
        title: "Completa el campo DIRECCIÓN",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(phone == ""){
    Swal.fire({
        title: "Completa el campo TELÉFONO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(email == ""){
    Swal.fire({
        title: "Completa el campo CORREO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de realizar los cambios?',
        text: "Te sugerimos que revises la información antes de registrar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then ((result) => {
        if(result.isConfirmed){
            $.ajax({
                type: 'POST',
                url: 'http://localhost:4000/client/update/' + id,
                data: { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram, photo }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
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
                } else {
                    Swal.fire({
                        title: "Hubo un problema al modificar",
                        confirmButtonText: "Aceptar",
                        icon: "error",
                    });
                }
            });
        }{
            swalWithBootstrapButtons.fire(
                'Acción cancelada',
                'No se ha realizado la modificación',
                'error'
            )
        }
    })
}};


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
