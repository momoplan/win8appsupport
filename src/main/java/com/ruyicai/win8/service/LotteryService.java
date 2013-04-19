package com.ruyicai.win8.service;

import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ruyicai.win8.Exception.RuyicaiException;
import com.ruyicai.win8.bean.Tuserinfo;
import com.ruyicai.win8.util.ErrorCode;
import com.ruyicai.win8.util.HttpUtil;


@Service
public class LotteryService {
	private Logger logger = LoggerFactory.getLogger(LotteryService.class);
	@Value("${lotteryurl}")
	String lotteryurl;
	@Value("${scorecenterurl}")
	String scorecenterurl;
	
	@Autowired
	MemcachedService<Tuserinfo> memcachedService;
	/**
	 * @param userno
	 *            用户编号
	 * @return Tuserinfo
	 */
	public Tuserinfo findTuserinfoByUserno(String userno) {
		if (StringUtils.isBlank(userno)) {
			throw new IllegalArgumentException("the argument userno is required");
		}
		Tuserinfo tuserinfo = null;
		String url = lotteryurl + "/tuserinfoes?find=ByUserno&json&userno=" + userno;
		try {
			tuserinfo = memcachedService.get("win8Tuserinfo" + userno);
			if (tuserinfo != null) {
				logger.info("find user from cache");
				return tuserinfo;
			}
			logger.info("find user from lottery");
			String result = HttpUtil.getResultMessage(url.toString());
			if (StringUtils.isNotBlank(result)) {
				JSONObject jsonObject = new JSONObject(result);
				String errorCode = jsonObject.getString("errorCode");
				if (errorCode.equals(ErrorCode.OK.value)) {
					String value = jsonObject.getString("value");
					tuserinfo = Tuserinfo.fromJsonToTuserinfo(value);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("请求" + url + "失败" + e.getMessage());
			throw new RuyicaiException(ErrorCode.ERROR);
		}
		return tuserinfo;
	}
	/**
	 * 根据username查询用户信息
	 * @param username
	 *        用户名
	 * @return
	 */
	public Tuserinfo findTuserinfoByUsername(String username){
		if (StringUtils.isBlank(username)) {
			throw new IllegalArgumentException("the argument username is required");
		}
		Tuserinfo tuserinfo = null;
		String url = lotteryurl + "/tuserinfoes?find=ByUserName&userName=" + username+"&json=";
		try {
			logger.info("find user from lottery");
			String result = HttpUtil.getResultMessage(url.toString());
			if (StringUtils.isNotBlank(result)) {
				JSONObject jsonObject = new JSONObject(result);
				String errorCode = jsonObject.getString("errorCode");
				if (errorCode.equals(ErrorCode.OK.value)) {
					String value = jsonObject.getString("value");
					tuserinfo = Tuserinfo.fromJsonToTuserinfo(value);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("请求" + url + "失败" + e.getMessage());
			throw new RuyicaiException(ErrorCode.ERROR);
		}
		return tuserinfo;
	}
	
	/**
	 *  添加积分
	 * @param userno  
	 * 			 用户编号
	 */
	public String addscores(String userno,String scoreType){
		if (StringUtils.isBlank(userno)) {
			throw new IllegalArgumentException("the argument userno is required");
		}
		String url = scorecenterurl + "/addTuserinfoScore?userno=" + userno+"&scoreType="+scoreType;
		try {
			logger.info("find user from lottery");
			String result = HttpUtil.getResultMessage(url.toString());
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("请求" + url + "失败" + e.getMessage());
			throw new RuyicaiException(ErrorCode.ERROR);
		}
	}
	
}
