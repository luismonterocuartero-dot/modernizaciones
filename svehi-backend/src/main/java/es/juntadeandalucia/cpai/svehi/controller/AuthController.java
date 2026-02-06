package es.juntadeandalucia.cpai.svehi.controller;

import es.juntadeandalucia.cpai.svehi.api.AuthApiDelegate;
import es.juntadeandalucia.cpai.svehi.model.vo.LoginRequestVO;
import es.juntadeandalucia.cpai.svehi.model.vo.UsuarioVO;
import es.juntadeandalucia.cpai.svehi.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthController implements AuthApiDelegate {

    private final AuthService authService;

    @Override
    public ResponseEntity<UsuarioVO> login(LoginRequestVO loginRequestVO) {
        try {
            return ResponseEntity.ok(authService.login(loginRequestVO));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).build();
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @Override
    public ResponseEntity<UsuarioVO> loginWithCertificate(
            es.juntadeandalucia.cpai.svehi.model.vo.LoginCertificateRequestVO request) {
        try {
            return ResponseEntity.ok(authService.loginWithCertificate(request.getNif()));
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}
