package com.ricejava2.controller;

import com.ricejava2.entity.OutputEntity;
import com.ricejava2.service.OutputService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("rice")
public class OutputController {
    @Autowired
    private OutputService outputService;

    @RequestMapping("/output")
    public List<OutputEntity> list(){
        return outputService.list();
    }
}
