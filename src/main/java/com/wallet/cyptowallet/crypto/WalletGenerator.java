package com.wallet.cyptowallet.crypto;

import com.wallet.cyptowallet.model.WalletData;
import com.wallet.cyptowallet.model.WalletResponse;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.Keys;

import java.security.SecureRandom;

public class WalletGenerator {
    public static WalletResponse generateWallet() throws Exception{
        // Generate Secure private key

        SecureRandom secureRandom=new SecureRandom();
        ECKeyPair keyPair= Keys.createEcKeyPair(secureRandom);

        // create credentials

        Credentials credentials=Credentials.create(keyPair);

        // extract wallet details

        String publicKey=keyPair.getPublicKey().toString(16);
        String address=credentials.getAddress();
        return new WalletResponse(address,publicKey);

    }
}
