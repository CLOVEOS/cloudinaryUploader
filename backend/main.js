require('dotenv').config();

const express=require('express');
const cors=require('cors');
const cloudinary=require('cloudinary');
const multer=require('multer');
const {CloudinaryStorage}=require('multer-storage-cloudinary');
const app=express();

app.use(cors());
app.use(express.json());

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'cloudProject',
        allowed_formats:['jpeg','png']
    }
})

const upload=multer({storage}); 



app.post('/upload',upload.single('image'),(req,res)=>
{
    if(!req.file) res.status(400).json({error:"No file uploaded"})
    res.json({url_path:req.file.path,
    public_id:req.file.filename})    
})

app.listen(3000,()=>
{
    console.log(`Server is running on port${3000}`);
})