package com.wallet.cyptowallet.model;

public class WalletResponse {
    private String address;
    private String publicKey;
    public WalletResponse(String address,String publicKey){
        this.address=address;
        this.publicKey=publicKey;
    }

    public String getAddress() {
        return address;
    }

    public String getPublicKey() {
        return publicKey;
    }
}
