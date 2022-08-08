const getPedidoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/' + id
    }).done(res => res);
};

function registerPedido (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let pedido = document.getElementById('pedidoRe').value;
    let elaboro = document.getElementById('elaboroRe').value;
    var dateSolicitud = document.getElementById('datePedidoRe').value;
    var status = 1;
    let client_id = document.getElementById('clienteSelect').value;

    console.log("si llena el seguimiento");


if (pedido == "") {
    Swal.fire({
        title: "Completa el campo PEDIDO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (client_id == ""){
    Swal.fire({
        title: "Completa el campo CLIENTE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(elaboro == ""){
    Swal.fire({
        title: "Completa el campo ELABORÓ",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateSolicitud == ""){
    Swal.fire({
        title: "Completa el campo FECHA DE SOLICITUD",
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
                url: 'http://localhost:4000/pedido/create',
                data: { pedido, elaboro, dateSolicitud, status, client_id }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el pedido exitosamente',
                        'success'
                    )
                    // let formulario = document.getElementById('formu2'); 
                    // formulario.reset()
                    setTimeout(function() {
                        let refresh = document.getElementById('tablaPedidos1');
                         refresh= location.reload();
                        location.reload(true);
                    }, 3000);
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
}
    
};

const getPedidos1 = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/pedido'
    }).done(res => {
        console.log(res.listPedido);

        let listPedido = res.listPedido;
        let table = $("#tablaPedidos1");
        
        for (let i = 0; i < listPedido.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listPedido[i].dateSolicitud + "</td>" +
                "<td>" + listPedido[i].pedido + "</td>" +
                "<td>" + '<button type="button" class="btn btn-success text-dark" data-bs-toggle="modal" data-bs-target="#detallesPedido"> <i class="fa fa-plus infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};
getPedidos1()

function registerDetallesPedido (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    let cantUnidades = document.getElementById('unidades').value;
    var total = 1200;
    let pedido_id = document.getElementById('id_pedidoo').value;
    let product_id = document.getElementById('ProductSelect').value;
    

    console.log("si llena el seguimiento");

if (product_id == "") {
    Swal.fire({
        title: "Completa el campo SELECCIONA UN PRODUCTO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (cantUnidades == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD DE UNIDADES",
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
                url: 'http://localhost:4000/pedido/createDetalles',
                data: { cantUnidades, total, pedido_id, product_id }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el detalle del pedido exitosamente',
                        'success'
                    )
                    // let formulario = document.getElementById('formu2'); 
                    // formulario.reset()
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
}
    
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
            $('#clienteSelect').append($('<option>', { 
                value: item.id,  //con esta linea guarda en el campo client_id el id y no el nombre como cadena
                text : item.name +" "+ item.surname +" "+ item.lastname
                
            }));
        });

        console.log("si esta regresando")
    });
};
getSelectClient()

const getSelectProductos = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/product'
    }).done(res => {
        console.log(res.listProduct);

        let listProduct = res.listProduct;
        
        $.each(listProduct, function (i, item) {
            $('#ProductSelect').append($('<option>', { 
                value: item.id,  //con esta linea guarda en el campo client_id el id y no el nombre como cadena
                text : item.name
                
            }));
        });

        console.log("si esta regresando")
    });
};
getSelectProductos()