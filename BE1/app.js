const express = require('express')
const app = express()
const filesystem = require('filesystem')

app.use(express.json());


//post 
async function addProduct(req,res) {

    let product = await filesystem.readFileSync('product.json');
    product = JSON.parse(product);

    let newProduct = req.body;
    product.product.push(newProduct);

    await filesystem.writeFileSync('product.JSON', JSON.stringify(product) );
    res.send(product.product)


}

//get 
async function getProduct(req,res) {

    let product = await filesystem.readFileSync('product.json');
    product = JSON.parse(product);
    res.send(product.product);

}

//put 
async function updateProduct(req,res) {

    let product = await filesystem.readFileSync('product.json');
    product = JSON.parse(product);
    let prod = req.body;
    let productId = req.params.id;
    
    productId = product.product.findIndex(product => prod.id == productId);
    product.product[productId] = prod;
    
    await filesystem.writeFileSync('product.JSON', JSON.stringify(product) );
    res.send(product.product)
}

    //delete
async function deleteProduct(req,res) {

    let product = await filesystem.readFileSync('product.json');
    product = JSON.parse(product);

    let productId = req.params.id;
    productId = product.product.findIndex(product => prod.id == productId);
    product.product.splice(productId,1);

    await filesystem.writeFileSync('product.JSON', JSON.stringify(product) );
    res.send(product.product)


    

}


app.post("/product",addProduct);
app.get("/product",getProduct);
app.put("/product/:id",updateProduct);
app.delete("/product/:id",deleteProduct);





const PORT = 7000;

app.listen(7000,() => {
    console.log(`server start http://localhost:${PORT}`)
})