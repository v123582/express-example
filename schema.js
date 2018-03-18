const { GraphQLObjectType,GraphQLSchema,GraphQLList,GraphQLInt,GraphQLString } = require('graphql');
const { attributeFields, resolver } = require('graphql-sequelize');
const { db, Task, Post, Comment, Tag, User } = require('./models');

taskType = new GraphQLObjectType({
  name: 'Task',
  description: 'task',
  fields: attributeFields(Task)
});

userType = new GraphQLObjectType({
  name: 'User',
  description: 'user',
  fields: attributeFields(User)
});

// Post.Comments = Post.hasMany(Comment);

// commnetType = new GraphQLObjectType({
//   name: 'Comment',
//   description: 'comment',
//   fields: {
//     id: {
//       type: GraphQLInt,
//       description: 'The id of the user.',
//     },
//     content: {
//       type: GraphQLString,
//       description: 'The name of the user.',
//     },
//   }
// });

// postType = new GraphQLObjectType({
//   name: 'Post',
//   description: 'post',
//   fields: {
//     id: {
//       type: GraphQLInt,
//       description: 'The id of the user.',
//     },
//     title: {
//       type: GraphQLString,
//       description: 'The name of the user.',
//     },
//     comments: {
//       type: new GraphQLList(commnetType),
//       resolve: resolver(Post.Comments)
//     }
//   }
// });

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      user: {
        type: new GraphQLList(userType),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          // return User.findAll({ where: args });
          console.log('=====');
          console.log(root.user);
          console.log('=====');
          if(root.user)
            return User.findAll({ where: {id: root.user.id} });
          return null
        }
      },
      task: {
        type: new GraphQLList(taskType),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          return Task.findAll({ where: args });
        }
      },
    //   post: {
    //     type: new GraphQLList(postType),
    //     args: {
    //       id: {
    //         type: GraphQLInt
    //       }
    //     },
    //     resolve(root, args) {
    //       console.log('====');
    //       console.log(Post.findAll({ where: args, include: [Comment, Tag] }))
    //       return Post.findAll({ where: args, include: [Comment, Tag] });
    //     }
    //   }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

module.exports = Schema;