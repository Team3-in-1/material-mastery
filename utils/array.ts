function findIndex(array: any, label: String = "Gach men"){
    const name = label.replaceAll("%20", " ").toLowerCase();
    for(let i = 0; i < array.length; i++){
        if(array[i].label.toLowerCase() === name){
            return i;
        }
    }
    return 0;
}


export {findIndex};