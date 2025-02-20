import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./usuaris.json", "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error llegint el fitxer:", error);
        return { usuaris: [] }; // Retorna un array buit si hi ha error
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./usuaris.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error escrivint el fitxer:", error);
    }
};

app.get("/", (req, res) => {
    res.send("Welcome to my first API with Node.js");
});

app.get("/usuaris", (req, res) => {
    const data = readData();
    res.json(data.usuaris);
});

app.get("/usuaris/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const usuari = data.usuaris.find((u) => u.id === id);
    if (!usuari) {
        return res.status(404).json({ message: "Usuari no trobat" });
    }
    res.json(usuari);
});

app.post("/usuaris", (req, res) => {
    const data = readData();
    const body = req.body;
    const newUsuari = {
        id: data.usuaris.length + 1,
        ...body,
    };
    data.usuaris.push(newUsuari);
    writeData(data);
    res.status(201).json(newUsuari);
});

app.put("/usuaris/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.usuaris.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Usuari no trobat" });
    }

    data.usuaris[index] = {
        ...data.usuaris[index],
        ...req.body,
    };

    writeData(data);
    res.json({ message: "Usuari actualitzat correctament" });
});

app.delete("/usuaris/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.usuaris.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Usuari no trobat" });
    }

    data.usuaris.splice(index, 1);
    writeData(data);
    res.json({ message: "Usuari eliminat correctament" });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
