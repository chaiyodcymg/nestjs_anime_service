import { IsNotEmpty, IsString , IsUUID  } from 'class-validator';

export interface CreateUserDto {
    login: string;
    password: string;
}

export class CreateUserDtoImpl implements CreateUserDto {

    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class ParamUserIdDto {
    @IsString()
    @IsUUID()
    id: string;
}