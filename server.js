#!/usr/bin/env node

import minimist from 'minimist';
import express from 'express';
import { roll } from './lib/roll.js';

const args = minimist(process.argv.slice(2));

const app = express();

const port = args.port || 5000;

app.use(express.urlencoded({ extended: true }));

// get root endpoint of app

app.get('/app/', (req, res) => {
	res.status(200).send('200 OK');
});

// roll default dice

app.get('/app/roll/', (req, res) => {
	res.send(roll(6, 2, 1));
});

// roll random dice

app.post('/app/roll/', (req, res) => {
	res.send(roll(parseInt(req.body.sides), parseInt(req.body.dice), parseInt(req.body.rolls)));
});

// roll dice with sides parameter

app.get('/app/roll/:sides/', (req, res) => {
	res.send(roll(parseInt(req.params.sides), 2, 1));
});

// roll dice with sides and dice parameters

app.get('/app/roll/:sides/:dice/', (req, res) => {
	res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1));
});

// roll dice with sides, dice, rolls parameters

app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
	res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls)));
});

// call nonexistent endpoint

app.get('*', (req, res) => {
	res.status(404).send('404 NOT FOUND');
});

app.listen(port);
