package com.wallet.cyptowallet.controller;

import com.wallet.cyptowallet.crypto.WalletGenerator;
import com.wallet.cyptowallet.model.User;
import com.wallet.cyptowallet.model.WalletResponse;
import com.wallet.cyptowallet.repository.RepositoryUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "*")
@RestController
public class WalletController {

    @Autowired
    private RepositoryUser userRepository;

    @GetMapping("/wallet/create")
    public WalletResponse createWallet() throws Exception {

        WalletResponse wallet =
                WalletGenerator.generateWallet();

        userRepository.save(
                new User(
                        wallet.getAddress(),
                        wallet.getPrivateKey()
                )
        );

        return wallet;
    }
}