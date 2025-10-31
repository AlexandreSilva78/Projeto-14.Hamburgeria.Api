import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
          },
      {
        sequelize,
        tableName: 'Categories',
      },
    );
  }
}

export default Category;
