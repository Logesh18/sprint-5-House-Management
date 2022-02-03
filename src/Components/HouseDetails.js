import axios from "axios";
import react,{useState} from "react";

const HouseDetails=()=>{

    const [resultantData, setResultantData]=useState([]);
    const [houseId,setHouseId]=useState("");
    const [houseNo,setHouseNo]=useState("");
    const [status,setStatus]=useState("");
    const [type,setType]=useState("");

    const addDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'post',
            url: 'http://localhost:8000/saveHouse',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                houseId:houseId,
                houseNo:houseNo,
                status:status,
                type:type
            })
        }).then((response)=>{
            const newData = response.data.map(object => ({
                houseId:object.houseId,
                houseNo:object.houseNo,
                status:object.status,
                type:object.type
            }));
            setResultantData(newData);
        });
    }

    const deleteDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: `http://localhost:8000/deleteHouse?id=${houseId}`
        }).then((response)=>{
            const newData = response.data.map(object => ({
                houseId:object.houseId,
                houseNo:object.houseNo,
                status:object.status,
                type:object.type
            }));
            setResultantData(newData);
        });   
    }

    const showDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: 'http://localhost:8000/getAllHouse'
        }).then((response)=>{
            const newData = response.data.map(object => ({
                houseId:object.houseId,
                houseNo:object.houseNo,
                status:object.status,
                type:object.type
            }));
            setResultantData(newData);
        });  
    }

    const findDetailsById=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: `http://localhost:8000/getHouse?id=${houseId}`
        }).then((response)=>{
            const newData = response.data.map(object => ({
                houseId:object.houseId,
                houseNo:object.houseNo,
                status:object.status,
                type:object.type
            }));
            setResultantData(newData);
        });  
    }

    const findDetailsByType=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: `http://localhost:8000/getByType?type=${type}`
        }).then((response)=>{
            const newData = response.data.map(object => ({
                houseId:object.houseId,
                houseNo:object.houseNo,
                status:object.status,
                type:object.type
            }));
            setResultantData(newData);
        });  
    }

    return(
        <div>
            <center>
            <h1 className="heading">House-Management</h1>
            <div className="formContainer">
                <input type="text" id="houseId" placeholder="Enter House ID" onChange={(e)=>setHouseId(e.target.value)} /><br/>
                <input type="text" id="houseNo" placeholder="Enter House No" onChange={(e)=>setHouseNo(e.target.value)} /><br/>
                <input type="text" id="status" placeholder="Enter House Status" onChange={(e)=>setStatus(e.target.value)} /><br/>
                <input type="text" id="type" placeholder="Enter House Type" onChange={(e)=>setType(e.target.value)}/><br/>
            </div>
            </center>
            <div className="actionContainer">
                <div>
                    <button onClick={()=>{addDetails()}} className="add-button">Save House</button>
                </div>
                <div>
                    <button onClick={()=>{findDetailsByType()}} className="find-type-button">Find By Type</button>
                </div>
                <div>
                    <button onClick={()=>{deleteDetails()}} className="delete-button">Delete House</button>
                </div>
                <div>
                    <button onClick={()=>{showDetails()}} className="show-button">Show All</button>
                </div>
                <div>
                    <button onClick={()=>{findDetailsById()}} className="find-id-button">Find By Id</button>
                </div>  
            </div>
            <div id="result">
                <h2>House Details</h2>
                <div className="detailsContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>House Id</th>
                                <th>House No</th>
                                <th>Status</th>
                                <th>Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultantData.map((data,index)=>{
                                return (
                                    <tr key={index.toString()}>
                                        <td>{data.houseId}</td>
                                        <td>{data.houseNo}</td>
                                        <td>{data.status}</td>
                                        <td>{data.type}</td>
                                    </tr>
                                ) 
                            })}
                        </tbody>    
                    </table>
                </div>
            </div>
            
        </div>
    )
}
export default HouseDetails;