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

//console.log(run(4))

const list = [{hi:3},{hi:4},{hi:5}]

// console.log(list.reduce((p,c)=>{
//     console.log(p.hi,c.hi)
//     return {hi:p.hi+c.hi}
// }))

console.log(Math.abs('-4525.33')+'213')