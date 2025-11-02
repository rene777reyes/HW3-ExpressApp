import express from 'express';
const animals = (await import('animals')).default;
import fetch from 'node-fetch';

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


// routes
app.get('/', (req, res) => {
    res.render('home.ejs');
 });


app.get('/search', async (req, res) => {
    let keyword = req.query.keyword;
    console.log("keyword is " + keyword);
    let url = `https://api.api-ninjas.com/v1/animals?name=${keyword}`;
    let response = await fetch(url, {headers: {"X-Api-Key": "EII0kwnL9nrdcjIf02QgDg==9LhwsO3deSK3gLRU"}});
    let data = await response.json()
    console.log(data[0]);
    res.render("result.ejs", {keyword: data[0]});
});

app.get('/random_animal', async (req, res) => {
    let randomAnimal = animals();
    //let fox = animals("fox");
    let url = `https://api.api-ninjas.com/v1/animals?name=${randomAnimal}`;
    let response = await fetch(url, {headers: {"X-Api-Key": "EII0kwnL9nrdcjIf02QgDg==9LhwsO3deSK3gLRU"}});
    let data = await response.json()

    if (!data || data.length === 0){
        console.log(randomAnimal + " is not in the API");
        return res.redirect("/random_animal");
    } else {
        console.log(data[0]);
    }
    //console.log(fox);
    res.render('random.ejs', {animal: data[0]});
});


app.listen(3000, () => {
    console.log('server started!!!');
 });