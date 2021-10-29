/**
 * <- remote
 * 
 *               car    ->
 */
// make car move
radio.onReceivedNumber(function (receivedNumber) {
    // not more than 5 shakes per 2 sec or car stop
    if (enabled && receivedNumber < PRIV_time * 0.0025) {
        if (init_wait) {
            basic.pause(PRIV_time)
            init_wait = false
        }
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, receivedNumber * PRIV_mult)
    } else {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 0)
    }
})
// DEBUG!!!!
// PLS REMOVE BEFORE USE!
input.onButtonPressed(Button.A, function () {
    enabled = true
})
input.onGesture(Gesture.Shake, function () {
    shake_count += 1
})
// common code (activation)
radio.onReceivedString(function (receivedString) {
    if (receivedString == "success") {
        enabled = true
    }
})
/**
 * TBV= To Be Validated
 */
// init+anti cheat
radio.onReceivedValue(function (name, value) {
    if (name == "time") {
        TBV_time = value
    } else if (name == "multiplier") {
        TBV_mult = value
    } else {
    	
    }
    // anti-cheat part
    if (TBV_time != 2000 && (TBV_time != 4000 && TBV_time != 6000)) {
        PRIV_time = 3600000
    } else {
        PRIV_time = TBV_time
    }
    if (TBV_time == 2000 && !(TBV_mult == 15) || (TBV_time == 4000 && !(TBV_mult == 10) || TBV_time == 6000 && !(TBV_mult == 5))) {
        PRIV_mult = 0
    } else {
        PRIV_mult = TBV_mult
    }
})
// common code
// (init)
let TBV_mult = 0
let TBV_time = 0
let shake_count = 0
let PRIV_mult = 0
let init_wait = false
let PRIV_time = 0
let enabled = false
radio.setGroup(69)
enabled = false
radio.sendValue("time", 2000)
radio.sendValue("multiplier", 15)
loops.everyInterval(2000, function () {
    radio.sendNumber(shake_count)
    shake_count = 0
})
