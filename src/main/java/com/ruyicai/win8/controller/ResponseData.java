package com.ruyicai.win8.controller;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

@RooJson
@RooJavaBean
public class ResponseData {
	private String errorCode;
	private Object value;
}
