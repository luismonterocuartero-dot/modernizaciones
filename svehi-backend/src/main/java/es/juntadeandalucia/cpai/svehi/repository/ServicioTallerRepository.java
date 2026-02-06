package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.ServicioTaller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServicioTallerRepository extends JpaRepository<ServicioTaller, Long> {
    List<ServicioTaller> findByTallerId(Long tallerId);
}
