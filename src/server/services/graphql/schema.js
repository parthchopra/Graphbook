const typeDefinitions = `
  type Post {
    id: Int
    text: String
    user: User
  }
  type User {
    id: Int
    avatar: String
    username: String
  }

  type Message {
    id: Int
    text: String
    chat: Chat
    user: User
  }

  type Chat {
    id: Int
    messages: [Message]
    users: [User]
  }

  input PostInput {
    text: String!
  }
  
  type RootQuery {
    posts: [Post]
    chats: [Chat]
  }

  type RootMutation {
    addPost (
      post: PostInput!
    ): Post
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;
export default [typeDefinitions];