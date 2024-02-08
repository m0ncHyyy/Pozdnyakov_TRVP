const Router = require('express');
const router = new Router();
const specialistController = require('../controller/specialist.controller');

router.post('/specialist', specialistController.createSpecialist);
router.get('/specialist', specialistController.getSpecialists);
router.get('/specialist/:id', specialistController.getOneSpecialist);
router.put('/specialist', specialistController.updateSpecialist);
router.delete('/specialist/:id', specialistController.deleteSpecialist);

module.exports = router;
