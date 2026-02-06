<%@ page import="java.util.*"%>
<%
    java.io.InputStream inputStream = getServletContext().getResourceAsStream("/META-INF/maven/es.juntadeandalucia.cpai.svehi/svehi/pom.properties");
    Properties mavenProperties= new Properties();
    mavenProperties.load(inputStream );
    String version = (String) mavenProperties.get("version");
	if(version.length() == 5){
		version = version.substring(1, 5);
	}else{
		version = version.substring(1, 8);
	}
%>
<footer class="bg-dark text-center text-white">
  <!-- Grid container -->
  <div class="container p-4 pb-0">
    <!-- Section: Social media -->
    <section >
      <!--<p class="h2">Consejer&iacute;a de la Presidencia, Administraci&oacute;n P&uacute;blica e Interior</p>-->
    </section>
    <!-- Section: Social media -->
  </div>
  <!-- Grid container -->

  <!-- Copyright -->
  <div class="text-right p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    <!--&copy; 2021 Copyright - -->Versi&oacute;n: <%= version %>
  </div>
  <!-- Copyright -->
</footer>