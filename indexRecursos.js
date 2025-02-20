import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

//Creo l'objecte de l'aplicació
const app=express();
app.use(bodyParser.json())

const readData=()=>{
    try{
        const data=fs.readFileSync("./recursos.json");
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
        fs.writeFileSync("./recursos.json",JSON.stringify(data));

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
app.get("/recursos",(req,res)=>{
    const data=readData();
    res.json(data.recursos);
})
//Creem un endpoint per obtenir un llibre per un id
app.get("/recursos/:id",(req,res)=>{
    const data=readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id=parseInt(req.params.id);
    const recursos=recursos.recursos.find((recursos)=>recursos.id===id);
    res.json(recursos);
})

//Creem un endpoint del tipus post per afegir un llibre

app.post("/recursos",(req,res)=>{
    const data=readData();
    const body=req.body;
    //todo lo que viene en ...body se agrega al nuevo libro
    const newRecurso={
        id:data.recursos.length+1,
        ...body,
    };
    data.reserves.push(newRecurso);
    writeData(data);
    res.json(newRecurso);
});

//Creem un endpoint per modificar un llibre


app.put("/recursos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const newRecurso = data.recursos.findIndex((recursos) => recursos.id === id);
    data.recursos[newRecurso] = {
      ...data.recursos[newRecurso],
      ...body,
    };
    writeData(data);
    res.json({ message: "recursos updated successfully" });
  });

//Creem un endpoint per eliminar un llibre
app.delete("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const newRecurso = data.recursos.findIndex((recursos) => recursos.id === id);
    //splice esborra a partir de bookIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.recursos.splice(newRecurso, 1);
    writeData(data);
    res.json({ message: "recursos deleted successfully" });
  });

//Funció per escoltar
app.listen(3000,()=>{
    console.log("Server listing on port 3000");
});