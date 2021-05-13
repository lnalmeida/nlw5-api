import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
    constructor(parameters) {
        super();
    };
};

export {UserRepository};