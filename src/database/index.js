import { Sequelize } from 'sequelize';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';
import mongoose from 'mongoose';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }
  mongo() {
    this.mongooseConnection = mongoose.connect(
      'mongodb://localhost:27017/sannyburguer',
    );
  }
}

export default new Database();
