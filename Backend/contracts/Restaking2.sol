// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Mytoken.sol";
import "./Mytoken1.sol";

contract Restaking2 {
    Mytoken public myToken;
    Mytoken2 public anotherToken;
    event Staked(address indexed user, uint256 indexed amount);
    event WithdrewStake(address indexed user, uint256 indexed amount,uint256 indexed timestamp);
    event RewardsClaimed(address indexed user, uint256 indexed amount);
    event unboundingPeriodInitiated (address indexed user,uint256 indexed amount, uint256 indexed timestamp );
    uint256 public RewardRate=100;
    uint256 public s_totalSupply;
    uint256 public s_lastUpdateTime; // everytime we call stake,withdraw,claim reward we need to update time;
    uint256 public s_rewardPerTokenStored;
    
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
    mapping(address => entry[]) userData;
    mapping(address => uint256) s_rewards;
    mapping(address => uint256) s_userRewardsPerToken_Paid;
    mapping(address => uint256) withdrawTimeStamp;

    modifier updateReward() {
        s_lastUpdateTime = block.timestamp;
        s_rewardPerTokenStored = rewardPerToken();
        s_rewards[msg.sender] = earned(msg.sender);
        s_userRewardsPerToken_Paid[msg.sender] = s_rewardPerTokenStored;
        _;
    }

    error stake__transferFailed();
    error withdraw__transferFailed();
    error claimReward__transferFailed();
    error staking__needMoreThanZero();
    error waitingPeriod_notCompleted();
    error unstakeNot_called();

    constructor(Mytoken _myToken, Mytoken1 _anotherToken) {
        myToken = _myToken;
        anotherToken = _anotherToken;
        s_lastUpdateTime = block.timestamp;

    }


    function earned(address account) public view returns (uint256) {
        uint256 currentBalance = s_userStakedAmount[account];
        uint256 amountPaid = s_userRewardsPerToken_Paid[account]; // used while claim reward function call
        uint256 currentRewardPerToken = rewardPerToken();
        uint256 pastRewards = s_rewards[account];
        return((currentBalance * (currentRewardPerToken - amountPaid)) / 1e18) + pastRewards;
    }

    function transferTokens(uint256 _amount) public  {
        s_userStakedAmount[msg.sender] =
        s_userStakedAmount[msg.sender] + _amount;
        s_totalSupply = s_totalSupply + _amount;

        // myToken.mint(address(this), _amount);
        // myToken.burn(msg.sender, _amount);
        try myToken.transfer_(msg.sender,_amount){
            emit Staked (msg.sender,_amount);
        }catch{
            revert stake__transferFailed();
        }
        anotherToken.mint(msg.sender, _amount);
    }

    function rewardPerTokenUpdate() public returns (uint256){
        s_rewardPerTokenStored=s_rewardPerTokenStored +
            (((block.timestamp - s_lastUpdateTime) * RewardRate * 1e18) /
                s_totalSupply);
        s_lastUpdateTime = block.timestamp;
                return s_rewardPerTokenStored;
    }

    function rewardPerToken() public view returns (uint256) {
        if (s_totalSupply == 0) {
            return s_rewardPerTokenStored;
        }
        rewardPerTokenUpdate();
        return s_rewardPerTokenStored + (((block.timestamp - s_lastUpdateTime) * RewardRate * 1e18) / s_totalSupply);
    } 

 
    function unstake(uint256 amount) public {
        require(s_userStakedAmount[msg.sender] >=amount, "not enough LST");
        s_userStakedAmount[msg.sender] =
                s_userStakedAmount[msg.sender] -
                amount;
        userData[msg.sender].push(entry(block.timestamp,amount,true));    
        emit unboundingPeriodInitiated(msg.sender, amount,block.timestamp);
    }

    function withdraw(uint256 requiredTimestamp)
    payable 
    external
    updateReward()
    {   
        entry[] memory user=userData[msg.sender];
        uint256 userCount = userData[msg.sender].length;
        entry[] memory temp = new entry[](userCount);
        for(uint256 i =0 ; i < userCount; i++ ){
            uint256 timestamp=user[i].timestamp;
            uint256 amount = user[i].amount;
            bool notCompleted = user[i].notCompleted;
        if( block.timestamp-timestamp>=1000 && requiredTimestamp == timestamp && notCompleted){
        try anotherToken.burn(msg.sender, amount) {
            emit WithdrewStake(msg.sender, amount, block.timestamp); 
            withdrawTimeStamp[msg.sender] = block.timestamp;
            s_totalSupply = s_totalSupply - amount;
            // emit WithdrewStake(msg.sender, amount);
            uint256 rpt=rewardPerToken();
            amount=(amount * rpt) + amount;
            myToken.mint(msg.sender, amount);
            emit RewardsClaimed(msg.sender,amount);
            temp[i]=entry(timestamp,amount,false);
        } catch {
            temp[i]=(entry(timestamp,amount,notCompleted));
            emit WithdrewStake(msg.sender,amount,timestamp);
            revert withdraw__transferFailed(); 

        }
        }
        else{
            temp[i]=entry(timestamp,amount,notCompleted);
        }
        }
            for(uint256 i = 0; i<userCount ; i++){
                userData[msg.sender][i]=temp[i];
            }
    }


    function getAnotherTokenBalance() public  view returns (uint256) {
        return myToken.balanceOf(address(this));
    }

    function getUserClaimableToken() public view returns(requiredData[] memory) {
    requiredData[] memory data = new requiredData[](userData[msg.sender].length);

    for (uint256 i = 0; i < userData[msg.sender].length; i++) {
        uint256 timestamp = userData[msg.sender][i].timestamp;
        uint256 amount = userData[msg.sender][i].amount;
        bool claimable = block.timestamp - timestamp >= 1000;
        data[i] = requiredData(timestamp, amount, claimable);
    }
    
    return data;
    }

    function mintTokensForStacker(uint256 amount) public  {
            myToken.mint(msg.sender, amount);
    }
    function getTotalSupply() public view returns(uint256){
        return s_totalSupply;
    }
     function getRewardsPerTokenShared() public view returns(uint256){
        return s_rewardPerTokenStored;
    }
     function getUserBalance() public view returns(uint256){
        return s_userStakedAmount[msg.sender];
    }

     function getUserRewardsPerToken() public view returns(uint256){
        return s_userRewardsPerToken_Paid[msg.sender];
    }

    function getCurrentTimestamp() public view returns(uint256){
        return block.timestamp;
    }
}