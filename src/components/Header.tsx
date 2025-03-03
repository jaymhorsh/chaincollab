import Image from 'next/image';
import Chainfren_Logo from '../../public/assets/images/chainfren_logo.svg';
import { FaBars, FaSpinner, FaWallet, FaRegUserCircle, FaGoogle, FaDiscord, FaTwitter } from 'react-icons/fa';
import { BsShieldLock } from 'react-icons/bs';
import { MdOutlineLogout, MdEmail } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import * as Avatar from '@radix-ui/react-avatar';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useLinkAccount, useLogout, usePrivy, useWallets } from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth/solana';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ethers } from 'ethers';
import TransactionFlow from './TransactionFlow';
import { useEthBalance } from '@/app/providers';

const Header = () => {
  const navigate = useRouter();
  const { user, ready } = usePrivy();
  const { wallets } = useWallets();
  const { chainName } = useEthBalance();
  const { createWallet } = useSolanaWallets();

  const [walletBalance, setWalletBalance] = useState<string>('');
  const [embeddedWallet, setEmbeddedWallet] = useState<any>(null);
  const [solanaWallet, setSolanaWallet] = useState<any>(null);

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
        const ethProvider = new ethers.providers.Web3Provider(provider);
        const balance = await ethProvider.getBalance(embeddedWallet.address);
        const ethStringAmount = ethers.utils.formatEther(balance);
        setWalletBalance(ethStringAmount);
        setEmbeddedWallet(embeddedWallet);
      }
    }
  }, [ready, wallets]);

  const { logout: handleLogout } = useLogout({
    onSuccess: () => {
      toast.success('Successfully logged out');
      navigate.push('/');
    },
  });

  // Handler for creating the Solana wallet.
  const handleCreateSolanaWallet = async () => {
    if (!user) {
      toast.error('Please login first');
      return;
    }
    try {
      const wallet = await createWallet();
      setSolanaWallet(wallet);
      toast.success('Solana wallet created successfully', {
        description: 'Your Solana wallet has been created.',
      });
    } catch (error) {
      toast.error('Failed to create Solana wallet');
    }
  };

  const host = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto py-4 border border-[#DFE0E1] bg-white px-4 sm:px-6 lg:px-10 flex justify-between items-center">
        <div className="text-lg font-black text-black-primary-text">
          <Image src={Chainfren_Logo} alt="Chainfren Logo" />
        </div>
        {/* Wallet Dropdown and Profile Avatar */}
        <div className="flex items-center gap-2">
          {/* Wallet Addresses Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-main-blue text-base">Wallet Addresses</span>
                <FaWallet className="h-5 w-5" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="min-w-[264px] rounded-md bg-white p-4 shadow-lg" sideOffset={5}>
                <div className="flex flex-col gap-2">
                  <div className="text-sm">
                    <span className="font-bold">EVM:</span> {user?.wallet?.address || 'Not connected'}
                  </div>
                  {solanaWallet ? (
                    <div className="text-sm">
                      <span className="font-bold">Solana:</span> {solanaWallet.address}
                    </div>
                  ) : (
                    <button onClick={handleCreateSolanaWallet} className="text-xs text-blue-600 underline">
                      Create Solana Wallet
                    </button>
                  )}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {/* Existing Profile Info */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="flex items-center gap-2">
                <Avatar.Root className="inline-flex cursor-pointer size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1">
                  <Avatar.Image
                    className="size-full rounded-[inherit] object-cover"
                    src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                    alt="Profile Image"
                  />
                  <Avatar.Fallback
                    className="leading-1 flex size-full rounded-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
                    delayMs={600}
                  >
                    <FaRegUserCircle className="h-6 w-6" />
                  </Avatar.Fallback>
                </Avatar.Root>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/80 animate-fade-in" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 overflow-y-scroll max-h-[80vh] -translate-y-1/2 bg-white rounded-xl p-6 w-[90vw] max-w-[850px] shadow-lg animate-content-show">
                <div className="space-y-6 pb-6">
                  <Dialog.Title className="text-2xl font-semibold border-b pb-4">Profile Details</Dialog.Title>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col col-span-3 gap-4">
                      <div className="text-sm font-semibold">
                        <span className="text-main-blue text-base">Wallet Balance:</span>{' '}
                        {walletBalance ? `${walletBalance} ETH` : 'N/A'}
                      </div>
                      <div className="text-sm font-semibold">
                        <span className="text-main-blue text-base">Chain Type:</span> {chainName}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold w-full">
                          <span className="text-main-blue text-base">Wallet Address:</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={embeddedWallet?.address || ''}
                              readOnly
                              className="border font-inter rounded-lg px-4 py-2 w-full"
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
                      </div>
                    </div>

                    {/* Additional Cards */}
                    <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 mb-2">
                        <FaRegUserCircle className="text-2xl text-main-blue" />
                        <label className="font-medium text-gray-700">User ID</label>
                      </div>
                      <p className="text-sm break-all text-gray-600">{user?.id}</p>
                    </div>

                    <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 mb-2">
                        <FaWallet className="text-2xl text-main-blue" />
                        <label className="font-medium text-gray-700">Wallet Address</label>
                      </div>
                      <p className="text-sm break-all text-gray-600">{user?.wallet?.address || 'Not connected'}</p>
                    </div>

                    <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 mb-2">
                        <MdEmail className="text-2xl text-main-blue" />
                        <label className="font-medium text-gray-700">Email</label>
                      </div>
                      <p className="text-sm break-all text-gray-600">{user?.email?.address || 'Not connected'}</p>
                    </div>

                    <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 mb-2">
                        <FaGoogle className="text-2xl text-main-blue" />
                        <label className="font-medium text-gray-700">Google</label>
                      </div>
                      <p className="text-sm break-all text-gray-600">{user?.google?.email || 'Not connected'}</p>
                    </div>

                    <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 mb-2">
                        <FaDiscord className="text-2xl text-main-blue" />
                        <label className="font-medium text-gray-700">Discord</label>
                      </div>
                      <p className="text-sm break-all text-gray-600">{user?.discord?.username || 'Not connected'}</p>
                    </div>

                    <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 mb-2">
                        <FaTwitter className="text-2xl text-main-blue" />
                        <label className="font-medium text-gray-700">Twitter</label>
                      </div>
                      <p className="text-sm break-all text-gray-600">{user?.twitter?.username || 'Not connected'}</p>
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
        <button className="md:hidden">
          <FaBars className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
