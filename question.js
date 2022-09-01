const inquirer = require("inquirer");
const {
    isInteger, isZombie, isCreatures
} = require('./condition')
let nextCreature = false
let nextRoute = true
let creaturePosition = []
let routes = []
let grid = 0
let zombie = []
let result = {
    "zombie": [],
    "creature": []
}
let newZombie = []
/*------------------------------------------------Question Input------------------------------------------------------*/

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
        newZombie.push(zombie)
        programClose()
    })
}



function winClose() {
    if (nextCreature) {
        roundStartCreature()
    } else {
        if (nextRoute) {
            roundStartRoute()
        } else {

            gridAndZombie()


        }
    }
}

/*-------------------------------------------------Zombie Program function-----------------------------------------------------------*/

function zombiesPosition(grid, zombie, moves) {

    let route = []
    route[0] = zombie[0]
    route[1] = zombie[1]
    let moveTable = {
        L: {
            action() {
                route[0] = route[0] - 1
                if (route[0] < 0) {
                    route[0] = route[0] + grid;
                }
                if (route[0] >= grid) {
                    route[0] = route[0] - grid;

                }
            }
        },
        R: {
            action() {
                route[0] = route[0] + 1
                if (route[0] < 0) {
                    route[0] = route[0] + grid;
                }
                if (route[0] >= grid) {
                    route[0] = route[0] - grid;

                }
            }
        },
        U: {
            action() {
                route[1] = route[1] - 1
                if (route[1] < 0) {
                    route[1] = route[1] + grid;
                }


                if (route[1] >= grid) {
                    route[1] = route[1] - grid;
                }
            }
        },
        D: {
            action() {
                route[1] = route[1] + 1
                if (route[1] < 0) {
                    route[1] = route[1] + grid;
                }


                if (route[1] >= grid) {
                    route[1] = route[1] - grid;
                }
            }
        }
    }
    moves.forEach(move => {
        moveTable[move].action()
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






}

function programClose() {

    if (isCreatures(creaturePosition, grid, zombie) && isInteger(grid) && isZombie(zombie, grid)) {
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
    else {
        console.log("please input correct value")
    }



}

roundStartCreature()






