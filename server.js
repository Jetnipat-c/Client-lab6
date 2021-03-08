const express = require('express');
let bodyParser = require('body-parser');
const app = express();  
const router = express.Router();
const PORT = 8081;
let cors = require('cors');
app.use(cors());
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
let people = {
    list: [
        { "id": 4010341, "name": "Warodom", "surname": "Werapun", "major": "CoE", "gpa": 3.3 },
        { "id": 4010342, "name": "John ", "surname": "Lenon", "major": "SE", "gpa": 2.87  }
    ]
 }
 
router.route('/people')
.get((req, res) => {
    console.log("xx")
    res.send(people)
})
.post((req,res) => {
    console.log(req.body)
       let newPeple = {}
       newPeple.id = (people.list.length)?people.list[people.list.length - 1].id + 1:1
       newPeple.name = req.body.name
       newPeple.surname = req.body.surname
       newPeple.major = req.body.major
       newPeple.gpa = req.body.gpa
       people = { "list": [...people.list, newPeple] }
       res.json(people)

})

router.route('/people/:people_id')
.get((req,res) => {
    let id = people.list.findIndex((item) => (item.id == +req.params.people_id));
    res.json(people.list[id])   
})
.put((req,res) => {
    let id = people.list.findIndex((item) => (item.id == +req.params.people_id));
    people.list[id].name = req.body.name;
    people.list[id].surname = req.body.surname;
    people.list[id].major = req.body.major;
    people.list[id].gpa = req.body.gpa;
    res.json(people.list)
})
.delete((req, res) => {
    const people_id = req.params.people_id
    console.log('bearId: ',people_id)
    people.list = people.list.filter(item => +item.id !== +people_id)
    res.json(people.list)        
})


app.listen(PORT, () => {
    console.log("Server running at ", PORT)
})