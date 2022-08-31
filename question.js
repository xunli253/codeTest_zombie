const inquirer = require("inquirer");
const {
    isInteger, isZombie, isMoves
} = require('./condition')
let nextCreature = false
let nextRoute = true
let creaturePosition = []
let programEnd = false
let routes = []
let grid = 0
let zombie = []
let result = {
    "zombie": [],
    "creature": []
}
let newZombie = []


const question = [{
    type: "input",
    message: "please input grid",
    name: "Grid",
    default: 4
}, {
    type: "input",
    message: "please input zombie X-position",
    name: "X-Zombie",
    default: 2
}, {
    type: "input",
    message: "please input zombie Y-position",
    name: "Y-Zombie",
    default: 2
}, {
    type: "confirm",
    message: "The program finish",
    name: "status",
    default: true
}


]
const question1 = [{
    type: "list",
    message: "please input route",
    name: "Route",
    choices: ['R', 'L', 'U', 'D']
}, {
    type: "confirm",
    message: "Do you want to input next position(n/y)",
    name: "status",
    default: false
}]

const question2 = [{
    type: "input",
    message: "please input Creature X-position",
    name: "X-Creature",
    default: 2
}, {
    type: "input",
    message: "please input Creature Y-position",
    name: "Y-Creature",
    default: 2
}, {
    type: "confirm",
    message: "Do you want to input next creature(n/y)",
    name: "status",
    default: false
}]


function roundStartCreature() {

    let array = []
    inquirer.prompt(question2).then(function (data) {
        array[0] = Number(data['X-Creature'])
        array[1] = Number(data['Y-Creature'])
        nextCreature = data['status']
        creaturePosition.push(array)
        winClose()


    })

}



function roundStartRoute() {

    inquirer.prompt(question1).then(function (data) {
        routes.push(data['Route'])
        nextRoute = data['status']
        winClose()
    })
}




function gridAndZombie() {
    inquirer.prompt(question).then(function (data) {
        grid = Number(data['Grid'])
        zombie[0] = Number(data['X-Zombie'])
        zombie[1] = Number(data['Y-Zombie'])
        programEnd = data['status']
        winClose()
    })
}



function winClose() {
    if (nextCreature) {
        roundStartCreature()
    } else {
        if (nextRoute) {
            roundStartRoute()
        } else {
            if (!programEnd) {
                gridAndZombie()
            } else {
                newZombie.push(zombie)
                programClose()
            }


        }
    }
}




function zombiesPosition(grid, zombie, moves) {
    if (isInteger(grid) && isZombie(zombie, grid) && isMoves(moves)) {

        let route = []
        route[0] = zombie[0]
        route[1] = zombie[1]
        moves.forEach(move => {
            if (move === 'L') {
                route[0] = route[0] - 1


            }

            if (move === 'R') {
                route[0] = route[0] + 1



            }

            if (move === 'U') {
                route[1] = route[1] - 1


            }

            if (move === 'D') {
                route[1] = route[1] + 1

            }


            if (route[0] < 0) {
                route[0] = route[0] + grid;
            }


            if (route[0] >= grid) {
                route[0] = route[0] - grid;

            }

            if (route[1] < 0) {
                route[1] = route[1] + grid;
            }


            if (route[1] >= grid) {
                route[1] = route[1] - grid;
            }


            for (let i = 0; i < creaturePosition.length; i++) {
                if (creaturePosition[i]) {

                    if (route[0] === creaturePosition[i][0] && route[1] === creaturePosition[i][1]) {
                        delete (creaturePosition[i])
                        const add = [route[0], route[1]]
                        newZombie.push(add)

                        break
                    }



                }

            }

        })

        result.zombie.push(route)




    } else {
        console.log("Please input correct value")


    }

}

function programClose() {


    while (newZombie.length > 0) {
        zombiesPosition(grid, newZombie[0], routes)
        newZombie.shift()
        if (newZombie.length === 0) {
            for (let i = 0; i < creaturePosition.length; i++) {
                if (creaturePosition[i]) {
                    result.creature.push(creaturePosition[i])
                }


            }
            console.log(result)
        }


    }


}

roundStartCreature()






