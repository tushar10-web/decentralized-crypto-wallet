package com.wallet.cyptowallet.model;

public class VerifyRequest {
    private String address;
    private String message;
    private String signature;
    public String getAddress() {
        return address;
    }
    public String getMessage() {
        return message;
    }
    public String getSignature() {
        return signature;
    }
}
