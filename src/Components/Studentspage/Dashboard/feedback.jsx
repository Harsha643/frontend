import React,{useState,useEffect} from 'react';

const Feedback=({rollNumber})=>{
    const [feedback, setFeedback] = useState([]);
    const[filteredFeedback,setFilteredFeedback]=useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/staff/feedback")
        .then(res=>res.json())
        .then(data => console.log(data)|| setFeedback(data))
        .catch(error=>console.error("Error feching feedback",error.message))
        },[]);
// console.log("12",feedback)
        useEffect(()=>{
            if(feedback.length>0 && rollNumber){
                const filteredData = feedback.filter(item =>item.rollNumber===rollNumber)
                setFilteredFeedback(filteredData)
            }
        })
    return (

        <div className='feedback-container'>
            <h1>Feedback</h1>
            <div className='feedback-list'>
                
                        <table>
                    <thead>
                        <tr>
                            <th>s.no</th>
                            <th>Subject</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeedback.map((item,index)=>
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.feedback}</td>
                                </tr>
)}   
                    </tbody>
                </table>
                        </div>

            

            </div>
        
    )
}

export default Feedback