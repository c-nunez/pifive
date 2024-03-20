import express from "express";
import { exec } from "child_process";
class CPUMonitor {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.startRoutes();
    }

    startRoutes() {
        this.app.use(express.static("public"));

        this.app.get("/", (req, res) => {
            res.render("index.ejs");
        });

        this.app.get('/cpu', this.handleCPURoute.bind(this));

        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }

    handleCPURoute(req, res) {
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
    }
}
const cpuMonitor = new CPUMonitor();