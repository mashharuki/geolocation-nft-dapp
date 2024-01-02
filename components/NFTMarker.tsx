import { MediaRenderer, NFT, useAddress } from "@thirdweb-dev/react";
import L from "leaflet";
import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { haversineDistance } from "../lib/haversineDistance";
import { Coordinates } from "../utils/types/types";

type MarkerComponentProps = {
    nft: NFT;
    userPosition: Coordinates;
};

const nftIcon = new L.Icon({
    iconUrl: '/nft-marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

/**
 * NFTMaker Component
 * @param param0 
 * @returns 
 */
const NFTMarker: React.FC<MarkerComponentProps> = ({ nft, userPosition }) => {
    const address = useAddress();
    const [isClaiming, setIsClaiming] = useState(false);
    //@ts-ignore
    const latitude = nft.metadata.attributes[0].value;
    //@ts-ignore
    const longitude = nft.metadata.attributes[1].value;
    const nftPosition: Coordinates = { lat: latitude, lng: longitude };
    const radius = 0.1;

    /**
     * check isWithinRadius method
     * @returns 
     */
    const isWithinRadius = () => {
        const distance = haversineDistance(userPosition, nftPosition);
        return distance <= radius;
    };

    /**
     * mint NFT method
     */
    const claimNFT = async () => {
        setIsClaiming(true);
        try {
            const response = await fetch('/api/mintNFT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tokenId: nft.metadata.id,
                    address: address,
                    userPosition: userPosition,
                    nftPosition: nftPosition
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An error occurred while claiming the NFT.');
            }

            alert("NFT claimed successfully!");
        } catch (error: any) {
            alert(error.message)
            console.error(error);
        } finally {
            setIsClaiming(false);
        }
    };

    return(
        <Marker position={nftPosition} icon={nftIcon}>
            <Popup>
                <div>
                    <MediaRenderer
                        src={nft.metadata.image}
                    />
                    <button
                        disabled={!isWithinRadius() || isClaiming}
                        onClick={claimNFT}
                    >
                        {isClaiming ? "Claiming NFT..." : "Claim NFT"}
                    </button>
                </div>
            </Popup>
        </Marker>
    )
};

export default NFTMarker;