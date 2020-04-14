const sum = (a,b)=>{
return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('numbers are '+a +' '+b)
        resolve(a+b)
    },2000)
})
}


const doWork= async ()=>{
    const sum1 = await sum(1,99)
    const sum2 = await sum(sum1,10)
    const sum3 = await sum(sum2,3)
    return sum3
}

doWork().then(result=>{
    console.log('result '+result)
})