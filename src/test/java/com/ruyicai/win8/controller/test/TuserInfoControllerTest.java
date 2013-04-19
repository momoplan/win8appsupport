package com.ruyicai.win8.controller.test;

import static org.junit.Assert.*;



import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;

import com.ruyicai.win8.service.LotteryService;


@RunWith(SpringJUnit4ClassRunner.class)
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class })
@ContextConfiguration(locations = { "classpath:/META-INF/spring/applicationContext.xml",
		"classpath:/META-INF/spring/applicationContext-memcache.xml" })
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
public class TuserInfoControllerTest {
	@Autowired
	private LotteryService lotteryService;

	@Test
	public void testLogin() {
		lotteryService.findTuserinfoByUsername("15210900137");
		fail("Not yet implemented");
	}

	@Test
	public void testAddscore() {
		fail("Not yet implemented");
	}

}
