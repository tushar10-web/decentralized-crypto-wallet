package com.wallet.cyptowallet.controller;

import com.wallet.cyptowallet.crypto.WalletGenerator;
import com.wallet.cyptowallet.model.WalletData;
import com.wallet.cyptowallet.model.WalletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WalletController {
    @GetMapping("/wallet/create")
    public WalletResponse createWallet() throws Exception{
        return WalletGenerator.generateWallet();
    }
}
