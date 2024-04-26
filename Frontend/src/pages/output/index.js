

import React,{useEffect, useState} from 'react';
import Gantt from './components/Gantt';
import axios from 'axios';

const BELink = "http://172.172.29.154:8000/result";

const dataResponse = {
    data: [],
    links: []
}
const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' }
    ]
};

const extractData = (rawResponse) => {
    if (rawResponse.type == "Agile") {
        let counter = 1;
        for (let i = 0; i < rawResponse.plan.length(); i++) {
            for (let j = 0; j < rawResponse.plan[i].length(); j++) {
                dataResponse.data[counter].data.id = i + 1;
                dataResponse.data[counter].text = rawResponse.plan[i][j].task;
                dataResponse.data[counter].duration = rawResponse.plan[i][j].effort;
                dataResponse.data[counter].progess = 0;
                if (i == 0)
                 dataResponse.data[counter].start_date = '2019-04-15'
                else {
                    let dateObject  = datetime.strptime(dataResponse.data[i - 1].start_date, '%Y-%m-%d');
                    let newDate = dateObject + timedelta(days=parseInt(rawResponse.plan[i - 1][0].effort) * 7);
                    dataResponse.data[counter].start_date = newDate.strftime('%Y-%m-%d')
                    dataResponse.links[counter].id = i;
                    dataResponse.links[counter].source = i;
                    dataResponse.links[counter].target = i + 1;
                }
                dataResponse.links[counter].type = '0';
                counter++;
            }
        }
    } 
    else if (rawResponse.type == "Incremental") {

    }
    else {

    }
}
const takeData = async () => {
    try {
        const APIResponse = await axios.get(BELink, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Set your desired Access-Control-Allow-Origin value
              } 
            }
        ) ;
        setInfo(APIResponse)
        extractData(info);
        console.log(info);
      } catch (error) {
        console.log(error);
      }
}
const OutPutPage = () => {
    const [info,setInfo] = useState([]);
    useEffect(async ()=>{
        //await takeData()
    },[])
    return (
        <div style={{
            width: '100%',
            height: '100%',
            overflow: 'auto' // Add overflow property if necessary
          }}> 
            <div className="gantt-container"
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto' // Add overflow property if necessary
                  }}>
                <Gantt tasks={data}/>
            </div>      
        </div>
    )
}
export default OutPutPage
