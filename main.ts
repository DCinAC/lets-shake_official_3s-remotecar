radio.onReceivedNumber(function (receivedNumber) {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, receivedNumber * PRIV_mult * enabled)
    basic.pause(PRIV_time - 10)
})
// DEBUG!!!!
// 
input.onButtonPressed(Button.A, function () {
	
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "success") {
        enabled = true
    }
})
input.onGesture(Gesture.Shake, function () {
    shake_count += 1
})
radio.onReceivedValue(function (name, value) {
    if (name == "time") {
        TBV_time = value
    } else if (name == "multiplier") {
        TBV_mult = value
    } else {
    	
    }
    if (TBV_time != 3000 && (TBV_time != 5000 && TBV_time != 8000)) {
        PRIV_time = 9999
    } else {
        PRIV_time = TBV_time
    }
    if (TBV_time == 3000 && !(TBV_mult == 15) || (TBV_time == 5000 && !(TBV_mult == 10) || TBV_time == 8000 && !(TBV_mult == 5))) {
        PRIV_mult = 0
    } else {
        PRIV_mult = TBV_mult
    }
})
/**
 * <- remote
 * 
 *            car->
 */
let TBV_mult = 0
let TBV_time = 0
let shake_count = 0
let PRIV_time = 0
let PRIV_mult = 0
let enabled = 0
led.enable(false)
radio.setGroup(69)
enabled = false
radio.sendValue("time", 3000)
radio.sendValue("multiplier", 15)
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
