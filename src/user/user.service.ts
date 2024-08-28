import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/createUser.dto";
import { UserEntity } from "src/interface/user.entity";
import { hash } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>
    ){}

    async createUser(CreateUserDto: CreateUserDto): Promise<String> {

        const saltOrRounds = 10;

        const passwordHashed = await hash(CreateUserDto.password, saltOrRounds)

        this.userRepository.save({
            ...CreateUserDto,
            typeUser: 1,
            password: passwordHashed
        })

        return "usuario criado"
    }


    async GetAllUsers(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }
}