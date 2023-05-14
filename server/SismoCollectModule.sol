// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ICollectModule} from '../../../interfaces/ICollectModule.sol';
import {ModuleBase} from '../ModuleBase.sol';
import "@sismo-core/sismo-connect-solidity/contracts/libs/SismoLib.sol";

contract SismoGroupCollectModule is SismoConnect, ICollectModule, ModuleBase {

    // Mapping to store the group hash for each publication by profile
    mapping(uint256 => mapping(uint256 => bytes16)) public groupHashByPublicationByProfile;

    constructor(address hub, bytes16 appId) ModuleBase(hub) SismoConnect(appId) {}

    function initializePublicationCollectModule(
        uint256 profileId,
        uint256 pubId,
        bytes calldata data
    ) external override onlyHub returns (bytes memory) {
        bytes16 groupId = abi.decode(data, (bytes16));
        groupHashByPublicationByProfile[profileId][pubId] = groupId;
        return data;
    }

    function processCollect(
        uint256 referrerProfileId,
        address collector,
        uint256 profileId,
        uint256 pubId,
        bytes calldata response
    ) external override onlyHub {
        bytes16 groupId = groupHashByPublicationByProfile[profileId][pubId];

        AuthRequest[] memory auths = new AuthRequest[](1);
        auths[0] = AuthRequest({
            authType: AuthType.VAULT,
            userId: 0,
            isAnon: false,
            isOptional: false,
            isSelectableByUser: true,
            extraData: ""
        });

        ClaimRequest[] memory claims = new ClaimRequest[](1);
        claims[0] = ClaimRequest({
            claimType: ClaimType.GTE,
            groupId: groupId,
            groupTimestamp: bytes16("latest"),
            value: 1,
            isOptional: false,
            isSelectableByUser: true,
            extraData: ""
        });

        SignatureRequest memory signature = SignatureRequest({
            message: abi.encode(collector),
            isSelectableByUser: false,
            extraData: ""
        });

        SismoConnectRequest memory request = SismoConnectRequest({
            appId: appId,
            namespace: bytes16(0),
            auths: auths,
            claims: claims,
            signature: signature
        });

        SismoConnectVerifiedResult memory result = verify({
            responseBytes: response,
            request: request
        });

        // check if at least one claim is verified
        bool isVerified = false;
        for (uint i = 0; i < result.claims.length; i++) {
            if (result.claims[i].groupId == groupId) {
                isVerified = true;
                break;
            }
        }

        require(isVerified, "User not in the group");
    }
}
