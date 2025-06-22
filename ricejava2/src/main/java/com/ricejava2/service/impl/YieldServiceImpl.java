package com.ricejava2.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ricejava2.dao.YieldDao;
import com.ricejava2.entity.YieldEntity;
import com.ricejava2.service.YieldService;
import org.springframework.stereotype.Service;

@Service("yieldService")
public class YieldServiceImpl extends ServiceImpl<YieldDao, YieldEntity> implements YieldService {
}
