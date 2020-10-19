package com.stackroute.keepnote.aspectj;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/* Annotate this class with @Aspect and @Component */
@Aspect
@Component
public class LoggingAspect {
	
	private final Logger log = LoggerFactory.getLogger(this.getClass());
	/*
	 * Write loggers for each of the methods of User controller, any particular
	 * method will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */
	@Before("execution(* com.stackroute.keepnote.controller.*.*(..))")
	public void logBefore(JoinPoint joinPoint) {

		log.debug("logBefore() is running!");
		log.debug("signature name : " + joinPoint.getSignature().getName());
		log.debug("******");
	}

	@After("execution(* com.stackroute.keepnote.controller.*.*(..))")
	public void logAfter(JoinPoint joinPoint) {

		log.debug("logAfter() is running!");
		log.debug("signature name : " + joinPoint.getSignature().getName());
		log.debug("******");

	}

	@AfterReturning(pointcut = "execution(* com.stackroute.keepnote.controller.*.*(..))", returning = "result")
	public void logAfterReturning(JoinPoint joinPoint, Object result) {

		log.debug("logAfterReturning() is running!");
		log.debug("signature name : " + joinPoint.getSignature().getName());
		log.debug("Method returned value is : " + result);
		log.debug("******");

	}

	@AfterThrowing(pointcut = "execution(* com.stackroute.keepnote.controller.*.*(..))", throwing = "error")
	public void logAfterThrowing(JoinPoint joinPoint, Throwable error) {

		log.debug("logAfterThrowing() is running!");
		log.debug("signature name : " + joinPoint.getSignature().getName());
		log.debug("Exception : " + error);
		log.debug("******");

	}
}
