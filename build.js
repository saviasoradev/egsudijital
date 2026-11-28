const fs=require('fs'),path=require('path');
const R=require('./yonetim/render.js');
const data=JSON.parse(fs.readFileSync('data/site.json','utf8'));
const css=fs.readFileSync('_src/site.css','utf8').trim(),js=fs.readFileSync('_src/site.js','utf8').trim();
const out=R.renderAll(data,css,js,{today:process.argv[2]});
for(const [f,c] of Object.entries(out)){fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,c)}
console.log(Object.keys(out).map(f=>f+' '+out[f].length).join('\n'));
