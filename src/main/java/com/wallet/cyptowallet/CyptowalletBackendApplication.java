package com.wallet.cyptowallet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CyptowalletBackendApplication {

    public static void main(String[] args) {

        System.setProperty(
                "spring.data.mongodb.uri",
                "mongodb+srv://devyadav8487_db_user:Tushar123@cluster0.sskkgq9.mongodb.net/cryptowallet?retryWrites=true&w=majority&appName=Cluster0"
        );

        SpringApplication.run(
                CyptowalletBackendApplication.class,
                args
        );
    }
}