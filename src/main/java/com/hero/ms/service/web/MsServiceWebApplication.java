package com.hero.ms.service.web;

import lombok.extern.java.Log;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Log
@SpringBootApplication
public class MsServiceWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsServiceWebApplication.class, args);
        log.info("已启动");
    }

}
