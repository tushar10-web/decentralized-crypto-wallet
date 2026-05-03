package com.wallet.cyptowallet.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private final String SECRET = "wallet-auth-secret";

    public String generateToken(String address){

        return JWT.create()
                .withSubject(address)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis()+86400000))
                .sign(Algorithm.HMAC256(SECRET));
    }
}