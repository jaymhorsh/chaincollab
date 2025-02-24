import Image from 'next/image';
import Chainfren_Logo from '../../public/assets/images/chainfren_logo.svg';
import { FaBars, FaSpinner } from 'react-icons/fa6';
import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BsShieldLock } from 'react-icons/bs';
import { MdOutlineLogout } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { useLinkAccount, useLogout, usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { FaRegUserCircle, FaWallet, FaGoogle, FaDiscord, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { toast } from 'sonner';
import { ethers } from 'ethers';
import TransactionFlow from './TransactionFlow';
// import Link from 'next/link';

const Header = () => {
  const navigate = useRouter();
  const { linkWallet, linkEmail, linkApple, linkDiscord, user, ready, linkGithub, linkGoogle, linkPhone, linkTwitter } =
    usePrivy();
  const { wallets } = useWallets();
  const [selectedLink, setSelectedLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState<string>('');
  const [embeddedWallet, setEmbeddedWallet] = useState<any>(null);
  useEffect(() => {
    if (!ready) {
      return;
    } else {
      setUp();
    }
    async function setUp() {
      const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
      if (embeddedWallet) {
        const provider = await embeddedWallet.getEthereumProvider();
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${Number(11155111).toString(16)}` }],
        });
        const ethProvider = new ethers.providers.Web3Provider(provider);
        const walletBalance = await ethProvider.getBalance(embeddedWallet.address);
        const ethStringAmount = ethers.utils.formatEther(walletBalance);
        setWalletBalance(ethStringAmount);
        setEmbeddedWallet(embeddedWallet);
      }
    }
  }, [ready, wallets]);
  const linkOptions = [
    { label: 'Email', action: linkEmail },
    { label: 'Wallet', action: linkWallet },
    { label: 'Apple', action: linkApple },
    { label: 'Discord', action: linkDiscord },
    { label: 'Github', action: linkGithub },
    { label: 'Google', action: linkGoogle },
    { label: 'Phone', action: linkPhone },
    { label: 'Twitter', action: linkTwitter },
  ];

  const handleLinkClick = async () => {
    const selected = linkOptions.find((option) => option.label === selectedLink);
    if (selected) {
      setIsLoading(true);
      try {
        selected.action();
        // toast.success(``);
      } catch (error: any) {
        toast.error(error.message || `Failed to link ${selectedLink}`);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const { logout: handleLogout } = useLogout({
    onSuccess: () => {
      toast.success('Successfully logged out');
      navigate.push('/');
    },
  });

  const {} = useLinkAccount({
    onSuccess: ({ user, linkMethod, linkedAccount }) => {
      toast.success(`Successfully linked ${linkMethod}`);
    },
    onError: (error) => {
      toast.error(error.toUpperCase());
    },
  });

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto py-4 border border-[#DFE0E1] bg-white px-4 sm:px-6 lg:px-10 flex justify-between items-center">
        <div className="text-lg font-black text-black-primary-text">
          <Image src={Chainfren_Logo} alt={'header_Logo'} />
        </div>
        {/* Avatar */}
        <div className=" flex items-center gap-2">
          <div className="text-sm  font-semibold">
            <span className="text-main-blue text-base">Wallet Address:</span> {user?.wallet?.address}
          </div>

          <div className="flex items-center gap-4">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="flex items-center gap-2">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Avatar.Root className="inline-flex cursor-pointer size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
                        <Avatar.Image
                          className="size-full rounded-[inherit] object-cover"
                          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                          alt="Moshood"
                        />
                        <Avatar.Fallback
                          className="leading-1 flex size-full rounded-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
                          delayMs={600}
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 35 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_85_301)">
                              <circle cx="17.5" cy="17.5" r="15.5" fill="#3351FF" />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M31 33.4445C31 26.817 25.6274 21.4445 19 21.4445C12.3726 21.4445 7 26.817 7 33.4445H31Z"
                                fill="white"
                              />

                              <rect
                                x="9.55884"
                                y="9.68384"
                                width="14"
                                height="10"
                                rx="1.6"
                                transform="rotate(-5.42238 9.55884 9.68384)"
                                fill="white"
                              />
                            </g>
                            <rect x="1" y="1" width="33" height="33" rx="16.5" stroke="black" strokeWidth="2" />
                            <defs>
                              <clipPath id="clip0_85_301">
                                <rect x="2" y="2" width="31" height="31" rx="15.5" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </Avatar.Fallback>
                      </Avatar.Root>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-[264px] rounded-md mr-2 z-10 bg-white p-4 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                        sideOffset={5}
                      >
                        <DropdownMenu.Item
                          className="group cursor-pointer px-3 relative flex gap-4 py-3 select-none items-center rounded-[3px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                          // onClick={() => navigate.replace('#')}
                        >
                          <FaRegUserCircle className="text-lg text-black-primary-text" />
                          <p className="text-black-primary-text font-medium text-sm">Profile</p>
                        </DropdownMenu.Item>

                        <hr className="my-3 border-[1px] border-border-color " />
                        <DropdownMenu.Item
                          className="group cursor-pointer px-3 relative flex gap-4 py-2 select-none items-center rounded-[3px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                          onClick={handleLogout}
                        >
                          <MdOutlineLogout className="text-xl text-red-600" />
                          <p className="text-red-600 font-medium ">Logout</p>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 animate-fade-in " />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 overflow-y-scroll max-h-[80vh] -translate-y-1/2 bg-white rounded-xl p-6 w-[90vw] max-w-[850px] shadow-lg animate-content-show">
                  <div className="space-y-6  pb-6">
                    <Dialog.Title className="text-2xl font-semibold border-b pb-4">Profile Details</Dialog.Title>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex flex-col col-span-3 sm:flex-col gap-4 w-full">
                        <div className="text-sm font-semibold w-full sm:w-1/2 textcenter">
                          <span className="text-main-blue text-base">Wallet Balance:</span>{' '}
                          {`${walletBalance && walletBalance} ${' '} ${'ETH'}`}
                        </div>
                        <div className="flex items-cente gap-2">
                          <div className="text-sm font-semibold w-full sm:w-1/2 ">
                            <span className="text-main-blue text-base">Wallet Address:</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={embeddedWallet?.address}
                                readOnly
                                className="border font-inter font-normal rounded-lg px-4 py-2 w-full"
                              />
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(embeddedWallet?.address || '');
                                  toast.success('Copied to clipboard');
                                }}
                                className="px-2 py-1 bg-main-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                              >
                                Copy
                              </button>
                            </div>
                          </div>
                          <div className=" flex-1 items-center justify-center">
                            <TransactionFlow />
                          </div>
                        </div>
                      </div>
                      {/* User ID Card */}
                      <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                          <FaRegUserCircle className="text-2xl text-main-blue" />
                          <label className="font-medium text-gray-700">User ID</label>
                        </div>
                        <p className="text-sm break-all text-gray-600">{user?.id}</p>
                      </div>

                      {/* Wallet Card */}
                      <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                          <FaWallet className="text-2xl text-main-blue" />
                          <label className="font-medium text-gray-700">Wallet Address</label>
                        </div>
                        <p className="text-sm break-all text-gray-600">{user?.wallet?.address || 'Not connected'}</p>
                      </div>

                      {/* Email Card */}
                      <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                          <MdEmail className="text-2xl text-main-blue" />
                          <label className="font-medium text-gray-700">Email</label>
                        </div>
                        <p className="text-sm break-all text-gray-600">{user?.email?.address || 'Not connected'}</p>
                      </div>

                      {/* Google Card */}
                      <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                          <FaGoogle className="text-2xl text-main-blue" />
                          <label className="font-medium text-gray-700">Google</label>
                        </div>
                        <p className="text-sm break-all text-gray-600">{user?.google?.email || 'Not connected'}</p>
                      </div>

                      {/* Discord Card */}
                      <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                          <FaDiscord className="text-2xl text-main-blue" />
                          <label className="font-medium text-gray-700">Discord</label>
                        </div>
                        <p className="text-sm break-all text-gray-600">{user?.discord?.username || 'Not connected'}</p>
                      </div>
                      {/* Send Transaction */}

                      {/* Twitter Card */}
                      <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                          <FaTwitter className="text-2xl text-main-blue" />
                          <label className="font-medium text-gray-700">Twitter</label>
                        </div>
                        <p className="text-sm break-all text-gray-600">{user?.twitter?.username || 'Not connected'}</p>
                      </div>
                    </div>

                    {/* Link New Account Section */}
                    <div className="mt-6 pt-4 border-t">
                      <h3 className="text-lg font-medium mb-4">Link New Account</h3>
                      <div className="flex gap-4 flex-wrap">
                        <select
                          value={selectedLink}
                          onChange={(e) => setSelectedLink(e.target.value)}
                          className="border rounded-lg px-4 py-2 focus:outline-none "
                        >
                          <option>Select an account to link</option>
                          {linkOptions.map((option, index) => (
                            <option key={index} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={handleLinkClick}
                          className="px-6 py-2 bg-main-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          {isLoading ? <FaSpinner className="text-white text-2xl" /> : 'Link Account'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Dialog.Close className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <IoClose className="text-xl" />
                  </Dialog.Close>
                </Dialog.Content>
                <Dialog.Close className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <IoClose className="text-xl" />
                </Dialog.Close>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
        <button className="md:hidden">
          <FaBars className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
