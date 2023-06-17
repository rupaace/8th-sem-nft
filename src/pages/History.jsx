import React from "react";
import { Container, Row, Table } from "reactstrap";

const NFTHistoryPage = () => {
  const transactionHistory = [
    {
      id: 1,
      nftId: "0x123456789",
      transactionType: "Purchase",
      buyer: "0xabcdefg",
      seller: "0xhijklmn",
      price: "1 ETH",
      timestamp: "2023-06-16 10:00:00",
    },
    {
      id: 2,
      nftId: "0x987654321",
      transactionType: "Transfer",
      sender: "0xabcdefg",
      recipient: "0xhijklmn",
      timestamp: "2023-06-15 15:30:00",
    },
    // Add more historical transactions here
  ];

  return (
    <Container>
        <Row>
    <div className="nft-history-page">
      <h1>NFT Transaction History</h1>
      <Table  >
        <thead>
          <tr>
            <th>ID</th>
            <th>NFT ID</th>
            <th>Transaction Type</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.nftId}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.buyer}</td>
              <td>{transaction.seller}</td>
              <td>{transaction.price}</td>
              <td>{transaction.sender}</td>
              <td>{transaction.recipient}</td>
              <td>{transaction.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </Row>
    </Container>
  );
};

export default NFTHistoryPage;
