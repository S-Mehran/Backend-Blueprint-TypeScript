import { AppDataSource } from "../data-source";
import { User } from "../entity/index";
import { UserService } from "../service/user.service";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);

// const dataSource = AppDataSource.getRepository(User)

// export const userRepository = new UserService(dataSource)

//There's only one file even if number of data source files are many(one file per data source)
//With this one file, we create a connection between service and data sources
//It helps remain scalable as we don't have to change service if a new data source is added
//or older one is modified