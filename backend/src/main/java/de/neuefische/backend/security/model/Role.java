package de.neuefische.backend.security.model;

public enum Role {
    USER(Roles.USER),
    EMPLOYEE(Roles.EMPLOYEE),
    MANAGER(Roles.MANAGER),
    ADMIN(Roles.ADMIN);

    Role(String employee) {
    }

    public static class Roles{
        public static final String USER = "USER";
        public static final String EMPLOYEE = "EMPLOYEE";
        public static final String MANAGER = "MANAGER";
        public static final String ADMIN = "ADMIN";
    }
}
