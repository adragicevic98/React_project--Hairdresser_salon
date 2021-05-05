const info= (...users) => {
    if(process.env.NODE_ENV !== 'test'){
        console.log(...users);
    }
}
const greska=(...users) => {
    console.error(...users);
}

module.exports={info,greska}