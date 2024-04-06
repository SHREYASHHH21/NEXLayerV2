// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Mytoken.sol";
import "./Mytoken1.sol";
import "./Mytoken2.sol";
import "./Staking.sol";
import "./Restaking1.sol";
import "./Restaking2.sol";

contract Autostaking {
    Mytoken public myToken;
    Mytoken1 public myToken1;
    Mytoken2 public myToken2;
    Staking public staking;
    Restaking1 public restaking1;
    Restaking2 public restaking2;

    constructor(
        Mytoken _mytoken,
        Mytoken1 _mytoken1,
        Mytoken2 _mytoken2,
        Staking _staking,
        Restaking1 _restaking1,
        Restaking2 _restaking2
    ) {
        myToken = _mytoken;
        myToken1 = _mytoken1;
        myToken2 = _mytoken2;
        staking = _staking;
        restaking1 = _restaking1;
        restaking2 = _restaking2;
    }

    // receive() external payable {}
    // fallback() external payable {}
    function autostaking1() public payable {
        // Forward the received ether to the staking contract
        (bool success, ) = address(staking).call{value: msg.value / 2}(
            abi.encodeWithSignature("stake()")
        );
        require(success, "Staking failed");

        // Assuming ReStaking's stake function also requires ether
        (success, ) = address(restaking1).call{value: msg.value / 2}(
            abi.encodeWithSignature("transferTokens(uint256)",msg.value / 2)
        );
        require(success, "ReStaking failed");
    }


        function autostaking2() public payable {
        // Forward the received ether to the staking contract
        (bool success, ) = address(staking).call{value: msg.value / 2}(
            abi.encodeWithSignature("stake()")
        );
        require(success, "Staking failed");

        // Assuming ReStaking's stake function also requires ether
        (success, ) = address(restaking2).call{value: msg.value / 2}(
            abi.encodeWithSignature("transferTokens(uint256)",msg.value / 2)
        );
        require(success, "ReStaking failed");
    }



    function mintTokensForStacker(uint256 amount) public {
        myToken.mint(msg.sender, amount);
    }
}
