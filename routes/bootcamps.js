const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: `All bootcamps`});
  });

router.get('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `bootcamps ${req.params.id}`});
});

module.exports = router;