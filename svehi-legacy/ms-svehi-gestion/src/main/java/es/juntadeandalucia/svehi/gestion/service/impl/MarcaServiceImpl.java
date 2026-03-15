package es.juntadeandalucia.svehi.gestion.service.impl;

import es.juntadeandalucia.svehi.gestion.domain.MarcaEntity;
import es.juntadeandalucia.svehi.gestion.model.vo.MarcaVO;
import es.juntadeandalucia.svehi.gestion.repository.MarcaRepository;
import es.juntadeandalucia.svehi.gestion.service.MarcaService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarcaServiceImpl implements MarcaService {

    private final MarcaRepository marcaRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional(readOnly = true)
    public List<MarcaVO> findAll() {
        return marcaRepository.findAll().stream()
                .map(entity -> modelMapper.map(entity, MarcaVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MarcaVO findById(Long id) {
        return marcaRepository.findById(id)
                .map(entity -> modelMapper.map(entity, MarcaVO.class))
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con id: " + id));
    }

    @Override
    @Transactional
    public MarcaVO save(MarcaVO marcaVO) {
        MarcaEntity entity = modelMapper.map(marcaVO, MarcaEntity.class);
        entity = marcaRepository.save(entity);
        return modelMapper.map(entity, MarcaVO.class);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        MarcaEntity entity = marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con id: " + id));
        entity.setEliminado(1); // Soft delete
        marcaRepository.save(entity);
    }
}
