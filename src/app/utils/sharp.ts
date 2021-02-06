import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { promisify } from 'util'
import aws from 'aws-sdk'
import { logger } from '@logger'
import { ApiError } from '@src/app/exceptions/api-error'

const storageS3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const storage_mode = <'local' | 's3'>process.env.STORAGE_MODE
type paths = 'user' | 'product' | 'employee' | 'category'

interface ReturnImageData {
  name: string;
  path_img: string;
}

class Sharp {
  async compressImage (file: Express.Multer.File, storage: paths): Promise<ReturnImageData> {
    try {
      const pathRemoteStorage = '/img/' + storage + '/'
      const pathLocalStorage = 'public/img/' + storage + '/'
      const newNameFile = file.filename.split('.')[0] + '.webp'
      const newNameFileSmall = file.filename.split('.')[0] + '_small.webp'

      const imgOri = sharp(file.path)
      const newImg = imgOri
        .clone()
        .toFormat('webp')
        .webp({
          quality: 100
        })
      const newSmallImg = imgOri
        .clone()
        .resize(300)
        .toFormat('webp')
        .webp({
          quality: 50
        })

      logger.info(`Ambiente de envio: ${storage}`)

      if (storage_mode === 'local') {
        await newImg.toFile(pathLocalStorage + newNameFile)
        await newSmallImg.toFile(pathLocalStorage + newNameFileSmall)

        await promisify(fs.unlink)(file.path)

        return {
          name: newNameFile,
          path_img: path.join(pathRemoteStorage, newNameFile)
        }
      } else {
        const upload = await storageS3.upload({
          Key: newNameFile,
          Body: newImg,
          Bucket: <string>process.env.AWS_BUCKET,
          ContentType: file.mimetype,
          ACL: 'public-read'
        }).promise()
        await storageS3.upload({
          Key: newNameFileSmall,
          Body: newSmallImg,
          Bucket: <string>process.env.AWS_BUCKET,
          ContentType: file.mimetype,
          ACL: 'public-read'
        }).promise()

        await promisify(fs.unlink)(file.path)

        logger.debug(`Upload Data: ${JSON.stringify(upload)}`)

        return {
          name: newNameFile,
          path_img: upload.Location
        }
      }
    } catch (e) {
      logger.error(`Error ao tratar imagem: ${e}`)
      throw new ApiError('Internal Server Error', 'errorOnCompressImage')
    }
  }

  async deleteImage (file: string): Promise<void> {
    logger.info('Removendo imagem...')
    const temp = file.split('.')
    const smallFile = temp[0] + '_small.' + temp[1]
    const path_img = 'public'

    if (storage_mode === 'local') {
      await promisify(fs.unlink)(path_img + file)
      await promisify(fs.unlink)(path_img + smallFile)
    } else if (storage_mode === 's3') {
      const bucketName = <string>process.env.AWS_BUCKET
      await storageS3.deleteObject({
        Bucket: bucketName,
        Key: file
      }).promise()
      await storageS3.deleteObject({
        Bucket: bucketName,
        Key: smallFile
      }).promise()
    }

    logger.info('Imagem removida')
  }
}

export default new Sharp()
