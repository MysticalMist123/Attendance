import React, {useState,useEffect} from "react"

const insert_ep = 'http://127.0.0.1:8000/insert'
const del_ep = 'http://127.0.0.1:8000/del'
const update_ep = 'http://127.0.0.1:8000/update'
const query_ep = 'http://127.0.0.1:8000/query'

function Query(){
  return new Promise((resolve,reject)=>{
      fetch(query_ep).then((data)=>data.json()).then((data)=>{
          resolve(data)
      })
  })
}

function insert(sub_id,date,value,callback){
    fetch(insert_ep,{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        'sub_id':sub_id,
        'date':date,
        'value':value
      })
    }).then((data)=>{callback()})
  }
  
  function del(sub_id,date,callback){
    fetch(del_ep,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'sub_id':sub_id,
        'date':date
      })
    }).then((data)=>{callback()})
  }
  
  function update(sub_id,date,new_value,callback){
    fetch(update_ep,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'sub_id':sub_id,
        'date':date,
        'new_value':new_value
      })
    }).then((data)=>{callback()})
  }

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

export function Edit(props){
    let [In_sub_id,Set_In_sub_id] = useState("")
    let [In_date,Set_In_date] = useState(today())
    let [In_value,Set_In_value] = useState(0)
    let [Del_sub_id,Set_Del_sub_id] = useState("")
    let [Del_date,Set_Del_date] = useState(today())
    let [Upd_sub_id,Set_upd_sub_id] = useState("")
    let [Upd_date,Set_upd_date] = useState(today())
    let [Upd_value,Set_upd_value] = useState(0)

    function InsertSubjectHandler(e){
      e.target.value = e.target.value.toUpperCase()
      Set_In_sub_id(e.target.value)
    }
    function InsertDateHandler(e){
      Set_In_date(e.target.value)
    }
    function InsertValueHandler(e){
      Set_In_value(parseInt(e.target.value))
    }
    function DeleteSubjectHandler(e){
      e.target.value = e.target.value.toUpperCase()
      Set_Del_sub_id(e.target.value)
    }
    function DeleteDateHandler(e){
      Set_Del_date(e.target.value)
    }
    function UpdateSubjecthandler(e){
      e.target.value = e.target.value.toUpperCase()
      Set_upd_sub_id(e.target.value)
    }
    function UpdateDateHandler(e){
      Set_upd_date(e.target.value)
    }
    function UpdateValueHandler(e){
      Set_upd_value(e.target.value)
    }

    function Submit_Insert(){
      if(In_date && In_sub_id){
        insert(In_sub_id,In_date,In_value,()=>{
          Query().then((data)=>props.Set_Query_data(data))
        })
        Set_In_sub_id("")
        Set_In_value(0)
        Set_In_date(today())
        alert("Insertion successful")
      }
    }
    function Submit_Delete(){
      if(Del_sub_id && Del_date){
        del(Del_sub_id,Del_date,()=>{
          Query().then((data)=>props.Set_Query_data(data))
        })
        Set_Del_sub_id("")
        Set_Del_date(today())
        alert("Deletion successful")
      }
    }
    function Submit_Update(){
      if(Upd_sub_id && Upd_date){
        update(Upd_sub_id,Upd_date,Upd_value,()=>{
          Query().then((data)=>props.Set_Query_data(data))
        })
        Set_upd_sub_id("")
        Set_upd_date(today())
        Set_upd_value(0)
        alert("updation successful")
      }
    }

    return(<>
    <div id='edit_container'>

        <div id='insert' className='box'>
          <div className='box_title'>Insert</div>
          <div className='box_field'>
            <label>Subject ID : </label>
            <div><input type="text" name="sub_id" id="sub_id1" value={In_sub_id} onChange={InsertSubjectHandler}></input><br></br></div>
          </div>
          <div className='box_field'>
            <label>Date : </label>
            <div><input type="date" name="date" id="date1" value={In_date} onChange={InsertDateHandler}></input><br></br></div>
          </div>
          <div className='box_field'>
            <label>No. of Classes attended : </label>
            <div><input type="number" min="0" name="value" id="value1" value={In_value} onChange={InsertValueHandler}></input><br></br></div>
          </div>
          <div className="submit_area">
            <button onClick={Submit_Insert}>Enter</button>
          </div>
        </div>

        <div id='delete' className='box'>
          <div className='box_title'>Delete</div>
          <div className='box_field'>
            <label>Subject ID : </label>
            <div><input type="text" name="sub_id" id="sub_id2" value={Del_sub_id} onChange={DeleteSubjectHandler}></input><br></br></div>
          </div>
          <div className='box_field'>
            <label>Date : </label>
            <div><input type="date" name="date" id="date2" value={Del_date} onChange={DeleteDateHandler}></input><br></br></div>
          </div>
          <div className="submit_area">
            <button onClick={Submit_Delete}>Enter</button>
          </div>
        </div>

        <div id='update' className='box'>
          <div className='box_title'>Update</div>
          <div className='box_field'>
            <label>Subject ID : </label>
            <div><input type="text" name="sub_id" id="sub_id3" value={Upd_sub_id} onChange={UpdateSubjecthandler}></input><br></br></div>
          </div>
          <div className='box_field'>
            <label>Date : </label>
            <div><input type="date" name="date" id="date3" value={Upd_date} onChange={UpdateDateHandler}></input><br></br></div>
          </div>
          <div className='box_field'>
            <label>No. of Classes attended : </label>
            <div><input type="number" min="0" name="new_value" id="new_value3" value={Upd_value} onChange={UpdateValueHandler}></input><br></br></div>
          </div>
          <div className="submit_area">
            <button onClick={Submit_Update}>Enter</button>
          </div>
        </div>

    </div>
    </>)
}