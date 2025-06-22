package com.ricejava2.controller;

import com.ricejava2.entity.AreaEntity;
import com.ricejava2.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("rice")
public class AreaController {
    @Autowired
    private AreaService areaService;

    @RequestMapping("/area")
    public List<AreaEntity> list(){
        return areaService.list();
    }

}
