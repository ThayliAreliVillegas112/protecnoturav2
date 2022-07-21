const express = require('express');
const router =  express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => {
    let listHarina = await pool.query('SELECT * FROM harina');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente todas las harinas",
        listHarina: listHarina
    });
    console.log(listHarina);
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listHarina = await pool.query('SELECT * FROM harina WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado la harina",
        listHarina: listHarina
    });
});

router.post('/create', async (req, res)=> {
    const { nameH } = req.body;

    const harina ={
        nameH 
    };

    await pool.query('INSERT INTO harina set ?', [harina]);
    res.json({
        status: 200,
        message: "Se ha registrado la harina exitosamente!",
        harina: harina
    });
});

router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    const { nameH } = req.body;

    const harina = { nameH };

     await pool.query('UPDATE harina SET ? WHERE id = ?', [harina, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente la información del cliente",
            harina: harina
        });
});

module.exports = router;