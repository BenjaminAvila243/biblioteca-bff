import { SetMetadata } from '@nestjs/common';
export const ROLES = 'roles';
export const Roles = (...grupos) => SetMetadata(ROLES, grupos);
//# sourceMappingURL=roles.decorator.js.map