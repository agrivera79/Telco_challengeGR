const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add.hbs');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const {plates, brand, color, model_year, lat, lon } = req.body;
    const new_vehicle={
        user_id: req.user.id,
        plates,
        brand,
        color,
        model_year,
        lat,
        lon
    };
    await pool.query('INSERT INTO vehicles SET ?', [new_vehicle]);
    //await pool.query('INSERT INTO vehicles(position) VALUES ?', [position]);
    req.flash('success', 'Vehicle register added successfully');
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const strAdmin = "admin";
    const username = req.user.username;

    if( username === strAdmin){
       const vehicles = await pool.query('SELECT * FROM vehicles');
       res.render('links/list', { vehicles })
    }
    else{
        const vehicles = await pool.query('SELECT * FROM vehicles WHERE user_id = ?', [req.user.id]);
        res.render('links/list', { vehicles })
    }

})

router.get('/delete/:id', isLoggedIn, async (req,res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
    req.flash('success', 'Vehicle register removed successfully');
    res.redirect('/links');
})

router.get('/edit/:id', isLoggedIn, async (req,res) => {
    const { id } = req.params;
    const vehicle = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
    res.render('links/edit.hbs', { vehicle: vehicle[0]});
})

router.post('/edit/:id', isLoggedIn, async (req,res) =>{
    const { id } = req.params;
    const {plates, brand, color, model_year, lat, lon } = req.body;
    const new_vehicle={
        plates,
        brand,
        color,
        model_year,
        lat,
        lon
    };
    console.log(new_vehicle);
    await pool.query('UPDATE vehicles SET ? WHERE id = ?', [new_vehicle, id]);
    req.flash('success', 'Vehicle register updated successfully');
    res.redirect('/links');
})

module.exports = router;