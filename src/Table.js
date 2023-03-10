import { useState,useEffect } from "react"



export function Table(props){
    //sus ( when console.log(props) is used, props printed twice )
    const cutoff = 0.75
    let DATA = []
    for(let key in props.Query_data){
        let row = []
        row.push(key)
        row.push(props.Query_data[key]['present'])
        row.push(props.Query_data[key]['total']-props.Query_data[key]['present'])
        row.push(props.Query_data[key]['total'])
        if(row[3] == 0)
            row.push(0)
        else
            row.push(row[1]*100/row[3])
        if(row[4]<cutoff*100) row.push(Math.ceil(parseFloat(parseFloat(parseFloat(cutoff*row[3]) - row[1])/parseFloat(1-cutoff))))
        else row.push(-(Math.ceil(parseFloat((row[1]-cutoff*row[3])/cutoff))-1))
        DATA.push(row)
    }
    //may need to use try and catch
    return(
        <>
        <div className="table" id="main_table">
            <table>
                <thead>
                    <tr>
                        <th>Subject - ID</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>No. of classes</th>
                        <th>%</th>
                        <th>No. of classes needed for cutoff</th>
                    </tr>
                </thead>
                <tbody>
                    {DATA.map((v1,i1)=>{
                        return(<>
                            <tr>
                                {v1.map((v2,i2)=>{
                                    return(<td>{v2}</td>)
                                })}
                            </tr>
                        </>)
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}