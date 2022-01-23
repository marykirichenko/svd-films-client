import UserService from "../services/user-service";


export default class UserController {
  static async getUserInfo(userId) {
    try {
      return await UserService.getUserInfo(userId);
    } catch (err) {
      throw err;
    }
  }

  static async changeUsername(username, userId) {
    try {
      const data = await UserService.changeUsername(username, userId);
      return data.username;
    } catch (err) {
      throw err;
    }
  }

  static async changeUserImage(image, userId) {
    try {
      const formData = new FormData();
      formData.append(`image`, image);
      formData.append('id', userId)
      await UserService.changeUserImage(formData);
    } catch (err) {
      throw err;
    }
  }
}