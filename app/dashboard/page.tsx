import WalletConnector from "../_components/Walletconnector";
import MerchantStats from "../_components/Earning";
import RecentTransactions from "../_components/RecentTransactions";
import WithdrawFunds from "../_components/Withdrawfunds";

const page = () => {
  return (
    <div className="w-full p-4">
      <div className="flex justify-end ">
        <WalletConnector />
      </div>
      <MerchantStats />
      <WithdrawFunds/>
      <RecentTransactions/>
    </div>
  );
};

export default page;
