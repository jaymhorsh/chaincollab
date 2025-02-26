// 'use client';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Avatar from '@/assets/Avatar.png'; // Update the path to your avatar image
// import Header from '@/components/Header';
// import { usePrivy } from '@privy-io/react-auth';
// // import { Eye, EyeOff } from 'lucide-react';

// const Settings: React.FC = () => {
//   // const [formData, setFormData] = useState({
//   //   username: 'Bolaji Majekodunmi',
//   //   email: 'bolajimajekodunmi@gmail.com',
//   //   password: '',
//   //   newPassword: '',
//   //   confirmPassword: '',
//   // });

//   // const [editField, setEditField] = useState<string | null>(null);
//   // const [showPassword, setShowPassword] = useState(false);
//   // const [showNewPassword, setShowNewPassword] = useState(false);
//   // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prevData) => ({
//   //     ...prevData,
//   //     [name]: value,
//   //   }));
//   // };

//   // const handleEdit = (field: string) => {
//   //   setEditField(field);
//   // };

//   // const handleSave = (field: string) => {
//   //   setEditField(null);
//   //   // Logic to save changes for the specified field
//   // };



// const UnlinkAccounts: React.FC = () => {
//   const {
//     user,
//     authenticated,
//     ready,
//     unlinkApple,
//     unlinkDiscord,
//     unlinkEmail,
//     unlinkFarcaster,
//     unlinkGithub,
//     unlinkGoogle,
//     unlinkInstagram,
//     // unlinkLinkedin,
//     unlinkPasskey,
//     unlinkPhone,
//     unlinkSpotify,
//     unlinkTiktok,
//     unlinkTwitter,
//     unlinkWallet,
//   } = usePrivy();

//   // Define the accounts you might want to unlink.
//   // Adjust the property accessors based on your actual user object shape.
//   const accounts = [
//     { name: 'Email', value: user?.email?.address, unlink: unlinkEmail },
//     { name: 'Google', value: user?.google?.address, unlink: unlinkGoogle },
//     { name: 'Apple', value: user?.apple?.id, unlink: unlinkApple },
//     { name: 'Discord', value: user?.discord?.id, unlink: unlinkDiscord },
//     { name: 'Farcaster', value: user?.farcaster?.username, unlink: unlinkFarcaster },
//     { name: 'Github', value: user?.github?.username, unlink: unlinkGithub },
//     { name: 'Instagram', value: user?.instagram?.username, unlink: unlinkInstagram },
//     { name: 'LinkedIn', value: user?.linkedin?.username, unlink: unlinkLinkedin },
//     { name: 'Passkey', value: user?.passkey?.id, unlink: unlinkPasskey },
//     { name: 'Phone', value: user?.phone?.number, unlink: unlinkPhone },
//     { name: 'Spotify', value: user?.spotify?.username, unlink: unlinkSpotify },
//     { name: 'TikTok', value: user?.tiktok?.username, unlink: unlinkTiktok },
//     { name: 'Twitter', value: user?.twitter?.username, unlink: unlinkTwitter },
//     { name: 'Wallet', value: user?.wallet?.address, unlink: unlinkWallet },
//   ];

//   const handleUnlink = async (
//     unlinkMethod: (account: string) => Promise<void>,
//     accountValue: string
//   ) => {
//     try {
//       await unlinkMethod(accountValue);
//       console.log(`${accountValue} unlinked successfully.`);
//       // Optionally, add UI feedback such as a success notification.
//     } catch (error) {
//       console.error(`Error unlinking account:`, error);
//       // Optionally, add UI feedback such as an error notification.
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="m-2 p-5">
//       <div className="m-4">
//       <h2 className="text-lg font-bold mb-4">Linked Accounts</h2>
//       <div className="space-y-4">
//         {accounts.map((account, idx) => (
//           <div
//             key={idx}
//             className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
//           >
//             <div>
//               <p className="font-medium">{account.name}</p>
//               <p className="text-sm text-gray-600">
//                 {account.value ? account.value : 'Not linked'}
//               </p>
//             </div>
//             <button
//               disabled={!ready || !authenticated || !account.value}
//               onClick={() =>
//                 account.value && handleUnlink(account.unlink, account.value)
//               }
//               className="bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
//             >
//               Unlink
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
        
//       </div>
//     </>
//   );
// };

// export default Settings;
// // <div className="p-5">
// {/* <h3 className="text-lg font-bold mb-4">Profile</h3>
// <div className="bg-white p-6 shadow rounded-lg">
//   <div className="flex items-center space-x-4 mb-4">
//     <Image src={Avatar} alt="Avatar" className="rounded-full" />
//     <button className="bg-main-blue text-white px-4 py-2 rounded-md">Change Avatar</button>
//   </div>
//   <div className="flex items-center space-x-2">
//     <input
//       type="text"
//       name="username"
//       value={formData.username}
//       onChange={handleChange}
//       className={`border px-4 py-2 w-full md:w-1/2 outline-none rounded-md border-[#DFE0E1] bg-gray-100 ${editField === 'username' ? '' : 'pointer-events-none'}`}
//       readOnly={editField !== 'username'}
//     />
//     {editField === 'username' ? (
//       <button className="bg-main-blue text-white px-4 py-2 rounded-md" onClick={() => handleSave('username')}>
//         Save Changes
//       </button>
//     ) : (
//       <button className="bg-main-blue text-white px-4 py-2 rounded-md" onClick={() => handleEdit('username')}>
//         Edit
//       </button>
//     )}
//   </div>
// </div>
// </div> */}

// {/* Security Section */}
// {/* <div className="p-5 w-full md:w-[80%]">
// <h3 className="text-lg font-bold mb-4">Security</h3>

// <div className="w-full overflow-hidden rounded-md border shadow-md mb-4 border-[#DFE0E1]">
//   <div className="bg-[#DFE0E166] p-3">
//     <h1 className="block text-black font-bold mb-1">Password</h1>
//   </div>
//   <div className="p-6">
//     <div className="flex flex-col">
//       <label className="text-gray-700">Current Password</label>
//       <div className="relative w-full md:w-1/2">
//         <input
//           type={showPassword ? 'text' : 'password'}
//           name="password"
//           value={formData.password}
//           placeholder="Enter your current password"
//           onChange={handleChange}
//           className="border px-4 py-2 w-full border-[#DFE0E1]  placeholder:text-sm outline-none rounded-md bg-gray-100"
//         />
//         <button
//           type="button"
//           className="absolute inset-y-0 right-0 px-3 flex items-center"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <EyeOff /> : <Eye />}
//         </button>
//       </div>
//     </div>
//     <div className="flex flex-col md:flex-row items-center gap-4 my-6">
//       <div className="flex flex-col w-full md:w-1/2">
//         <label className="text-gray-700">New Password</label>
//         <div className="relative">
//           <input
//             type={showNewPassword ? 'text' : 'password'}
//             name="newPassword"
//             placeholder="New password"
//             value={formData.newPassword}
//             onChange={handleChange}
//             className="border px-4 py-2 w-full border-[#DFE0E1] placeholder:text-sm outline-none rounded-md bg-gray-100"
//           />
//           <button
//             type="button"
//             className="absolute inset-y-0 right-0 px-3 flex items-center"
//             onClick={() => setShowNewPassword(!showNewPassword)}
//           >
//             {showNewPassword ? (
//               <EyeOff className="text-sm text-[#838294]" />
//             ) : (
//               <Eye className="text-sm text-[#838294]" />
//             )}
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-col w-full md:w-1/2">
//         <label className="text-gray-700">Confirm Password</label>
//         <div className="relative">
//           <input
//             type={showConfirmPassword ? 'text' : 'password'}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             placeholder="Re-enter Password"
//             onChange={handleChange}
//             className="border px-4 py-2 w-full border-[#DFE0E1] placeholder:text-sm outline-none rounded-md bg-gray-100"
//           />
//           <button
//             type="button"
//             className="absolute inset-y-0 right-0 px-3 flex items-center"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="text-sm text-[#838294]" />
//             ) : (
//               <Eye className="text-sm text-[#838294]" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//     {formData.newPassword &&
//       formData.confirmPassword &&
//       formData.newPassword === formData.confirmPassword && (
//         <div className="flex space-x-2 mt-4">
//           <button className="bg-main-blue text-white px-4 py-2 rounded-md">Save Changes</button>
//           <button
//             className="bg-gray-500 text-white px-4 py-2 rounded-md"
//             onClick={() => setFormData({ ...formData, newPassword: '', confirmPassword: '' })}
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//   </div>
// </div> */}

// {/* Email */}
// {/* <div className="w-full overflow-hidden rounded-md border shadow-md mb-6 pb-4 border-[#DFE0E1]">
//   <div className="bg-[#DFE0E166] p-3">
//     <h1 className="block text-black font-bold mb-1">Email</h1>
//   </div>
//   <div className="flex items-center p-6">
//     <input
//       type="text"
//       name="email"
//       value={formData.email}
//       onChange={handleChange}
//       className={`border px-4 py-2 w-full md:w-1/2 outline-none border-[#DFE0E1] rounded-md bg-gray-100 ${editField === 'email' ? '' : 'pointer-events-none'}`}
//       readOnly={editField !== 'email'}
//     />
//     {editField === 'email' ? (
//       <button className="bg-main-blue text-white px-4 py-2 rounded-md" onClick={() => handleSave('email')}>
//         Save Changes
//       </button>
//     ) : (
//       <button className="bg-main-blue text-white px-4 py-2 rounded-md" onClick={() => handleEdit('email')}>
//         Edit
//       </button>
//     )}
//   </div>
// </div>
// </div> */}


'use client';
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

interface AccountItem {
  name: string;
  value: string | number | null | undefined;
  // The unlink method can accept either a string or a number.
  unlink: ((account: string) => Promise<any>) | ((account: number) => Promise<any>);
  type: 'string' | 'number';
}

const Settings: React.FC = () => {
  const {
    user,
    authenticated,
    ready,
    unlinkApple,
    unlinkDiscord,
    unlinkEmail,
    unlinkFarcaster,
    unlinkGithub,
    unlinkGoogle,
    unlinkInstagram,
    unlinkPasskey,
    unlinkPhone,
    unlinkSpotify,
    unlinkTiktok,
    unlinkTwitter,
    unlinkWallet,
  } = usePrivy();

  // Define each account item along with the expected type.
  const accounts: AccountItem[] = [
    { name: 'Email', value: user?.email?.address, unlink: unlinkEmail, type: 'string' },
    { name: 'Farcaster', value: user?.farcaster?.username, unlink: unlinkFarcaster, type: 'string' },
    { name: 'Github', value: user?.github?.username, unlink: unlinkGithub, type: 'string' },
    { name: 'Instagram', value: user?.instagram?.username, unlink: unlinkInstagram, type: 'string' },
    { name: 'Phone', value: user?.phone?.number, unlink: unlinkPhone, type: 'number' },
    { name: 'TikTok', value: user?.tiktok?.username, unlink: unlinkTiktok, type: 'string' },
    { name: 'Twitter', value: user?.twitter?.username, unlink: unlinkTwitter, type: 'string' },
    { name: 'Wallet', value: user?.wallet?.address, unlink: unlinkWallet, type: 'string' },
  ];

  // A generic handler that accepts the correct type T (string or number)
  const handleUnlink = async <T extends string | number>(
    unlinkMethod: (account: T) => Promise<any>,
    accountValue: T
  ) => {
    try {
      await unlinkMethod(accountValue);
      console.log(`${accountValue} unlinked successfully.`);
      // Optionally add UI feedback such as a success notification.
    } catch (error) {
      console.error(`Error unlinking account:`, error);
      // Optionally add UI feedback such as an error notification.
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-lg font-bold mb-4">Linked Accounts</h2>
      <div className="space-y-4">
        {accounts.map((account, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
          >
            <div>
              <p className="font-medium">{account.name}</p>
              <p className="text-sm text-gray-600">
                {account.value ? account.value : 'Not linked'}
              </p>
            </div>
            <button
              disabled={!ready || !authenticated || !account.value}
              onClick={() => {
                if (account.value) {
                  if (account.type === 'number') {
                    // Cast the unlink function and value to the number type.
                    handleUnlink(account.unlink as (account: number) => Promise<any>, account.value as number);
                  } else {
                    // Cast the unlink function and value to the string type.
                    handleUnlink(account.unlink as (account: string) => Promise<any>, account.value as string);
                  }
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Unlink
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
