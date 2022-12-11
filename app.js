import express from 'express'
import ProductManager from './src/ProductManager.js'

const app = express()
const PORT = 8080
const productManager = new ProductManager('./Productos.json')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.text())


app.listen(PORT, ()=> {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})

app.get ('/products',(req,res)=>{
    res.json(productManager.getProducts())
})



app.get ('/products/:pid',(req,res)=>{
    const responseObject = {}
    const id = Number(req.params.id)
    const product = productManager.getProductById(id)
    responseObject.product = product
    res.json(responseObject)
})
