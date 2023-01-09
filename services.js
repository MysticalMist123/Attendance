//-----------------------------------------initial  configs-----------------------------------------------------

const fs = require("fs")
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000
const path = 'data.json'

app.use(cors({origin:'*'}))
app.use(express.json())

//--------------------------------------------request handling--------------------------------------------------

app.get('/query',(req,res)=>{
    query().then((data)=>{
        res.send(data)
    })
})
app.post('/insert',(req,res)=>{
    insert(req.body['sub_id'],req.body['date'],req.body['value'],(s)=>{res.send(s)})
})
app.post('/del',(req,res)=>{
    del(req.body['sub_id'],req.body['date'],(s)=>{res.send(s)})
})
app.post('/update',(req,res)=>{
    update(req.body['sub_id'],req.body['date'],req.body['new_value'],(s)=>{res.send(s)})
})
app.post('/update_sub',(req,res)=>{
    update_sub(req.body['old_id'],req.body['new_id'],(s)=>{res.send(s)})
})
app.post('/del_sub',(req,res)=>{
    del_sub(req.body['sub_id'],(s)=>{res.send(s)})
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//------------------------------------------------functions-----------------------------------------------------

function insert(sub_id,date,value,callback){
    fs.readFile(path,(err,DATA)=>{
        if(err) throw err
        let data = JSON.parse(DATA)

        if(data[sub_id] == undefined){
            data[sub_id] = {
                'dates':{},
                'present':0,
                'total':0
            }
        }
        if(data[sub_id]['dates'][date] == undefined){
            if(value){
                data[sub_id]['present']+=value;
                data[sub_id]['total']+=value;
            }
            else{
                data[sub_id]['total']++;
            }
            data[sub_id]['dates'][date] = value
        }
        else{
            if(value){
                data[sub_id]['present']+=value;
                data[sub_id]['total']+=value;
            }
            else{
                data[sub_id]['total']++;
            }
            data[sub_id]['dates'][date]+= value
        }
        
        data = JSON.stringify(data)
        fs.writeFile(path,data,(err)=>{
            if(err) throw err
            callback('insert done yey')
        })
    })
}

function del(sub_id,date,callback){
    fs.readFile(path,(err,DATA)=>{
        if(err) throw err
        let data = JSON.parse(DATA)

        if(data[sub_id] == undefined){
            return
        }
        if(data[sub_id]['dates'][date]!=undefined){
            if(data[sub_id]['dates'][date]!=0){
                data[sub_id]['present']-=data[sub_id]['dates'][date]
                data[sub_id]['total']-=data[sub_id]['dates'][date]
            }
            else if(data[sub_id]['dates'][date]==0){
                data[sub_id]['total']-=1
            }
            delete(data[sub_id]['dates'][date])
        }

        data = JSON.stringify(data)
        fs.writeFile(path,data,(err)=>{
            if(err) throw err
            callback('yey del done')
        })
    })
}

function update(sub_id,date,new_value,callback){
    fs.readFile(path,(err,DATA)=>{
        if(err) throw err
        let data = JSON.parse(DATA)

        if(data[sub_id] == undefined){
            return
        }
        if(data[sub_id]['dates'][date] == undefined){
            return
        }
        data[sub_id]['dates'][date] = new_value

        if(new_value<=data[sub_id]['total']){
            data[sub_id]['present'] = new_value
        }
        else{
            data[sub_id]['present'] = new_value
            data[sub_id]['total'] = new_value
        }
        // present_days = 0
        // total_days = 0
        // for(let d in data[sub_id]['dates']){
        //     if(data[sub_id]['dates'][d] == 0){
        //         total_days++
        //     }
        //     else{
        //         present_days+=data[sub_id]['dates'][d]
        //         total_days+=data[sub_id]['dates'][d]
        //     }
        // }
        // data[sub_id]['present'] = present_days
        // data[sub_id]['total'] = total_days

        data = JSON.stringify(data)
        fs.writeFile(path,data,(err)=>{
            if(err) throw err
            callback('yey update done')
        })
    })
}

function update_sub(old_id,new_id,callback){
    fs.readFile(path,(err,DATA)=>{
        if(err) throw err
        let data = JSON.parse(DATA)

        if(data[old_id] == undefined)
            return
        data[new_id] = data[old_id]
        delete data[old_id]
        
        data = JSON.stringify(data)
        fs.writeFile(path,data,(err)=>{
            if(err) throw err
            callback('yey update_sub done')
        })
    })
}

function del_sub(sub_id,callback){
    fs.readFile(path,(err,DATA)=>{
        if(err) throw err
        let data = JSON.parse(DATA)

        delete data[sub_id]

        data = JSON.stringify(data)
        fs.writeFile(path,data,(err)=>{
            if(err) throw err
            callback('yey del_sub done')
        })
    })
}

function query(){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,(err,DATA)=>{
            if(err) throw err
            let data = JSON.parse(DATA)

            resolve(data)
        })
    })
}

// {
//     id:{
//         dates:[],
//         present:0,
//         absent:0,
//     },
//     id2:{
//         dates:[{date:'',value:1},{},{},...],
//         present:0,
//         absent:0,
//     }
// }