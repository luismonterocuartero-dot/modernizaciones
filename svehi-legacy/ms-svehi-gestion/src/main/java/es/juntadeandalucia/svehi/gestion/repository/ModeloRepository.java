package es.juntadeandalucia.svehi.gestion.repository;

import es.juntadeandalucia.svehi.gestion.domain.ModeloEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ModeloRepository extends JpaRepository<ModeloEntity, Long> {
    List<ModeloEntity> findByMarcaId(Long marcaId);
}
