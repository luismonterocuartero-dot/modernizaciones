package es.juntadeandalucia.cpai.svehi.service.impl;

import es.juntadeandalucia.cpai.svehi.model.vo.MarcaVO;
import es.juntadeandalucia.cpai.svehi.model.vo.PerfilVO;
import es.juntadeandalucia.cpai.svehi.repository.MarcaRepository;
import es.juntadeandalucia.cpai.svehi.repository.PerfilRepository;
import es.juntadeandalucia.cpai.svehi.service.MaestrosService;
import es.juntadeandalucia.cpai.svehi.service.mapper.MarcaMapper;
import es.juntadeandalucia.cpai.svehi.service.mapper.PerfilMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MaestrosServiceImpl implements MaestrosService {

    private final MarcaRepository marcaRepository;
    private final PerfilRepository perfilRepository;
    private final MarcaMapper marcaMapper;
    private final PerfilMapper perfilMapper;

    @Override
    public List<MarcaVO> getMarcas() {
        log.info("Obteniendo todas las marcas");
        return marcaRepository.findAll().stream()
                .map(marcaMapper::toVO)
                .toList();
    }

    @Override
    public List<PerfilVO> getPerfiles() {
        log.info("Obteniendo todos los perfiles");
        return perfilRepository.findAll().stream()
                .map(perfilMapper::toVO)
                .toList();
    }
}
