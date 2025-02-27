import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { Request } from 'express'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Arquivo Recebido: ', file.originalname)
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        console.log('Salvando Arquivo: ', file.originalname)
        cb(null, `${Date.now()}-${file.originalname}`)
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