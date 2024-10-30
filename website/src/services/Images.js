import axios from "axios";

class Images {
  static async getPostImage(key) {
    let response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/images/postImage",
      { key: key },
      {
        headers: {
          authToken: localStorage.getItem("AuthToken"),
        },
        responseType: "blob",
      }
    );
    if (response?.data?.error) {
      return;
    }
    return response.data;
  }
}
export default Images;
