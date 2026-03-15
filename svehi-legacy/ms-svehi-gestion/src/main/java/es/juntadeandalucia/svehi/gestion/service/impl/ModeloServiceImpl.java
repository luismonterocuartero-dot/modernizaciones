package es.juntadeandalucia.svehi.gestion.service.impl;

import es.juntadeandalucia.svehi.gestion.domain.ModeloEntity;
import es.juntadeandalucia.svehi.gestion.model.vo.ModeloVO;
import es.juntadeandalucia.svehi.gestion.repository.ModeloRepository;
import es.juntadeandalucia.svehi.gestion.service.ModeloService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModeloServiceImpl implements ModeloService {

    private final ModeloRepository modeloRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<ModeloVO> findByMarca(Long marcaId) {
        return modeloRepository.findByMarcaId(marcaId).stream()
                .map(e -> modelMapper.map(e, ModeloVO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ModeloVO save(ModeloVO modeloVO) {
        ModeloEntity entity = modelMapper.map(modeloVO, ModeloEntity.class);
        entity = modeloRepository.save(entity);
        return modelMapper.map(entity, ModeloVO.class);
    }
}
