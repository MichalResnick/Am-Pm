import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import CategoryModel from "../4-models/categoryModel";
import ProductModel from "../4-models/productModel";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";

async function getAllcategories():Promise<CategoryModel[]> {
    const sql=`SELECT * FROM categories`
    const categories=await dal.execute(sql)
    return categories
}

async function getProductsBycategories(categoryId:number):Promise<CategoryModel[]> {
    const sql=`
    SELECT P.*,C.categoryName
    FROM products AS P JOIN categories AS C
    ON P.categoryId=C.categoryId
    WHERE P.categoryId=?`
   
    const prroducts=await dal.execute(sql,[categoryId])
    return prroducts

}

async function addProducte(product:ProductModel):Promise<ProductModel> {

    const err=product.validate()
    if(err)throw new ValidationErrorModel(err)

    const sql=`
    INSERT INTO products VALUE(
        DEFAULT,
        ?,
        ?,
        ?,
        ?,
        ?
    )`

    const values=[product.name,product.creationTime,product.expiry,product.categoryId,product.price]
    const info:OkPacket=await dal.execute(sql,values)
    product.productId=info.insertId
    return product    
}

async function deleteProducte(productId:number):Promise<void> {
    const sql=`
    DELETE FROM products WHERE productID = ?`
   const info:OkPacket= await dal.execute(sql,[productId])

   if(info.affectedRows===0)throw new ResourceNotFoundErrorModel(productId)
}


export default {
    getAllcategories,
    getProductsBycategories,
    addProducte,
    deleteProducte
};
