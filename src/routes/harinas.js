const express = require('express');
const router =  express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => {
    let listHarina = await pool.query('SELECT * FROM harina');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente las harinas registradas",
        listHarina: listHarina
    });
    console.log(listHarina);
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listHarina = await pool.query('SELECT * FROM materiaPrima WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado la materia prima",
        listHarina: listHarina
    });
});

router.post('/create', async (req, res)=> {   //Primero solo registra el nombre y precio de la materia prima para tenerlo en la tabla
    const { nameM, pricePublic } = req.body;
    // var dateCompraC = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
    const materiaPrima ={
        nameM, pricePublic
    };

    await pool.query('INSERT INTO materiaPrima set ?', [materiaPrima]);
    res.json({
        status: 200,
        message: "Se ha registrado el nombre y precio de la materia prima exitosamente!",
        materiaPrima: materiaPrima
    });
});

router.post('/regCompra', async (req, res)=>{ // Registra la compra de alguna de las materias primas previamente registradas (nombre y precio)
    // const { id } = req.params;
    // var dateUpdate = new Date().toISOString();
    const { lote, cantidad , nameProveedor, claveProductor, dateCompra, costales, claveCostales, quienEntrego, quienRecibio, materiaPrima_id } = req.body;

    const materiaPrima = {lote, cantidad , nameProveedor, claveProductor, dateCompra, costales, claveCostales, quienEntrego, quienRecibio, materiaPrima_id };

     await pool.query('INSERT INTO registerCompra SET ?', [materiaPrima]);
        res.json({
            status: 200,
            message: "Se ha registrado la compra de la materia prima correctamente",
            materiaPrima: materiaPrima
        });
});

router.post('/update/:id', async (req, res)=>{ //Solo actualiza el nombre y precio
    const { id } = req.params;
    // var dateUpdate = new Date().toISOString();
    const { nameM, pricePublic } = req.body;

    const materiaPrima = { nameM, pricePublic };

     await pool.query('UPDATE materiaPrima SET ? WHERE id = ?', [materiaPrima, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente el nombre y precio",
            materiaPrima: materiaPrima
        });
});


module.exports = router;