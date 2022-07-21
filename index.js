const { Web3Provider } = require("@ethersproject/providers");
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair._secretKey

const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`Wallet Balance is ${parseFloat(walletBalance) / LAMPORTS_PER_SOL} SOL`)
    } catch(err) {
        console.error(err)
    }
}

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        const latestBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: fromAirDropSignature,
        });
    } catch(err) {
        console.log(err)
    }
}
const main = async () => {
   
    await airDropSol()
    await getWalletBalance()
    
}
main()