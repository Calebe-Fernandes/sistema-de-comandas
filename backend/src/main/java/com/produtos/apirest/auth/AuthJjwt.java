package com.produtos.apirest.auth;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import com.produtos.apirest.exceptions.ApiRequestException;
import com.produtos.apirest.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;

public class AuthJjwt {
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
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            throw new ApiRequestException("Não foi enviado Auth");
        }

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
}
