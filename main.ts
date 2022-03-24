const test_parameters = {
    wait: true,
    gradual_set: true,
    power_toggle: true
}


const servo1 = modules.servo1;
const servo2 = new modules.ServoClient("servo2");
const SERVO_ANGLE_INIT_VAL = -1000
const SERVO_ANGLE_STEP = 30

const servos = [{ s: servo1, on: false, angle: SERVO_ANGLE_INIT_VAL }, { s: servo2, on: false, angle: SERVO_ANGLE_INIT_VAL}]

const powerOn = () => {
    servos.forEach(servo => servo.on && servo.s.isConnected() && servo.s.setEnabled(true))
}

const powerOff = () => {
    servos.forEach(servo => servo.on && servo.s.isConnected() && servo.s.setEnabled(false))
}

const setAngle = (angle: number) => {
    if (test_parameters.gradual_set){
        servos.forEach(servo => {
            if (!servo.on)
                return;
            const serv = servo.s

            if (servo.angle !== SERVO_ANGLE_INIT_VAL) {
                if (angle > servo.angle)
                    for (let curr = servo.angle; curr < angle; curr += SERVO_ANGLE_STEP)
                        serv.setAngle(curr)
                else
                    for (let curr = servo.angle; curr > angle; curr -= SERVO_ANGLE_STEP)
                        serv.setAngle(curr)
            }

            serv.setAngle(angle)
            servo.angle = angle
        })
    }
    else
        servos.forEach(servo => servo.on && servo.s.setAngle(angle))
}

const updateDisplay= () => {
    if (servos[0].on && servos[1].on) {
        basic.showLeds(`
        # . . # .
        # . # . #
        # . . . #
        # . . # .
        # . # # #
        `)
    }
    else if (servos[0].on && !servos[1].on){
        basic.showLeds(`
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        # . . . .
        `)
    }
    else if (!servos[0].on && servos[1].on){
        basic.showLeds(`
        . . . # .
        . . # . #
        . . . . #
        . . . # .
        . . # # #
        `)
    }
    else {
        basic.clearScreen();
    }
}

input.onButtonPressed(Button.A, ()=>{
    servos[0].on = !servos[0].on
    updateDisplay()
})

input.onButtonPressed(Button.B, () => {
    servos[1].on = !servos[1].on
    updateDisplay()
})

const wait = () => {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        `)
    basic.pause(1000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # . . .
        `)
    basic.pause(1000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # . .
        `)
    basic.pause(1000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # # .
        `)
    basic.pause(1000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        `)
    basic.pause(1000)
}

basic.forever(function () {
    powerOn();
    updateDisplay()
    setAngle(-90);
    pause(2000)
    setAngle(0);
    pause(2000)
    setAngle(90);
    pause(2000);
    if (test_parameters.power_toggle)
        powerOff();
    if (test_parameters.wait)
        wait();
})
