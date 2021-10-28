radio.onReceivedNumber(function (receivedNumber) {
    if (enabled) {
        if (init_wait) {
            basic.pause(3000)
            init_wait = false
        }
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, receivedNumber * PRIV_mult)
    }
})
// DEBUG!!!!
// 
input.onButtonPressed(Button.A, function () {
    radio.sendString("success")
})
// common code
radio.onReceivedString(function (receivedString) {
    if (receivedString == "success") {
        enabled = true
    }
})
input.onGesture(Gesture.Shake, function () {
    shake_count += 1
})
// init+anti cheat
radio.onReceivedValue(function (name, value) {
    if (name == "time") {
        TBV_time = value
    } else if (name == "multiplier") {
        TBV_mult = value
    } else {
    	
    }
    if (TBV_time != 3000 && (TBV_time != 5000 && TBV_time != 8000)) {
        PRIV_time = 3600000
    } else {
        PRIV_time = TBV_time
    }
    if (TBV_time == 3000 && !(TBV_mult == 15) || (TBV_time == 5000 && !(TBV_mult == 10) || TBV_time == 8000 && !(TBV_mult == 5))) {
        PRIV_mult = 0
    } else {
        PRIV_mult = TBV_mult
    }
})
// common code
let PRIV_time = 0
let TBV_mult = 0
let TBV_time = 0
let shake_count = 0
let PRIV_mult = 0
let init_wait = false
let enabled = false
led.enable(false)
radio.setGroup(69)
enabled = false
radio.sendValue("time", 3000)
radio.sendValue("multiplier", 15)
/**
 * <- remote
 * 
 *            car->
 */
/**
 * TBV= To Be Validated
 */
basic.forever(function () {
    if (enabled) {
        radio.sendNumber(shake_count)
        shake_count = 0
        basic.pause(3000)
    }
})
