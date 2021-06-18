package de.neuefische.backend.security.model;

public enum Role {
    USER(Roles.USER),
    EMPLOYEE(Roles.EMPLOYEE),
    MANAGER(Roles.MANAGER),
    ADMIN(Roles.ADMIN);

    Role(String employee) {
    }

    public static class Roles{
        public static final String USER = "user";
        public static final String EMPLOYEE = "employee";
        public static final String MANAGER = "manager";
        public static final String ADMIN = "admin";
    }
}
