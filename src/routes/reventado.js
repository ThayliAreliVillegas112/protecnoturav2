const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

// SERVICIO PARA HACER EL REGISTRO, VISUALIZACIÓN DE TODOS LO REGISTROS Y BUSQUEDA POR ID DE AMARANTO REVENTADO
router.get('/', async (req, res) => {
    let listReventado = await pool.query('SELECT * FROM amarantoReventado');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente los registros del amaranto reventado",
        listReventado: listReventado
    });
    console.log(listReventado);
})
router.get('/matPrima', async (req, res) => {
    let listReventado = await pool.query('SELECT id FROM materiaPrima where nameM = "Amaranto" or nameM = "amaranto" or nameM="AMARANTO"');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente los registros del amaranto reventado",
        listReventado: listReventado
    });
    console.log(listReventado);
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listReventado = await pool.query('SELECT * FROM amarantoReventado WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el registro del amaranto reventado",
        listReventado: listReventado
    });
});

router.post('/create', async (req, res)=> {
    const { cantMateriaPrima, cantidadAmarantoRev, dateElaboracion, materiaPrima_id } = req.body;

    const reventado ={
        cantMateriaPrima, cantidadAmarantoRev, dateElaboracion, materiaPrima_id
    };

    await pool.query('INSERT INTO amarantoReventado set ?', [reventado]);
    res.json({
        status: 200,
        message: "Se ha registrado el seguimiento del amaranto reventado exitosamente!",
        reventado: reventado
    });
});




module.exports = router;