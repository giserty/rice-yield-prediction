package com.ricejava2.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ricejava2.dao.AreaDao;
import com.ricejava2.entity.AreaEntity;
import com.ricejava2.service.AreaService;
import org.springframework.stereotype.Service;

@Service("areaService")
public class AreaServiceImpl extends ServiceImpl<AreaDao, AreaEntity> implements AreaService {

}

