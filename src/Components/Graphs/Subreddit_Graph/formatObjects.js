
const formatData = (data, dataKey, dataValue) => {
    let result = []
    console.log(dataKey)
    const ignoredAuthors = ['AutoModerator', '[deleted]']
    const ignoredWords = ['t', 'moderators', 'r', 'subreddit', 'comment', 'moderation', 'bot', 'submission']

    const dataArr = Object.entries(data)
    for (const [key, value] of dataArr) {
        if (dataKey === "author" && ignoredAuthors.includes(key)) {
            console.log(key)
            continue;
        }
        if (dataKey === "text" && ignoredWords.includes(key)) {
            console.log(key)
            continue;
        }
        var obj = {}
        obj[dataKey] = key 
        obj[dataValue] = value
        result.push(obj)
    }
    result.sort((a,b) => b.comments - a.comments)
    return result
}

export {formatData}