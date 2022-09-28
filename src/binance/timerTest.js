const EventEmitter = require('events')
class TimerTest {
    constructor(){
        this.cnt=0
        this.timer1=null
        setTimeout(this.stop.bind(this),10000)
    }
    start(){
        console.log(this.timer1)
        this.timer1=setInterval(()=>{console.log(this.cnt++)},1000)
        console.log(this.timer1)
    }
    stop(){
        console.log('stop the timer1')
        console.log(this.timer1)
        clearInterval(this.timer1)
    }

}

// console.log(new timerTest())
// console.log(EventEmitter.prototype)

// console.log(Object.assign(timerTest2,new timerTest()))
// console.log({...timerTest2,...new timerTest()})



const testNewObj = new TimerTest()
Object.assign(testNewObj,EventEmitter)
testNewObj.start()


