import logger from "../../helpers/logger";

export default function resolver() {

  const { db } = this;
  const { Post, User, Chat, Message } = db.models;

  const resolvers = {
    Message: {
      user(message, args, context) {
        return message.getUser();
      },
      chat(message, args, context) {
        return message.getChat();
      }
    },

    Chat: {
      messages(chat, args, context) {
        return chat.getMessages({ order: [['id', 'ASC']] });
      },
      users(chat, args, context) {
        return chat.getUsers();
      }
    },

    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    RootQuery: {
      posts(root, args, context) {
        return posts.findAll({ order: [['createdAt', 'DESC']] });
      },
      chats(root, args, context) {
        return User.findAll().then((users) => {
          if (!users.length) {
            return [];
          }

          const userRow = users[0];

          return Chat.findAll({
            include: [{
              model: User,
              required: true,
              through: { where: { userId: userRow.id } },
            },
            {
              model: Message,
            }],
          });
        });
      },
    },
    RootMutation: {
      addPost(root, { post }, context) {

        return User.findAll().then((users) => {
          const userRow = users[0];
          return Post.create({
            ...post,
          }).then((newPost) => {
            return Promise.all([
              newPost.setUser(userRow.id),
            ]).then(() => {
              logger.log({
                level: 'info',
                message: 'Post was created',
              });
              return newPost;
            })
          });
        });
      },
    },
  };

  return resolvers;
}



