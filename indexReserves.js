import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

//Creo l'objecte de l'aplicació
const app=express();
app.use(bodyParser.json())

const readData=()=>{
    try{
        const data=fs.readFileSync("./reserves.json");
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
        fs.writeFileSync("./reserves.json",JSON.stringify(data));

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
app.get("/reserves",(req,res)=>{
    const data=readData();
    res.json(data.reserves);
})
//Creem un endpoint per obtenir un llibre per un id
app.get("/reserves/:id",(req,res)=>{
    const data=readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id=parseInt(req.params.id);
    const reserves=reserves.reserves.find((reserves)=>reserves.id===id);
    res.json(reserves);
})

//Creem un endpoint del tipus post per afegir un llibre

app.post("/reserves",(req,res)=>{
    const data=readData();
    const body=req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newReserva={
        id:data.reserves.length+1,
        ...body,
    };
    data.reserves.push(newReserva);
    writeData(data);
    res.json(newReserva);
});

//Creem un endpoint per modificar un llibre


app.put("/reserves/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const newReserva = data.reserves.findIndex((reserves) => reserves.id === id);
    data.reserves[newReserva] = {
      ...data.reserves[newReserva],
      ...body,
    };
    writeData(data);
    res.json({ message: "notification updated successfully" });
  });

//Creem un endpoint per eliminar un llibre
app.delete("/reserves/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const newReserva = data.reserves.findIndex((reserves) => reserves.id === id);
    //splice esborra a partir de bookIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.reserves.splice(newReserva, 1);
    writeData(data);
    res.json({ message: "reserves deleted successfully" });
  });

//Funció per escoltar
app.listen(3000,()=>{
    console.log("Server listing on port 3000");
});