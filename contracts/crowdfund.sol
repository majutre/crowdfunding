pragma solidity 0.5.13;

contract Vaquinha {
  
    struct Request {
        string descricao;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Contribuir() public payable {
        require(msg.value > 1 gwei, "Valor deve ser maior que 1 gwei");

        approvers[msg.sender] = true;
        approversCount++;
    }

    function finalizaCampanha(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

     function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }
}