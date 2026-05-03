package com.wallet.cyptowallet.model;

public class WalletResponse {
    private String address;
    private String publicKey;
    private String privateKey;
    public WalletResponse(String address, String publicKey) {
        this.address = address;
        this.publicKey = publicKey;
        this.privateKey=privateKey;
    }

    public String getAddress() {
        return address;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public String getPrivateKey() {
        return privateKey;
    }
}

