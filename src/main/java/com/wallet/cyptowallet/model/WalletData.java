package com.wallet.cyptowallet.model;

public class WalletData {
  //  private String privateKey;
    private String publicKey;
    private String address;
    public WalletData( String publicKey, String address) {
      //  this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.address = address;
    }
//    public String getPrivateKey() {
//        return privateKey;
//    }
    public String getPublicKey() {
        return publicKey;
    }

    public String getAddress() {
        return address;
    }
}
