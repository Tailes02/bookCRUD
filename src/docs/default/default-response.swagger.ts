import { ApiProperty } from "@nestjs/swagger";

export class BadRequestResponse {
  //@example 400
  statusCode: number;

  message?: string;

  //@example "Bad Request"
  error?: string;
}

export class NotFoundResponse {
  //@example 404
  statusCode: number;

  message?: string;

  //@example "Not Found"
  error?: string;
}

export class UnauthorizedResponse {
  //@example 401
  status: number;

  //@example Unauthorize
  message: string;
}

export class InternalServerErrorResponse {
  //@example 500
  statusCode: number;

  message?: string;

  //@example "Internal Server Error"
  error?: string;
}

export class UnprocessableEntityResponse {
  //@example 422
  statusCode: number;

  message?: string;

  //@example "Unprocessable Entity"
  error?: string;
}

export class DefaultResponse {
  //Response code
  @ApiProperty()
  code: number;

  //Response status message
  @ApiProperty()
  status?: string;

  //Optional message
  @ApiProperty()
  message?: string;
}

export class DefaultMetaResponse {
  pagination: {
    count: number;
    current_page: number;
    links?: any;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export class DefaultPaginationResponse extends DefaultResponse {
  meta: DefaultMetaResponse;
}
