import multer, { FileFilterCallback } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { Request } from 'express'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Arquivo Recebido: ', file.originalname)
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        console.log('Salvando Arquivo: ', file.originalname)
        cb(null, `${Date.now()}|${uuidv4()}-${file.originalname}`)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        console.log('Arquivo Aceito: ', file.originalname)
        cb(null, true)
    }else{
        console.log('Arquivo Rejeitado, não é uma imagem válida: ', file.originalname)
        cb(null, true)
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 50 //Limete de 50 MB
    }
})

export { upload }