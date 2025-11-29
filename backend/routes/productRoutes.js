import express from "express"; 
import { getProduct, createProduct } from "../controllers/productController.js"; 
import { validateProduct } from "../middleware/validateProduct.js"; 
const router = express.Router(); 
router.get("/", getProduct); 
router.post("/", validateProduct, createProduct); 
router.put("/:id", validateProduct, updateProduct);     
router.delete("/:id", deleteProduct); 
export default router; 