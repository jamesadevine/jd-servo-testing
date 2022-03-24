const servo1 = modules.servo1;
const servo2 = new modules.ServoClient("servo2");

const servos = [{s:servo1, on:false}, {s:servo2, on:false}]

const powerOn = () => {
    servos.forEach(servo => servo.on && servo.s.isConnected() && servo.s.setEnabled(true))
}

const powerOff = () => {
    servos.forEach(servo => servo.on && servo.s.isConnected() && servo.s.setEnabled(false))
}

const setAngle = (angle: number) => {
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
    basic.showString("ON")
    wait();
    updateDisplay()
	for (let i = 0; i < 10; i++) {
        setAngle(-90);
        pause(2000)
        setAngle(0);
        pause(2000)
        setAngle(90);
        pause(2000)
    }

    powerOff();
    basic.showString("OFF")
    wait();
})
