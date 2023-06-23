import multer from 'multer'; // para usar imagens
import path from 'path'; // para usar caminhos no node

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'), // '..' ao invés de '../'  -> fucinar em quaisquer S.O.
    filename: (res, file, cb) => {
      const extession = path.extname(file.originalname);
      const name = path.basename(file.originalname, extession);

      cb(null, `${name}-${Date.now()}${extession}`);
    },
  }),
};
