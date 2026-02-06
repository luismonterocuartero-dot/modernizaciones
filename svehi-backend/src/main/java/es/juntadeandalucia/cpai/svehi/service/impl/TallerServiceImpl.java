package es.juntadeandalucia.cpai.svehi.service.impl;

import es.juntadeandalucia.cpai.svehi.domain.Taller;
import es.juntadeandalucia.cpai.svehi.domain.ServicioTaller;
import es.juntadeandalucia.cpai.svehi.model.vo.TallerVO;
import es.juntadeandalucia.cpai.svehi.model.vo.ServicioTallerVO;
import es.juntadeandalucia.cpai.svehi.repository.TallerRepository;
import es.juntadeandalucia.cpai.svehi.repository.ServicioTallerRepository;
import es.juntadeandalucia.cpai.svehi.service.TallerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TallerServiceImpl implements TallerService {

    private final TallerRepository tallerRepository;
    private final ServicioTallerRepository servicioTallerRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional(readOnly = true)
    public List<TallerVO> findAll() {
        return tallerRepository.findAll().stream()
                .map(e -> modelMapper.map(e, TallerVO.class))
                .collect(Collectors.toList());
    }

    @Override
    public TallerVO create(TallerVO vo) {
        Taller entity = modelMapper.map(vo, Taller.class);
        entity.setId(null);
        return modelMapper.map(tallerRepository.save(entity), TallerVO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServicioTallerVO> findServiciosByTaller(Long tallerId) {
        return servicioTallerRepository.findByTallerId(tallerId).stream()
                .map(e -> modelMapper.map(e, ServicioTallerVO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void addServicio(Long tallerId, ServicioTallerVO vo) {
        Taller taller = tallerRepository.findById(tallerId)
                .orElseThrow(() -> new EntityNotFoundException("Taller no encontrado: " + tallerId));
        ServicioTaller entity = modelMapper.map(vo, ServicioTaller.class);
        entity.setId(null);
        entity.setTaller(taller);
        servicioTallerRepository.save(entity);
    }
}
