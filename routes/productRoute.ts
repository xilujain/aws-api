import { Router } from "express";
import {
    createSingleProduct,
    deleteProductBySlug,
    getAllProducts,
    getProductBySlug,
    updateProduct
} from "../controllers/productController";

const router = Router();

router.get('/', getAllProducts);
router.post('/', createSingleProduct);
router.get('/:slug', getProductBySlug);
router.delete('/:slug', deleteProductBySlug);
router.put('/:slug', updateProduct);

export default router;