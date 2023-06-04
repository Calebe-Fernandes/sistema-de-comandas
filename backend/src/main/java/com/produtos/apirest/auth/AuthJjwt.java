package com.produtos.apirest.auth;

import java.security.Key;
import java.util.Date;
import java.util.List;

import javax.crypto.spec.SecretKeySpec;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.repository.UserRepository;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;

public class AuthJjwt {
    private static UserRepository userRepository;
    private static Key AuthKey = new SecretKeySpec("tokenKEY12345678910tokenKEY12345678910".getBytes(),
            SignatureAlgorithm.HS256.getJcaName());

    private static JwtParser tokenParser = Jwts.parserBuilder().setSigningKey(AuthKey).build();

    public static String generateToken(long userId) {
        // expiration time for the token (1 day = 1000(ms) * 60(s) * 60(min) * 24(h))
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24);

        String token = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setExpiration(expiration)
                .signWith(AuthKey)
                .compact();

        return token;
    }

    public static void tokenAuth(String bearerToken) {
        if (bearerToken == null || !bearerToken.startsWith("Bearer "))
            throw new ApiRequestException("Não foi enviado Auth corretamente");

        try {
            // Validate and parse the token
            tokenParser.parseClaimsJws(bearerToken.substring(7));
        } catch (ExpiredJwtException exp) {
            throw new ApiRequestException("Token expired");
        } catch (MalformedJwtException inv) {
            throw new ApiRequestException("Invalid token:");
        } catch (Exception e) {
            throw new ApiRequestException("Error while processing token");
        }
    }

    public static <T> void tokenAuth(String bearerToken, T roles) {
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            throw new ApiRequestException("Não foi enviado Auth");
        }
    
        try {
            // Validate, parse the token and get the userId
            long userId = Integer.parseInt(tokenParser.parseClaimsJws(bearerToken.substring(7)).getBody().getSubject());
            String userRole = userRepository.findById(userId).getRole();
    
            if (roles instanceof List<?> && ((List<?>) roles).get(0) instanceof String) {
                List<String> roleList = (List<String>) roles;
                if (!roleList.contains(userRole))
                    throw new ApiRequestException("Usuário não tem permissão");
            } else if (roles instanceof String) {
                String role = (String) roles;
                if (!role.equals(userRole))
                    throw new ApiRequestException("Usuário não tem permissão");
            } else {
                throw new IllegalArgumentException("Tipo de parâmetro inválido para as permissões.");
            }
        } catch (ExpiredJwtException e) {
            throw new ApiRequestException("Token expirou");
        } catch (MalformedJwtException m) {
            throw new ApiRequestException("Token inválido");
        } catch (Exception e) {
            throw new ApiRequestException("Erro no token: \n" + e.getMessage());
        }
    }

    public static <T> long tokenAuth(String bearerToken, T roles, boolean getUserId) {
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            throw new ApiRequestException("Não foi enviado Auth");
        }
    
        try {
            // Validate, parse the token and get the userId
            long userId = Integer.parseInt(tokenParser.parseClaimsJws(bearerToken.substring(7)).getBody().getSubject());
            String userRole = userRepository.findById(userId).getRole();
    
            if (roles instanceof List<?> && ((List<?>) roles).get(0) instanceof String) {
                List<String> roleList = (List<String>) roles;
                if (!roleList.contains(userRole))
                    throw new ApiRequestException("Usuário não tem permissão");
                else {
                    return userId;
                }
            } else if (roles instanceof String) {
                String role = (String) roles;
                if (!role.equals(userRole))
                    throw new ApiRequestException("Usuário não tem permissão");
                else {
                    return userId;
                }
            } else {
                throw new IllegalArgumentException("Tipo de parâmetro inválido para as permissões.");
            }
        } catch (ExpiredJwtException e) {
            throw new ApiRequestException("Token expirou");
        } catch (MalformedJwtException m) {
            throw new ApiRequestException("Token inválido");
        } catch (Exception e) {
            throw new ApiRequestException("Erro no token: \n" + e.getMessage());
        }
    }
}
