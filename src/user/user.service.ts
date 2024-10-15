import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/createUser.dto";
import { UserEntity } from "../interface/user.entity";
import { hash } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<string> {
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);
    
        await this.userRepository.save({
            ...createUserDto,
            password: passwordHashed
        });
    
        return "Usuário criado";
    }
    


    async GetAllUsers(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }
}