const express = require('express');
const router = express.Router();
const urunController = require('../controllers/urun.controller');


router.get('/categories', urunController.getCategories); // tamam
router.get('/', urunController.findAllUrunler); // tamam
router.post('/', urunController.createUrun); // tamam
router.put('/:id', urunController.updateUrun); // tamam
router.delete('/:id', urunController.deleteUrun); // tamam
router.get('/satistaki-urunler', urunController.findSatistakiUrunler); // tamam
router.get('/by-category/:category_id', urunController.getUrunlerByCategory);
router.get('/sorted', urunController.getUrunlerSorted);
router.get('/by-user/:user_id', urunController.getUrunlerByUser);
router.put('/satildi/:urun_id', urunController.updateSatildi);


module.exports = router;

