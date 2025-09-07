import { Reflector } from '@nestjs/core';
import RoleEnum from '../../user/ENUM/role.enum';

export const Roles = Reflector.createDecorator<RoleEnum[]>();
