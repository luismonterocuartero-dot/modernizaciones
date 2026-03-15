package es.juntadeandalucia.svehi.gestion.service.impl;

import es.juntadeandalucia.svehi.gestion.domain.MarcaEntity;
import es.juntadeandalucia.svehi.gestion.model.vo.MarcaVO;
import es.juntadeandalucia.svehi.gestion.repository.MarcaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MarcaServiceImplTest {

    @Mock
    private MarcaRepository marcaRepository;

    @Spy
    private ModelMapper modelMapper = new ModelMapper();

    @InjectMocks
    private MarcaServiceImpl marcaService;

    private MarcaEntity marcaEntity;
    private MarcaVO marcaVO;

    @BeforeEach
    void setUp() {
        marcaEntity = new MarcaEntity();
        marcaEntity.setId(1L);
        marcaEntity.setNombre("SEAT");
        marcaEntity.setActivo(1);
        marcaEntity.setEliminado(0);

        marcaVO = new MarcaVO();
        marcaVO.setId(1L);
        marcaVO.setNombre("SEAT");
    }

    @Test
    void findAll_ShouldReturnList() {
        when(marcaRepository.findAll()).thenReturn(Collections.singletonList(marcaEntity));

        List<MarcaVO> result = marcaService.findAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("SEAT", result.get(0).getNombre());
        verify(marcaRepository, times(1)).findAll();
    }

    @Test
    void findById_WhenExists_ShouldReturnVO() {
        when(marcaRepository.findById(1L)).thenReturn(Optional.of(marcaEntity));

        MarcaVO result = marcaService.findById(1L);

        assertNotNull(result);
        assertEquals("SEAT", result.getNombre());
    }

    @Test
    void findById_WhenNotExists_ShouldThrowException() {
        when(marcaRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> marcaService.findById(1L));
    }

    @Test
    void save_ShouldReturnSavedVO() {
        when(marcaRepository.save(any(MarcaEntity.class))).thenReturn(marcaEntity);

        MarcaVO result = marcaService.save(marcaVO);

        assertNotNull(result);
        assertEquals("SEAT", result.getNombre());
        verify(marcaRepository, times(1)).save(any(MarcaEntity.class));
    }

    @Test
    void delete_ShouldSetEliminadoAndSave() {
        when(marcaRepository.findById(1L)).thenReturn(Optional.of(marcaEntity));

        marcaService.delete(1L);

        assertEquals(1, marcaEntity.getEliminado());
        verify(marcaRepository, times(1)).save(marcaEntity);
    }
}
