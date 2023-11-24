function splitArray<T>(array: T[], chunkSize: number) {
    return array.reduce<T[][]>((result, _, index) => {
        if (index % chunkSize === 0) {
            result.push(array.slice(index, index + chunkSize));
        }
        return result;
    }, []);
}


const convertStringToOject = (data: string | null) => {
    var array = [];
    if(data){
        var object = JSON.parse(data);
        
        for (var i in object) {
            array.push(object[i]);
        }
    }
    return array;
}

export { splitArray, convertStringToOject };