const multer = require("multer");
const path = require("path");


const storage = (_path) => {
	return multer.diskStorage({
		destination(req, file, cb) {
			cb(null, _path)
		},
		filename(req, file, cb) {
			cb(
				null,
				`${Date.now()}${Date.now()*2}${path.extname(file.originalname)}`
			);
		},
	})
}

const checkImageType = (file, cb) => {
	const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(new Error("Invalid image file"));
    }
}

const checkVideoType = (file, cb) => {
    const filetypes = /mp4/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb(new Error("Invalid video file"));
    }
}

const uploadImage = (path)=>{
    return multer({
        storage: storage(path),
        fileFilter: function (req, file, cb) {
            checkImageType(file, cb)
        }
    })
}

const uploadVideo = (path)=>{
    return multer({
        storage: storage(path),
        fileFilter: function (req, file, cb) {
            checkVideoType(file, cb)
        }
    })
}


module.exports = {
    uploadImage,
    uploadVideo
}