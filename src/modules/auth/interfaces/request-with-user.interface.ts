import { UserPayload } from './user-payload.interface';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  request: NonNullable<UserPayload>;
  user: UserPayload;
}
