import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required(),
    timeRequired: Joi.string().required(),
    tag: Joi.string().required(),
    image: Joi.string(),
    descriptions: Joi.string(),

});

export default productSchema