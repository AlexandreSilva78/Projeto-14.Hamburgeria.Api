import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../Schemas/Order.js';

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }
    const { userId, userName } = request;
    const { products } = request.body;

    const productIds = products.map((product) => product.id);

    const findedProducts = await Product.findAll({
      where: {
        id: productIds,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    const mapedProducts = findedProducts.map((product) => {
      const quantity = products.find((p) => p.id === product.id).quantity;

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        quantity,
      };
      return newProduct;
    });

    const order = {
      useId: {
        id: userId,
        name: userName,
      },
      products: mapedProducts,
      status: 'Pedido Realizado',
    };

    const newOrder = await Order.create(order);

    return response.status(201).json(newOrder);
  }

  async update(request, response) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }
    const { status } = request.body;
    const { id } = request.params;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(200).json({ message: 'Status updated successfull' });
  }

  async index(_request, response) {
    const orders = await Order.find();

    return response.status(200).json(orders);
  }
}

export default new OrderController();
