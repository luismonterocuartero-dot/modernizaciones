package es.juntadeandalucia.svehi.gestion.service.impl;

import es.juntadeandalucia.svehi.gestion.domain.OperadoraEntity;
import es.juntadeandalucia.svehi.gestion.model.vo.OperadoraVO;
import es.juntadeandalucia.svehi.gestion.repository.OperadoraRepository;
import es.juntadeandalucia.svehi.gestion.service.OperadoraService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OperadoraServiceImpl implements OperadoraService {

    private final OperadoraRepository operadoraRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<OperadoraVO> findAll() {
        return operadoraRepository.findAll().stream()
                .map(e -> modelMapper.map(e, OperadoraVO.class))
                .collect(Collectors.toList());
    }

    @Override
    public OperadoraVO save(OperadoraVO operadoraVO) {
        OperadoraEntity entity = modelMapper.map(operadoraVO, OperadoraEntity.class);
        entity = operadoraRepository.save(entity);
        return modelMapper.map(entity, OperadoraVO.class);
    }
}
