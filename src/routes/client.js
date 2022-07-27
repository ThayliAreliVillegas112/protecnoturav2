const express = require('express');
const router =  express.Router();
// const multer = require('multer');
// const path = require('path');

const pool = require('../database.js');

// const storage = multer.diskStorage({
//     destination:'./src/archivos/',
//     filename:(req, file, cb) =>{
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// })

// const upload = multer({
//     storage: storage
// })

router.get('/', async (req, res) => {
    let listClient = await pool.query('SELECT * FROM client');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listClient: listClient
    });
    console.log(listClient);
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listClient = await pool.query('SELECT * FROM client WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado al cliente",
        listClient: listClient
    });
});

router.post('/create', async (req, res)=> {
    const { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram } = req.body;
    // var dateCreated = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
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

// router.post ('/delete/:id', async (req, res) =>{
//     const { id } = req.params;

//     await pool.query('UPDATE client SET estado = 0 WHERE id = ?', [id]);
//     res.json({
//         status: 200,
//         message: "Se ha eliminado correctamente"
//     });
// });

module.exports = router;