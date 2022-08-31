/**  Check if the entered number is valid*/

/** check if the number is integer */
function isInteger(obj) {
    return obj % 1 === 0 && obj >= 0
}


/** check if the zombie have valid position */
function isZombie(obj1, obj2) {
    return obj1.length === 2 && isInteger(obj1[0]) && isInteger(obj1[1]) && obj1[0] < obj2 && obj1[1] < obj2
}


/** check if the move is valid */
function isMoves(pros) {
    let status = true
    if (pros && pros.length > 0) {
        for (let i = 0; i < pros.length; i++) {
            if (pros[i] === 'R' || pros[i] === 'L' || pros[i] === 'U' || pros[i] === 'D') {
                status = true

            } else {
                status = false
                break
            }

        }
    }
    return status
}


/**check if the creatures have valid positions */
function isCreatures(obj1, obj2, obj3) {
    let status = true
    let array = obj1.sort()
    for (let i = 0; i < obj1.length; i++) {

        if (!isZombie(obj1[i], obj2) || (obj1[i][0] === obj3[0] && obj1[i][1] === obj3[1])) {

            status = false
            break


        } if (i < obj1.length - 1) {
            if (array[i][0] === array[i + 1][0] && array[i][1] === array[i + 1][1]) {
                status = false
                break
            }
        }


    }
    return status
}

module.exports = { isInteger, isZombie, isMoves, isCreatures }