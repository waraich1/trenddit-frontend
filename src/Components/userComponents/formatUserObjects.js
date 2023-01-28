
const formatUserData = (data, dataKey, dataValue, dataValueName) => {
    let result = []

    const dataArr = Object.entries(data)
    for (const [key, value] of dataArr) {
        var obj = {}
        obj[dataKey] = key 
        obj[dataValue] = value[dataValueName]
        obj['label'] = key
        if (key.length > 8) {
            obj['label'] = key.slice(0,6) + ".."
        }
        result.push(obj)
    }
    result.sort((a,b) => {
        return b[dataValue] - a[dataValue]})
    
    while (result.length < 15) {
        var emptyObj = {}
        emptyObj[dataKey] = ""
        emptyObj[dataValue] = 0
        emptyObj['label'] = "" 
        result.push(emptyObj)
    }

    return result.slice(0,15)
}

export {formatUserData}