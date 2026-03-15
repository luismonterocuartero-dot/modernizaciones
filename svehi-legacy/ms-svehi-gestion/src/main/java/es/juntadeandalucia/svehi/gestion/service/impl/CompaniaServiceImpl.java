package es.juntadeandalucia.svehi.gestion.service.impl;

import es.juntadeandalucia.svehi.gestion.domain.CompaniaEntity;
import es.juntadeandalucia.svehi.gestion.model.vo.CompaniaVO;
import es.juntadeandalucia.svehi.gestion.repository.CompaniaRepository;
import es.juntadeandalucia.svehi.gestion.service.CompaniaService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompaniaServiceImpl implements CompaniaService {

    private final CompaniaRepository companiaRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<CompaniaVO> findAll() {
        return companiaRepository.findAll().stream()
                .map(e -> modelMapper.map(e, CompaniaVO.class))
                .collect(Collectors.toList());
    }

    @Override
    public CompaniaVO save(CompaniaVO companiaVO) {
        CompaniaEntity entity = modelMapper.map(companiaVO, CompaniaEntity.class);
        entity = companiaRepository.save(entity);
        return modelMapper.map(entity, CompaniaVO.class);
    }
}
