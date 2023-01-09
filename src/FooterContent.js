import { useState } from "react"

const update_sub_ep = 'http://127.0.0.1:8000/update_sub'
const del_sub_ep = 'http://127.0.0.1:8000/del_sub'
const query_ep = 'http://127.0.0.1:8000/query'

function Query(){
  return new Promise((resolve,reject)=>{
      fetch(query_ep).then((data)=>data.json()).then((data)=>{
          resolve(data)
      })
  })
}

function update_sub(old_id,new_id,callback){
    fetch(update_sub_ep,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'old_id':old_id,
        'new_id':new_id
      })
    }).then((data)=>{callback()})
  }
  
  function del_sub(sub_id,callback){
    fetch(del_sub_ep,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'sub_id':sub_id
      })
    }).then((data)=>{callback()})
  }

export function FooterContent(props){
    let [DelSub,SetDelSub] = useState('')
    let [UpdSub1,SetUpdSub1] = useState('')
    let [UpdSub2,SetUpdSub2] = useState('')

    function DelSubHandler(e){
        e.target.value = e.target.value.toUpperCase()
        SetDelSub(e.target.value)
    }
    function UpdSub1Handler(e){
        e.target.value = e.target.value.toUpperCase()
        SetUpdSub1(e.target.value)
    }
    function UpdSub2Handler(e){
        e.target.value = e.target.value.toUpperCase()
        SetUpdSub2(e.target.value)
    }
    function SubmitDelSub(){
        if(DelSub!=''){
            del_sub(DelSub,()=>{
                Query().then((data)=>props.Set_Query_data(data))
            })
            SetDelSub('')
            alert("Subject deleted")
        }
    }
    function SubmitUpdSub(){
        if(UpdSub1!='' && UpdSub2!=''){
            update_sub(UpdSub1,UpdSub2,()=>{
                Query().then((data)=>props.Set_Query_data(data))
            })
            SetUpdSub1('')
            SetUpdSub2('')
            alert("Subject name changed")
        }
    }

    return(<>
    <div id="FooterContainer">
      <div id="DelSubBox">
          <label>Subject to remove: </label>
          <div><input type="text" name="del_sub" id="del_sub" value={DelSub} onChange={DelSubHandler}></input></div>
          <br></br>
          <button className="FooterButton" onClick={SubmitDelSub}>Enter</button>
      </div>
      <div id="UpdSubBox">
          <div id="UpdFields">
            <div>
              <label>Old subject name: </label>
              <div><input type="text" name="upd_sub1" id="upd_sub1" value={UpdSub1} onChange={UpdSub1Handler}></input></div>
            </div>

            <br></br>
            <div>
              <label>New subject name: </label>
              <div><input type="text" name="upd_sub2" id="upd_sub2" value={UpdSub2} onChange={UpdSub2Handler}></input></div>
            </div>
          </div>

          <br></br>
          <button className="FooterButton" onClick={SubmitUpdSub}>Enter</button>
      </div>
    </div>
    </>)
}