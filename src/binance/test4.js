function powerOf(number){
    let result =number**2
    sleep(3000)
    return result
}

function sleep(ms){
    const wakeupTime = Date.now() + ms;
    while(Date.now()<wakeupTime){}
}
async function run(number){
    try{
        let result=0
        result=powerOf(number)
        return result
    }catch{
        return 'oh my god'
    }
}

console.log(run(4))