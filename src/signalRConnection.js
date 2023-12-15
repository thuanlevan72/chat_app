import * as signalR from "@microsoft/signalr";
const URL = "https://localhost:7092/hub";
class Connector {
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch((err) => console.error(err));
  }
  sendMessage = (user, message) => {
    this.connection
      .invoke("SendMessage", user, message)
      .then((x) => console.log("sent"));
  };
  userIsTyping = (user) => {
    this.connection
      .invoke("UserIsTyping", user)
      .then((x) => console.log("User is typing"));
  };
  userCLoseTyping = () => {
    this.connection
      .invoke("CLoseTyping")
      .then((x) => console.log("User is CLose typing"));
  };
  getConnect = (username) => {
    this.connection
      .invoke("GetConnections", username)
      .then((x) => console.log("Connected"));
  };
}
export default new Connector();
