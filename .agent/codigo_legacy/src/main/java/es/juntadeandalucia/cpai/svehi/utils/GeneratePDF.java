package es.juntadeandalucia.cpai.svehi.utils;

import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import es.juntadeandalucia.cpai.svehi.entity.Cesion;
import es.juntadeandalucia.cpai.svehi.entity.Equipamiento;
import es.juntadeandalucia.cpai.svehi.entity.HistoricoAdscrito;
import es.juntadeandalucia.cpai.svehi.entity.Matricula;
import es.juntadeandalucia.cpai.svehi.entity.Poliza;
import es.juntadeandalucia.cpai.svehi.entity.Vehiculo;
import es.juntadeandalucia.cpai.svehi.entity.VehiculoDocumento;
import es.juntadeandalucia.cpai.svehi.service.CesionService;
import es.juntadeandalucia.cpai.svehi.service.EquipamientoService;
import es.juntadeandalucia.cpai.svehi.service.HistoricoAdscritoService;
import es.juntadeandalucia.cpai.svehi.service.MatriculaService;
import es.juntadeandalucia.cpai.svehi.service.PermisoService;
import es.juntadeandalucia.cpai.svehi.service.PolizaService;
import es.juntadeandalucia.cpai.svehi.service.VehiculoDocumentoService;
import es.juntadeandalucia.cpai.svehi.service.VehiculoService;

@RestController
public class GeneratePDF {
	
	private static final String TXTOBSERVACIONES = "Observaciones";
	private static final String TXTSERVADS = "Servicio Adscrito";
	private static final String FORMATOFECHA = "dd/MM/yyyy";
	
	@Autowired
	MatriculaService matrService;
	
	@Autowired
	HistoricoAdscritoService historicoAdscritoService;
	
	@Autowired
	VehiculoDocumentoService vehiculoDocumentoService;
	
	@Autowired
	EquipamientoService equipamientoService;
	
	@Autowired
	CesionService cesionService;
	
	@Autowired
	VehiculoService vehiculoService;
	
	@Autowired
	PolizaService polizaService;
	
	@Autowired
	private PermisoService permisoService;
	
	private static final String TXTIDUSUARIO = "idUsuario";

	/**
	 * FUNCION QUE OBTIENE UNA REFERENCIA Y DEVUELVE UN STRING CON EL PERMISO ACTUAL SOBRE EL OBJETO DE ESA REFERENCIA PARA EL USUARIO LOGADO 
	 * @param referencia
	 */
	private String obtenerPermisoActualPorReferencia(String referencia, HttpSession session)  {
		// OBTENEMOS UN LISTADO DE PERMISOS EN BASE A LA REFERENCIA
		List<Object[]> permisos = permisoService.obtenerPermisoPorReferencia(referencia);
		List<String> permisosFin = new ArrayList<>();
		permisosFin.add("0");
		for(Object[] permiso: permisos) {
			permisosFin.add(permiso[0].toString());
		}
		// SACAMOS EL PERMISO ACTUAL DEL USUARIO SOBRE EL OBJETO DE LA REFERENCIA
		String permisoActual;
		permisoActual= permisoService.permisoDeAcceso(session.getAttribute("rol").toString(),Long.valueOf(session.getAttribute(TXTIDUSUARIO).toString()),permisosFin);
		
		return permisoActual;
	}
	
	/**
	* FUNCION QUE GENERAL EL PDF 
	**/
    @GetMapping("/generarPDF/{id}")
    public void generarPDFConLogoYTexto(@PathVariable Long id,HttpServletResponse response, HttpSession session) throws IOException, DocumentException {
    	try {
    		// Con esto obtenemos los permisos de cada usuario con los cuales mas adelante haremos
    		String permisoActualEquipamiento = obtenerPermisoActualPorReferencia("EQUI",session);
    		String permisoActualCesion = obtenerPermisoActualPorReferencia("CESI",session);
    		String permisoActualPoliza = obtenerPermisoActualPorReferencia("POLI",session);

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=InfoVehiculo.pdf");

            OutputStream outputStream = response.getOutputStream();
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document, outputStream);
            document.open();
            
            // Agregar titulo principal al documento con letra grande
            Font fontTituloPrincipal = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD);
            Paragraph tituloDocumento = new Paragraph("Información del Vehículo", fontTituloPrincipal);
            tituloDocumento.setAlignment(Element.ALIGN_CENTER);
            document.add(tituloDocumento);   
			
            // Agregar espacio entre el titulo principal y las tablas
            document.add(new Paragraph("\n"));
            Vehiculo vehiculo = vehiculoService.obtenerVehiculoPorId(id);
            agregarTablaTipo4(document, vehiculo);
            document.newPage();
			

            //Controlamos con permisos los que no tienen if es por que van con el 
            //permiso de vehiculo 
            //y de por si al entrar en este apartado deberian poder verlos.
            agregarTablaTipo1(document,"Datos de las Matriculas",id);
            agregarTablaTipo1(document,"Documentos del Vehiculo",id);
            if(!permisoActualEquipamiento.isEmpty())
            {
            	agregarTablaTipo1(document,"Datos del Equipamiento",id);
            }
            if(!permisoActualPoliza.isEmpty())
            {
            	agregarTablaTipo1(document,"Datos de la Poliza",id);
            }
            if(!permisoActualCesion.isEmpty())
            {
            	agregarTablaTipo1(document,"Datos de la Cesion",id);
            }
            agregarTablaTipo1(document,"Historico de Adscripciones",id);
			
            document.close();
            outputStream.close();
        } catch (Exception ex) {
            ex.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private List<String> obtenerEncabezadosMatriculas() {
        return Arrays.asList("Matrícula", "T.Repostaje", "T.Peaje","F.Matriculación", "Doblada", TXTOBSERVACIONES);
    }

    private List<String> obtenerEncabezadosAdscritos() {
        return Arrays.asList(TXTSERVADS, "Fecha Adscripción");
    }
    
    private List<String> obtenerEncabezadosDocumentos() {
        return Arrays.asList("Nombre", "Comentario");
    }

    private List<String> obtenerEncabezadosEquipamientos() {
        return Arrays.asList("Tipo Equipamiento", "Datos", TXTOBSERVACIONES);
    }

    private List<String> obtenerEncabezadosCesion() {
        return Arrays.asList("Motivo", TXTSERVADS, "Km Iniciales", "Km Finales", "F.inicio", "F.Fin", TXTOBSERVACIONES);
    }

    private List<String> obtenerEncabezadosPoliza() {
        return Arrays.asList("Matrícula", "Compañia", "Póliza","NIF", "Fecha Inicio", "Fecha Fin");
    }
	public void agregarTablaTipo1(Document document,String tabla,Long idVehiculo) throws DocumentException {
        PdfPTable tableValores = null;
	  	PdfPTable table = new PdfPTable(1);
	  	obtenerTituloTabla(table,tabla);
	  	agregarEspacio(table,1);
        table.setHorizontalAlignment(Element.ALIGN_CENTER);
		
        int columnas=0;
        switch (tabla) {
        case "Historico de Adscripciones":
            List<HistoricoAdscrito> historicosAdscritos = historicoAdscritoService.obtenerHistoricosAdscritosPorVehiculo(idVehiculo);
            columnas=obtenerEncabezadosAdscritos().size();
            tableValores = new PdfPTable(columnas);
            colocaCabeceros(obtenerEncabezadosAdscritos(), tableValores);
            rellenaTabla(tableValores,historicosAdscritos,columnas);
            break;
        case "Documentos del Vehiculo":
        	List<VehiculoDocumento> docuList = vehiculoDocumentoService.obtenerDocumentosPorIdVehiculo(idVehiculo);
        	columnas=obtenerEncabezadosDocumentos().size();
        	tableValores = new PdfPTable(columnas);
        	colocaCabeceros(obtenerEncabezadosDocumentos(), tableValores);
        	rellenaTabla(tableValores,docuList,columnas);
        	break;
        case "Datos de las Matriculas":
            List<Matricula> matriculas = matrService.obtenerMatriculasDeVehiculoNoEliminadas(idVehiculo);
            columnas=obtenerEncabezadosMatriculas().size();
            tableValores = new PdfPTable(columnas);
            table.setWidthPercentage(100);
            colocaCabeceros(obtenerEncabezadosMatriculas(), tableValores);
            rellenaTabla(tableValores,matriculas,columnas);
            break;
        case "Datos del Equipamiento":
        	List<Equipamiento> equipamientos = equipamientoService.obtenerEquipamientosDeVehiculoNoEliminados(idVehiculo);
        	columnas=obtenerEncabezadosEquipamientos().size();
        	tableValores = new PdfPTable(columnas);
        	colocaCabeceros(obtenerEncabezadosEquipamientos(), tableValores);
        	rellenaTabla(tableValores,equipamientos,columnas);
        	break;
        case "Datos de la Cesion":
        	List<Cesion> cesiones = cesionService.obtenerCesionesDeVehiculoNoEliminadas(idVehiculo);
        	columnas = obtenerEncabezadosCesion().size();
        	tableValores = new PdfPTable(columnas);
        	colocaCabeceros(obtenerEncabezadosCesion(), tableValores);
        	rellenaTabla(tableValores,cesiones,columnas);
        	break;
        case "Datos de la Poliza":
        	List<Poliza> polizas = polizaService.obtenerPolizasDeVehiculoNoEliminadas(idVehiculo);
        	columnas=obtenerEncabezadosPoliza().size();
        	tableValores = new PdfPTable(columnas);
        	colocaCabeceros(obtenerEncabezadosPoliza(), tableValores);
        	rellenaTabla(tableValores,polizas,columnas);
        	break;              
        default:
            throw new IllegalArgumentException("Tipo de tabla no reconocido");
    }
        PdfPCell cell = new PdfPCell(tableValores);
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);
        table.setKeepTogether(true);       
        // Agregar tabla al documento
        document.add(table);

        // Agregar espacio entre las tablas
        document.add(new Paragraph("\n"));
    }
    
  
	private void colocaCabeceros(List<String> cabecera, PdfPTable table) {
	    table.getDefaultCell().setBorderWidth(0f);

	    // Set the font for the header cells to bold
	    Font font = new Font(Font.FontFamily.HELVETICA, 11, Font.BOLD);

	    for (String encabezado : cabecera) {
	        // Create a Phrase with bold font
	        Phrase phrase = new Phrase(encabezado, font);

	        // Add the cell with the bold text and without border
	        PdfPCell cell = new PdfPCell(phrase);
	        cell.setBorderWidth(0f);
	        table.addCell(cell);
	    }
	    
	    int numEncabezados = cabecera.size();
	    for (int i = 0; i < numEncabezados; i++) {
	        agregarLineaSeparadora2(table, numEncabezados);
	    }
	}
    
    private static void rellenaTabla(PdfPTable table,List<?> datos,int numColu) {
    	String fechaFormateada;
        // Agregar celdas a la tabla
        for (Object dato : datos) {
        	fechaFormateada="";
            if (datos.indexOf(dato) != 0) {
                agregarLineaSeparadora2(table,numColu);
            }
            if (dato instanceof HistoricoAdscrito) {
                HistoricoAdscrito historico = (HistoricoAdscrito) dato;
                fechaFormateada = new SimpleDateFormat(FORMATOFECHA).format(historico.getFechaServicio());
                table.addCell(historico.getFkServicioAdscrito().getNombre()); // Asegúrate de tener un método toString() adecuado para la fecha
                table.addCell(fechaFormateada);
				agregarEspacio(table,numColu);
            } else if (dato instanceof Matricula) {
            	compruebaMatricula(dato,table,numColu);
	        } else if (dato instanceof Equipamiento) {
	        	Equipamiento equipamiento = (Equipamiento) dato;
	        	table.addCell(equipamiento.getFkTipoEquipamiento().getNombre());
	        	table.addCell(equipamiento.getDetalle());	            
	            table.addCell(equipamiento.getObservaciones());
	            agregarEspacio(table,numColu);
	        } else if (dato instanceof Poliza) {
	        	compruebaPoliza(dato,table,numColu);
	        } else if (dato instanceof Cesion) {
	        	compruebaCesion(dato,table,numColu);
	        } else if (dato instanceof VehiculoDocumento) {
	        	VehiculoDocumento vehiDoc = (VehiculoDocumento) dato;
	            // Accede a los atributos de la matrícula y agrégales a la tabla
	            table.addCell(vehiDoc.getNombre());
	            table.addCell(vehiDoc.getComentarios());
	            agregarEspacio(table,numColu);
	        }
        }
    }

    public static void compruebaMatricula(Object dato, PdfPTable table, int numColu) {
        Matricula matricula = (Matricula) dato;
        // Accede a los atributos de la matrícula y agrégales a la tabla
        table.addCell(matricula.getNombre());
        table.addCell(matricula.getTarjetaRepostaje());
        table.addCell(matricula.getTarjetaPeaje());
        String fechaFormateada;
        if(matricula.getFechaMatriculacion()!=null) {
            fechaFormateada = new SimpleDateFormat(FORMATOFECHA).format(matricula.getFechaMatriculacion());
        	table.addCell(fechaFormateada);
        } else {
        	table.addCell("");
        }
        table.addCell(Boolean.TRUE.equals(matricula.getDoblada()) ? "Sí" : "No");
        table.addCell(matricula.getObservacionesMat());
        agregarEspacio(table,numColu);
	}
    
    public static void compruebaPoliza(Object dato, PdfPTable table, int numColu) {
    	Poliza poliza = (Poliza) dato;
        // Accede a los atributos de la matrícula y agrégales a la tabla
        table.addCell(poliza.getFkMatricula().getNombre());
        table.addCell(poliza.getFkCompania().getNombre());
        table.addCell(poliza.getNumeroPoliza());
        table.addCell(poliza.getNif());
        String fechaFormateada;
        String fechaFormateadaFin ;
        if(poliza.getFechaInicio()!=null) {
        	fechaFormateada = new SimpleDateFormat(FORMATOFECHA).format(poliza.getFechaInicio());
        	table.addCell(fechaFormateada);
        } else {
        	table.addCell("");
        }
        if(poliza.getFechaFin()!=null) {
        	fechaFormateadaFin = new SimpleDateFormat(FORMATOFECHA).format(poliza.getFechaFin());
        	table.addCell(fechaFormateadaFin);
        } else {
        	table.addCell("");
        }
        agregarEspacio(table,numColu);
	}
    
	public static void compruebaCesion(Object dato, PdfPTable table, int numColu) {
    	Cesion cesion = (Cesion) dato;
        // Accede a los atributos de la matrícula y agrégales a la tabla
        table.addCell(cesion.getFkParametroTipoMotivo().getNombre());
        table.addCell(cesion.getFkServicioAdscrito().getNombre());
        table.addCell(cesion.getKmIniciales());
        table.addCell(cesion.getKmFinales());
        String fechaFormateada;
        String fechaFormateadaFin ;
        if(cesion.getFechaInicio()!=null) {
            fechaFormateada = new SimpleDateFormat(FORMATOFECHA).format(cesion.getFechaInicio());
        	table.addCell(fechaFormateada);
        } else {
        	table.addCell("");
        }
        if(cesion.getFechaFin()!=null) {
        	fechaFormateadaFin = new SimpleDateFormat(FORMATOFECHA).format(cesion.getFechaFin());
        	table.addCell(fechaFormateadaFin);
        } else {
        	table.addCell("");
        }
        table.addCell(cesion.getObservaciones());
        agregarEspacio(table,numColu);
	}
    
	private static void agregarTablaTipo4(Document document, Vehiculo vehiculoDato)
            throws DocumentException {
        // Crear una tabla con 1 columna (etiquetas y datos)
        PdfPTable table = new PdfPTable(1);
        // Configurar el ancho de la tabla y centrarla
        table.setWidthPercentage(80);
        table.setHorizontalAlignment(Element.ALIGN_CENTER);

        // Crear una celda para "Cesiones"
        PdfPCell vehiCell = new PdfPCell(new Phrase("Datos del Vehiculo", new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD)));
        vehiCell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        vehiCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        vehiCell.setColspan(2);  // Establecer que ocupe 2 columnas
        vehiCell.setBorder(Rectangle.NO_BORDER);

        // Agregar la celda de "titulo" a la tabla
        table.addCell(vehiCell);
        
        agregarEspacio(table,1);
        // Configurar el ancho de la tabla y centrarla
        table.setWidthPercentage(80);
        table.setHorizontalAlignment(Element.ALIGN_CENTER);
        // Agregar los datos a la tabla interna
        String fechaAdscripcionFormatted = "";
        String fechaBajaFormatted = "";
        String fechaCompraFormatted = "";
        PdfPTable tableVehi = new PdfPTable(2);
        SimpleDateFormat sdf = new SimpleDateFormat(FORMATOFECHA);
            // Formatear la fecha en formato "ddmmyyyy"
            if (vehiculoDato.getFechaAdscripcion() != null) {
                fechaAdscripcionFormatted = sdf.format(vehiculoDato.getFechaAdscripcion());
            }
            if (vehiculoDato.getFechaBaja() != null) {
                fechaBajaFormatted = sdf.format(vehiculoDato.getFechaBaja());
            }
            if (vehiculoDato.getFechaCompra() != null) {
                fechaCompraFormatted = sdf.format(vehiculoDato.getFechaCompra());
            }
            // Agregar cada propiedad del vehículo como una celda con la cabecera correspondiente
            agregarCeldaConCabecera2(tableVehi, TXTSERVADS, vehiculoDato.getFkServicioAdscrito() != null ? vehiculoDato.getFkServicioAdscrito().getNombre() : "", 0);
            agregarCeldaConCabecera2(tableVehi, "Tipo Repostaje", vehiculoDato.getFkParametroTipoRepostaje() != null ? vehiculoDato.getFkParametroTipoRepostaje().getNombre() : "", 0);
            agregarCeldaConCabecera2(tableVehi, "Fecha Compra", fechaCompraFormatted != null ? fechaCompraFormatted : "", 0);
            agregarCeldaConCabecera2(tableVehi, "Color", vehiculoDato.getColor() != null ? vehiculoDato.getColor() : "", 0);
            agregarCeldaConCabecera2(tableVehi, "Situación", vehiculoDato.getFkParametroTipoSituacion() != null ? vehiculoDato.getFkParametroTipoSituacion().getNombre() : "", 0);
            agregarCeldaConCabecera2(tableVehi, "Destino", vehiculoDato.getFkParametroTipoDestino() != null ? vehiculoDato.getFkParametroTipoDestino().getNombre() : "", 0);
            agregarCeldaConCabecera2(tableVehi, "Fecha Adscripción", fechaAdscripcionFormatted != null ? fechaAdscripcionFormatted : "", 0);
            agregarCeldaConCabecera2(tableVehi, "Marca", vehiculoDato.getFkModelo() != null && vehiculoDato.getFkModelo().getFkMarca() != null ? vehiculoDato.getFkModelo().getFkMarca().getNombre() : "", 0);
            agregarCel(tableVehi,vehiculoDato,fechaBajaFormatted);
            table.addCell(tableVehi);

        // Agregar la tabla principal al documento
        document.add(table);
    }
	
	public static void agregarCel(PdfPTable tableVehi, Vehiculo vehiculoDato,String fechaBajaFormatted) {
		
        agregarCeldaConCabecera2(tableVehi, "Expediente", vehiculoDato.getExpedienteCompra() != null ? vehiculoDato.getExpedienteCompra() : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Bastidor", vehiculoDato.getNumeroBastidor() != null ? vehiculoDato.getNumeroBastidor() : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Fecha Baja", fechaBajaFormatted != null ? fechaBajaFormatted : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Motivo Destino", vehiculoDato.getMotivoDestino() != null ? vehiculoDato.getMotivoDestino() : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Uso", vehiculoDato.getFkParametroTipoUso() != null ? vehiculoDato.getFkParametroTipoUso().getNombre() : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Modelo", vehiculoDato.getFkModelo() != null ? vehiculoDato.getFkModelo().getNombre() : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Inventario", vehiculoDato.getNumeroInventario() != null ? vehiculoDato.getNumeroInventario() : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Tipo de Vehículo", vehiculoDato.getFkModelo() != null && vehiculoDato.getFkModelo().getFkParametroTipoVehiculo() != null ? vehiculoDato.getFkModelo().getFkParametroTipoVehiculo().getNombre() : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Motivo Baja", vehiculoDato.getMotivoBaja() != null ? vehiculoDato.getMotivoBaja() : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Tipo Adquisicion", vehiculoDato.getFkParametroTipoAdquisicion() != null ? vehiculoDato.getFkParametroTipoAdquisicion().getNombre() : "", 0);
        agregarCeldaConCabecera2(tableVehi, "Empresa Operadora", vehiculoDato.getFkOperadora() != null ? vehiculoDato.getFkOperadora().getNombre() : "", 0);
        agregarCeldaConCabecera2(tableVehi, TXTOBSERVACIONES, vehiculoDato.getObservaciones() != null ? vehiculoDato.getObservaciones() : "", 1);
		
	}
	
    private static void agregarCeldaConCabecera2(PdfPTable table, String cabecera, String dato, int numCelda) {
        String contenidoCelda = (dato != null && !"null".equals(dato)) ? dato : "";

        Font fontCabecera = new Font(Font.FontFamily.HELVETICA, 11, Font.BOLD);
        Font fontContenido = new Font(Font.FontFamily.HELVETICA, 11);

        // Crear celda para la cabecera
        PdfPCell cabeceraCell = new PdfPCell(new Phrase(cabecera + ":", fontCabecera));
        cabeceraCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        cabeceraCell.setBorder(Rectangle.NO_BORDER);

        // Crear celda para el contenido
        PdfPCell contenidoCell = new PdfPCell(new Phrase(contenidoCelda, fontContenido));
        contenidoCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        contenidoCell.setBorder(Rectangle.NO_BORDER);

        // Agregar la celda de cabecera y contenido a la tabla
        if (numCelda == 1) {
        	cabeceraCell.setColspan(2);	// Establecer que ocupe 2 columnas
        	contenidoCell.setColspan(2);  // Establecer que ocupe 2 columnas
        }
        table.addCell(cabeceraCell);
        table.addCell(contenidoCell);
    }

    private static void agregarLineaSeparadora2(PdfPTable table,int numeroColumnas) {
        PdfPCell cell = new PdfPCell();
        cell.setBorder(Rectangle.BOTTOM);
        cell.setBorderColor(BaseColor.LIGHT_GRAY);
        cell.setBorderWidth(1f);
        for(int i=0;i<numeroColumnas;i++){
			table.addCell(cell);
		}
    }
    
    private static void obtenerTituloTabla(PdfPTable table, String tablaTitulo) {
        // Crear una tabla con 1 columna para el título con fondo gris
    	table.setWidthPercentage(100);
    	table.setHorizontalAlignment(Element.ALIGN_CENTER);

        // Agregar título de la tabla con letra un poco más grande
        Font fontTituloTabla = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
        
        // Crear la celda del título con fondo gris
        PdfPCell titleCell = new PdfPCell(new Paragraph(tablaTitulo, fontTituloTabla));
        titleCell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        titleCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        titleCell.setBorder(Rectangle.NO_BORDER);
        
        // Agregar la celda a la tabla
        table.addCell(titleCell);
    }
    
   private static void agregarEspacio(PdfPTable table, int numeroColumnas) {
        for (int i = 0; i < numeroColumnas; i++) {
            PdfPCell cell = new PdfPCell(new Phrase(" "));
            cell.setBorder(Rectangle.NO_BORDER);
            table.addCell(cell);
        }
    }
}