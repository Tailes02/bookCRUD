import { DefaultResponse } from 'src/docs/default/default-response.swagger';
import { User } from '../entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';
export class UserData extends User {}

export class GetAllUsersResponse extends DefaultResponse {
  @ApiProperty({ type: [User] })
  data: User[]
}

export class GetUserInfoResponse extends DefaultResponse {
  @ApiProperty({ type: User })
  data: User | null;
}

export class CreateUserResponse extends GetUserInfoResponse {}
export class UpdateUserResponse extends GetUserInfoResponse {}
