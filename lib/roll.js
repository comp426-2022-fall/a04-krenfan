import { floor, random} from 'mathjs';

export function roll(sides, dice, rolls) {
	var resulting = new Array(rolls);
	for (let i = 0; i < rolls; i++) {
		var total = 0;
		for (let d = 0; d < dice; d++) {
			total += rollDice(sides);
		}
		resulting[i] = total;
	}
	return JSON.stringify({
		sides: sides,
		dice: dice,
		rolls: rolls,
		results: resulting});

}

function rollDice(max) {
	return 1 + Math.floor(Math.random() * max);
}
