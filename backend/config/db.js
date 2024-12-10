import { Sequelize } from "sequelize";

const useDb = type => {
  let dialect = "sqlite";
  let storage = "./data/eventsdb.db";
  try {
    if (type === "mongodb") 
      throw new Error("Not available");

    return new Sequelize({
      dialect: dialect,
      storage: storage
    });
  } catch (err) {
    console.log(`An error occured while opening db: ${err}`)
  }  
}

export const sequelize = new Sequelize("sqlite::memory:");

export default useDb;