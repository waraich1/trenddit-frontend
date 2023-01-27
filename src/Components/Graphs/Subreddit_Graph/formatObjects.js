
const formatData = (data, dataKey, dataValue) => {
    let result = []
    const ignoredAuthors = ['AutoModerator', '[deleted]']
    const ignoredWords = ['t', 'moderators', 'r', 'subreddit', 'comment', 'moderation', 'bot', 'submission']

    const dataArr = Object.entries(data)
    for (const [key, value] of dataArr) {
        if (dataKey === "author" && ignoredAuthors.includes(key)) {
            continue;
        }
        if (dataKey === "text" && ignoredWords.includes(key)) {
            continue;
        }
        var obj = {}
        obj[dataKey] = key 
        obj[dataValue] = value
        if (dataKey === "author") {
            obj['label'] = key
            if (key.length > 8) {
                console.log(key.length)
                obj['label'] = key.slice(0,6) + ".."
            }
        }
        result.push(obj)
    }
    result.sort((a,b) => b.comments - a.comments)
    return result
}

export {formatData}