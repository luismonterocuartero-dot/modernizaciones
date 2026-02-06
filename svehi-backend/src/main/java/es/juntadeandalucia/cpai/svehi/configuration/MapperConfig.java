package es.juntadeandalucia.cpai.svehi.configuration;

import es.juntadeandalucia.cpai.svehi.domain.Usuario;
import es.juntadeandalucia.cpai.svehi.model.vo.UsuarioVO;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);

        // Mapping for Usuario -> UsuarioVO
        modelMapper.typeMap(Usuario.class, UsuarioVO.class).addMappings(mapper -> {
            mapper.map(src -> src.getPerfil().getId(), UsuarioVO::setPerfilId);
        });

        // Mapping for UsuarioVO -> Usuario
        modelMapper.typeMap(UsuarioVO.class, Usuario.class).addMappings(mapper -> {
            mapper.map(UsuarioVO::getPerfilId, (dest, v) -> dest.getPerfil().setId((Long) v));
        });

        return modelMapper;
    }
}
