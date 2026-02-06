package es.juntadeandalucia.cpai.svehi.service;

import es.juntadeandalucia.cpai.svehi.model.vo.LoginRequestVO;
import es.juntadeandalucia.cpai.svehi.model.vo.UsuarioVO;

public interface AuthService {
    UsuarioVO login(LoginRequestVO loginRequest);

    UsuarioVO loginWithCertificate(String nif);
}
