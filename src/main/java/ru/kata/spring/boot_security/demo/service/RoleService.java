package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entities.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    Role getRoleByName(String roleName);
    Role getById(Long id);
    void addRole(Role role);
    void deleteRole(Role role);

}
