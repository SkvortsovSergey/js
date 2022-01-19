package org.example.service;


import org.example.model.Role;

import java.util.List;

public interface RoleService {

    Role getRoleByRole (String name);

    Role getRoleById (Integer id);

    List<Role> getListOfRoles (String[] roleNames);

    List<Role> getAllRoles ();


        List<Role> getListOfRoles (List<String> roleNames);
}
