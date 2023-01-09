import { useEffect, useState } from "react";

function today(){
    var date = new Date();
  
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
  
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
  
    var today = year + "-" + month + "-" + day;
    return today
}

export function ViewDate(props){
    let [V_date,Set_V_date] = useState(today())
    let [Table,Set_Table] = useState([])
    let [TableView,Set_TableView] = useState({width:'700px',display:'none'})
    function ViewDateHandler(e){
        Set_V_date(e.target.value)
    }

    function Make_Table(){
        let temp = []
        for(let subkey in props.Query_data){
            if(props.Query_data[subkey]['dates'][V_date]!=undefined){
                temp.push([V_date,subkey,props.Query_data[subkey]['dates'][V_date]])
            }
        }
        if(temp.length){
            Set_TableView({width:'700px'})
            Set_Table(temp)
            console.log("yo")
        }
    }
    // console.log("here1")

    return(<>
        <div id="view_container">
            <div id='view' className='box'>
                <div className='box_title'>View</div>
                <div className='box_field'>
                    <label>Date : </label>
                    <div><input type="date" name="date" id="date1" value={V_date} onChange={ViewDateHandler}></input><br></br></div>
                </div>
                <div className="submit_area">
                    <button onClick={Make_Table}>Enter</button>
                </div>
            </div>

            <div className="table" id="Date_table" style={TableView}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Subject attended</th>
                            <th>No. of classes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Table.map((v1,i1)=>{
                            console.log("HERE")
                            return(<>
                            <tr>
                                {v1.map((v2,i2)=>{
                                    return(<>
                                    <td>{v2}</td>
                                    </>)
                                })}
                            </tr>
                            </>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}