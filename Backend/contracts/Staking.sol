// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Mytoken.sol";
// import "./Token1.sol";

contract Staking is ReentrancyGuard {
    Mytoken public myToken;
    //  MyToken public token;
    constructor(Mytoken _token) {
        myToken = _token;
        s_lastUpdateTime=block.timestamp;

    }
    event Staked(address indexed user, uint256 indexed amount);
    event WithdrewStake(address indexed user, uint256 indexed amount,uint256 indexed timstamp);
    event RewardsClaimed(address indexed user, uint256 indexed amount);
    event unboundingPeriodInitiated (address indexed user,uint256 indexed amount, uint256 indexed timestamp );

    uint256 public RewardRate=100;
    uint256 public s_totalSupply;
    uint256 public s_lastUpdateTime; // everytime we call stake,withdraw,claim reward we need to update time;
    uint256 public s_rewardPerTokenStored;
    uint256 public unboundingPeriod = 1e18;
    //   uint256 public withdrawTimeStamp;
    
        struct entry{
        uint256 timestamp;
        uint256 amount;
        bool notCompleted;
    }
    struct requiredData{
        uint256 timestamp;
        uint256 amount;
        bool claimable;
    }
    mapping(address => uint256) s_userStakedAmount;
    mapping(address => uint256) s_rewards;
    mapping(address => uint256) s_userRewardsPerToken_Paid;
    mapping(address => uint256) withdrawTimeStamp;
    mapping(address => entry[]) userData;


    error stake__transferFailed();
    error withdraw__transferFailed();
    error claimReward__transferFailed();
    error staking__needMoreThanZero();
    error waitingPeriod_notCompleted();
    error unstakeNot_called();

    receive() external payable {}
    fallback() external payable {}

    modifier updateReward() {
        s_lastUpdateTime = block.timestamp;
        rewardPerTokenUpdate();
        s_rewardPerTokenStored = rewardPerToken();
        s_rewards[msg.sender] = earned(msg.sender);
        s_userRewardsPerToken_Paid[msg.sender] = s_rewardPerTokenStored;
        _;
    }
    function rewardPerTokenUpdate() public returns (uint256){
        if (s_totalSupply == 0) {
            return s_rewardPerTokenStored;
        }
        s_rewardPerTokenStored=s_rewardPerTokenStored +
            (((block.timestamp - s_lastUpdateTime) * RewardRate * 1e18) /
                s_totalSupply);
        s_lastUpdateTime = block.timestamp;
                return s_rewardPerTokenStored;
    }

    modifier needMoreThanZero() {
        if (msg.value == 0) {
            revert staking__needMoreThanZero();
        }
        _;
    }

    function earned(address account) public view returns (uint256) {
        uint256 currentBalance = s_userStakedAmount[account];
        uint256 amountPaid = s_userRewardsPerToken_Paid[account]; // used while claim reward function call
        uint256 currentRewardPerToken = rewardPerToken();
        uint256 pastRewards = s_rewards[account];
        return
            ((currentBalance * (currentRewardPerToken - amountPaid)) / 1e18) +
            pastRewards;
    }

    function rewardPerToken() public view returns (uint256) {
        if (s_totalSupply == 0) {
            return s_rewardPerTokenStored;
        }
        return
            s_rewardPerTokenStored +
            (((block.timestamp - s_lastUpdateTime) * RewardRate * 1e18) /
                s_totalSupply);
    }

    function stake()
        public 
        updateReward()
        needMoreThanZero()
        nonReentrant
        payable 
    {   uint256 amount = msg.value;
        s_userStakedAmount[msg.sender] =
        s_userStakedAmount[msg.sender] +
            amount;
        s_totalSupply = s_totalSupply + amount;
        (bool sent, ) = (payable(address(this))).call{value: amount}("");
        require(sent, "Failed to take ether");
        uint256 staked_tokens=(93)*(amount)/100;
        myToken.mint(msg.sender, staked_tokens);

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) public {
        require(s_userStakedAmount[msg.sender] >=amount, "not enough eth staked");
        s_userStakedAmount[msg.sender] =
                s_userStakedAmount[msg.sender] -
                amount;
        userData[msg.sender].push(entry(block.timestamp,amount,true));
        emit unboundingPeriodInitiated(msg.sender, amount,block.timestamp);
    }


    function withdraw(uint256 requiredTimestamp)
        external
        updateReward()
        // needMoreThanZero()
    {   
         entry[] memory user=userData[msg.sender];
        uint256 userCount = userData[msg.sender].length;
        entry[] memory temp = new entry[](userCount);
        for(uint256 i =0 ; i < userCount; i++ ){
            uint256 timestamp=user[i].timestamp;
            uint256 amount = user[i].amount;
            bool notCompleted = user[i].notCompleted;
        if( block.timestamp-timestamp>=10 && requiredTimestamp == timestamp && notCompleted){
        withdrawTimeStamp[msg.sender] = block.timestamp;
        s_totalSupply = s_totalSupply - amount;
        try myToken.burn(msg.sender, amount) {
            emit WithdrewStake(msg.sender, amount, block.timestamp); 
            withdrawTimeStamp[msg.sender] = block.timestamp;
            s_totalSupply = s_totalSupply - amount;
            // emit WithdrewStake(msg.sender, amount);
            uint256 rpt=rewardPerToken();
            amount=(amount * rpt) + amount;
            amount = (amount*100)/93;
            (bool sent, ) = (payable(msg.sender)).call{value: amount}("");
            require(sent, "Failed to send Ether");
            emit RewardsClaimed(msg.sender,amount);
        }
        catch {
            temp[i]=(entry(timestamp,amount,notCompleted));
            revert withdraw__transferFailed(); 
        }
        }
        else{
            revert unstakeNot_called();
        }
        }
            for(uint256 i = 0; i<userCount ; i++){
                userData[msg.sender][i]=temp[i];
            }
    }
    function getUserClaimableToken() public view returns(requiredData[] memory) {
        requiredData[] memory data = new requiredData[](userData[msg.sender].length);

        for (uint256 i = 0; i < userData[msg.sender].length; i++) {
            uint256 timestamp = userData[msg.sender][i].timestamp;
            uint256 amount = userData[msg.sender][i].amount;
            bool claimable = block.timestamp - timestamp >= 10;
            data[i] = requiredData(timestamp, amount, claimable);
    }
    
    return data;
    }

    function getTotalSupply() public view returns(uint256){
        return s_totalSupply;
    }
    function getRewardsPerTokenShared() public view returns(uint256){
        return s_rewardPerTokenStored;
    }
    function getBlockTimestamp() public view returns(uint256) {
        return block.timestamp;
    }
    function getUserBalance() public view returns(uint256){
        return s_userStakedAmount[msg.sender];
    }
    function getUserRewardsPerToken() public view returns(uint256){
        return s_userRewardsPerToken_Paid[msg.sender];
    }

}