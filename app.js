import express from 'express'
import ProductManager from './src/ProductManager.js'

const app = express()
const PORT = 8080
const productManager = new ProductManager('./Productos.json')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.text())


app.listen(PORT, ()=> {
    console.log(`El servidor esta corriendo en la direccion: http://localhost:${PORT}`)
})

app.get ('/products',async (req,res)=>{
    let allProducts = await productManager.getAll()
    const limit = Number(req.query.limit)
    const products = Object.values(allProducts)
    if (limit){ 
        const productosfinal = products.slice(0, limit)
        res.send(productosfinal)
    }
    else {
        res.send(allProducts)
    }
})

app.get ('/products/:pid',async (req,res)=>{
    const id = Number(req.params.pid)
    const producto = await productManager.getProductById(id)
    if (producto === 0){
        res.sendStatus(404)
    }else {
        res.send(producto)
    }
})


