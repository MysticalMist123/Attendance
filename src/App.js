import { useEffect, useState } from "react"
import './App.css';
import {Edit} from './Edit.js'
import {Table} from './Table.js'
import {ViewDate} from './ViewDate.js'
import {FooterContent} from './FooterContent.js'
const query_ep = 'http://127.0.0.1:8000/query'

function Query(){
  return new Promise((resolve,reject)=>{
      fetch(query_ep).then((data)=>data.json()).then((data)=>{
          resolve(data)
      })
  })
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

function App() {
  let [Query_data,Set_Query_data] = useState({})
  useEffect(()=>{
      Query().then((data)=>Set_Query_data(data))
  },[])

  try{
    return(<>
      <header>ATTENDANCE</header>
      <div id='body'>
        <Edit Query_data={Query_data} Set_Query_data={Set_Query_data}/>
        <br></br>
        <Table Query_data={Query_data} Set_Query_data={Set_Query_data}/>
        <br></br>
        <ViewDate Query_data={Query_data} Set_Query_data={Set_Query_data}/>
        <br></br>
      </div>
      <footer>
        <FooterContent Query_data={Query_data} Set_Query_data={Set_Query_data}/>
      </footer>
    </>);
  }
  catch{

  }
}

export default App;