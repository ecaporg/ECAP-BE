import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to get the current authenticated user from the request
 * @param propertyPath Optional path to a specific property of the user object
 * @returns The user object or a specific property of it
 */
export const CurrentUser = createParamDecorator(
  (propertyPath: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    // Return the whole user object if no property path is provided
    if (!propertyPath) {
      return user;
    }

    // Return a specific property by path (e.g., 'profile.firstName')
    const getNestedProperty = (obj: any, path: string) => {
      return path.split('.').reduce((prev, curr) => {
        return prev && prev[curr] !== undefined ? prev[curr] : null;
      }, obj);
    };

    return getNestedProperty(user, propertyPath);
  },
);
