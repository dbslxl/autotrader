const EventEmitter = require('events')
class TimerTest {
    constructor(){
        this.cnt=0
        this.timer1=null
        setTimeout(this.stop.bind(this),10000)
        
    }
    init(){
        this.on('test',()=>{console.log('test event occured, and successfully handled by the event listener!')})
    }
    start(){
        this.init()
        
        // this.timer1=setInterval(()=>{console.log(this.cnt++)},1000)
        this.timer1=setInterval(this.logCnt.bind(this),1000)
       
    }
    stop(){
        console.log('stop the timer1')
        this.emit('test')
        clearInterval(this.timer1)
    }
    logCnt(){
        console.log(this.cnt++)
    }

}


const testNewObj = new TimerTest()
Object.assign(testNewObj,EventEmitter.prototype) // Note EventEmitter.prototype. EventEmitter doesn't have the emit function
testNewObj.start()

// console.log(EventEmitter.prototype)
