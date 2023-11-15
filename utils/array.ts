function splitArray<T>(array: T[], chunkSize: number) {
    return array.reduce<T[][]>((result, _, index) => {
        if (index % chunkSize === 0) {
            result.push(array.slice(index, index + chunkSize));
        }
        return result;
    }, []);
}


export { splitArray };