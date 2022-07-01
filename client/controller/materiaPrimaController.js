const getMpById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/materiaP/' + id
    }).done(res => res);
};

const getIdMP = async id => {
    document.getElementById("id_nombreMP").value = id;
    console.log(id_nombreMP);
    console.log(document.getElementById("id_nombreMP").value);
};


const getInfoMP = async id => { //Este sirve para obtener la información del nombre y precio para mostrarlo ene el modal para registrar una compra
    var materiaPrima = await getMpById(id);
    console.log(materiaPrima);
    document.getElementById('id_nombreMP').value = id;
    document.getElementById('nameM').value = materiaPrima.listMateria[0].nameM;
    document.getElementById('priceClient').value = materiaPrima.listMateria[0].pricePublic;
    console.log(materiaPrima);
    console.log("si esta entrando");


};

const getInfoUpdateMP = async id => { //Acualiza solo el nombre y precio al publico de la materia prima
    let materiaPrima = await getMpById(id);

    document.getElementById('id_updateNP').value = id;
    document.getElementById('nameM_up').value = materiaPrima.listMateria[0].nameM;
    document.getElementById('pricePublic_up').value = materiaPrima.listMateria[0].pricePublic;
    
    console.log(materiaPrima);

};

const getMateriaPrima = () => {  //Obtiene todos los registros que se tienen de las materias primas (nombe y precio)
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/materiaP'
    }).done(res => {
        console.log(res.listMateria);

        let listMateria = res.listMateria;
        let table = $("#materiaPrimaTable");
        // let stock = 0;
        
        for (let i = 0; i < listMateria.length; i++) {
            stock = listMateria[i].cantidad;
            if(stock == null){
                stock = "0"
            }
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listMateria[i].nameM + "</td>" +
                "<td>" + stock + "</td>" +
                "<td>" + listMateria[i].pricePublic+ "</td>" +
                "<td>" + '<button onclick="getInfoMP(' + listMateria[i].id + ');" type="button" class="btn btn-success text-dark" data-bs-toggle="modal" data-bs-target="#addCompra"> <i class="fa fa-folder-plus" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getInfoUpdateMP(' + listMateria[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#modify"><i class="fa fa-pen" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getIdProduct(' + listMateria[i].id + ');" type="button" class="btn btn-info text-dark" data-bs-toggle="modal" data-bs-target="#deleteProduct"><i class="fa fa-list" aria-hidden="true"></i></button> </td>' +
                "</tr>")
        }
    });
};
getMateriaPrima();

function registerMateriaPrima (){  //Solo va a registrar el nombre y precio
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
        console.log("si entra para el llenado")
        let nameM = document.getElementById('nameMRe').value;
        let pricePublic = document.getElementById('pricePublicRe').value;
        console.log(result);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/materiaP/create',
        data: { nameM, pricePublic}
    }).done(function (res) {
        console.log(res);
        console.log("Si registra")
    });
        swalWithBootstrapButtons.fire(
            'Registro exitoso',
            'Se ha registrado el producto exitosamente',
            'success'
        )
        let formulario = document.getElementById('materiaPrimaN');
        formulario.reset();
        $('#addMateria'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
        setTimeout(function() {
            let refresh = document.getElementById('materiaPrimaN');
        refresh= location.reload();
            location.reload(true);
          }, 3000);
        
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
                'Ha ocurrido un error al registrar el producto',
                'error'
              )
              console.log(error);
          })
};

// REGISTRO DE COMPRA 
function registerCompra (){  //Va a registrar la compra de la materia prima seleccionada
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
        console.log("si entra para el llenado")
        let lote = document.getElementById('lote').value;
        let cantidad = document.getElementById('cantidad').value;
        let nameProveedor = document.getElementById('nameProveedor').value;
        let claveProductor = document.getElementById('claveProductor').value;
        let dateCompra = document.getElementById('dateCompra').value;
        let costales = document.getElementById('costales').value;
        let claveCostales = document.getElementById('claveCostales').value;
        let quienEntrego = document.getElementById('quienEntrego').value;
        let quienRecibio = document.getElementById('quienRecibio').value;
        let materiaPrima_id = document.getElementById('id_nombreMP').value;
        console.log(result);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/materiaP/regCompra/',
        data: { lote, cantidad, nameProveedor, claveProductor, dateCompra, costales, claveCostales, quienEntrego, quienRecibio, materiaPrima_id}
    }).done(function (res) {
        console.log(res);
        console.log("Si registra")
    });
        swalWithBootstrapButtons.fire(
            'Registro exitoso',
            'Se ha registrado el producto exitosamente',
            'success'
        )
        let formulario = document.getElementById('agregarCompra');
        formulario.reset();
        $('#addCompra'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
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
                'Ha ocurrido un error al registrar el producto',
                'error'
              )
              console.log(error);
          })        
};


function updateNamePrice(){
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
        var id = document.getElementById('id_updateNP').value;
        let nameM = document.getElementById('nameM_up').value;
        let pricePublic = document.getElementById('pricePublic_up').value;
        console.log(id);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/materiaP/update/' + id,
        data: { nameM, pricePublic}
    }).done(function (res) {
        console.log(res);
    });
        swalWithBootstrapButtons.fire(
            'Modificación exitosa',
            'Se ha modificado al producto exitosamente',
            'success'
        )
        $('#modify'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
        setTimeout(function() {
        let refresh = document.getElementById('materiaPrimaTable');
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
                'Ha ocurrido un error al modificar el producto',
                'error'
              )
              console.log(error)
          })
};

function doSearchMateriaPrima()
    {
        const tableReg = document.getElementById('materiaPrimaTable');
        const searchText = document.getElementById('search-focusMateriaPrima').value.toLowerCase();
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
