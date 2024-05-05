import {  User } from './user.interface';
import { Controller, Get, Post, Delete, Param, HttpCode, HttpStatus, Body,} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDtoImpl , ParamUserIdDto } from './user.dto';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllUsers(): User[] {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    getSingleUserById(@Param() params: ParamUserIdDto): User {
        return this.userService.getSingleUserById(params);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() createUserDto: CreateUserDtoImpl): Promise<string>  {
        return this.userService.createUser(createUserDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUser(@Param() params: ParamUserIdDto): string {
        return this.userService.deleteUser(params);
    }
}

