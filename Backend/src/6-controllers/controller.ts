import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/logic";
import ProductModel from "../4-models/productModel";
import dal from "../2-utils/dal";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/_____
router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
     const categories=await logic.getAllcategories()
     response.json(categories)

    }
    catch (err: any) {
        next(err);
    }
});

router.get("/productsByCategories/:categoryId", async (request: Request, response: Response, next: NextFunction) => {
    try {
    
        const categoryId=+request.params.categoryId
        const products=await logic.getProductsBycategories(categoryId)
        response.json(products)

    }
    catch (err: any) {
        next(err);
    }
});

router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const product=new ProductModel(request.body)
       const addedProduct=await logic.addProducte(product)
       response.status(201).json(addedProduct)

    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/products/:productId", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const productId=+request.params.productId
       await logic.deleteProducte(productId)
       response.sendStatus(204)

    }
    catch (err: any) {
        next(err);
    }
});

export default router;