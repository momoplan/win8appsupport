package com.ruyicai.win8.controller;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.ruyicai.win8.Exception.RuyicaiException;
import com.ruyicai.win8.bean.Tuserinfo;
import com.ruyicai.win8.service.LotteryService;
import com.ruyicai.win8.service.MemcachedService;
import com.ruyicai.win8.util.ErrorCode;
import com.ruyicai.win8.util.MD5.PaySign;

@Controller

public class TuserInfoController {
    
	private Logger logger = LoggerFactory.getLogger(TuserInfoController.class);
	@Autowired
	private LotteryService lotteryService;
	@Autowired
	MemcachedService<Tuserinfo> memcachedService;
	/**
	 * 登录
	 * @param username  
	 * 			用户名
	 * @param password
	 * 			密码	
	 * @param flag
	 *  		记住密码编号
	 * @return
	 */
	@SuppressWarnings("unused")
	@RequestMapping(value="/login")
	public @ResponseBody
	ResponseData login(
			@RequestParam(value="username") String username,
			@RequestParam(value="password") String password,
			@RequestParam(value="flag",required=false) String flag){
		logger.info("/login,username:"+username+"password:"+password);
		ResponseData rd = new ResponseData();
		ErrorCode result = ErrorCode.OK;
		try {
			Tuserinfo tuserinfo = lotteryService.findTuserinfoByUsername(username);
		    String passwordMd5 = tuserinfo.getPassword();
		    if(tuserinfo !=null){
			    if(!passwordMd5.equals(PaySign.EncoderByMd5(password))){
			    	logger.info("用户登录失败 密码不匹配,{}username:"+username);
			    	result = ErrorCode.Userlogin_Error;
			    	rd.setValue(result.memo);
			    }else{
			    	rd.setValue(tuserinfo);
			        //设置缓存
			    	memcachedService.set("win8Tuserinfo"+tuserinfo.getUserno(),tuserinfo);
				    //赠送积分 	
			    	lotteryService.addscores(tuserinfo.getUserno(), "8");
			    }
		    }else{
		    	logger.info("用户登录失败,{}username:"+username);
		    	result = ErrorCode.Userlogin_Error;
		    	rd.setValue(result.memo);
		    }
		} catch (RuyicaiException e) {
			logger.error("用户登录异常,{}", new String[] { e.getMessage() }, e);
			rd.setValue(e.getMessage());
			result = ErrorCode.ERROR;
		} catch (Exception e) {
			logger.error("用户登录异常,{}", new String[] { e.getMessage() }, e);
			result = ErrorCode.ERROR;
			rd.setValue(e.getMessage());
		}
		rd.setErrorCode(result.value);
		return rd;
	}
/**
 * 赠送积分
 * @param userno
 * 			用户编号
 * @param scoreType
 * 		    积分标示
 * @return
 */
	@RequestMapping(value="/addscore")
	public @ResponseBody
	ResponseData addscore(
			@RequestParam(value="userno") String userno,
			@RequestParam(value="scoreType") String scoreType){
		logger.info("/addscore,userno:"+userno+"scoreType:"+scoreType);
		ResponseData rd = new ResponseData();
		ErrorCode result = ErrorCode.OK;
		String re = lotteryService.addscores(userno, scoreType);
		if (StringUtils.isBlank(re)) {
			rd.setValue(re);
			rd.setErrorCode(result.value);
		}else{
			result = ErrorCode.ERROR;
			rd.setValue(re);
			rd.setErrorCode(result.value);
		}
		return rd;
	}
	
	
}
