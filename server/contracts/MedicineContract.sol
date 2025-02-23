// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineContract {
    struct MedicineTransaction {
        uint256 id;
        string buyer;
        string medicineName;
        uint256 quantity;
        uint256 totalPrice;
    }

    mapping(uint256 => MedicineTransaction) public transactions;
    uint256 public transactionCount;

    event MedicinePurchased(uint256 id, string buyer, string medicineName, uint256 quantity, uint256 totalPrice);

    function storeTransaction(
        string memory _buyer,
        string memory _medicineName,
        uint256 _quantity,
        uint256 _totalPrice
    ) public {
        transactionCount++;
        transactions[transactionCount] = MedicineTransaction(transactionCount, _buyer, _medicineName, _quantity, _totalPrice);
        emit MedicinePurchased(transactionCount, _buyer, _medicineName, _quantity, _totalPrice);
    }
}
