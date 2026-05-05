package com.wallet.cyptowallet.model;

public class WalletResponse {

    private String publicKey;

    private String address;

    private String privateKey;

    public WalletResponse(
            String publicKey,
            String address,
            String privateKey
    ) {
        this.publicKey = publicKey;
        this.address = address;
        this.privateKey = privateKey;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public String getAddress() {
        return address;
    }

    public String getPrivateKey() {
        return privateKey;
    }
}