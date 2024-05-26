#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
    fuelIncrease() {
        let fuel = this.fuel + 25;
        this.fuel = fuel;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
}
let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter your name :",
});
let opponent = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Select your opponent :",
    choices: ["Skeleton", "Alien", "Zombie"],
});
console.log(`${chalk.bold.green(player.name)} VS ${chalk.bold.green(opponent.select)}`);
let p1 = new Player(player.name);
let o1 = new Opponent(opponent.select);
do {
    if (opponent.select === "Skeleton" ||
        opponent.select === "Alien" ||
        opponent.select === "Zombie") {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select your option :",
            choices: ["Attack", "Health drink", "Run for life..."],
        });
        if (ask.option === "Attack") {
            let number = Math.floor(Math.random() * 2);
            if (number <= 0) {
                p1.fuelDecrease();
                console.log(`${p1.name}'s fuel is ${chalk.bold.red(p1.fuel)}`);
                console.log(`${o1.name}'s fuel is ${chalk.bold.green(o1.fuel)}`);
                if (p1.fuel <= 0) {
                    console.log(chalk.bold.red(`${p1.name} Lose! Better luck next time.`));
                    process.exit();
                }
            }
            if (number > 0) {
                o1.fuelDecrease();
                console.log(`${p1.name}'s fuel is ${chalk.bold.green(p1.fuel)}`);
                console.log(`${o1.name}'s fuel is ${chalk.bold.red(o1.fuel)}`);
                if (o1.fuel <= 0) {
                    console.log(chalk.bold.green(`Congratulations ${p1.name}! You Win.`));
                    process.exit();
                }
            }
        }
        if (ask.option === "Health drink") {
            p1.fuelIncrease();
            console.log(`${p1.name}'s fuel is ${chalk.bold.green(p1.fuel)}`);
        }
        if (ask.option === "Run for life...") {
            console.log(chalk.bold.red(`${p1.name} Lose! Better luck next time.`));
            process.exit();
        }
    }
} while (true);
