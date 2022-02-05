import express from 'express';
import requireAuthentication from '../middleware/requireAuthentication.js';
const router = express.Router();

/* Endpoint to verify succesfull oauth login for clients. */
router.get('/oauth/login', [requireAuthentication], (req, res, next) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
