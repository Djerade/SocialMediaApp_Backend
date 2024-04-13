import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";

//Import
import { User } from "../../Model/index.js";
import { UserInputError } from "apollo-server-express";
import { ValidateSignUpInput } from "../../Auth/ValidateSignUpInput.js";
import { ValidateLoginInput } from "../../Auth/ValidateLoginInInput.js";
import { GenerateToken } from "../../Auth/GenerateToken.js";

export default {
  login: async ({ username, password }) => {
    try {
      //Validation user data
      const { valid, errors } = ValidateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Error", errors);
      }
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("user don't exist");
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("password incorrect");
      }
      const token = GenerateToken(user);
      return {
        id: user._id,
        ...user._doc,
        token
      };
    } catch (error) {
      return Promise.reject(new GraphQLError(error.message));
    }
  },

  createAccount: async ({
    username,
    password,
    confirmationPassword,
    email
  }) => {
    try {
      // validation user data
      const { valid, errors } = ValidateSignUpInput(
        username,
        password,
        confirmationPassword,
        email
      );
      if (!valid) {
        throw new UserInputError("Error", errors);
      }
      //Hashage password
      password = await bcrypt.hash(password, 12);

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("user exist");
      }
      const newuser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString()
      });
      const userSaved = await newuser.save();
      const token = GenerateToken(userSaved);
      return {
        id: userSaved._id,
        ...userSaved._doc,
        token
      };
    } catch (error) {
      return Promise.reject(new GraphQLError(error.message));
    }
  },

  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return {
          id: user._id,
          ...user._doc
        };
      });
    } catch (error) {
      return Promise.reject(new GraphQLError(error.message));
    }
  }
};
