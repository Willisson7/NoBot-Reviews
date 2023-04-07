const { Model, DataTypes } = require('sequelize');
// const { Review } = require('.');

const sequelize = require('../config/connection');

class Review extends Model { }

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment_info: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },

    post_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'post', key: 'id' }
    }

  },



  //   add image model in future;

  {

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = Review;