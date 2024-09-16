import { PrintServer } from "../Models/PrintServers.js";
import { RegisteredUser } from "../Models/registerdUser.js";
import { UserLoginInfo } from "../Models/userLogininfo.js";

let client;

const thermalprintServer = async (socket, io) => {
  try {
    client = io;
    const { ServerID, MobilePhoneNumber, password } = socket?.handshake?.query || {};

    //  checks Socket connection is valied or not?
    if (!socket?.id) return console.log("ClientID is required");
    if (!ServerID) return sendError("Server ID is required");
    if (!MobilePhoneNumber) return sendError("MobilePhoneNumber is required");
    if (!password) return sendError("Password is required");

    // Check user is registered or not
    const Reguser = await RegisteredUser.findOne({ where: { MobilePhoneNumber, Password: password } });
    if (!Reguser) return sendError("You are not a registered user");

    // Check user is logged in or not
    const isuserLogedIn = await UserLoginInfo.findOne({ where: { UserRegisterID: Reguser.UserRegisterID } });
    if (!isuserLogedIn) return sendError("You are not a logged-in user");

    // Looking server connection
    const serverList = await PrintServer.findAll();
    const isClientConnected = serverList.find(server => server?.dataValues?.ServerID === ServerID);

    if (isClientConnected) {
      await PrintServer.update({ ClentID: socket.id }, { where: { ServerID } });
      sendSuccess("Your server is connected to the backend with update");
    } else {
      await PrintServer.create({ ClentID: socket.id, ServerID });
      sendSuccess("Your server is connected to the backend");
    } 
  } catch (error) {
    console.error(error);
  }

  // Handle client disconnect
  socket.on('disconnect', async () => {
    console.log('Client disconnected:', socket?.id);
    const disconnectedClient = await PrintServer.findOne({ where: { ClentID: socket?.id } });
    if (disconnectedClient) {
      try {
        await PrintServer.update({ ClentID: null }, { where: { ServerID: disconnectedClient.ServerID } });
        console.log('Removed client:', disconnectedClient.ServerID);
      } catch (error) {
        console.error('Error updating database:', error);
      }
    }
  });
};

// Helper functions
const sendError = (message) => {
  client.emit('messageFromServer', { message, status: false });
  client.disconnect();
};

const sendSuccess = (message) => {
  client.emit('messageFromServer', { message, status: true });
};

const getClient = () => client;

export { thermalprintServer, getClient };
