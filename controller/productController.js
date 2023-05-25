import { Product } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";

const productController = {
  async store(req, res, next) {
      const { name, timeRequired, tag, descriptions, image } = req.body;
      let document;
      try {
        document = await Product.create({
          name: name,
          author: timeRequired,
          tag: tag,
          image: image,
          descriptions: descriptions,
        });
      } catch (e) {
        // Unable to post error
        console.log(e);
      }
      res.status(201).json(document);
    },

  async index(req, res, next) {
    let documents;
    try {
      documents = await Product.find()
        .select("-updatedAt -__v")
        .sort({ _id: -1 });
    } catch (e) {
    //   unable to get all product
      return next(CustomErrorHandler("Unable to get product", 404));
    }
    res.json(documents);
  },
};
export default productController;
