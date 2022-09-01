/**  Check if the entered number is valid*/

/** check if the number is integer */
function isInteger(num) {
    return num % 1 === 0 && num >= 0
}


/** check if the zombie have valid position */
function isZombie(zombie, grid) {
    return zombie.length === 2 && isInteger(zombie[0]) && isInteger(zombie[1]) && zombie[0] < grid && zombie[1] < grid
}





/**check if the creatures have valid positions */
function isCreatures(creatures, grid, initialZombie) {
    let status = true
    let array = creatures.sort()
    for (let i = 0; i < creatures.length; i++) {

        if (!isZombie(creatures[i], grid) || (creatures[i][0] === initialZombie[0] && creatures[i][1] === initialZombie[1])) {

            status = false
            break


        } if (i < creatures.length - 1) {
            if (array[i][0] === array[i + 1][0] && array[i][1] === array[i + 1][1]) {
                status = false
                break
            }
        }


    }
    return status
}

module.exports = { isInteger, isZombie, isCreatures }