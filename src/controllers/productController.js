const fs = require("fs");
const path = require("path");

let productos = fs.readFileSync(path.join(__dirname, "../data/productos.json"), "utf8");
productosJson = JSON.parse(productos);

module.exports = {
    product: function(req,res){
        res.render("products/product")
    },
    register: function(req,res){
        let product = fs.readFileSync(path.join(__dirname, "../data/productos.json"), "utf8");
        product = JSON.parse(product); 
        res.render("products/newProducts", {
            productos: product
        })
    },
    create: function(req, res){
        productosJson.push({
            id: req.body.id,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.files[0].filename,
            categoria: req.body.categoria,
            precio: req.body.precio
        })
        fs.writeFileSync(path.join(__dirname, "../data/productos.json"), JSON.stringify(productosJson))
        res.redirect("/product/productList")
    },
    productList: function(req,res){
        let product = fs.readFileSync(path.join(__dirname, "../data/productos.json"), "utf8");
        product = JSON.parse(product); 
        res.render("products/productList", {
            productos: product
        })
    },
    editView: function(req,res){
        let idProduct = req.params.idProducto
        let product = fs.readFileSync(path.join(__dirname, "../data/productos.json"), "utf8");
        product = JSON.parse(product); 
        let productToEdit = product[idProduct]
        res.render("products/editProducts", {
            productos: productToEdit
        })
    },
    edit: function(req, res){
        res.send("Editado")
      }
}