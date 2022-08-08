const express = require('express');
const router =  express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => {
    let listPedido = await pool.query('SELECT * FROM pedido where status = 1');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente los pedidos",
        listPedido: listPedido
    });
    console.log(listPedido);
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listPedido = await pool.query('SELECT * FROM pedido WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el pedido",
        listPedido: listPedido
    });
});

router.post('/create', async (req, res)=> {
    const { pedido, elaboro, dateSolicitud, status, client_id } = req.body;
    const pedidos ={
        pedido, elaboro, dateSolicitud, status, client_id
    };
    await pool.query('INSERT INTO pedido set ?', [pedidos]);
    res.json({
        status: 200,
        message: "Se ha registrado el pedido exitosamente!",
        pedidos: pedidos
    });
});

router.post('/createDetalles', async (req, res)=> {
    const { cantUnidades, precioTotal, total, pedido_id, product_id	 } = req.body;
    const pedidosDetalles ={
        cantUnidades, precioTotal, total, pedido_id, product_id
    };
    await pool.query('INSERT INTO detallespedidop set ?', [pedidosDetalles]);
    res.json({
        status: 200,
        message: "Se ha registrado los detalles del pedido exitosamente!",
        pedidosDetalles: pedidosDetalles
    });
});

router.post('/update/:id', async (req, res)=>{  
    const { id } = req.params;
    // var dateUpdate = new Date().toISOString();
    const { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram } = req.body;

    const client = { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram };

     await pool.query('UPDATE client SET ? WHERE id = ?', [client, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente la información del cliente",
            client: client
        });
});


module.exports = router;