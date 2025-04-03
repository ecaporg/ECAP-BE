# School Management System - Frontend Development Requirements

## Project Overview

Create a modern frontend for a School Management System with authentication and role-based authorization. The backend API is defined in the Swagger documentation I'll provide, but is not yet fully implemented. This is primarily a frontend development task with mock data where needed.

## Technical Requirements

1. **Framework**: Next.js with App Router
2. **UI Components**: shadcn/ui library for design system
3. **Data Handling**: Server Components for data fetching, with minimal client components only where needed
4. **State Management**: URL-based filtering and sorting (no client-side filtering)
5. **Language**: TypeScript is mandatory
6. **Auth**: JWT-based authentication with refresh tokens

## User Roles and Permissions

Implement a role-based permission system with 4 user roles:

- Teacher
- Director
- Admin
- SuperAdmin

Use the following permission system architecture (adapt this to the school context):

```typescript
type Role = 'teacher' | 'director' | 'admin' | 'superadmin';

type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: Role[];
  blockedBy: string[];
};

type Class = {
  id: string;
  name: string;
  teacherId: string;
  studentIds: string[];
};

type Student = {
  id: string;
  firstname: string;
  lastname: string;
  classId: string;
};

type Assignment = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  teacherId: string;
  classId: string;
  createdAt: Date;
};

type Grade = {
  id: string;
  studentId: string;
  assignmentId: string;
  score: number;
  teacherId: string;
  createdAt: Date;
};

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]['dataType']) => boolean);

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>;
    }>;
  }>;
};

type Permissions = {
  classes: {
    dataType: Class;
    action: 'view' | 'create' | 'update' | 'delete';
  };
  students: {
    dataType: Student;
    action: 'view' | 'create' | 'update' | 'delete';
  };
  assignments: {
    dataType: Assignment;
    action: 'view' | 'create' | 'update' | 'delete';
  };
  grades: {
    dataType: Grade;
    action: 'view' | 'create' | 'update' | 'delete';
  };
  users: {
    dataType: User;
    action: 'view' | 'create' | 'update' | 'delete';
  };
};
```

## Permission Logic

Implement a permission system following this structure:

```typescript
const ROLES = {
  superadmin: {
    classes: { view: true, create: true, update: true, delete: true },
    students: { view: true, create: true, update: true, delete: true },
    assignments: { view: true, create: true, update: true, delete: true },
    grades: { view: true, create: true, update: true, delete: true },
    users: { view: true, create: true, update: true, delete: true },
  },
  admin: {
    classes: { view: true, create: true, update: true, delete: true },
    students: { view: true, create: true, update: true, delete: true },
    assignments: { view: true, create: true, update: true, delete: true },
    grades: { view: true, create: true, update: true, delete: true },
    users: {
      view: true,
      create: (user, targetUser) => targetUser.roles.includes('teacher'),
      update: (user, targetUser) => targetUser.roles.includes('teacher'),
      delete: (user, targetUser) => targetUser.roles.includes('teacher'),
    },
  },
  director: {
    classes: { view: true, create: true, update: true, delete: false },
    students: { view: true, create: true, update: true, delete: false },
    assignments: { view: true, create: false, update: false, delete: false },
    grades: { view: true, create: false, update: false, delete: false },
    users: {
      view: (user, targetUser) => targetUser.roles.includes('teacher'),
      create: false,
      update: false,
      delete: false,
    },
  },
  teacher: {
    classes: {
      view: true,
      create: false,
      update: (user, classItem) => classItem.teacherId === user.id,
      delete: false,
    },
    students: {
      view: (user, student) => {
        // Can view students in their classes
        const teacherClasses = classes.filter((c) => c.teacherId === user.id);
        return teacherClasses.some((c) => c.id === student.classId);
      },
      create: false,
      update: false,
      delete: false,
    },
    assignments: {
      view: (user, assignment) => assignment.teacherId === user.id,
      create: true,
      update: (user, assignment) => assignment.teacherId === user.id,
      delete: (user, assignment) => assignment.teacherId === user.id,
    },
    grades: {
      view: (user, grade) => grade.teacherId === user.id,
      create: true,
      update: (user, grade) => grade.teacherId === user.id,
      delete: (user, grade) => grade.teacherId === user.id,
    },
    users: { view: false, create: false, update: false, delete: false },
  },
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType'],
) {
  return user.roles.some((role) => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[
      action
    ];
    if (permission == null) return false;

    if (typeof permission === 'boolean') return permission;
    return data != null && permission(user, data);
  });
}
```

## Page Structure

### 1. Authentication

#### Sign In (/auth/signin)

- Email input field
- Password input field
- Login button
- "Forgot password" link

### 2. Dashboard (/dashboard)

- Empty page with placeholder for future statistics
- Navigation menu for accessing other sections

### 3. Compliance Tasks (/compliance)

- **Main Tasks Page**

  - Filter section (by date, status, type)
  - Table with pagination showing:
    - For teachers: List of students
    - For admins: List of teachers
  - Table columns should include relevant information
  - Clicking on a row:
    - For teachers: Redirects to student subjects (/compliance/student/:id)
    - For admins: Redirects to teacher samples (/compliance/teacher/:id/samples)

- **Student Info Page (/compliance/student/:id)**

  - Student profile information
  - Filter section
  - Table with pagination showing student subjects/assignments
  - Each row contains detailed information about assignments/grades

- **Teacher Samples Page (/compliance/teacher/:id/samples)**
  - Teacher profile summary
  - Filter section (by date, type, status)
  - Table with pagination showing sample records
  - Table rows with appropriate data

### 4. Settings (/settings)

- Basic layout structure
- Only accessible to admin/superadmin users
- Currently empty (will be developed later)

## API Integration

For now, mock the API responses based on the following Swagger documentation for authentication. You can assume that the rest of the API endpoints for the school management features would follow similar patterns.

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Registration API",
    "description": "API documentation for authentication and user registration",
    "version": "1.0"
  },
  "paths": {
    "/auth/sign-up": {
      "post": {
        "tags": ["Authentication"],
        "summary": "Register a new user",
        "description": "Creates a new user account with the provided information",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserDTO"
              }
            }
          }
        }
      }
    },
    "/auth/sign-in": {
      "post": {
        "tags": ["Authentication"],
        "summary": "User login",
        "description": "Authenticate user with email and password",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SignInDTO"
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "CreateUserDTO": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "format": "email"
          },
          "password": {
            "type": "string"
          },
          "firstname": {
            "type": "string"
          },
          "lastname": {
            "type": "string"
          }
        }
      },
      "SignInDTO": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "format": "email"
          },
          "password": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

## Deliverables

1. A complete Next.js application with the required pages and features
2. Server components for all data fetching operations
3. Client components only where interactivity is needed
4. TypeScript interfaces for all data models
5. Implementation of the role-based permission system
6. Mock data and services for testing while backend is in development
7. Clear organization with proper directory structure
8. README with setup and usage instructions

git branch -M main
git remote add origin https://github.com/kytas999/ECAP-BE.git
git push -u origin main
