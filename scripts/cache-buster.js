const fs = require('fs');
const files = ['home.html', 'about.html', 'skills.html', 'projects.html', 'contact.html', 'index.html'];
const timestamp = Date.now();

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/href="styles\/(.*?)\.css(?:\?v=\d+)?"/g, 'href="styles/$1.css?v=' + timestamp + '"');
    fs.writeFileSync(f, c);
});
console.log('Cache busted.');
