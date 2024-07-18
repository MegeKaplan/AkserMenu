import { Client, Databases, ID, Query, Role, Permission } from "node-appwrite";
import initConfig from "../initConfig.js";

initConfig();

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID);
// .setKey(config.APPWRITE_API_KEY)

const databases = new Databases(client);

const isValidEmail = async (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_USERS_COLLECTION_ID,
    [Query.equal("email", email)]
  );

  return regex.test(email) && response.total === 0;
};

export const register = async (req, res) => {
  try {
    const { email, username, password, menuId } = {
      ...req.body,
      menuId: process.env.MENU_ID,
    };

    if (!(await isValidEmail(email))) {
      return res.status(500).json({
        msg: "E-Posta kullanılıyor veya uygun formatta değil!",
      });
    }

    if (password.length <= 4) {
      return res.status(500).json({
        msg: "Şifrenin uzunluğu 4 karakterden fazla olmalıdır!",
      });
    }

    // const collection = await databases.createCollection(
    //   process.env.APPWRITE_DATABASE_ID,
    //   ID.unique(),
    //   username,
    //   [Permission.read(Role.any()), Permission.write(Role.any())]
    // );

    // await databases.createStringAttribute(
    //   process.env.APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "name",
    //   64,
    //   true
    // );
    // await databases.createStringAttribute(
    //   process.env.APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "type",
    //   32,
    //   true
    // );
    // await databases.createStringAttribute(
    //   process.env.APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "imageUrl",
    //   1024,
    //   false
    // );
    // await databases.createIntegerAttribute(
    //   process.env.APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "price",
    //   false
    // );
    // await databases.createStringAttribute(
    //   process.env.APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "category",
    //   128,
    //   false
    // );

    const promise = await databases
      .createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERS_COLLECTION_ID,
        ID.unique(),
        { email, username, password, menuId }
      )
      .then(
        (response) => {
          console.log("register operation success");
          return response;
        },
        (error) => {
          console.log("register operation failure");
          return error.message;
        }
      );

    res.status(201).json({
      msg: "Kullanıcı kaydı başarıyla tamamlandı!",
      userData: { ...promise },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: error.message,
    });
  }
};

const isUserAvailable = async (email) => {
  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_USERS_COLLECTION_ID,
    [Query.equal("email", email)]
  );

  return response.total > 0;
};

export const login = async (req, res) => {
  try {
    const { email, username, password, menuId } = {
      ...req.body,
      menuId: process.env.MENU_ID,
    };

    if (!(await isUserAvailable(email))) {
      return res.status(500).json({
        msg: "Kullanıcı bulunamadı!",
      });
    }

    const response = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_COLLECTION_ID,
      [Query.equal("email", email), Query.equal("password", password)]
    );

    if (response.total === 0) {
      return res.status(500).json({
        msg: "Şifre yanlış!",
      });
    }

    res.status(201).json({
      msg: "Giriş işlemi başarıyla tamamlandı!",
      userData: response.documents[0],
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
