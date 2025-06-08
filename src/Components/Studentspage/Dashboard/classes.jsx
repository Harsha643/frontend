import React,{useEffect,useState} from "react"

const Classes=({classData})=>{
    const [classes,setClasses]=useState([])
    const [filteredClass,SetFilterClass]=useState([])
useEffect(()=>{
             async function getClasses(){
                    const response=await fetch('http://localhost:4000/staff/class')
                    const data=await response.json()
                    console.log("10",data)
                    setClasses(data)

             }

getClasses()
console.log(classData)

        },[])
    
console.log(classes)

useEffect(()=>{
    const filteringData=classes.filter((item)=>item.class===classData)
    SetFilterClass(filteringData)
},[classes,classData])

console.log("this is the filtered class",filteredClass)


const handleclick=()=>{

}

return(
    <>
    <div className="classes-container">
    <h1>this is class</h1>
        <div className="class-list">
            {filteredClass.map((item,index)=>
                      <div className="inside-list">
                          <h2>Topic:{item.topic}</h2>
                        <h2>subjet:{item.subject}</h2>
                        <button onclick={handleclick()}>Notes</button>
                        </div>
            )}
        </div>
    </div>
    </>
)
    
    
    
    
    
    
    
    
    
    
    }

export default Classes