const httpServer = require('http');
const url = require('url')
const fs = require('fs')

const replaceTemplate = require("./template/replaceTemplate")

//Read data from file
const tempCourse = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
);

const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse.html`,
    'utf-8'
);


const dataObj = JSON.parse(tempCourse);

// Create Server
const server = httpServer.createServer((req, res) => {

    const {query, pathname} = url.parse(req.url, true)

    if(query.id){
        if(pathname === '.' || pathname.toLowerCase() === '/course'){
            res.writeHead( 200, {
                'Content-type' : 'text/html'
            })
            const course = dataObj[Number(query.id)]
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course)
            
            res.end(courseHTML)
        } else {
            res.writeHead( 404, {
                'Content-type': 'text/html'
            })
            res.end('resource not found')
        }
    }
   
    
});

// Start listening to requests
server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000')
})