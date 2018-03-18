'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.hasMany(models.Comment);
    Post.belongsToMany(models.Tag, {through: "PostTags"});
  };
  return Post;
};