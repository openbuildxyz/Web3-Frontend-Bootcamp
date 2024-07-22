import { useCallback, useEffect, useState } from "react";
import { ListItem, marketContractUtils } from "../utils/contractUtils";
import { ItemCard } from "../components/ItemCard";

export function HomePage() {
  const [listings, setListings] = useState<ListItem[]>([]);
  const refreshListings = useCallback(() => {
    marketContractUtils.getAllListingNFTs().then(setListings);
  }, []);
  useEffect(() => {
    refreshListings();
  }, [refreshListings]);

  return (
    <div className="px-4 mt-4">
      <ul className="mb-10"></ul>
      <div className="flex flex-wrap gap-4">
        {listings.map((item, index) => (
          <ItemCard
            key={index}
            data={item}
            from="card list"
            refreshData={refreshListings}
          />
        ))}
      </div>
    </div>
  );
}
