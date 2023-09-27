const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;
app.use(express.json())
//Se crea la base de datos
let comentarios=[{id:0, idProducto:0, comentario:"Este es un comentario padriuris",idUsuario:0},
                {id:1, idProducto:1, comentario:"Muy padre el producto 10 de 10",idUsuario:1},
                {id:2, idProducto:2, comentario:"Se me rompió muy pronto, material chafa",idUsuario:2},
                {id:3, idProducto:3, comentario:"La mejor compra de mi vida",idUsuario:3},
                {id:4, idProducto:4, comentario:"¿Pero sí tiene envio a puebla?",idUsuario:4},
                {id:5, idProducto:5, comentario:" mi me gustan muho de esos",idUsuario:5},
                {id:6, idProducto:6, comentario:"No lo compren, eso es del diablo",idUsuario:6},
                {id:7, idProducto:7, comentario:"Tiene precio de mayoreo?",idUsuario:7},
                {id:8, idProducto:8, comentario:"Lo compró el primo de un amigo y se murio",idUsuario:8},
                {id:9, idProducto:9, comentario:"Efectivamente, este es un comentario",idUsuario:9}];
//Se genera la consulta de todos los comentarios
app.get('/socios/v1/comentarios',(req,res)=>{
    if(comentarios){
        res.status(200).json({
            estado:1,
            mensaje:"Existen comentarios",
            comentarios: comentarios
    })
    }else{res.status(404).json({
        estado:0,
        mensaje:"No se encontraron comentarios",
        comentarios: comentarios
    })
    }
})
//Consulta de un comentario en específico
app.get('/socios/v1/comentarios/:id', (req, res) => {
    const id = req.params.id;
    const comentario = comentarios.find(comentario => comentario.id == id); //se ahorra el for
    if (comentario) {
        res.status(200).json({
            estado: 1,
            mensaje: "Sí se encontró el comentario",
            comentario: comentario
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "comentario no encontrado",
            comentario: {}
        })
    }
})
//Se crea un comentario nuevo
app.post('/socios/v1/comentarios',(req,res)=>{

    const{ idProducto, comentario, idUsuario}= req.body;

    const id = Math.round(Math.random()*1000);
    if(idProducto==undefined || idUsuario== undefined || comentario== undefined){
        res.status(400).json({
            estado: 0,
            mensaje:"Faltan parametros a la solicitud"
        })

    }else{
        const nuevoComentario={id:id, idProducto:idProducto, comentario:comentario, idUsuario:idUsuario};
        const longitudInicial = comentarios.length;
        console.log(comentarios.length);
        console.log(longitudInicial);
        comentarios.push(nuevoComentario)
        if(comentarios.length>longitudInicial){
            //Todo Ok de parte del cliente y el servidor
            res.status(201).json({
                estado:1,
                mensaje: "Comentario creado",
                nuevoComentario: nuevoComentario
            })
        }else{
            //Error del creador de la API o de la base de datos, de la base de datos o de quien lo configura
            res.status(500).json({
                estado: 0,
                mensaje: "Ocurrio un error desconocido"

            })
        }
        
    } 
    
})
//Se actualiza un comentario
app.put('/socios/v1/comentarios/:id',(req,res)=>{

    const{ id}=req.params;
    const{ idProducto, comentario, idUsuario}= req.body;
    if(idProducto==undefined||comentario==undefined || idUsuario==undefined){
        res.status(400).json({
            estado:0,
            mensaje: "Bad request, Faltan parametros en la solicitud"
        })
    }else{
        const posActualizar =comentarios.findIndex(comentario=>comentario.id==id)
        if(posActualizar!= -1){

            comentarios[posActualizar].idUsuario=idUsuario;
            comentarios[posActualizar].comentario=comentario;
            comentarios[posActualizar].idProducto=idProducto;
            res.status(200).json({
                estado:1,
                mensaje:"Comentario actualizado",
                comentarios:comentarios[posActualizar]
            })
        }else{

            res.status(404).json({
                estado:0,
                mensaje:"No se encontró el registro"
            })
        }
    }

})
//Se elimina un comentario
app.delete('/socios/v1/comentarios/:id',(req,res)=>{

    const{ id }= req.params;
    const indiceEliminar= comentarios.findIndex(comentario=>comentario.id==id)
    if(indiceEliminar!=-1){
        comentarios.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"comentario eliminado con exito"
        })

    }
    else{
        res.status(404).json({
            estado:0,
            mensaje:"registro no encontrado"
        })
    }
})

app.listen(puerto,()=>{
console.log(('servidor corriendo en el puerto', puerto));
})