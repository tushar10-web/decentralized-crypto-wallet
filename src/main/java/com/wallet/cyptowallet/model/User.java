package com.wallet.cyptowallet.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="users")
public class User {

    @Id
    private String id;

    private String address;

    private String privateKey;

    public User() {
    }

    // OLD CONSTRUCTOR
    public User(String address) {
        this.address = address;
    }

    // NEW CONSTRUCTOR
    public User(String address, String privateKey) {
        this.address = address;
        this.privateKey = privateKey;
    }

    public String getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public String getPrivateKey() {
        return privateKey;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPrivateKey(String privateKey) {
        this.privateKey = privateKey;
    }
}