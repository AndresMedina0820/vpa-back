const express = require('express');
const router = express.Router();

router.post('/wompi/webhook', async (request, response, next) => {
  try {
    const { body } = request;
    response.status(200).json([
      {
        message: 'Wompi Web hook',
        status: 200,
        body: body
      },
    ]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
