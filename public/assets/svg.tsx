import Image from "next/image";
import metamaskSrc from "./images/metamask.png";
import phantomSrc from "./images/phantom.png";
import roninSrc from "./images/ronin.png";
import okxwalletSrc from "./images/okxwallet.png";

// Create responsive Image components for each image
const MetamaskImage = () => (
  <Image
    src={metamaskSrc}
    alt="Metamask"
    width={16}
    height={16}
    // sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
  />
);

const PhantomImage = () => (
  <Image
    src={phantomSrc}
    alt="Phantom"
    
    width={16}
    height={16}
    // sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
  />
);

const RoninImage = () => (
  <Image
    src={roninSrc}
    alt="Ronin"
    // layout="responsive"
    width={16}
    height={16}
    // sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
  />
);

const OkxwalletImage = () => (
  <Image
    src={okxwalletSrc}
    alt="OKX Wallet"
    // layout="responsive"
    width={16}
    height={16}
    // sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
  />
);

// Export the Image components for usage
export { MetamaskImage, PhantomImage, RoninImage, OkxwalletImage };
