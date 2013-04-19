<%
	String callback = request.getParameter("callback");
	String jsons = (String)request.getParameter("jsons");
	
	
	out.print(callback+"("+jsons+")");
	//out.print(callback);
%>

