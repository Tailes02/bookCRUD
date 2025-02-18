import { SetMetadata } from '@nestjs/common';

export const API_KEY_AUTH = 'api-key-oath';
export const ApiKeyAuth = () => SetMetadata(API_KEY_AUTH, true);
