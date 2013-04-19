package com.ruyicai.win8.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ruyicai.win8.Exception.RuyicaiException;
import com.ruyicai.win8.service.LotteryService;
import com.ruyicai.win8.util.ErrorCode;

@Controller

public class SelectAllController {
    
	private Logger logger = LoggerFactory.getLogger(SelectAllController.class);
	@Autowired
	private LotteryService lotteryService;
	
	
	/**
	 * 根据用户编号查询用户信息
	 * @param userno 
	 * 			用户编号
	 * @return
	 */
	@RequestMapping(value="/queryuserInfoByUserNo")
	public @ResponseBody
	ResponseData queryUserInfoByUserNo(
			@RequestParam(value="userno") String userno){
		logger.info("/queryuserInfo,查询用户信息 userno:"+userno);
		ResponseData rd = new ResponseData();
		ErrorCode result = ErrorCode.OK;
		try {
			rd.setValue(lotteryService.findTuserinfoByUserno(userno));
		} catch (RuyicaiException e) {
			logger.error("查询用户信息异常,{}", new String[] { e.getMessage() }, e);
			rd.setValue(e.getMessage());
			result = ErrorCode.ERROR;
		} catch (Exception e) {
			logger.error("查询用户信息异常,{}", new String[] { e.getMessage() }, e);
			result = ErrorCode.ERROR;
			rd.setValue(e.getMessage());
		}
		rd.setErrorCode(result.value);
		return rd;
	}
	
	/**
	 * 根据用户名查询用户信息
	 * @param username 
	 *            	用户名
	 * @return
	 */
	@RequestMapping(value="/queryUserInfoByUserName")
	public @ResponseBody
	ResponseData queryuserInfoByUserName(
			@RequestParam(value="username") String username){
		logger.info("/queryuserInfoByUserName,查询用户信息 username:"+username);
		ResponseData rd = new ResponseData();
		ErrorCode result = ErrorCode.OK;
		try {
			rd.setValue(lotteryService.findTuserinfoByUsername(username));
		} catch (RuyicaiException e) {
			logger.error("查询用户信息异常,{}", new String[] { e.getMessage() }, e);
			rd.setValue(e.getMessage());
			result = ErrorCode.ERROR;
		} catch (Exception e) {
			logger.error("查询用户信息异常,{}", new String[] { e.getMessage() }, e);
			result = ErrorCode.ERROR;
			rd.setValue(e.getMessage());
		}
		rd.setErrorCode(result.value);
		return rd;
	}
	
	
}
