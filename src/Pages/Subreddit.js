import React, { useState, useEffect } from 'react'
import { ResponsiveContainer, BarChart, Tooltip, XAxis, YAxis, Bar, LabelList } from 'recharts';

function Subreddit() {
    const data = []
    const [subreddit, setSubreddit] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({});
    const [isReady, setIsReady] = useState(false);
    const [renderBarChart, setBarChart] = useState(
        <ResponsiveContainer width="80%" height={400}>
        <BarChart data={data}>
            <XAxis dataKey={"author"}/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="comments" fill="#8884d8"/>
        </BarChart>
        </ResponsiveContainer>
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:500/subreddit_comments")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setItems(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )

    }

    useEffect(() => {
        if (isLoaded) {
            for (const [key, value] of Object.entries(items.author)) {
                data.push({
                    author: key,
                    comments: value
                })
            } 
            console.log(data)
            setIsReady(true);
            setBarChart(
            <ResponsiveContainer width="80%" height={600}>
            <BarChart data={data}>
                <XAxis tick={false} label={{value: 'Author', position: 'insideBottom', offset:'-5' }}/>
                <YAxis label={{value: 'Number of comments', angle: -90, position: 'Left' }}/>
                <Tooltip />
                <Bar dataKey="comments" fill="#8884d8">
                    <LabelList dataKey="author" position="center" angle="90" fill='black'/>
                </Bar>
            </BarChart>
            </ResponsiveContainer>)
        }
    }, [isLoaded])

    // const renderBarChart = (
    //     <BarChart width={400} height={400} data={data}>
    //         <XAxis dataKey={"author"}/>
    //         <YAxis />
    //         <Tooltip />
    //         <Bar dataKey="comments" fill="#8884d8"/>
    //     </BarChart>
    // )

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Enter subreddit name: 
            <input type="text" value={subreddit} onChange={(e) => setSubreddit(e.target.value)}/>
            </label>
            <input type="submit" />
        </form>
        {renderBarChart}
        {/* {isReady && renderBarChart} */}
        {/* // <ul>
        //     {Object.entries(items.author).map(([key, value]) =>  (
        //         key != '[deleted]' &&
        //          <li>
        //             {key} commented {value} times
        //          </li>
        //      ))}
        // </ul>} */}
        </>
    )
}


export default Subreddit;