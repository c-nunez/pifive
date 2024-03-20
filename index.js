import express from "express";
import { exec } from "child_process";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
        res.render("index.ejs");
});

app.get('/cpu', (req, res) => {
    exec('mpstat 1 1', (err, stdout, stderr) => {
        if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving CPU usage');
        }    
    const lines = stdout.split('\n');    
    lines.forEach(line => {
    res.write(line + '\n');
    });    
    res.end();
});
});

app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`);
});