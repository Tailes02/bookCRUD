import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../api-key.guard';
import { ApiKeyAuth } from '../api-key.decorator';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('protected')
export class ProtectedController {

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiKeyAuth() 
  @ApiSecurity('api-key')
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
