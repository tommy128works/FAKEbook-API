const express = require('express');
const router = express.Router();

import { Request, Response, NextFunction} from "express";

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

// Register new user
router.post('/sign-up', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
