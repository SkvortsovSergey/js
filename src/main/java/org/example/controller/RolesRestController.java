package org.example.controller;

import org.example.model.Role;
import org.example.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolesRestController {

    @Autowired
    RoleService roleService;

    @GetMapping()
    public ResponseEntity<List<Role>> allUsers () {
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }
}
