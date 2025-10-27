import multer from "multer"
import { existsSync, mkdirSync } from "fs"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const dir = `.uploads/`
        if (!existsSync(dir)) {
            mkdirSync(dir)
        }
        callback(null, dir)
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix+ "_" + file.originalname.toLowerCase())
    },
})


const upload = multer({
    storage: storage,
    limits: {fileSize: 1024*1024*2},
}).single("profilePicture")


export default upload;
// export const dp = async(req, res) => {
//     try{
//         upload(req, res, async function(error){
//             if (error){
//                 return res.status(400).json({ status: "error", message: error.message });
//             }
//             const url = req.protocol + "://" + req.get("host") //forms a url from individual components: req.protocol=https
//             const profilePicture = req.file? url + "/" + req.file.path : null;

//         })
//     } catch(error) {
//         console.error(error.message)
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }