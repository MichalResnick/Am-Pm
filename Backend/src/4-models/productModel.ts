import Joi from "joi"

class ProductModel{
    public productId:number
    public name:string
    public creationTime:Date
    public expiry:Date
    public categoryId:number
    public price:number

    public constructor(product:ProductModel){
        this.productId=product.productId
        this.name=product.name
        this.creationTime=product.creationTime
        this.expiry=product.expiry
        this.categoryId=product.categoryId
        this.price=product.price
    }

    public  static validationSchema=Joi.object({
        productId:Joi.number().required().positive().optional().integer(),
        name:Joi.string().required().min(2).max(30),
        creationTime:Joi.date().iso().required(),
        expiry:Joi.date().iso().required(),
        categoryId:Joi.number().required().positive().optional().integer(),
        price:Joi.number().required().min(0).max(100)

    })

    public validate():string{
      const result=ProductModel.validationSchema.validate(this)
      return result.error?.message
    }
}

export default ProductModel