// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthArticles {
    struct Article {
        uint256 id;
        string title;
        string summary;
        string image;
        uint256 timestamp;
    }

    mapping(uint256 => Article) public articles;
    uint256 public articleCount;

    event ArticleAdded(uint256 id, string title, uint256 timestamp);
    event ArticleDeleted(uint256 id);

    function addArticle(string memory _title, string memory _summary, string memory _image) public {
        articleCount++;
        articles[articleCount] = Article(articleCount, _title, _summary, _image, block.timestamp);
        emit ArticleAdded(articleCount, _title, block.timestamp);
    }

    function deleteArticle(uint256 _id) public {
        require(articles[_id].id == _id, "Article not found");
        delete articles[_id];
        emit ArticleDeleted(_id);
    }

    function getArticle(uint256 _id) public view returns (Article memory) {
        return articles[_id];
    }
}
