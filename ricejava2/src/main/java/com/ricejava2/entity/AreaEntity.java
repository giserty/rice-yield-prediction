package com.ricejava2.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;

@Data
@TableName("rice_area")
public class AreaEntity implements Serializable {

    private String year;

    private Double furong;

    private Double tianxin;

    private Double yuelu;

    private Double kaifu;

    private Double yuhua;

    private Double wangcheng;

    private Double changsha;

    private Double liuyang;

    private Double ningxiang;
}
