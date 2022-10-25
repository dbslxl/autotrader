

class Test{
    constructor(){
        this.name='kim'
        this.age=30
    }
    run(){
        this.printThis()
        // this.printThis.bind(this)()
        setTimeout(this.changeName.bind(this),5000)
    }
    printThis(){
        //console.log('this : ',this)
        console.log('this name : ',this.name)
        console.log('this age : ',this.age)
        setTimeout(this.printThis.bind(this),1000)
    }
    changeName(){
        this.name='park'
    }

}

const test = new Test()
test.run()