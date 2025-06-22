package com.ricejava2.controller;

import com.ricejava2.entity.YieldEntity;
import com.ricejava2.service.YieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("rice")
public class YieldController {
    @Autowired
    private YieldService yieldService;

    @RequestMapping("/yield")
    public List<YieldEntity> list() {
        return yieldService.list();
    }
}
