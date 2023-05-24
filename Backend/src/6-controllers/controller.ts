import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/logic";

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

export default router;