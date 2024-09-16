import { PrintServer } from "../Models/PrintServers.js";
import { ThermalPrinter } from "../Models/thermlPrinter.js";
import { getClient } from "../services/Socket_Io_Sever.js";



const thermalPrinter = async (req, res) => {
  try {
    const request = req.body;
    let hasError = false;
    const errors = {};
    const client = getClient()

    if (!request.companyname) {
        (errors.companyname = "companyname is required"), (hasError = true);
      }
      if (!request.Itemname) {
        (errors.Itemname = "Itemname is required"), (hasError = true);
      }
      if (!request.Price) {
        (errors.Price = "Price is required"), (hasError = true);
      }
      if (!request.serverId) {
        (errors.serverId = "serverId is required"), (hasError = true);
      }
      
      if(!client){
        (errors.serverId = "Printerserver not connected"), (hasError = true); 
      }
 
      if (hasError) {
        res.status(400).json({
          status: "error",
          message: "Invalid request",
          errors: errors,
        });
        return;
      }
      const credentials = { 
        companyname: request.companyname,
        Itemname: request.Itemname,
        Price: request.Price,
      };

     
      const printserver = await PrintServer.findAll()

      const server = printserver.find(server =>server?.dataValues?.ServerID === request?.serverId);

      if (server) {
      const clientId=server?.dataValues?.ClentID
      const socket = client.sockets.sockets.get(clientId);
        if(socket){
          console.log("Server found");
          await ThermalPrinter.create(credentials);
  
          client.to(clientId).emit("print",{messsage:"please Print it"})  
          console.log("Print job sent")
      
        }else{
        console.log("No client connected with this ID");

        }
      } else {
        console.log("No server connected with this ID");
        res.status(400).json({
          status: "false",
          message: "No server connected with this ID",
        });
        return
      }
      res.status(200).json({
        status: "success",
        message: "Order saved Sucessfully",
      });
  
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export { thermalPrinter };
