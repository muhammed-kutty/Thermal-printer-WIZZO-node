import { UserLoginInfo } from "../Models/userLogininfo.js";
// import UserLoginInfo from '../Models/userLogininfo'
import { createToken } from "../services/jwt.js";
import { RegisteredUser } from "../Models/registerdUser.js";

const UserRegister = async (req, res) => {
  try {
    console.log(req.body);
    const request = req.body;
    const uniqId = Math.round(Math.random() * 1e9);
    let hasError = false;

    const errors = {};

    if (!request.EmailId) {
      (errors.EmailId = "EmailId is required"), (hasError = true);
    }
    if (!request.MobilePhoneNumber) {
      (errors.MobilePhoneNumber = "MobilePhoneNumber is required"),
        (hasError = true);
    }
    if (!request.Password) {
      (errors.Password = "Password is required"), (hasError = true);
    }
    if (hasError) {
      res.status(400).json({
        status: "error",
        message: "Invalid request",
        errors: errors,
      });
    } 

    const credential = {
      UserRegisterID: uniqId,
      EmailId: request.EmailId,
      MobilePhoneNumber: request.MobilePhoneNumber,
      Password: request.Password,
    };
    const RegisteredUserDetails = await RegisteredUser.create(credential);

    res.status(200).json({
      status: "success",
      message: "User has been registered",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const UserLogin = async (req, res) => {
  try {
    const request = req.body;
    let hasError = false;
    const errors = {};
    const token = req?.header("Authorization")?.replace("Bearer ", "");
    const Reguser = await RegisteredUser.findOne({
      where: {
        MobilePhoneNumber: request.MobilePhoneNumber,
        Password: request.Password,
      },
    });
    const RegUserId = Reguser.UserRegisterID;
    const isuserLogedIn = await UserLoginInfo.findOne({
      where: { UserRegisterID: RegUserId },
    });
    if (isuserLogedIn?.dataValues?.UserToken === token) {
      return res.json({
        status: "success",
        data: {
          accessToken: token,
          tokenType: "Bearer",
          expiresIn: "24h",
        },
      });
    }

    if (!request.MobilePhoneNumber) {
      (errors.MobilePhoneNumber = "MobilePhoneNumber is required"),
        (hasError = true);
    }
    if (!request.Password) {
      (errors.Password = "Password is required"), (hasError = true);
    }
    if (hasError) {
      res.status(400).json({
        status: "error",
        message: "Invalid request",
        errors: errors,
      });
      return;
    }

    const user = await RegisteredUser.findOne({
      where: {
        MobilePhoneNumber: request.MobilePhoneNumber,
        Password: request.Password,
      },
    });

    if (user) {
      const token = createToken({ id: user?.dataValues?.UserRegisterID });
      const uniqId = Math.round(Math.random() * 1e9);
      const credential = {
        LoginUserID: uniqId,
        UserRegisterID: user.dataValues.UserRegisterID,
        UserToken: token,
      };
      await UserLoginInfo.create(credential);

      return res.json({
        status: "success",
        data: {
          accessToken: token,
          tokenType: "Bearer",
          expiresIn: "24h",
        },
      });
    } else {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Invalid MobilePhoneNumber or Password.",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export { UserLogin, UserRegister };
