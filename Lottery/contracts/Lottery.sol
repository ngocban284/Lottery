// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lottery{
    address public manager;
    address[] public players;
    


    constructor (){
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > 0.0001 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint256){
       
       return uint256( keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
    }

    function pickWinner() public restricted {
      
        uint256 index;
        index = random()%players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0); //tạo mản động kích thước ban đầu là 0 
    } 

    modifier restricted(){
        require(msg.sender == manager);
        _; // kiểu như add mã của hàm được thêm restricted vào thay cho dấu _
    }

    function getPlayers() public view returns(address[] memory){
        return players;
    }
}
