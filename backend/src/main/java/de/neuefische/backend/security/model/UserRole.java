package de.neuefische.backend.security.model;

public enum UserRole {
    USER(Roles.USER),
    EMPLOYEE(Roles.EMPLOYEE),
    MANAGER(Roles.MANAGER),
    ADMIN(Roles.ADMIN),
    FORBIDDEN(Roles.FORBIDDEN);

    UserRole(String employee) {
    }

    public static class Roles{
        public static final String USER = "User";
        public static final String EMPLOYEE = "User";
        public static final String MANAGER = "User";
        public static final String ADMIN = "User";
        public static final String FORBIDDEN = "User";
    }
}
