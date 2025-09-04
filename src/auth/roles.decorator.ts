import { Reflector } from '@nestjs/core';
import RoleEnum from '../user/role.enum';

export const Roles = Reflector.createDecorator<RoleEnum[]>();
