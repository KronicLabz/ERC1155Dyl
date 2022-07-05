// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Dyl is ERC1155, Ownable, Pausable, ERC1155Burnable, ERC1155Supply {

    string public name;
    string public symbol;

    mapping(uint => string) public tokenURI;

    uint256 public constant CRYPTO_RICH = 1;   
    uint256 public constant CRYPTO_RICH_DELUXE = 2;
    uint256 public constant CRYPTO_RICH_STANDARD_TC = 3;
    uint256 public constant CRYPTO_RICH_GOLD_TC = 4;
    uint256 public constant CRYPTO_RICH_PLATINUM_TC = 5;
    uint256 public constant CRYPTO_RICH_DIAMOND_TC = 6;
    uint256 public constant ON_FIRE = 7;
    uint256 public constant ALIENS = 8;
    uint256 public constant FLASH_DRIVE = 9;
    uint256 public constant BIG_FACTS = 10;
    uint256 public constant SHOOTING_STAR = 11;
    uint256 public constant TREAT_MYSELF = 12;
    uint256 public constant CRYPTOCURRENCY = 13;
    uint256 public constant MY_LIFE = 14;
    uint256 public constant GM = 15;
    uint256 public constant NO_SLEEP = 16;

    constructor() ERC1155("") {
        name = "Dyl";
        symbol = "DYL";
        _mint(msg.sender, CRYPTO_RICH, 10**0, "");
        _mint(msg.sender, CRYPTO_RICH_DELUXE, 10**2, "");
        _mint(msg.sender, CRYPTO_RICH_STANDARD_TC, 10**1, "");
        _mint(msg.sender, CRYPTO_RICH_GOLD_TC, 10**1, "");
        _mint(msg.sender, CRYPTO_RICH_PLATINUM_TC, 10**0, "");
        _mint(msg.sender, CRYPTO_RICH_DIAMOND_TC, 1, "");
        _mint(msg.sender, ON_FIRE, 1, "");
        _mint(msg.sender, ALIENS, 1, "");
        _mint(msg.sender, FLASH_DRIVE, 1, "");
        _mint(msg.sender, BIG_FACTS, 1, "");
        _mint(msg.sender, SHOOTING_STAR, 1, "");
        _mint(msg.sender, TREAT_MYSELF, 1, "");
        _mint(msg.sender, CRYPTOCURRENCY, 1, "");
        _mint(msg.sender, MY_LIFE, 1, "");
        _mint(msg.sender, GM, 1, "");
        _mint(msg.sender, NO_SLEEP, 1, "");
    }

    function setURI(uint _id, string memory _uri) external onlyOwner {
        tokenURI[_id] = _uri;
        emit URI(_uri, _id);
  
    }  

    function mint1(address _to, uint _id, uint _amount) external onlyOwner {
        _mint(_to, _id, _amount, "");
    }

    function burnForMint(address _from, uint[] memory _burnIds, uint[] memory _burnAmounts, uint[] memory _mintIds, uint[] memory _mintAmounts) external onlyOwner {
        _burnBatch(_from, _burnIds, _burnAmounts);
        _mintBatch(_from, _mintIds, _mintAmounts, "");
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mintBatch(address _to, uint[] memory _ids, uint[] memory _amounts) external onlyOwner {
        _mintBatch(_to, _ids, _amounts, "");
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

     function recoverERC20(address tokenAddress, uint256 tokenAmount) public virtual onlyOwner {
        IERC20(tokenAddress).transfer(owner(), tokenAmount);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
