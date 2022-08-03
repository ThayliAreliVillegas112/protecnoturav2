const express = require('express');
const router =  express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => {
    let listPedido = await pool.query('SELECT * FROM pedido');
    
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
    const { pedido, elaboro, dateSolicitud, age, address, phone, extension, email, company, facebook, tiktok, instagram } = req.body;
    const client ={
        name, surname, lastname, age, address , phone, extension, email, company, facebook, tiktok, instagram
    };
    await pool.query('INSERT INTO client set ?', [client]);
    res.json({
        status: 200,
        message: "Se ha registrado al cliente exitosamente!",
        client: client
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