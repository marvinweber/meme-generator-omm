import express from 'express';
import requireAuthentication from '../middleware/requireAuthentication.js';
const router = express.Router();

/* Endpoint to verify succesfull oauth login for clients. */
router.get('/oauth/login', [requireAuthentication], (req, res, next) => {
  console.log(req.authenticated);
  console.log(req.user);
  res.json({
    success: true,
  });
});

export default router;
