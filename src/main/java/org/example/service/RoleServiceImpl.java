package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dao.RoleRepository;
import org.example.model.Role;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role getRoleByRole (String name) {
        return roleRepository.findByRole(name);
    }

    @Override
    public Role getRoleById (Integer id) {
        return roleRepository.findById(id).get();
    }

    @Override
    public List<Role> getAllRoles () {
        return  roleRepository.findAll();
    }

    @Override
    public List<Role> getListOfRoles (String[] roleNames) {
        return Arrays.stream(roleNames).map(this::getRoleByRole).collect(Collectors.toList());
    }
    @Override
    public List<Role> getListOfRoles (List<String> roleNames) {
        return roleNames.stream().map(this::getRoleByRole).collect(Collectors.toList());
    }


}