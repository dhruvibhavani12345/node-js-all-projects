const express = require('express');

const port = 9000;

const app = express();

app.set('view engine', 'ejs');

let users = []

app.use(express.urlencoded());

app.get('/', (req, res) => {
    return res.render('index', {
        all: users
    })
})
app.post('/insertrecord', (req, res) => {
    const { editid, Task, Status, deadline } = req.body;

    if (editid) {
        const { editid, Task, Status, deadline } = req.body;
        let up = users.map((val) => {
            if (val.id == editid) {
                val.Task = Task;
                val.Status = Status;
                val.Deadline = deadline;
            }
            return val;
        })
        users = up;
        console.log("record update");
        return res.redirect('/');
    } else {
        let obj = {
            id: Math.floor(Math.random() * 100000),
            Task: Task,
            Status: Status,
            deadline: deadline,
        }
        users.push(obj);
        console.log("user succesfully add");
        return res.redirect('/')
    }



})

app.get('/deleteuser', (req, res) => {
    let id = req.query.deleteId;
    let d = users.filter(val => val.id != id);
    users = d;
    console.log("user succesfully add");
    return res.redirect('/')
})

app.get('/edituser', (req, res) => {
    // let id = req.query.id;
    let single = users.find(val => val.id == req.query.id);
    return res.render('edit', {
        single
    })
})
app.post('/updateuser', (req, res) => {

})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server start on port ${port}`);
})







