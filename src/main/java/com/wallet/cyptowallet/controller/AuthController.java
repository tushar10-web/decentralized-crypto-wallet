package com.wallet.cyptowallet.controller;
import com.wallet.cyptowallet.model.User;
import com.wallet.cyptowallet.service.JwtService;
import com.wallet.cyptowallet.repository.RepositoryUser;
import org.springframework.beans.factory.annotation.Autowired;
import com.wallet.cyptowallet.crypto.ChallengeGenerator;
import com.wallet.cyptowallet.crypto.SignatureUtil;
import com.wallet.cyptowallet.model.AuthChallenge;
import com.wallet.cyptowallet.model.VerifyRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "*")
@RestController
public class AuthController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private RepositoryUser userRepository;
    private static final java.util.Map<String,String> challengeStore=new java.util.HashMap<>();
    @GetMapping("/auth/challenge")

    public String getChallenge(@RequestParam String address){
        String challenge = ChallengeGenerator.generateChallenge();
        challengeStore.put(address, challenge);
        return challenge;
    }
    @GetMapping("/auth/sign")
    public String sign(
            @RequestParam String address,
            @RequestParam String message
    ) {

        User user = userRepository
                .findByAddress(address)
                .orElse(null);

        if(user == null){
            return "USER NOT FOUND";
        }

        return SignatureUtil.signMessage(
                message,
                user.getPrivateKey()
        );
    }
    @PostMapping("/auth/verify")
    public String verify(@RequestBody VerifyRequest request){

        String storedChallenge=challengeStore.get(request.getAddress());
        if(storedChallenge==null)return "NO CHALLENGE";
        if(!storedChallenge.equals(request.getMessage())){
            return "INVALID MESSAGE";
        }
        boolean isValid=SignatureUtil.verifySignature(
                storedChallenge,
                request.getSignature(),
                request.getAddress()
        );

        if(isValid){

            challengeStore.remove(request.getAddress());

            User user = userRepository.findByAddress(request.getAddress())
                    .orElseGet(() -> userRepository.save(new User(request.getAddress())));

            String token = jwtService.generateToken(request.getAddress());

            return "VALID";
        }else{
            return "INVALID";
        }
    }
    @GetMapping("/auth/test-sign")
    public String testSign(@RequestParam String message){
        System.out.println("Signing Message: "+message);
        String privateKey="af6a7859a3eca64f9b349b5fff87c784576d9cced16c3d56e67bb2209c1a41c2";
        return SignatureUtil.signMessage(message,privateKey);
    }
    @GetMapping("/debug/address")
    public String debugAddress(){
        java.math.BigInteger pk=new java.math.BigInteger("af6a7859a3eca64f9b349b5fff87c784576d9cced16c3d56e67bb2209c1a41c2",16);
        org.web3j.crypto.ECKeyPair kp=org.web3j.crypto.ECKeyPair.create(pk);
        String derived="0x"+org.web3j.crypto.Keys.getAddress(kp.getPublicKey());
        return derived;
    }
}
