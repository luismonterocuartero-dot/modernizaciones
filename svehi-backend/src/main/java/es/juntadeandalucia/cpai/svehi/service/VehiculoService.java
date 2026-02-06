package es.juntadeandalucia.cpai.svehi.service;

import es.juntadeandalucia.cpai.svehi.model.vo.PageVehiculoVO;
import es.juntadeandalucia.cpai.svehi.model.vo.VehiculoVO;
import es.juntadeandalucia.cpai.svehi.model.vo.MatriculaVO;
import es.juntadeandalucia.cpai.svehi.model.vo.EquipamientoVO;
import es.juntadeandalucia.cpai.svehi.model.vo.MantenimientoVO;
import es.juntadeandalucia.cpai.svehi.model.vo.CesionVO;
import es.juntadeandalucia.cpai.svehi.model.vo.RepostajeVO;
import es.juntadeandalucia.cpai.svehi.model.vo.SiniestroVO;
import es.juntadeandalucia.cpai.svehi.model.vo.PolizaVO;
import es.juntadeandalucia.cpai.svehi.model.vo.ItvVO;
import es.juntadeandalucia.cpai.svehi.model.vo.InfraccionVO;
import java.util.List;

public interface VehiculoService {
    PageVehiculoVO findByFilters(String matricula, Long marcaId, int page, int size);

    VehiculoVO create(VehiculoVO vo);

    // Sub-recursos
    List<MatriculaVO> getMatriculas(Long vehiculoId);

    void addMatricula(Long vehiculoId, MatriculaVO vo);

    List<EquipamientoVO> getEquipamiento(Long vehiculoId);

    void addEquipamiento(Long vehiculoId, EquipamientoVO vo);

    List<MantenimientoVO> getMantenimientos(Long vehiculoId);

    void addMantenimiento(Long vehiculoId, MantenimientoVO vo);

    List<CesionVO> getCesiones(Long vehiculoId);

    void addCesion(Long vehiculoId, CesionVO vo);

    List<RepostajeVO> getRepostajes(Long vehiculoId);

    void addRepostaje(Long vehiculoId, RepostajeVO vo);

    List<SiniestroVO> getSiniestros(Long vehiculoId);

    void addSiniestro(Long vehiculoId, SiniestroVO vo);

    List<PolizaVO> getPolizas(Long vehiculoId);

    void addPoliza(Long vehiculoId, PolizaVO vo);

    List<ItvVO> getItvs(Long vehiculoId);

    void addItv(Long vehiculoId, ItvVO vo);

    List<InfraccionVO> getInfracciones(Long vehiculoId);

    void addInfraccion(Long vehiculoId, InfraccionVO vo);
}
