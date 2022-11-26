#!/usr/bin/env node

import minimist from 'minimist';
import express from 'express';
import { roll } from './lib/roll.js';

const args = minimist(process.argv.slice(2));

const app = express();

const port = args.port || 3000;

app.use(express.urlencoded({ extended: true }));

// get root endpoint of app

app.get('/app/', (req, res) => {
	res.status(200).send('200 OK');
});

// roll default dice
// roll random dice

app.get('/app/roll/', (req, res) => {
	res.send(parseInt(req.body.SIDES) || 6, parseInt(req.body.DICE) || 2, parseInt(req.body.ROLLS) || 1);
});

// roll dice with sides parameter

app.get('/app/roll/:sides/', (req, res) => {
	res.send(parseInt(req.params.SIDES), 2, 1);
});

// roll dice with sides and dice parameters

app.get('/app/roll/:sides/:dice/', (req, res) => {
	res.send(parseInt(req.params.SIDES), parseInt(req.params.DICE), 1);
});

// roll dice with sides, dice, rolls parameters

app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
	res.send(parseInt(req.params.SIDES), parseInt(req.params.DICE), parseInt(req.params.ROLLS));
});

// call nonexistent endpoint

app.all('*', (req, res) => {
	res.status(404).send('404 NOT FOUND');
});

app.listen(port);
