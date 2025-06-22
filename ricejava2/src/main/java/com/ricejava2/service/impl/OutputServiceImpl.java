package com.ricejava2.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ricejava2.dao.OutputDao;
import com.ricejava2.entity.OutputEntity;
import com.ricejava2.service.OutputService;
import org.springframework.stereotype.Service;

@Service("outputService")
public class OutputServiceImpl extends ServiceImpl<OutputDao, OutputEntity> implements OutputService {
}
