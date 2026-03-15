package es.juntadeandalucia.svehi.gestion;

import es.juntadeandalucia.svehi.gestion.domain.MarcaEntity;
import es.juntadeandalucia.svehi.gestion.repository.MarcaRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class MarcaIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MarcaRepository marcaRepository;

    @Test
    void getMarcas_ShouldReturnList() throws Exception {
        // Arrange
        MarcaEntity marca = new MarcaEntity();
        marca.setNombre("TEST_BRAND");
        marca.setActivo(1);
        marcaRepository.save(marca);

        // Act & Assert
        mockMvc.perform(get("/v1/marcas")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].nombre").value("TEST_BRAND"));
    }
}
