import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

//Creo l'objecte de l'aplicació
const app=express();
app.use(bodyParser.json())

const readData=()=>{
    try{
        const data=fs.readFileSync("./notificacions.json");
        //console.log(data);
        //console.log(JSON.parse(data));
        return JSON.parse(data)

    }catch(error){
        console.log(error);
    }
};
//Funció per escriure informació
const writeData=(data)=>{
    try{
        fs.writeFileSync("./notificacions.json",JSON.stringify(data));

    }catch(error){
        console.log(error);
    }
}
//Funció per llegir la informació
//readData();

app.get("/",(req,res)=>{
    res.send("Wellcome to my first API with Node.js");
});

//Creem un endpoint per obtenir tots els llibres
app.get("/notificacions",(req,res)=>{
    const data=readData();
    console.log(data)
    res.json(data.notificacions);
})
//Creem un endpoint per obtenir un llibre per un id
app.get("/notificacions/:id",(req,res)=>{
    const data=readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id=parseInt(req.params.id);
    const notificacions=notificacions.notificacions.find((notificacions)=>notificacions.id===id);
    res.json(notificacions);
})

//Creem un endpoint del tipus post per afegir un llibre

app.post("/notificacions",(req,res)=>{
    const data=readData();
    const body=req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newNotificacion={
        id:data.notificacions.length+1,
        ...body,
    };
    data.notificacions.push(newNotificacion);
    writeData(data);
    res.json(newNotificacion);
});

//Creem un endpoint per modificar un llibre


app.put("/notificacions/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificacionsIndex = data.notificacions.findIndex((notificacions) => notificacions.id === id);
    data.notificacions[notificacionsIndex] = {
      ...data.notificacions[notificacionsIndex],
      ...body,
    };
    writeData(data);
    res.json({ message: "notification updated successfully" });
  });

//Creem un endpoint per eliminar un llibre
app.delete("/notificacions/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notificacionsIndex = data.notificacions.findIndex((notificacions) => notificacions.id === id);
    //splice esborra a partir de bookIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.notificacions.splice(notificacionsIndex, 1);
    writeData(data);
    res.json({ message: "notificacions deleted successfully" });
  });

//Funció per escoltar
app.listen(3000,()=>{
    console.log("Server listing on port 3000");
});