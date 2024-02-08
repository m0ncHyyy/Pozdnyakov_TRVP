const Router = require('express');
const router = new Router();
const sobesController = require('../controller/sobes.controller');

router.post('/sobes', sobesController.createSobes);
router.get('/sobes', sobesController.getSobeses);
router.get('/sobes/:id', sobesController.getOneSobes);
router.get('/specialist_sobeses/:specialist_id', sobesController.getManagerSobeses);
router.put('/sobes', sobesController.updateSobes);
router.delete('/sobes/:id', sobesController.deleteSobes);

module.exports = router;
