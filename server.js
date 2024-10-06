const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }

        let fileList = `
            <html>
                <head>
                    <title>Carti Games</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                        }
                        h1 {
                            color: #2c3e50;
                        }
                        ul {
                            list-style-type: none;
                            padding: 0;
                        }
                        li {
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    <h1>Carti Games</h1>
                    <h2>Files in Directory:</h2>
                    <ul>`;
        
        files.forEach(file => {
            fileList += `<li><a href="${file}">${file}</a></li>`;
        });
        
        fileList += `
                    </ul>
                </body>
            </html>`;
        
        res.send(fileList);
    });
});

// Serve static files from the current directory
app.use(express.static(__dirname));

module.exports = app; // Export the app for Vercel
