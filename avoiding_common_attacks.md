# Avoiding Common Attacks

This project utilizes a very basic smart contract to store strings for a given caller. As a result, the security of the project is (relatively) airtight and relies heavily on the robustness of the EVM.

Nevertheless, I made sure to write a number of tests to ensure that strings (and ONLY strings) could be stored in it and ONLY for a given caller.

This allowed me to avoid dealing with most (if not all) of the common attacks, especially since none of the functions are payable and the dapp is not designed to integrate any form of Ether payment (outside of signing tx's to interact with the contract).


