import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import { User } from './user.interface';
import { v4 as uuidv4} from 'uuid';
import { CreateUserDtoImpl, ParamUserIdDto} from './user.dto';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private user: User[] = [];

    constructor() {
        this.generateUsers();
    }

    private async generateUsers(){
        this.user = await Promise.all(
            Array.from({ length: 5 }, async (_, i) => {
                return { 
                    id: uuidv4(), 
                    login: faker.internet.userName(), 
                    password: await bcrypt.hash(faker.internet.password(), await bcrypt.genSalt())
                };
            })
        ) as User[]; 
    }

    getAllUsers(): User[] {
        if(this.user?.length === 0) return [];
        return this.user?.map(user => {
            return { id: user.id, login: user.login };
        });
    }

    getSingleUserById(params: ParamUserIdDto): User {
        const { id } = params;
        let result: User | undefined = this.user.find(user => user.id == id);
        if(result === undefined) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        result = {id: result.id ,login: result.login};
        return result;
    }

    async createUser(createUserDto: CreateUserDtoImpl): Promise<string> {
        const { login, password } = createUserDto;
        const userDto: User = {
            id: uuidv4(),
            login: login,
            password: await bcrypt.hash(password, await bcrypt.genSalt())
        };
        this.user.push(userDto);
        return "Created";
    }

    deleteUser(params: ParamUserIdDto): string {
        const { id } = params;
        if(this.user.findIndex(user => user.id === id) == -1) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        this.user = this.user.filter(user => user.id !== id) as User[];
        return "Deleted";
    }
}
